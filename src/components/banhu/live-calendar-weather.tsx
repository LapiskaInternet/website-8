"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  CalendarDays,
  CloudSun,
  Droplets,
  Search,
  Thermometer,
  Wind,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { SectionHeading } from "@/components/banhu/section-heading";
import { cn } from "@/lib/utils";

interface WeatherData {
  name: string;
  admin1: string | null;
  country: string | null;
  description: string;
  current: {
    temperature: number;
    feelsLike: number;
    humidity: number;
    wind: number;
  };
}

type WeatherResponse = WeatherData & { error?: string };

const DAY_ABBRS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

interface WeekCell {
  abbr: string;
  dayNum: number;
  isToday: boolean;
}

/** Resolve the calendar date (year/month/day) it currently is in SAST. */
function getSastYmd(now: Date): { y: number; m: number; d: number } {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Johannesburg",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  let y = 1970;
  let m = 1;
  let d = 1;
  for (const part of parts) {
    if (part.type === "year") y = Number(part.value);
    if (part.type === "month") m = Number(part.value);
    if (part.type === "day") d = Number(part.value);
  }
  return { y, m, d };
}

/** Build the Mon..Sun week strip around today (SAST). */
function buildWeekCells(now: Date): WeekCell[] {
  const { y, m, d } = getSastYmd(now);
  const utcToday = Date.UTC(y, m - 1, d);
  const weekday = new Date(utcToday).getUTCDay(); // 0 = Sunday
  const offsetFromMonday = weekday === 0 ? -6 : 1 - weekday;
  return DAY_ABBRS.map((abbr, i) => ({
    abbr,
    dayNum: new Date(
      utcToday + (offsetFromMonday + i) * 86_400_000
    ).getUTCDate(),
    isToday: i === -offsetFromMonday,
  }));
}

