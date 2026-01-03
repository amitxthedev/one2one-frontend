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
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await emailjs.send(
        "service_0b3btaq",      // 🔁 replace with yours
        "template_am0d9ym",     // 🔁 replace with yours
        {
          name: form.name,
          email: form.email,
          message: form.message,
        },
        "yMyr28wpaE5fb8i-f"      // 🔁 replace with yours
      );

      setSuccess("Message sent successfully. We’ll contact you soon!");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-24">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div className="text-center md:text-left animate-fade-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Let’s <span className="text-pink-500">Connect</span>
          </h1>

          <p className="text-gray-400 text-lg max-w-md mx-auto md:mx-0">
            Promote your business, collaborate with us, or ask anything.
            We respond fast and personally.
          </p>
        </div>

        {/* FORM CARD */}
        <div className="relative animate-fade-up delay-150">
          {/* glow */}
          <div className="absolute inset-0 bg-pink-500/10 blur-2xl rounded-3xl" />

          <form
            onSubmit={handleSubmit}
            className="relative w-full bg-white/5 backdrop-blur-xl
                       border border-white/10 rounded-3xl
                       p-6 sm:p-8 space-y-6"
          >
            {/* NAME */}
            <InputField
              label="Your Name"
              icon={<FiUser />}
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
            />

            {/* EMAIL */}
            <InputField
              label="Email Address"
              icon={<FiMail />}
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />

            {/* MESSAGE */}
            <TextAreaField
              label="Message"
              icon={<FiMessageSquare />}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us about your business…"
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

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2
                         py-3 rounded-full bg-pink-600
                         hover:bg-pink-700 transition
                         font-semibold
                         disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Message"}
              {!loading && <FiSend />}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ================= COMPONENTS ================= */

function InputField({ label, icon, ...props }) {
  return (
    <div>
      <label className="text-sm text-gray-300">{label}</label>
      <div className="flex items-center gap-3 mt-2
                      bg-black/40 border border-white/10
                      rounded-lg px-4">
        {icon}
        <input
          {...props}
          required
          className="w-full bg-transparent py-3 outline-none text-sm"
        />
      </div>
    </div>
  );
}

function TextAreaField({ label, icon, ...props }) {
  return (
    <div>
      <label className="text-sm text-gray-300">{label}</label>
      <div className="flex gap-3 mt-2 bg-black/40
                      border border-white/10
                      rounded-lg px-4 py-3">
        {icon}
        <textarea
          {...props}
          rows="4"
          required
          className="w-full bg-transparent outline-none text-sm resize-none"
        />
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
