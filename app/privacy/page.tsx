'use client'

import { motion } from 'framer-motion'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-charcoal-dark via-charcoal-medium to-charcoal-dark">
      {/* Header */}
      <div className="bg-gradient-primary/10 backdrop-blur-md border-b border-white/10 sticky top-0 z-40">
        <div className="container-custom py-4">
          <a href="/" className="text-xl font-bold text-transparent bg-gradient-primary bg-clip-text">
            DesiGameHub
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-gray-400 mb-12">Last Updated: November 12, 2025</p>

          <div className="prose prose-invert max-w-none space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
              <p className="text-gray-300">
                Welcome to DesiGameHub (&quot;Company,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your privacy and ensuring you have a positive experience on our website and services. This Privacy Policy explains our data practices and your rights regarding your personal information.
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">2.1 Information You Provide</h3>
                  <ul className="text-gray-300 space-y-2 list-disc list-inside">
                    <li>Email address when you join our waitlist</li>
                    <li>Name, phone, and country information for account registration</li>
                    <li>Profile information and gameplay data</li>
                    <li>Communications and support requests</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">2.2 Information Collected Automatically</h3>
                  <ul className="text-gray-300 space-y-2 list-disc list-inside">
                    <li>IP address and device information</li>
                    <li>Browser type and version</li>
                    <li>Pages visited and time spent</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Information */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
              <ul className="text-gray-300 space-y-2 list-disc list-inside">
                <li>To send you updates about DesiGameHub and new games</li>
                <li>To improve our platform and user experience</li>
                <li>To respond to your inquiries and provide support</li>
                <li>To comply with legal obligations</li>
                <li>To prevent fraud and ensure platform security</li>
              </ul>
            </section>

            {/* Data Protection */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Data Protection & Security</h2>
              <p className="text-gray-300">
                We use industry-standard security measures to protect your personal information, including:
              </p>
              <ul className="text-gray-300 space-y-2 list-disc list-inside mt-2">
                <li>HTTPS encryption for all data in transit</li>
                <li>Secure password policies</li>
                <li>Regular security audits</li>
                <li>Limited access to personal data (authorized personnel only)</li>
              </ul>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Your Privacy Rights</h2>
              <p className="text-gray-300">
                You have the right to:
              </p>
              <ul className="text-gray-300 space-y-2 list-disc list-inside mt-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data (right to be forgotten)</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Contact Us</h2>
              <p className="text-gray-300">
                If you have questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="text-gray-300 mt-2 space-y-1">
                <p><strong>Email:</strong> support@desigamehub.com</p>
                <p><strong>Website:</strong> desigamehub.com</p>
              </div>
            </section>

            {/* Updates */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Policy Updates</h2>
              <p className="text-gray-300">
                We may update this Privacy Policy from time to time. We will notify you of significant changes via email or by updating the date at the top of this policy. Your continued use of DesiGameHub constitutes acceptance of the updated policy.
              </p>
            </section>
          </div>

          {/* Back Button */}
          <div className="mt-16">
            <a
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-primary text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-saffron/50 transition-all"
            >
              ← Back to Home
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
