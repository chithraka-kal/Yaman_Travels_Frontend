import Link from "next/link";

function Footer() {
  return (
    <div className="bg-gray-100 px-4 pt-10">
      <div className="mx-auto max-w-[1300px] md:px-24 lg:px-8">
        <div className="grid gap-16 row-gap-10 mb-8 lg:grid-cols-6">
          <div className="md:max-w-md lg:col-span-2">
            {/* Direct reference to public folder image */}
            <img src="/logo.png" alt="Logo" className="h-24 w-24 bg-gray-300 rounded-full border-gray-500" />
            <div className="mt-4 lg:max-w-sm">
              <p className="text-sm text-gray-800">
                Yaman Travels brings you the best of Sri Lanka...
              </p>
              <p className="mt-4 text-sm text-gray-800">
                Explore unique travel packages...
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 row-gap-8 lg:col-span-4 pt-8 md:grid-cols-4">
            {[
                ["Packages", ["Diving", "Hot Air Balloon", "Surfing", "Camping", "Safari"]],
                ["Destinations", ["Ella", "Nuwara Eliya", "Sigiriya", "Galle", "Jaffna"]],
                ["Services", ["Travel Buses", "Tuk Tuk Rental", "Bicycle Rental", "Tour Guides"]],
                ["Quick Links", ["Home", "Packages", "Destinations", "Contact Us"]],
            ].map(([title, items], i) => (
              <div key={i}>
                <p className="font-semibold tracking-wide text-gray-800">{title}</p>
                <ul className="mt-2 space-y-2">
                  {items.map((text, j) => {
                    let href = "#";
                    if (title === "Quick Links") {
                        if (text === "Home") href = "/";
                        else if (text === "Contact Us") href = "/contact";
                        else href = `/${text.toLowerCase()}`;
                    }
                    return (
                        <li key={j}>
                        <Link href={href} className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400">
                            {text}
                        </Link>
                        </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-400">
          <div className="flex flex-col justify-between pt-5 pb-10 mx-auto max-w-[1300px] sm:flex-row">
            <p className="text-sm text-gray-600">
                © {new Date().getFullYear()} Yaman Travels. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;