import Link from "next/link";

export default function Footer() {
  
  const currentYear = new Date().getFullYear();
  return (
    <footer className="sticky b-0 bg-gradient-to-r from-blue-600 to-blue-900 text-white py-10 border-t-2 border-t-gray-400">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-around items-center space-y-8 md:space-y-0">
          
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <div className="flex items-end space-x-1">
              <h1 className="text-3xl font-bold white tracking-tight">Quick</h1>
              <h1 className="text-3xl font-extrabold text-red-500 tracking-tight transform -rotate-12 origin-bottom-left">
                Lit
              </h1>
            </div>
            <p className="mt-3 text-gray-300">
              Quick and reliable content at your fingertips.
            </p>
          </div>

          {/* Links Section */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-10 text-center md:text-right">
            <Link href="/about" className="text-gray-300 hover:text-yellow-400 transition duration-300">
              About Us
            </Link>
            <Link href="/reads" className="text-gray-300 hover:text-yellow-400 transition duration-300">
              Reads
            </Link>
            <Link href="/disclaimer" className="text-gray-300 hover:text-yellow-400 transition duration-300">
              Disclaimer
            </Link>
           
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} QuickLit. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
