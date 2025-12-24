import PageHeader from "../../components/PageHeader";

export default function ContactUs() {
  return (
    <div className="bg-white min-h-screen pb-20">
      <PageHeader 
        title="Contact Us" 
        subtitle="We'd love to hear from you. Send us a message today!"
        image="/carousel/elephant1.jpg" 
      />
      
      <div className="max-w-3xl mx-auto px-4 mt-16">
        <form className="bg-gray-50 p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <label className="block text-gray-700 font-bold mb-2">Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Your Name" />
                </div>
                <div>
                    <label className="block text-gray-700 font-bold mb-2">Email</label>
                    <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Your Email" />
                </div>
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-2">Message</label>
                <textarea className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 outline-none h-32" placeholder="How can we help you?"></textarea>
            </div>
            <button className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition-colors">
                Send Message
            </button>
        </form>
      </div>
    </div>
  );
}