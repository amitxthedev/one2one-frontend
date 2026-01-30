import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export default function OmegleAlternative() {
  return (
    <>
      <Helmet>
        <title>Zomegle – Best Omegle Alternative (2026)</title>
        <meta
          name="description"
          content="Zomegle is the best Omegle alternative for random video chat with real people. No signup, no login, instant one-to-one chat."
        />
        <link rel="canonical" href="https://zomagle.in/omegle-alternative" />
      </Helmet>

      <section className="min-h-screen bg-black text-white px-6 pt-32">
        <div className="max-w-4xl mx-auto space-y-6">

          <h1 className="text-4xl md:text-5xl font-bold text-pink-500">
            Best Omegle Alternative – Zomegle
          </h1>

          <p className="text-gray-300">
            Zomegle is a modern Omegle alternative that lets you talk to
            strangers online using random video chat. Unlike Omegle,
            Zomegle is fast, secure, and works instantly without login.
          </p>

          <p className="text-gray-300">
            With Zomegle, you can connect one-to-one with real people
            around the world. Our platform is designed for privacy,
            speed, and smooth performance on mobile and desktop.
          </p>

          <p className="text-gray-300">
            If you are looking for an Omegle alternative in 2026,
            Zomegle offers anonymous video chat, real-time matching,
            and no account requirements.
          </p>

          <div className="pt-6">
            <Link
              to="/chat"
              className="inline-block px-8 py-4 rounded-full bg-pink-600
                         hover:bg-pink-700 transition font-semibold"
            >
              Start Video Chat Now
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}
