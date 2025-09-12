"use client";

import { useMemo, useState } from "react";
import { WEB3FORMS_CONFIG } from "../config/web3forms";

type ContactFormProps = {
  toEmail: string;
};

export default function ContactForm({ toEmail }: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "copied">("idle");

  const isValid = useMemo(() => {
    const hasName = name.trim().length > 1;
    const hasMessage = message.trim().length > 5;
    const emailOk = /.+@.+\..+/.test(email);
    return hasName && hasMessage && emailOk;
  }, [name, email, message]);

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    return `mailto:${toEmail}?subject=${subject}&body=${body}`;
  }, [toEmail, name, email, message]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setStatus("sending");

    try {
      // Use Web3Forms for direct email sending with modern HTML template
      const currentDate = new Date();
      const formData = {
        name: name,
        email: email,
        message: message,
        date: currentDate.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        time: currentDate.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        website: "Portfolio Website",
        _subject: `📧 New Portfolio Contact from ${name}`,
        _replyto: email,
        _captcha: "false", // Disable captcha for better UX
        _template: "table", // Use table template for better formatting
        _next: "https://your-portfolio-domain.com/thank-you", // Optional: redirect after success
      };

      console.log("Sending email via Web3Forms:", formData);

      const response = await fetch(WEB3FORMS_CONFIG.apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...formData,
          access_key: WEB3FORMS_CONFIG.accessKey,
        }),
      });

      const result = await response.json();

      if (result.success) {
        console.log("Email sent successfully:", result);

        // Clear the form after successful send
        setName("");
        setEmail("");
        setMessage("");

        // Show success message
        alert("✅ Message sent successfully! I&apos;ll get back to you soon.");

        // Reset status
        setStatus("idle");
      } else {
        throw new Error(result.message || "Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setStatus("idle");
      alert(
        "❌ Failed to send message. Please try again or contact me directly at " +
          toEmail
      );
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(toEmail);
    setStatus("copied");
    setTimeout(() => setStatus("idle"), 2000);
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <label htmlFor="name" className="text-xs sm:text-sm text-foreground/80">
          Name
        </label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="h-10 sm:h-11 px-3 rounded-md border border-foreground/15 bg-background/60 backdrop-blur outline-none focus:ring-2 focus:ring-foreground/20 text-sm sm:text-base"
          required
        />
      </div>
      <div className="grid gap-2">
        <label
          htmlFor="email"
          className="text-xs sm:text-sm text-foreground/80"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="h-10 sm:h-11 px-3 rounded-md border border-foreground/15 bg-background/60 backdrop-blur outline-none focus:ring-2 focus:ring-foreground/20 text-sm sm:text-base"
          required
        />
      </div>
      <div className="grid gap-2">
        <label
          htmlFor="message"
          className="text-xs sm:text-sm text-foreground/80"
        >
          Message
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell me about your project..."
          rows={5}
          className="px-3 py-3 rounded-md border border-foreground/15 bg-background/60 backdrop-blur outline-none focus:ring-2 focus:ring-foreground/20 resize-y text-sm sm:text-base"
          required
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
        <button
          type="submit"
          disabled={!isValid || status === "sending"}
          className="group h-10 sm:h-11 px-4 sm:px-6 inline-flex items-center justify-center rounded-full relative overflow-hidden text-xs sm:text-sm font-medium disabled:opacity-60 hover:scale-105 transition-all duration-200 cursor-pointer disabled:cursor-not-allowed"
        >
          <span
            className={`absolute inset-0 transition-opacity duration-200 ${
              !isValid || status === "sending"
                ? "bg-gray-400 opacity-90"
                : "bg-[linear-gradient(135deg,rgba(120,119,198,0.9),rgba(120,119,198,0.3))] opacity-90 group-hover:opacity-100"
            }`}
          />
          <span className="relative text-background flex items-center gap-2">
            {status === "sending" && (
              <svg
                className="w-4 h-4 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            )}
            {status === "sending" ? "Opening email..." : "Send Message"}
          </span>
        </button>
        <button
          type="button"
          onClick={copyEmail}
          className="h-10 sm:h-11 px-4 sm:px-6 inline-flex items-center justify-center rounded-full border border-foreground/20 text-xs sm:text-sm font-medium hover:bg-foreground/5 transition-all duration-200 hover:scale-105"
        >
          {status === "copied" ? "✓ Copied!" : "Copy Email"}
        </button>
        <a
          href={mailtoHref}
          className="h-10 sm:h-11 px-4 sm:px-6 inline-flex items-center justify-center rounded-full border border-foreground/20 text-xs sm:text-sm font-medium hover:bg-foreground/5 transition-all duration-200 hover:scale-105"
        >
          Direct Email
        </a>
      </div>
    </form>
  );
}
