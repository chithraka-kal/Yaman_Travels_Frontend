import logo from "../assets/logo.png";
import user from "../assets/user.jpg";

function Navbar() {
  return (
    <nav className="bg-white">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        
        {/* Left side: logo + nav */}
        <div className="flex items-center space-x-8">
          <a href="https://flowbite.com/" className="flex items-center space-x-3">
            <img src={logo} alt="Logo" className="h-32 w-32" />
          </a>

          <ul className="hidden md:flex space-x-8 font-medium">
            <li><a href="#" className="text-blue-700">Home</a></li>
            <li><a href="#" className="text-gray-900 hover:text-blue-700">About</a></li>
            <li><a href="#" className="text-gray-900 hover:text-blue-700">Services</a></li>
            <li><a href="#" className="text-gray-900 hover:text-blue-700">Pricing</a></li>
            <li><a href="#" className="text-gray-900 hover:text-blue-700">Contact</a></li>
          </ul>
        </div>


        {/* Right side: user profile */}
        <div className="flex items-center space-x-3">
          <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300">
            <span className="sr-only">Open user menu</span>
            <img className="w-8 h-8 rounded-full" src={user} alt="user" />
          </button>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
