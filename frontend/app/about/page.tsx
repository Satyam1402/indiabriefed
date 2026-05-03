export default function AboutPage() {
  return (
    <div className="bg-white">
      <div className="bg-[#c62828] text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About IndiaBriefed</h1>
          <p className="text-lg opacity-90">Your trusted source for daily news and current affairs</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Who We Are</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              IndiaBriefed is a comprehensive news platform dedicated to providing accurate, timely, and relevant news coverage for UPSC and SSC aspirants, as well as anyone interested in staying informed about India and the world.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We understand the importance of current affairs in competitive examinations and general awareness. Our team works tirelessly to bring you the most important news stories, analyzed and presented in a format that's easy to understand and remember.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our mission is to empower students and professionals with knowledge by providing:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Comprehensive coverage of national and international news</li>
              <li>In-depth analysis of economic and political developments</li>
              <li>Updates on science, technology, and innovation</li>
              <li>Coverage of environmental and social issues</li>
              <li>Sports and cultural news</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What We Cover</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#c62828] mb-2">🇮🇳 National</h3>
                <p className="text-gray-700">Politics, governance, policies, and domestic affairs</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#1565c0] mb-2">🌍 International</h3>
                <p className="text-gray-700">Global events, diplomacy, and international relations</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#2e7d32] mb-2">💰 Economy</h3>
                <p className="text-gray-700">Markets, business, finance, and economic policies</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#6a1b9a] mb-2">🔬 Science & Technology</h3>
                <p className="text-gray-700">Innovation, research, space, and tech developments</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#f57c00] mb-2">🎓 Education</h3>
                <p className="text-gray-700">Educational policies, institutions, and opportunities</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#00838f] mb-2">⚽ Sports</h3>
                <p className="text-gray-700">National and international sports coverage</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Us</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-[#c62828] text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">✓</div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Accurate & Reliable</h3>
                  <p className="text-gray-700">We verify all information before publishing</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-[#c62828] text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">✓</div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Exam-Focused</h3>
                  <p className="text-gray-700">Content tailored for UPSC and SSC preparation</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-[#c62828] text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">✓</div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Daily Updates</h3>
                  <p className="text-gray-700">Fresh content published every day</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-[#c62828] text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">✓</div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Easy to Understand</h3>
                  <p className="text-gray-700">Complex topics explained in simple language</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-[#c62828] text-white p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
            <p className="mb-6">Stay updated with the latest news and current affairs</p>
            <button className="bg-white text-[#c62828] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Subscribe to Newsletter
            </button>
          </section>
        </div>
      </div>
    </div>
  )
}
