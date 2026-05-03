import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#1a1a2e] text-white mt-12 sm:mt-16">
      <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-[#c62828] mb-3 sm:mb-4">IndiaBriefed</h3>
            <p className="text-gray-300 text-xs sm:text-sm">
              Your trusted source for daily news, current affairs, and updates for UPSC and SSC aspirants.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/" className="text-gray-300 hover:text-[#c62828] transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-[#c62828] transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-[#c62828] transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Categories</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/category/national" className="text-gray-300 hover:text-[#c62828] transition">
                  National
                </Link>
              </li>
              <li>
                <Link href="/category/international" className="text-gray-300 hover:text-[#c62828] transition">
                  International
                </Link>
              </li>
              <li>
                <Link href="/category/economy" className="text-gray-300 hover:text-[#c62828] transition">
                  Economy
                </Link>
              </li>
              <li>
                <Link href="/category/science-technology" className="text-gray-300 hover:text-[#c62828] transition">
                  Science & Technology
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Stay Updated</h4>
            <p className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4">
              Get daily news updates delivered to your inbox.
            </p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-3 sm:px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#c62828] text-xs sm:text-sm"
              />
              <button
                type="submit"
                className="bg-[#c62828] text-white px-3 sm:px-4 py-2 rounded hover:bg-[#a02020] transition text-xs sm:text-sm font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-gray-400">
          <p>&copy; {currentYear} IndiaBriefed. All rights reserved.</p>
          <p className="mt-2">🇮🇳 Built for UPSC & SSC Aspirants</p>
        </div>
      </div>
    </footer>
  )
}
