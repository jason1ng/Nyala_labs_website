import Link from "next/link";

export default function SunFestPage() {
  return (
    <main className="min-h-screen bg-nyala-black pt-24 pb-16 text-nyala-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8 border border-nyala-gray-light bg-nyala-gray p-6 md:p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-nyala-red">
            ~/nyala/events / sunfest
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-nyala-gray-muted">
            <span className="inline-flex items-center gap-2 rounded-none border border-nyala-red/20 bg-nyala-black px-3 py-1 text-nyala-red">
              <span>🌻</span>
              Harvest Market
            </span>
            <span className="inline-flex items-center gap-2 rounded-none border border-nyala-yellow/20 bg-nyala-black px-3 py-1 text-nyala-yellow">
              <span>🔥</span>
              Festival Energy
            </span>
            <span className="inline-flex items-center gap-2 rounded-none border border-white/10 bg-nyala-black px-3 py-1 text-white">
              <span>✨</span>
              Nyala x SunFest
            </span>
          </div>

          <h1 className="mt-4 font-mono text-3xl font-bold tracking-tight text-nyala-yellow md:text-4xl">
            SunFest 2026: Harvest of Wonders
          </h1>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_0.85fr]">
            <div className="rounded-none border border-nyala-gray-light bg-nyala-black/60 p-6">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-nyala-red">
                Event Summary
              </p>
              <p className="mt-4 max-w-3xl font-mono text-sm leading-7 text-nyala-gray-muted">
                Nyala Labs is proudly collaborating with SunFest 2026 across Sunway College and Sunway University from July 7 to July 10. Our booth brings a harvest-style festival activation full of games, community meetups, and QR-powered engagement.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="rounded-none border border-nyala-gray-light bg-nyala-gray p-5">
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-nyala-red">
                  Booth Details
                </p>
                <div className="mt-4 space-y-3 font-mono text-sm text-nyala-gray-muted">
                  <p><span className="text-nyala-white">Dates:</span> July 7 - 10, 2026</p>
                  <p><span className="text-nyala-white">Opening ceremony:</span> July 8, 11:00 AM - 12:30 PM</p>
                  <p><span className="text-nyala-white">Location:</span> Sunway College & Sunway University</p>
                </div>
              </div>
              <div className="rounded-none border border-nyala-gray-light bg-nyala-black/60 p-5">
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-nyala-red">
                  Key Info
                </p>
                <div className="mt-4 space-y-3 font-mono text-sm text-nyala-gray-muted">
                  <p><span className="text-nyala-white">Time:</span> 10:00 AM – 4:00 PM (Jul 7–9)</p>
                  <p><span className="text-nyala-white">Finale:</span> 10:00 AM – 9:00 PM (Jul 10)</p>
                  <p><span className="text-nyala-white">Booth:</span> Nyala Labs interactive activation</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.9fr]">
          <div className="rounded-none border border-nyala-gray-light bg-nyala-gray p-6">
            <h2 className="font-mono text-xl font-semibold text-nyala-yellow">
              What to Expect
            </h2>
            <ul className="mt-4 space-y-2 font-mono text-sm text-nyala-gray-muted">
              <li>• Booth setup with roll-up banner and printed sheets</li>
              <li>• Mobile QR participation for visitors</li>
              <li>• Friendly community engagement throughout the event</li>
              <li>• A chance to learn more about Nyala Labs and our initiatives</li>
            </ul>
          </div>

          <div className="rounded-none border border-nyala-gray-light bg-nyala-gray p-6">
            <h2 className="font-mono text-xl font-semibold text-nyala-yellow">
              SunFest Preview
            </h2>
            <p className="mt-4 font-mono text-sm leading-7 text-nyala-gray-muted">
              SunFest is a campus-wide celebration across Sunway College and Sunway University, blending performances, booths, and community activities into a harvest-themed festival.
            </p>
            <a
              href="https://www.instagram.com/p/DYmLg0ukU7c/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-none border border-nyala-red bg-nyala-red px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white transition-all duration-300 hover:bg-nyala-red-dark"
            >
              View SunFest Instagram
            </a>
          </div>
        </section>

        <div className="mt-8">
          <Link
            href="/activities"
            className="inline-block rounded-none border border-nyala-red bg-nyala-red px-5 py-3 font-mono text-xs uppercase tracking-[0.25em] text-white transition-all duration-300 hover:bg-nyala-red-dark"
          >
            Back to Activities
          </Link>
        </div>
      </div>
    </main>
  );
}
