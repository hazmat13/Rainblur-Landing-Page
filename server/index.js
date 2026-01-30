<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Lustra — Performance Tools</title>
    <meta name="description" content="Lustra — Secure, reliable game tools and utilities" />

    <!-- Tailwind CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;800&display=swap" rel="stylesheet">

    <style>
      :root {
        --accent-from: #6366f1; /* indigo-500 */
        --accent-to:   #ec4899; /* pink-500 */
      }
      html, body { font-family: "Poppins", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; }
      .glass { background: rgba(255,255,255,0.03); backdrop-filter: blur(8px); }
      .hover-elevate { transition: transform .18s ease, box-shadow .18s ease; }
      .hover-elevate:hover { transform: translateY(-6px); box-shadow: 0 12px 30px rgba(2,6,23,0.45); }
      /* small skeleton shimmer */
      .skeleton { background: linear-gradient(90deg, rgba(255,255,255,0.03), rgba(255,255,255,0.06), rgba(255,255,255,0.03)); background-size: 200% 100%; animation: shimmer 1.4s linear infinite;}
      @keyframes shimmer { from { background-position: 200% 0 } to { background-position: -200% 0 } }
    </style>
  </head>

  <body class="bg-slate-900 text-slate-100 antialiased">
    <!-- Top nav -->
    <header class="backdrop-blur-md bg-black/40 border-b border-slate-800 sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="index.html" class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-gradient-to-r from-[var(--accent-from)] to-[var(--accent-to)] flex items-center justify-center text-white font-bold">L</div>
          <div>
            <div class="text-lg font-extrabold leading-none">Lustra</div>
            <div class="text-xs text-slate-400 -mt-0.5">Performance Tools</div>
          </div>
        </a>

        <nav class="hidden md:flex items-center gap-6 text-sm">
          <a href="#features" class="hover:text-white text-slate-300">Features</a>
          <a href="#shop" class="hover:text-white text-slate-300">Shop</a>
          <a href="#pricing" class="hover:text-white text-slate-300">Pricing</a>
          <a href="#support" class="hover:text-white text-slate-300">Support</a>
        </nav>

        <div class="flex items-center gap-3">
          <div id="user-area" class="hidden items-center gap-3">
            <span id="user-email" class="text-sm text-slate-200"></span>
            <button id="logout-btn" class="px-3 py-2 rounded-md bg-slate-800 hover:bg-slate-700 text-sm">Logout</button>
          </div>

          <div id="auth-links" class="flex items-center gap-3">
            <a href="login.html" class="text-sm px-3 py-2 rounded-md hover:bg-white/5">Sign in</a>
            <a href="signup.html" class="text-sm px-4 py-2 rounded-md bg-gradient-to-r from-[var(--accent-from)] to-[var(--accent-to)] text-white font-semibold shadow">Get started</a>
          </div>

          <!-- mobile menu toggle -->
          <button id="mobile-toggle" class="md:hidden p-2 rounded-md text-slate-300 hover:bg-white/5" aria-label="Open menu">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16"/></svg>
          </button>
        </div>
      </div>

      <!-- Mobile nav -->
      <div id="mobile-nav" class="md:hidden hidden border-t border-slate-800 bg-black/60">
        <div class="px-6 py-4 flex flex-col gap-3">
          <a href="#features" class="text-slate-300">Features</a>
          <a href="#shop" class="text-slate-300">Shop</a>
          <a href="#pricing" class="text-slate-300">Pricing</a>
          <a href="#support" class="text-slate-300">Support</a>
        </div>
      </div>
    </header>

    <!-- Hero -->
    <main class="max-w-7xl mx-auto px-6 py-12">
      <section class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div class="space-y-6">
          <h1 class="text-4xl md:text-5xl font-extrabold leading-tight">
            Sharpen your edge.
            <span class="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-from)] to-[var(--accent-to)]">Precision tools for serious players</span>
          </h1>

          <p class="text-slate-300 max-w-xl">Lustra provides secure, lightweight tools with clean UX, instant delivery, and frequent updates. Built for performance and clarity.</p>

          <div class="flex flex-wrap gap-3">
            <a href="#shop" class="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-gradient-to-r from-[var(--accent-from)] to-[var(--accent-to)] text-white font-semibold hover:scale-105 transition">Browse tools</a>
            <a href="#pricing" class="inline-flex items-center gap-2 px-4 py-3 rounded-md border border-slate-700 text-slate-200 hover:bg-white/5">See pricing</a>
            <a href="#support" class="inline-flex items-center gap-2 px-4 py-3 rounded-md border border-slate-700 text-slate-200">Support</a>
          </div>

          <div class="mt-6 grid grid-cols-3 gap-4 text-sm text-slate-300">
            <div>
              <div class="font-semibold text-white">Secure</div>
              <div class="text-slate-400">Frequent updates</div>
            </div>
            <div>
              <div class="font-semibold text-white">Fast</div>
              <div class="text-slate-400">Minimal footprint</div>
            </div>
            <div>
              <div class="font-semibold text-white">Reliable</div>
              <div class="text-slate-400">24/7 support</div>
            </div>
          </div>
        </div>

        <div class="order-first lg:order-last flex items-center justify-center">
          <div class="glass rounded-3xl p-6 w-full max-w-md hover-elevate">
            <div class="rounded-xl overflow-hidden">
              <div class="bg-gradient-to-tr from-[var(--accent-from)] to-[var(--accent-to)] p-6">
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="text-white text-xl font-semibold">Apex Predator</h3>
                    <p class="text-slate-200 text-sm">Performance-focused toolkit</p>
                  </div>
                  <div class="text-right">
                    <div class="text-white text-2xl font-extrabold">$49</div>
                    <div class="text-sm text-green-300">/month</div>
                  </div>
                </div>
              </div>

              <div class="p-4 bg-slate-900">
                <ul class="grid gap-2 text-sm text-slate-300">
                  <li class="flex items-center gap-2"><svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>Humanized smoothing</li>
                  <li class="flex items-center gap-2"><svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>Low latency</li>
                  <li class="flex items-center gap-2"><svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>Automatic updates</li>
                </ul>

                <div class="mt-4 flex gap-3">
                  <a class="flex-1 inline-flex justify-center items-center px-4 py-2 bg-white text-black rounded-md font-semibold" href="#shop">Get access</a>
                  <a class="px-4 py-2 border border-slate-700 rounded-md text-slate-300">Demo</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features -->
      <section id="features" class="mt-14">
        <h2 class="text-2xl font-bold">Why players choose Lustra</h2>
        <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="p-6 bg-slate-800 rounded-xl hover-elevate">
            <div class="flex items-center gap-4">
              <div class="p-3 rounded-md bg-gradient-to-r from-[var(--accent-from)] to-[var(--accent-to)] text-white">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 1.567-3 3.5S10.343 15 12 15s3-1.567 3-3.5S13.657 8 12 8zM12 3v1"/></svg>
              </div>
              <div>
                <h4 class="font-semibold">Trusted updates</h4>
                <p class="text-sm text-slate-400">Rapid security fixes and small releases.</p>
              </div>
            </div>
          </div>

          <div class="p-6 bg-slate-800 rounded-xl hover-elevate">
            <div class="flex items-center gap-4">
              <div class="p-3 rounded-md bg-gradient-to-r from-[var(--accent-from)] to-[var(--accent-to)] text-white">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7h18M3 12h18M3 17h18"/></svg>
              </div>
              <div>
                <h4 class="font-semibold">Lightweight</h4>
                <p class="text-sm text-slate-400">Optimized for performance and compatibility.</p>
              </div>
            </div>
          </div>

          <div class="p-6 bg-slate-800 rounded-xl hover-elevate">
            <div class="flex items-center gap-4">
              <div class="p-3 rounded-md bg-gradient-to-r from-[var(--accent-from)] to-[var(--accent-to)] text-white">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2v4M12 18v4M4 12h4M16 12h4M5 5l3 3M16 16l3 3M5 19l3-3M16 8l3-3"/></svg>
              </div>
              <div>
                <h4 class="font-semibold">24/7 Support</h4>
                <p class="text-sm text-slate-400">Dedicated support and docs for every release.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Shop -->
      <section id="shop" class="mt-14">
        <div class="flex items-center justify-between">
          <h3 class="text-xl font-bold">Featured tools</h3>
          <a href="#collections" class="text-sm text-slate-300 hover:text-white">View all</a>
        </div>

        <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Card -->
          <article class="bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl p-5 hover-elevate">
            <div class="rounded-xl overflow-hidden">
              <div class="h-44 bg-slate-700 skeleton flex items-center justify-center text-slate-400">Image</div>
              <div class="p-4">
                <h4 class="font-semibold">Valorant Aimbot</h4>
                <p class="text-sm text-slate-400 mt-1">Humanized smoothing and visibility checks.</p>
                <div class="mt-4 flex items-center justify-between">
                  <div class="text-white font-bold">$35</div>
                  <button class="px-3 py-2 rounded-md bg-gradient-to-r from-[var(--accent-from)] to-[var(--accent-to)] text-white">Buy</button>
                </div>
              </div>
            </div>
          </article>

          <article class="bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl p-5 hover-elevate">
            <div class="rounded-xl overflow-hidden">
              <div class="h-44 bg-slate-700 skeleton flex items-center justify-center text-slate-400">Image</div>
              <div class="p-4">
                <h4 class="font-semibold">COD: Warzone ESP</h4>
                <p class="text-sm text-slate-400 mt-1">Full map awareness & loot ESP.</p>
                <div class="mt-4 flex items-center justify-between">
                  <div class="text-white font-bold">$29</div>
                  <button class="px-3 py-2 rounded-md bg-gradient-to-r from-[var(--accent-from)] to-[var(--accent-to)] text-white">Buy</button>
                </div>
              </div>
            </div>
          </article>

          <article class="bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl p-5 hover-elevate">
            <div class="rounded-xl overflow-hidden">
              <div class="h-44 bg-slate-700 skeleton flex items-center justify-center text-slate-400">Image</div>
              <div class="p-4">
                <h4 class="font-semibold">CS2 Multi-Hack</h4>
                <p class="text-sm text-slate-400 mt-1">Bhop, Triggerbot, and Wallhack.</p>
                <div class="mt-4 flex items-center justify-between">
                  <div class="text-white font-bold">$20</div>
                  <button class="px-3 py-2 rounded-md bg-gradient-to-r from-[var(--accent-from)] to-[var(--accent-to)] text-white">Buy</button>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- Pricing -->
      <section id="pricing" class="mt-14">
        <h3 class="text-xl font-bold">Pricing</h3>
        <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="p-6 bg-slate-800 rounded-xl hover-elevate text-center">
            <div class="text-sm text-slate-300">Starter</div>
            <div class="text-3xl font-extrabold mt-3">$9</div>
            <div class="text-sm text-slate-400">per month</div>
            <ul class="mt-4 text-sm text-slate-300 space-y-2">
              <li>Basic tools</li>
              <li>Community support</li>
            </ul>
            <button class="mt-6 w-full py-2 rounded-md bg-white text-black font-semibold">Get started</button>
          </div>

          <div class="p-6 bg-gradient-to-r from-[var(--accent-from)] to-[var(--accent-to)] rounded-xl text-white hover-elevate text-center">
            <div class="text-sm/strong">Pro</div>
            <div class="text-3xl font-extrabold mt-3">$29</div>
            <div class="text-sm">per month</div>
            <ul class="mt-4 text-sm space-y-2">
              <li>All tools</li>
              <li>Priority support</li>
            </ul>
            <button class="mt-6 w-full py-2 rounded-md bg-white/20 text-white font-semibold border border-white/20">Choose Pro</button>
          </div>

          <div class="p-6 bg-slate-800 rounded-xl hover-elevate text-center">
            <div class="text-sm text-slate-300">Enterprise</div>
            <div class="text-3xl font-extrabold mt-3">$79</div>
            <div class="text-sm text-slate-400">per month</div>
            <ul class="mt-4 text-sm text-slate-300 space-y-2">
              <li>Team seats</li>
              <li>Dedicated support</li>
            </ul>
            <button class="mt-6 w-full py-2 rounded-md bg-white text-black font-semibold">Contact Sales</button>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="mt-16 pb-12">
        <div class="bg-slate-900/60 rounded-xl p-8 mt-8 flex flex-col md:flex-row items-center justify-between border-t border-slate-800">
          <div>
            <h4 class="text-lg font-bold">Stay in the loop</h4>
            <p class="text-slate-400 text-sm">Subscribe for updates and releases.</p>
          </div>

          <form class="mt-4 md:mt-0 w-full md:w-1/2 flex" onsubmit="event.preventDefault(); toast('Thanks — you\'re subscribed!')">
            <input type="email" required placeholder="Your email" class="w-full rounded-l-md bg-slate-800 border border-slate-700 text-slate-200 px-4 py-3 focus:outline-none" />
            <button type="submit" class="px-5 py-3 bg-gradient-to-r from-[var(--accent-from)] to-[var(--accent-to)] text-white font-semibold rounded-r-md">Join</button>
          </form>
        </div>

        <div class="mt-6 text-center text-slate-500 text-sm">
          © <span id="year"></span> Lustra. All rights reserved.
        </div>
      </footer>
    </main>

    <!-- Toast container -->
    <div id="toast" class="fixed right-6 bottom-6 z-50 hidden">
      <div class="bg-slate-800 text-white px-4 py-2 rounded shadow">Message</div>
    </div>

    <script src="auth.js"></script>
    <script>
      // Small UI bits
      document.getElementById('year').textContent = new Date().getFullYear();

      // Mobile toggle
      const mobileToggle = document.getElementById('mobile-toggle');
      const mobileNav = document.getElementById('mobile-nav');
      mobileToggle?.addEventListener('click', () => mobileNav.classList.toggle('hidden'));

      // Logout button
      document.getElementById('logout-btn')?.addEventListener('click', () => authSignOut());

      // Toast helper exposed to pages
      function toast(msg, ms = 3000) {
        const el = document.getElementById('toast');
        if (!el) return;
        el.querySelector('div').textContent = msg;
        el.classList.remove('hidden');
        el.classList.add('opacity-100');
        setTimeout(() => el.classList.add('hidden'), ms);
      }

      // Show auth state when auth.js initializes (authOnStateChanged handles UI)
      authOnStateChanged(user => {
        // no-op; toggleAuthUI from auth.js will show/hide user area
      });
    </script>
  </body>
</html>
