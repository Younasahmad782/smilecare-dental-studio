"use client";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, AlertCircle, Loader2, MessageCircle, Send } from "lucide-react";
import { appointmentSchema, TIME_SLOTS, type AppointmentValues } from "@/lib/validation";
import { services } from "@/data/services";
import { dentists } from "@/data/dentists";
import { site } from "@/lib/site";
import { formatPkMobile, waLink } from "@/lib/utils";
import { track } from "@/lib/analytics";
import { btn } from "@/components/ui/button";
import { Field } from "./Field";

type Status = "idle" | "sending" | "sent" | "unavailable" | "error";

function buildWhatsAppText(v: AppointmentValues) {
  const svc = services.find((s) => s.slug === v.service)?.title ?? "Not sure yet";
  const doc = dentists.find((d) => d.slug === v.dentist)?.name ?? "No preference";
  return [
    `Hello ${site.name}, I would like to request an appointment.`,
    `Name: ${v.name}`, `Mobile: ${formatPkMobile(v.mobile)}`, v.email ? `Email: ${v.email}` : "",
    `Service: ${svc}`, `Preferred dentist: ${doc}`, `Preferred date: ${v.date}`, `Preferred time: ${v.time}`,
    v.message ? `Message: ${v.message}` : "",
  ].filter(Boolean).join("\n");
}

export function AppointmentForm() {
  const params = useSearchParams();
  const ts = useRef(0);
  const honey = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [serverMsg, setServerMsg] = useState("");
  const [range, setRange] = useState<{ min: string; max: string }>({ min: "", max: "" });

  const svcParam = params.get("service") ?? "";
  const docParam = params.get("dentist") ?? "";
  const { register, handleSubmit, setValue, getValues, trigger, setError, reset, watch, formState: { errors, isSubmitting } } = useForm<AppointmentValues>({
    resolver: zodResolver(appointmentSchema), mode: "onTouched",
    defaultValues: {
      name: "", mobile: "", email: "", message: "", date: "", time: "",
      service: services.some((s) => s.slug === svcParam) ? svcParam : "",
      dentist: dentists.some((d) => d.slug === docParam) ? docParam : "any",
    },
  });

  useEffect(() => {
    ts.current = Date.now();
    const iso = (d: Date) => d.toISOString().slice(0, 10);
    const now = new Date();
    setRange({ min: iso(now), max: iso(new Date(now.getTime() + 120 * 86_400_000)) });
  }, []);

  const d = (k: keyof AppointmentValues) => ({ "aria-invalid": errors[k] ? (true as const) : undefined, "aria-describedby": `${k}-error` });
  const message = watch("message") ?? "";

  async function onSubmit(values: AppointmentValues) {
    setStatus("sending"); setServerMsg("");
    try {
      const res = await fetch("/api/appointment", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: honey.current?.value ?? "", ts: ts.current }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) { track("appointment_enquiry_submit", { service: values.service }); setStatus("sent"); reset(); return; }
      if (res.status === 422 && data.fields) {
        for (const [k, msgs] of Object.entries(data.fields as Record<string, string[]>)) setError(k as keyof AppointmentValues, { message: msgs[0] });
        setStatus("idle"); return;
      }
      setServerMsg(data.error ?? "Something went wrong."); setStatus(data.code === "not_configured" ? "unavailable" : "error");
    } catch {
      setServerMsg("Network error. Please check your connection and try again, or use WhatsApp."); setStatus("error");
    }
  }

  function onWhatsAppClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!appointmentSchema.safeParse(getValues()).success) { e.preventDefault(); void trigger(); return; }
    track("whatsapp_click", { location: "appointment_form" });
  }
  const parsed = appointmentSchema.safeParse(watch());
  const waHref = parsed.success ? waLink(site.whatsapp, buildWhatsAppText(parsed.data)) : "#";

  if (status === "sent") {
    return (
      <div role="status" className="rounded-xl2 bg-mint-100 p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-teal-600" aria-hidden />
        <h2 className="mt-4 text-2xl font-semibold">Enquiry received</h2>
        <p className="mx-auto mt-3 max-w-md">Thank you. The clinic will contact you to agree a time. <strong>This is an enquiry, not a confirmed appointment.</strong></p>
        <button type="button" onClick={() => setStatus("idle")} className={btn("outline", "mt-6")}>Send another enquiry</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="rounded-xl2 border border-ash-200 bg-white p-5 shadow-soft sm:p-8">
      <input ref={honey} type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Patient name" required error={errors.name?.message}>
          <input id="name" autoComplete="name" className="input" {...d("name")} {...register("name")} />
        </Field>
        <Field id="mobile" label="Mobile number" required error={errors.mobile?.message} hint="e.g. 0300 1234567 or +92 300 1234567">
          <input id="mobile" type="tel" inputMode="tel" autoComplete="tel" className="input" {...d("mobile")}
            {...register("mobile", { onBlur: (e) => setValue("mobile", formatPkMobile(e.target.value)) })} />
        </Field>
        <Field id="email" label="Email" error={errors.email?.message} className="sm:col-span-2">
          <input id="email" type="email" autoComplete="email" className="input" {...d("email")} {...register("email")} />
        </Field>
        <Field id="service" label="Dental service" required error={errors.service?.message}>
          <select id="service" className="input" {...d("service")} {...register("service")}>
            <option value="">Select a service</option>
            <option value="not-sure">Not sure yet</option>
            {services.map((s) => <option key={s.slug} value={s.slug}>{s.title}</option>)}
          </select>
        </Field>
        <Field id="dentist" label="Preferred dentist" required error={errors.dentist?.message}>
          <select id="dentist" className="input" {...d("dentist")} {...register("dentist")}>
            <option value="any">No preference</option>
            {dentists.map((x) => <option key={x.slug} value={x.slug}>{x.name} ({x.specialty})</option>)}
          </select>
        </Field>
        <Field id="date" label="Preferred date" required error={errors.date?.message}>
          <input id="date" type="date" min={range.min} max={range.max} className="input" {...d("date")} {...register("date")} />
        </Field>
        <Field id="time" label="Preferred time" required error={errors.time?.message}>
          <select id="time" className="input" {...d("time")} {...register("time")}>
            <option value="">Select a time</option>
            {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </Field>
        <Field id="message" label="Additional message" error={errors.message?.message} hint={`${message.length}/500. Please do not include detailed medical history.`} className="sm:col-span-2">
          <textarea id="message" rows={4} maxLength={500} className="input" {...d("message")} {...register("message")} />
        </Field>
      </div>

      {(status === "error" || status === "unavailable") && (
        <div role="alert" className="mt-6 flex gap-3 rounded-xl bg-red-50 p-4 text-sm text-red-800">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
          <p>{serverMsg}</p>
        </div>
      )}

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <button type="submit" disabled={isSubmitting || status === "sending"} className={btn("primary")}>
          {status === "sending" ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> : <Send className="h-5 w-5" aria-hidden />}
          {status === "sending" ? "Sending…" : "Submit enquiry"}
        </button>
        <a href={waHref} onClick={onWhatsAppClick} target="_blank" rel="noopener noreferrer" className={btn("whatsapp")}>
          <MessageCircle className="h-5 w-5" aria-hidden /> Continue on WhatsApp
        </a>
      </div>
      <p className="mt-4 text-sm text-ash-500">Submitting sends an enquiry to the clinic, which will contact you to confirm a time. Nothing here is a confirmed booking.{!site.whatsapp && site.demo ? " Demo: no clinic WhatsApp number is configured, so WhatsApp will ask you to choose a contact." : ""}</p>
    </form>
  );
}
