import PageHeader from "../../components/PageHeader";
import { Mail, Phone, User } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="bg-white min-h-screen pb-20">
      <PageHeader 
        title="About Yaman Travels" 
        subtitle="Passionate about exploring the world and sharing our experiences."
        image="/carousel/elephant1.jpg" 
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-16">
        
        {/* Mission Section (Text from old About Us.html) */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Welcome to our travel website! We are passionate about exploring the world and sharing our 
            experiences with fellow travelers. Our mission is to provide you with reliable and valuable 
            information to make your travels unforgettable.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="rounded-2xl overflow-hidden shadow-lg h-80 relative">
             <img 
               src="/carousel/ritipanna2.jpg" 
               alt="Our Team" 
               className="w-full h-full object-cover"
             />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Why We Started</h3>
            <p className="text-gray-600 mb-6">
              With years of travel expertise, our dedicated team curates the best travel guides, packages, 
              and tips to help you plan your dream trip. We believe in responsible travel practices, 
              sustainable tourism, and creating meaningful connections with local communities.
            </p>
            <p className="text-gray-600">
              Whether you're seeking adventure, cultural immersion, or relaxation, we're here to guide 
              you every step of the way.
            </p>
          </div>
        </div>

        {/* Developer Contact Card (From old About Us.html) */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Meet the Developer</h2>
          
          <div className="flex flex-col md:flex-row justify-center gap-8">
            <div className="flex items-center justify-center gap-3 bg-white p-4 rounded-xl shadow-sm min-w-[250px]">
              <User className="w-5 h-5 text-orange-500" />
              <div className="text-left">
                <p className="text-xs text-gray-500 uppercase font-semibold">Name</p>
                <p className="font-medium text-gray-900">Chithraka Kalanamith</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 bg-white p-4 rounded-xl shadow-sm min-w-[250px]">
              <Mail className="w-5 h-5 text-orange-500" />
              <div className="text-left">
                <p className="text-xs text-gray-500 uppercase font-semibold">Email</p>
                <p className="font-medium text-gray-900">chithrakakalanamith@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 bg-white p-4 rounded-xl shadow-sm min-w-[250px]">
              <Phone className="w-5 h-5 text-orange-500" />
              <div className="text-left">
                <p className="text-xs text-gray-500 uppercase font-semibold">Phone</p>
                <p className="font-medium text-gray-900">+94 77-312-6764</p>
              </div>
            </div>
          </div>
          
          <p className="mt-8 text-sm text-gray-500">
            "We aim to empower users with tools that enhance productivity and foster creativity."
          </p>
        </div>

      </div>
    </div>
  );
}