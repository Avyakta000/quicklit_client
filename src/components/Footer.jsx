import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="sticky b-0 bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-around items-center">
          
          {/* Left Section: Brand */}
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h2 className="text-3xl font-bold">QuickLit</h2>
            <p className="mt-2 text-gray-400">
              Quick and reliable content at your fingertips.
            </p>
          </div>

          {/* Right Section: Social Media */}
          <div className="text-center md:text-right">
            <h3 className="text-md font-semibold text-center">Follow Us</h3>
            <div className="mt-2 flex justify-center md:justify-end space-x-6">
              <a href="https://facebook.com" className="text-gray-400 hover:text-white">
                <FaFacebookF size={24} />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-white">
                <FaTwitter size={24} />
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-white">
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-500">
          <p>&copy; 2024 QuickLit. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
