"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";

import {
  ADDONS,
  PACKAGES,
  REGIONAL_PACKAGES,
} from "@/lib/banhu-data";
import { useBookingStore } from "@/lib/booking-store";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/banhu/section-heading";

const INTEREST_OPTIONS = [
  "Wildlife & game viewing",
  "Culture & heritage",
  "Boma storytelling",
  "Nightlife",
  "Local food tasting",
  "Waterfalls & landscapes",
];

const INITIAL_FORM = {
  fullName: "",
  email: "",
  phone: "",
  travelDate: "",
  partySize: "",
  days: "",
  destination: "",
  notes: "",
};

type FormKey = keyof typeof INITIAL_FORM;

export function BookingForm() {
  const [tab, setTab] = useState("pre");
  const [form, setForm] = useState(INITIAL_FORM);
  const [interests, setInterests] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState<{ whatsappUrl: string } | null>(null);

  const {
    selectedAddons,
    selectedPackage,
    toggleAddon,
    setSelectedPackage,
    clearAddons,
  } = useBookingStore();
  const { toast } = useToast();

  const updateForm = (key: FormKey, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggleInterest = (interest: string) =>
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );

  async function handleSubmit() {
    if (!form.fullName.trim() || !form.email.trim() || !form.phone.trim()) {
      toast({
        title: "Missing details",
        description: "Please fill in your name, email and phone number.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        type: tab === "pre" ? ("package" as const) : ("custom" as const),
        packageName:
          tab === "pre" ? selectedPackage || "No package — add-ons only" : null,
        addons: selectedAddons,
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        travelDate: form.travelDate || null,
        partySize: Number(form.partySize) || null,
        destination: tab === "custom" ? form.destination : null,
        notes:
          [
            form.notes,
            interests.length ? `Interests: ${interests.join(", ")}` : "",
          ]
            .filter(Boolean)
            .join(" — ") || null,
      };

      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        toast({
          title: "Something went wrong",
          description: j.error ?? "Please try again or WhatsApp us directly.",
          variant: "destructive",
        });
        return;
      }

      const j = await res.json();
      setSent({ whatsappUrl: j.whatsappUrl });
      toast({
        title: "Booking request sent!",
        description: "We'll confirm everything via WhatsApp.",
      });
      try {
        window.open(j.whatsappUrl, "_blank", "noopener,noreferrer");
      } catch {
        // Pop-up blocked — the inline "Open WhatsApp" button is the fallback.
      }
      setForm(INITIAL_FORM);
      setInterests([]);
      clearAddons();
      setSelectedPackage("");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="booking" className="topo-pattern bg-banhu-green-dark py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4">
        <SectionHeading
          onDark
          eyebrow="Book Your Adventure"
          title="Book Your Adventure"
          subtitle="Choose a package or add-on tour, or build your own — we confirm everything via WhatsApp."
        />

        <Card className="gap-0 rounded-3xl border-0 bg-banhu-paper p-6 shadow-2xl md:p-10">
          {sent ? (
            <div className="mb-6 flex items-start gap-2.5 rounded-2xl border border-banhu-green/30 bg-banhu-green/10 p-4 text-sm text-banhu-green-dark">
              <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
              <span className="flex flex-wrap items-center gap-x-2 gap-y-2">
                <strong>Booking request sent!</strong>
                <span>
                  We&apos;ll confirm everything via WhatsApp. If the app
                  didn&apos;t open automatically:
                </span>
                <Button asChild size="sm" className="ml-2">
                  <a
                    href={sent.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open WhatsApp
                  </a>
                </Button>
              </span>
            </div>
          ) : null}

          <Tabs
            value={tab}
            defaultValue="pre"
            onValueChange={setTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="pre">Pre-Planned Tour</TabsTrigger>
              <TabsTrigger value="custom">Customise Your Tour</TabsTrigger>
            </TabsList>

            <TabsContent value="pre" className="mt-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="package">Select a package or add-on tour</Label>
                <Select
                  value={selectedPackage || "none"}
                  onValueChange={(v) => setSelectedPackage(v === "none" ? "" : v)}
                >
                  <SelectTrigger id="package" className="w-full">
                    <SelectValue placeholder="Choose a package (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">
                      No package — add-ons only
                    </SelectItem>
                    <SelectGroup>
                      <SelectLabel>Acornhoek Regional Packages</SelectLabel>
                      {REGIONAL_PACKAGES.map((p) => (
                        <SelectItem key={p.id} value={p.name}>
                          {p.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Cross-Border &amp; Heritage Tours</SelectLabel>
                      {PACKAGES.map((p) => (
                        <SelectItem key={p.id} value={p.name}>
                          {p.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <p className="text-sm font-semibold text-banhu-green-dark">
                  Add-On Experiences
                </p>
                <p className="text-xs text-muted-foreground">
                  Optional — tick any experiences to include
                </p>
                <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                  {ADDONS.map((a) => {
                    const checked = selectedAddons.includes(a.id);
                    return (
                      <label
                        key={a.id}
                        className={cn(
                          "flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-colors",
                          checked
                            ? "border-banhu-green bg-banhu-green/5"
                            : "border-banhu-sand hover:border-banhu-orange/60"
                        )}
                      >
                        <Checkbox
                          checked={checked}
                          onCheckedChange={() => toggleAddon(a.id)}
                          aria-label={`Add ${a.name}`}
                        />
                        <span className="text-sm font-medium">{a.name}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="pDate">Preferred start date</Label>
                  <Input
                    type="date"
                    id="pDate"
                    value={form.travelDate}
                    onChange={(e) => updateForm("travelDate", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pParty">Travellers</Label>
                  <Input
                    type="number"
                    min={1}
                    id="pParty"
                    placeholder="e.g. 2"
                    value={form.partySize}
                    onChange={(e) => updateForm("partySize", e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="custom" className="mt-6 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="destination">Where would you like to go?</Label>
                <Textarea
                  id="destination"
                  rows={2}
                  placeholder="e.g. Panorama Route, Kruger fringe, Acornhoek villages…"
                  value={form.destination}
                  onChange={(e) => updateForm("destination", e.target.value)}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="cDate">Preferred start date</Label>
                  <Input
                    type="date"
                    id="cDate"
                    value={form.travelDate}
                    onChange={(e) => updateForm("travelDate", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cDays">Days</Label>
                  <Input
                    type="number"
                    min={1}
                    id="cDays"
                    placeholder="e.g. 5"
                    value={form.days}
                    onChange={(e) => updateForm("days", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cParty">Travellers</Label>
                  <Input
                    type="number"
                    min={1}
                    id="cParty"
                    placeholder="e.g. 2"
                    value={form.partySize}
                    onChange={(e) => updateForm("partySize", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-banhu-green-dark">
                  Interests (optional)
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {INTEREST_OPTIONS.map((interest) => {
                    const active = interests.includes(interest);
                    return (
                      <button
                        key={interest}
                        type="button"
                        aria-pressed={active}
                        onClick={() => toggleInterest(interest)}
                        className={cn(
                          "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                          active
                            ? "border-banhu-green bg-banhu-green text-banhu-cream"
                            : "border-banhu-sand bg-banhu-paper text-banhu-green-dark hover:border-banhu-orange"
                        )}
                      >
                        {interest}
                      </button>
                    );
                  })}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-8 space-y-4 border-t border-banhu-sand/70 pt-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  required
                  placeholder="Your full name"
                  autoComplete="name"
                  value={form.fullName}
                  onChange={(e) => updateForm("fullName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => updateForm("email", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  placeholder="e.g. 064 959 4490"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(e) => updateForm("phone", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (optional)</Label>
              <Textarea
                id="notes"
                rows={3}
                placeholder="Tell us about your ideal trip — dates, group size, special requests…"
                value={form.notes}
                onChange={(e) => updateForm("notes", e.target.value)}
              />
            </div>

            <Button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              size="lg"
              className="mt-2 w-full font-semibold"
            >
              {submitting ? (
                <>
                  <Loader2 aria-hidden="true" className="mr-2 h-4 w-4 animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  <Send aria-hidden="true" className="mr-2 h-4 w-4" />
                  Send Booking Request
                </>
              )}
            </Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Payment is via EFT. We&apos;ll send banking details after
              confirmation.
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
}
