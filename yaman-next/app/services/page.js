import PageHeader from "../../components/PageHeader";
import { Bus, Map, Camera, Tent, LifeBuoy, Coffee } from "lucide-react";

const services = [
  {
    id: 1,
    title: "Luxury Transport",
    icon: <Bus className="w-12 h-12 text-orange-500 mb-4" />,
    description: "Travel in comfort with our fleet of air-conditioned vans, cars, and luxury coaches. Airport pickups included.",
  },
  {
    id: 2,
    title: "Expert Tour Guides",
    icon: <Map className="w-12 h-12 text-orange-500 mb-4" />,
    description: "Our government-licensed guides speak multiple languages and know the hidden history of every site.",
  },
  {
    id: 3,
    title: "Photography Services",
    icon: <Camera className="w-12 h-12 text-orange-500 mb-4" />,
    description: "Capture your memories professionally. Hire a travel photographer to document your journey.",
  },
  {
    id: 4,
    title: "Camping Gear Rental",
    icon: <Tent className="w-12 h-12 text-orange-500 mb-4" />,
    description: "Want to camp in Ella? We rent high-quality tents, sleeping bags, and portable stoves.",
  },
  {
    id: 5,
    title: "Surfing Lessons",
    icon: <LifeBuoy className="w-12 h-12 text-orange-500 mb-4" />,
    description: "Beginner-friendly surfing lessons in Weligama and Arugam Bay with certified instructors.",
  },
  {
    id: 6,
    title: "Visa & Ticketing",
    icon: <Coffee className="w-12 h-12 text-orange-500 mb-4" />,
    description: "Relax while we handle your flight bookings, train tickets, and visa extensions.",
  },
];

export default function Services() {
  return (
    <div className="bg-white min-h-screen pb-20">
      <PageHeader 
        title="Our Services" 
        subtitle="Everything you need for a seamless Sri Lankan adventure."
        image="/carousel/train.jpg" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="p-8 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action for Custom Services */}
        <div className="mt-20 bg-orange-500 rounded-3xl p-10 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">Need something special?</h2>
            <p className="mb-8 text-orange-100 max-w-2xl mx-auto">
              We organize honeymoons, corporate retreats, and educational tours. 
              Contact us for a custom package.
            </p>
            <button className="bg-white text-orange-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors">
              Contact Support
            </button>
          </div>
          {/* Decorative Circle */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
}