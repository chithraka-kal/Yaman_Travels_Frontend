import logo from "../assets/logo.png";

function Footer() {
  return (
    <div className="bg-gray-100">
      <div className="px-4 pt-16 pb-10 mx-auto max-w-[1300px] md:px-8">
        <div className="grid gap-16 row-gap-10 mb-8 lg:grid-cols-6">
          {/* Left Section */}
          <div className="md:max-w-md lg:col-span-2">
            <a href="/" aria-label="Go home" title="Company" className="inline-flex items-center">
              {/* Replace this SVG with <img src={logo} alt="logo" className="w-8" /> if you want your logo */}
              <svg className="w-8 text-deep-purple-accent-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="1" width="7" height="12"></rect>
                <rect x="3" y="17" width="7" height="6"></rect>
                <rect x="14" y="1" width="7" height="6"></rect>
                <rect x="14" y="11" width="7" height="12"></rect>
              </svg>
              <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">Company</span>
            </a>
            <div className="mt-4 lg:max-w-sm text-sm text-gray-800 space-y-4">
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
              </p>
              <p>
                Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>
            </div>
          </div>

          {/* Right Grid Links */}
          <div className="grid grid-cols-2 gap-5 row-gap-8 lg:col-span-4 md:grid-cols-4">
            {[
              ['Category', ['News', 'World', 'Games', 'References']],
              ['Business', ['Web', 'eCommerce', 'Business', 'Entertainment', 'Portfolio']],
              ['Apples', ['Media', 'Brochure', 'Nonprofit', 'Educational', 'Projects']],
              ['Cherry', ['Infopreneur', 'Personal', 'Wiki', 'Forum']],
            ].map(([title, links]) => (
              <div key={title}>
                <p className="font-semibold tracking-wide text-gray-800">{title}</p>
                <ul className="mt-2 space-y-2">
                  {links.map((text) => (
                    <li key={text}>
                      <a href="/" className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400">
                        {text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col justify-between border-t pt-5 sm:flex-row">
          <p className="text-sm text-gray-600">© Copyright 2020 Lorem Inc. All rights reserved.</p>
          <div className="flex items-center mt-4 space-x-4 sm:mt-0">
            {/* Social Icons */}
            {[
              'M24,4.6c-0.9,...Z',
              'M19.999,3h-10C6.14,...z',
              'M22,0H2C0.895,...z',
            ].map((d, i) => (
              <a key={i} href="/" className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                  <path d={d}></path>
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
