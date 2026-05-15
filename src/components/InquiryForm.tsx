import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name is too long"),
  email: z.string().trim().email("Enter a valid email").max(160),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9 \-]{7,15}$/u, "Enter a valid phone number"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(800, "Message is too long"),
});

type InquiryValues = z.infer<typeof schema>;

const STORAGE_KEY = "kovai-inquiry-draft";

function loadDraft(): Partial<InquiryValues> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function InquiryForm({ businessName }: { businessName: string }) {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<InquiryValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", message: "", ...loadDraft() },
    mode: "onBlur",
  });

  // Persist draft as the user types (state persistence bonus).
  watch((values) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
    } catch {}
  });

  const onSubmit = async (values: InquiryValues) => {
    await new Promise((r) => setTimeout(r, 700));
    toast.success("Inquiry sent", {
      description: `${businessName} will get back to ${values.name} shortly.`,
    });
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    reset({ name: "", email: "", phone: "", message: "" });
    setSubmitted(true);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
      aria-label={`Send an inquiry to ${businessName}`}
    >
      <div>
        <h3 className="text-lg font-bold">Send an inquiry</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Reach {businessName} directly. We'll never share your details.
        </p>
      </div>

      <Field label="Your name" id="inq-name" error={errors.name?.message}>
        <input
          id="inq-name"
          autoComplete="name"
          aria-invalid={!!errors.name}
          {...register("name")}
          className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Email" id="inq-email" error={errors.email?.message}>
          <input
            id="inq-email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            {...register("email")}
            className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </Field>
        <Field label="Phone" id="inq-phone" error={errors.phone?.message}>
          <input
            id="inq-phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            aria-invalid={!!errors.phone}
            {...register("phone")}
            className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </Field>
      </div>

      <Field label="Message" id="inq-msg" error={errors.message?.message}>
        <textarea
          id="inq-msg"
          rows={4}
          aria-invalid={!!errors.message}
          {...register("message")}
          className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          placeholder="Hi! I'd love to know more about your services…"
        />
      </Field>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-warm)] transition-transform hover:-translate-y-0.5 disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" /> Send Inquiry
          </>
        )}
      </button>

      {submitted && (
        <p role="status" className="text-center text-xs text-primary">
          Thanks — your inquiry was sent successfully.
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-xs text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
