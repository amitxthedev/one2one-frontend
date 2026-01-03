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
        "service_0b3btaq",      // 🔴 replace
        "template_am0d9ym",     // 🔴 replace
        {
          name: form.name,
          email: form.email,
          message: form.message,
        },
        "yMyr28wpaE5fb8i-f"       // 🔴 replace
      );

      setSuccess("Message sent successfully. We’ll contact you soon.");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-14">

        {/* LEFT INFO */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">
            Contact <span className="text-pink-500">Us</span>
          </h1>

          <p className="text-gray-400 mb-8">
            Want to promote your business or collaborate with us?
            Send a message and we’ll reach you directly.
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/5 border border-white/10 rounded-2xl
                     p-8 space-y-6 backdrop-blur"
        >
          {/* NAME */}
          <div>
            <label className="text-sm text-gray-300">Your Name</label>
            <div className="flex items-center gap-3 mt-2 bg-black/40 border border-white/10 rounded-lg px-4">
              <FiUser />
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full bg-transparent py-3 outline-none text-sm"
              />
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-300">Email</label>
            <div className="flex items-center gap-3 mt-2 bg-black/40 border border-white/10 rounded-lg px-4">
              <FiMail />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent py-3 outline-none text-sm"
              />
            </div>
          </div>

          {/* MESSAGE */}
          <div>
            <label className="text-sm text-gray-300">Message</label>
            <div className="flex gap-3 mt-2 bg-black/40 border border-white/10 rounded-lg px-4 py-3">
              <FiMessageSquare />
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="4"
                required
                className="w-full bg-transparent outline-none text-sm resize-none"
              />
            </div>
          </div>

          {/* STATUS */}
          {success && (
            <div className="flex items-center gap-2 text-green-400 text-sm">
              <FiCheckCircle />
              {success}
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 text-red-400 text-sm">
              <FiAlertCircle />
              {error}
            </div>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2
                       py-3 rounded-full bg-pink-600
                       hover:bg-pink-700 transition
                       disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Message"}
            {!loading && <FiSend />}
          </button>
        </form>
      </div>
    </div>
  );
}