export function LiveCalendarWeather() {
  const [now, setNow] = useState<Date | null>(null);
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const didInit = useRef(false);

  useEffect(() => {
    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const fetchWeather = useCallback(async (q: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/weather?query=" + encodeURIComponent(q));
      const json = (await res.json()) as WeatherResponse;
      if (!res.ok) {
        setError(json.error ?? "Something went wrong");
      } else {
        setData(json);
        setQuery(q);
      }
    } catch {
      setError("Could not reach the weather service");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;
    void fetchWeather("Acornhoek");
  }, [fetchWeather]);

  const handleSearch = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    void fetchWeather(trimmed);
  };

  const clock = now
    ? new Intl.DateTimeFormat("en-GB", {
        timeZone: "Africa/Johannesburg",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now)
    : "--:--:--";

  const fullDate = now
    ? new Intl.DateTimeFormat("en-GB", {
        timeZone: "Africa/Johannesburg",
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(now)
    : "\u00A0";

  const weekCells = now ? buildWeekCells(now) : null;

  return (
    <section id="live" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Plan Your Visit"
          title={<>Live Calendar &amp; Weather</>}
          subtitle="Check the live date and current weather for any Mpumalanga location before you travel."
        />

        <div className="grid items-stretch gap-6 md:grid-cols-2">
          {/* Card A — Live Calendar */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-banhu-green/10 text-banhu-green-dark">
                  <CalendarDays className="h-5 w-5" aria-hidden="true" />
                </span>
                <CardTitle className="text-lg text-banhu-green-dark">
                  Live Calendar
                </CardTitle>
              </div>
              <Badge
                variant="outline"
                className="border-banhu-green/30 bg-banhu-green/10 text-banhu-green-dark"
              >
                <span
                  aria-hidden="true"
                  className="live-dot mr-1.5 inline-block h-2 w-2 rounded-full bg-banhu-green-light"
                />
                Live
              </Badge>
            </CardHeader>
            <CardContent>
              <div
                className="grid grid-cols-7 gap-1.5"
                aria-label="Current week"
              >
                {weekCells
                  ? weekCells.map((cell) => (
                      <div
                        key={cell.abbr}
                        aria-current={cell.isToday ? "date" : undefined}
                        className={cn(
                          "rounded-xl border py-2.5 text-center",
                          cell.isToday
                            ? "border-banhu-green bg-banhu-green shadow-md"
                            : "border-banhu-sand bg-banhu-paper"
                        )}
                      >
                        <span
                          className={cn(
                            "block text-[10px] font-semibold uppercase tracking-wider",
                            cell.isToday
                              ? "text-banhu-cream/70"
                              : "text-muted-foreground"
                          )}
                        >
                          {cell.abbr}
                        </span>
                        <span
                          className={cn(
                            "block font-display text-lg font-bold",
                            cell.isToday
                              ? "text-banhu-cream"
                              : "text-banhu-green-dark"
                          )}
                        >
                          {cell.dayNum}
                        </span>
                      </div>
                    ))
                  : Array.from({ length: 7 }).map((_, i) => (
                      <Skeleton
                        key={i}
                        aria-hidden="true"
                        className="h-[62px] rounded-xl"
                      />
                    ))}
              </div>

              <div className="mt-6 text-center">
                <div className="font-display text-5xl font-extrabold tabular-nums tracking-tight text-banhu-green-dark md:text-6xl">
                  {clock}
                </div>
                <div className="mt-2 flex items-center justify-center gap-2">
                  <Badge className="border border-banhu-orange/30 bg-banhu-orange/15 text-banhu-orange-dark">
                    SAST
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {fullDate}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Local time · Africa/Johannesburg (UTC+2)
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Card B — Weather */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-banhu-orange/15 text-banhu-orange-dark">
                  <CloudSun className="h-5 w-5" aria-hidden="true" />
                </span>
                <CardTitle className="text-lg text-banhu-green-dark">
                  Weather
                </CardTitle>
              </div>
              <Badge
                variant="outline"
                className="border-banhu-orange/30 bg-banhu-orange/10 text-banhu-orange-dark"
              >
                <span
                  aria-hidden="true"
                  className="live-dot mr-1.5 inline-block h-2 w-2 rounded-full bg-banhu-orange"
                />
                Live
              </Badge>
            </CardHeader>
            <CardContent>
              <form
                className="flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearch(inputValue);
                }}
              >
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  aria-label="Search a location"
                  placeholder="Search any location — e.g. Acornhoek"
                  className="flex-1"
                />
                <Button type="submit" size="sm" disabled={loading}>
                  <Search className="mr-1 h-4 w-4" aria-hidden="true" />
                  Search
                </Button>
              </form>

              <p className="sr-only" role="status">
                Weather results for {query || "Acornhoek"} will appear here.
              </p>

              {loading ? (
                <div className="mt-4 space-y-3">
                  <Skeleton className="h-7 w-44 rounded-lg" />
                  <Skeleton className="h-14 w-full rounded-xl" />
                  <Skeleton className="h-20 w-full rounded-xl" />
                </div>
              ) : error ? (
                <div className="mt-4" role="alert">
                  <p className="text-sm text-destructive">{error}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Please try again.
                  </p>
                </div>
              ) : data ? (
                <div className="mt-4">
                  <div>
                    <h3 className="font-display text-xl font-bold text-banhu-green-dark">
                      {data.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {data.admin1 && `${data.admin1} · `}
                      {data.country}
                    </p>
                  </div>

                  <div className="mt-4 flex items-end justify-between gap-3">
                    <div>
                      <span className="rounded-full bg-banhu-green/10 px-2.5 py-0.5 text-xs font-semibold text-banhu-green-dark">
                        Today
                      </span>
                      <div className="mt-1 font-display text-5xl font-extrabold text-banhu-green-dark">
                        {data.current.temperature}°C
                      </div>
                    </div>
                    <p className="text-right text-sm text-muted-foreground">
                      {data.description}
                    </p>
                  </div>

                  <div className="mt-5 grid grid-cols-3 gap-2">
                    <div className="rounded-xl border border-banhu-sand bg-banhu-paper p-3 text-center">
                      <Thermometer
                        aria-hidden="true"
                        className="mx-auto h-4 w-4 text-banhu-orange-dark"
                      />
                      <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Feels like
                      </p>
                      <p className="font-display text-base font-bold text-banhu-green-dark">
                        {data.current.feelsLike}°C
                      </p>
                    </div>
                    <div className="rounded-xl border border-banhu-sand bg-banhu-paper p-3 text-center">
                      <Droplets
                        aria-hidden="true"
                        className="mx-auto h-4 w-4 text-banhu-orange-dark"
                      />
                      <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Humidity
                      </p>
                      <p className="font-display text-base font-bold text-banhu-green-dark">
                        {data.current.humidity}%
                      </p>
                    </div>
                    <div className="rounded-xl border border-banhu-sand bg-banhu-paper p-3 text-center">
                      <Wind
                        aria-hidden="true"
                        className="mx-auto h-4 w-4 text-banhu-orange-dark"
                      />
                      <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Wind
                      </p>
                      <p className="font-display text-base font-bold text-banhu-green-dark">
                        {data.current.wind} km/h
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
