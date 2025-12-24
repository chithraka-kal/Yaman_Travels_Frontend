"use client";

import { motion } from "framer-motion";

export default function Newsletter() {
  return (
    <section className="relative py-20 overflow-hidden bg-gray-900 isolation-auto">
      {/* Background decoration (optional) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
         <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-orange-500 blur-3xl"></div>
         <div className="absolute top-1/2 right-0 w-64 h-64 rounded-full bg-blue-500 blur-3xl"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Get Travel Secrets & Exclusive Deals
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            Join 10,000+ travelers. We send you the best routes, hidden gems, and discount codes once a week. No spam, just adventure.
          </p>

          <form className="mx-auto mt-8 max-w-xl flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="flex-1 rounded-lg border-0 bg-white/10 px-5 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 outline-none backdrop-blur-sm"
            />
            <button
              type="submit"
              className="rounded-lg bg-orange-500 px-8 py-3 text-base font-semibold text-white shadow-lg hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 transition-all transform hover:scale-105"
            >
              Subscribe
            </button>
          </form>
          
          <p className="mt-4 text-sm text-gray-500">
            We care about your data in our <a href="#" className="text-orange-400 hover:text-orange-300 underline">privacy policy</a>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}