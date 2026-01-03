import { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  FiUser,
  FiMail,
  FiMessageSquare,
  FiSend,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      await emailjs.send(
        "service_0b3btaq",       // your service id
        "template_am0d9ym",      // your template id
        {
          name: form.name,
          email: form.email,
          message: form.message,
        },
        "yMyr28wpaE5fb8i-f"      // your public key
      );

      setSuccess("Message sent successfully. We'll contact you soon.");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-28 flex items-center justify-center overflow-hidden">
      {/* BACKGROUND GLOW */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px]
                      bg-pink-600/20 blur-[160px] rounded-full" />
      <div className="absolute bottom-0 -left-40 w-[400px] h-[400px]
                      bg-purple-600/20 blur-[160px] rounded-full" />

      <div className="relative w-full max-w-6xl grid md:grid-cols-2 gap-14 items-center">
        {/* LEFT CONTENT */}
        <div className="animate-fade-up">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Let’s <span className="text-pink-500">Connect</span>
          </h1>

          <p className="text-gray-400 text-lg max-w-md">
            Promote your business, collaborate with us, or ask anything.
            We respond fast and personally.
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="animate-fade-up delay-150
                     bg-white/5 backdrop-blur-xl
                     border border-white/10
                     rounded-3xl p-8 md:p-10 space-y-6 shadow-xl"
        >
          {/* NAME */}
          <Field
            label="Your Name"
            icon={<FiUser />}
            input={
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
              />
            }
          />

          {/* EMAIL */}
          <Field
            label="Email Address"
            icon={<FiMail />}
            input={
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
              />
            }
          />

          {/* MESSAGE */}
          <Field
            label="Message"
            icon={<FiMessageSquare />}
            textarea
            input={
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="4"
                required
                placeholder="Tell us about your business..."
              />
            }
          />

          {/* STATUS */}
          {success && (
            <Status
              icon={<FiCheckCircle />}
              text={success}
              color="text-green-400"
            />
          )}

          {error && (
            <Status
              icon={<FiAlertCircle />}
              text={error}
              color="text-red-400"
            />
          )}

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="group w-full flex items-center justify-center gap-3
                       py-3.5 rounded-full bg-pink-600 font-semibold
                       transition-all duration-300
                       hover:bg-pink-700 hover:scale-[1.02]
                       hover:shadow-[0_0_30px_rgba(236,72,153,0.6)]
                       disabled:opacity-60 disabled:scale-100"
          >
            {loading ? "Sending..." : "Send Message"}
            {!loading && (
              <FiSend className="transition group-hover:translate-x-1" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ================= SUB COMPONENTS ================= */

function Field({ label, icon, input, textarea }) {
  return (
    <div>
      <label className="text-sm text-gray-300">{label}</label>
      <div
        className="mt-2 flex gap-3 items-start
                   bg-black/40 border border-white/10
                   rounded-xl px-4 py-3
                   focus-within:border-pink-500/50
                   transition"
      >
        <span className="text-gray-400 mt-1">{icon}</span>
        {textarea ? (
          <textarea
            className="w-full bg-transparent outline-none resize-none text-sm"
            {...input.props}
          />
        ) : (
          <input
            className="w-full bg-transparent outline-none text-sm"
            {...input.props}
          />
        )}
      </div>
    </div>
  );
}

function Status({ icon, text, color }) {
  return (
    <div className={`flex items-center gap-2 text-sm ${color}`}>
      {icon}
      {text}
    </div>
  );
}
