"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "United Kingdom",
    image: "/user.jpg", // Using your existing user placeholder
    text: "The trip to Sigiriya was absolutely magical! Yaman Travels took care of everything, from the comfortable van to the amazing guide. Highly recommended!",
    stars: 5,
  },
  {
    name: "David Chen",
    location: "Singapore",
    image: "/user.jpg",
    text: "I was worried about traveling solo, but the team made me feel so safe. The 'Hidden Gems' package was perfect for seeing the real Sri Lanka.",
    stars: 5,
  },
  {
    name: "Emily & Mark",
    location: "Australia",
    image: "/user.jpg",
    text: "Best price we found online, but the service was luxury level. The safari in Yala was the highlight of our year. Thank you Yaman!",
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-orange-500 font-semibold tracking-wide uppercase text-sm">
            Happy Travelers
          </p>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mt-2">
            What Our Clients Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative"
            >
              {/* Quote Icon Background */}
              <div className="absolute top-4 right-6 text-gray-100">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
                </svg>
              </div>

              {/* Stars */}
              <div className="flex mb-4">
                {[...Array(review.stars)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-gray-600 mb-6 italic relative z-10">
                "{review.text}"
              </p>

              <div className="flex items-center">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{review.name}</h4>
                  <p className="text-gray-500 text-xs">{review.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}