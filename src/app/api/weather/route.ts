import { NextRequest, NextResponse } from "next/server";
import dns from "node:dns";
import net from "node:net";

// The sandbox network resolves AAAA records but has no working IPv6 route,
// and IPv4 connects take longer than undici's default happy-eyeballs
// attempt timeout — which makes Node's fetch abort healthy connections.
// Prefer IPv4 lookups and disable auto-select family to fix outbound fetch.
dns.setDefaultResultOrder("ipv4first");
net.setDefaultAutoSelectFamily(false);

export const dynamic = "force-dynamic";

interface GeoResult {
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  admin1?: string;
  timezone?: string;
}

interface OpenMeteoCurrent {
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  wind_speed_10m: number;
  weather_code: number;
}

function describeWeather(code: number): string {
  if (code === 0) return "Clear sky";
  if (code <= 3) return "Partly cloudy";
  if (code <= 48) return "Foggy";
  if (code <= 57) return "Drizzle";
  if (code <= 67) return "Rain";
  if (code <= 77) return "Snow";
  if (code <= 82) return "Rain showers";
  if (code <= 86) return "Snow showers";
  return "Thunderstorm";
}

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("query")?.trim();

  if (!query) {
    return NextResponse.json(
      { error: "Please provide a location to search for." },
      { status: 400 }
    );
  }

  try {
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        query
      )}&count=1&language=en&format=json`,
      { cache: "no-store" }
    );

    if (!geoRes.ok) {
      return NextResponse.json(
        { error: "Could not reach the location service. Please try again." },
        { status: 502 }
      );
    }

    const geo = (await geoRes.json()) as { results?: GeoResult[] };
    const location = geo.results?.[0];

    if (!location) {
      return NextResponse.json(
        { error: `No location found for “${query}”. Try a nearby town.` },
        { status: 404 }
      );
    }

    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code&timezone=auto`,
      { cache: "no-store" }
    );

    if (!weatherRes.ok) {
      return NextResponse.json(
        { error: "Could not reach the weather service. Please try again." },
        { status: 502 }
      );
    }

    const weather = (await weatherRes.json()) as {
      current?: OpenMeteoCurrent;
    };

    const current = weather.current;
    if (!current) {
      return NextResponse.json(
        { error: "Weather data unavailable for this location." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      name: location.name,
      admin1: location.admin1 ?? null,
      country: location.country ?? null,
      description: describeWeather(current.weather_code ?? 0),
      current: {
        temperature: Math.round(current.temperature_2m),
        feelsLike: Math.round(current.apparent_temperature),
        humidity: Math.round(current.relative_humidity_2m),
        wind: Math.round(current.wind_speed_10m),
      },
      fetchedAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      { error: "Weather service temporarily unavailable. Please try again." },
      { status: 502 }
    );
  }
}
