"use client";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, AlertCircle, Loader2, Send } from "lucide-react";
import { contactSchema, type ContactValues } from "@/lib/validation";
import { formatPkMobile } from "@/lib/utils";
import { track } from "@/lib/analytics";
import { btn } from "@/components/ui/button";
import { Field } from "./Field";

export function ContactForm() {
  const ts = useRef(0);
  const honey = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [serverMsg, setServerMsg] = useState("");
  const { register, handleSubmit, setValue, setError, reset, formState: { errors } } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema), mode: "onTouched", defaultValues: { name: "", mobile: "", email: "", message: "" },
  });
  useEffect(() => { ts.current = Date.now(); }, []);
  const d = (k: keyof ContactValues) => ({ "aria-invalid": errors[k] ? (true as const) : undefined, "aria-describedby": `c-${k}-error` });

  async function onSubmit(values: ContactValues) {
    setStatus("sending"); setServerMsg("");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...values, website: honey.current?.value ?? "", ts: ts.current }) });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) { track("contact_form_submit"); setStatus("sent"); reset(); return; }
      if (res.status === 422 && data.fields) {
        for (const [k, msgs] of Object.entries(data.fields as Record<string, string[]>)) setError(k as keyof ContactValues, { message: msgs[0] });
        setStatus("idle"); return;
      }
      setServerMsg(data.error ?? "Something went wrong."); setStatus("error");
    } catch { setServerMsg("Network error. Please try again or use WhatsApp."); setStatus("error"); }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-xl2 bg-mint-100 p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-teal-600" aria-hidden />
        <h3 className="mt-3 text-xl font-semibold">Message sent</h3>
        <p className="mt-2">Thank you. The clinic will reply using the details you provided.</p>
      </div>
    );
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5 rounded-xl2 border border-ash-200 bg-white p-5 shadow-soft sm:p-8">
      <input ref={honey} type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
      <Field id="c-name" label="Your name" required error={errors.name?.message}>
        <input id="c-name" autoComplete="name" className="input" {...d("name")} {...register("name")} />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="c-mobile" label="Mobile number" error={errors.mobile?.message} hint="Mobile or email is required">
          <input id="c-mobile" type="tel" inputMode="tel" autoComplete="tel" className="input" {...d("mobile")} {...register("mobile", { onBlur: (e) => setValue("mobile", formatPkMobile(e.target.value)) })} />
        </Field>
        <Field id="c-email" label="Email" error={errors.email?.message}>
          <input id="c-email" type="email" autoComplete="email" className="input" {...d("email")} {...register("email")} />
        </Field>
      </div>
      <Field id="c-message" label="Message" required error={errors.message?.message} hint="Please do not include detailed medical history.">
        <textarea id="c-message" rows={5} maxLength={1000} className="input" {...d("message")} {...register("message")} />
      </Field>
      {status === "error" && (
        <div role="alert" className="flex gap-3 rounded-xl bg-red-50 p-4 text-sm text-red-800"><AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden /><p>{serverMsg}</p></div>
      )}
      <button type="submit" disabled={status === "sending"} className={btn("primary")}>
        {status === "sending" ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> : <Send className="h-5 w-5" aria-hidden />}
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
