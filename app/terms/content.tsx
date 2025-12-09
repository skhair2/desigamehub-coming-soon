'use client'

import { motion } from 'framer-motion'

export default function TermsOfServiceContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-charcoal-dark via-charcoal-medium to-charcoal-dark">
      {/* Header */}
      <div className="bg-gradient-primary/10 backdrop-blur-md border-b border-white/10 sticky top-0 z-40">
        <div className="container-custom py-4">
          <a href="/" className="text-xl font-bold text-transparent bg-gradient-primary bg-clip-text">
            DesiPlayground
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
          <h1 className="text-5xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-gray-400 mb-12">Last Updated: November 12, 2025</p>

          <div className="prose prose-invert max-w-none space-y-8">
            {/* Agreement */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-300">
                By accessing and using DesiPlayground, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            {/* User Eligibility */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. User Eligibility</h2>
              <p className="text-gray-300">
                DesiPlayground is intended for users aged 13 and above. By using our service, you represent and warrant that you are at least 13 years of age. If you are under 18, you represent that you have parental or guardian consent to use DesiPlayground.
              </p>
            </section>

            {/* License & Use */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. License & Permitted Use</h2>
              <p className="text-gray-300 mb-3">
                DesiPlayground grants you a limited, non-exclusive, non-transferable license to use our platform for personal, non-commercial purposes. You agree not to:
              </p>
              <ul className="text-gray-300 space-y-2 list-disc list-inside">
                <li>Reproduce, modify, or distribute any content without permission</li>
                <li>Engage in harassment, abuse, or harmful behavior</li>
                <li>Use automated tools to access the platform (bots, scrapers)</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Create multiple accounts to circumvent bans or limits</li>
              </ul>
            </section>

            {/* Disclaimer of Warranties */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Disclaimer of Warranties</h2>
              <p className="text-gray-300">
                DesiPlayground is provided on an &quot;AS IS&quot; basis without warranties of any kind, either express or implied. We do not warrant that our service will be:
              </p>
              <ul className="text-gray-300 space-y-2 list-disc list-inside mt-2">
                <li>Uninterrupted or error-free</li>
                <li>Free from viruses or malware</li>
                <li>Always available or accessible</li>
              </ul>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Limitation of Liability</h2>
              <p className="text-gray-300">
                To the maximum extent permitted by law, DesiPlayground shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our service, even if we have been advised of the possibility of such damages.
              </p>
            </section>

            {/* User Content */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. User Content & Rights</h2>
              <p className="text-gray-300">
                By uploading or submitting content to DesiPlayground, you grant us a non-exclusive, royalty-free license to use that content for platform improvement and operation. You retain ownership of your content and warrant that it does not infringe on third-party rights.
              </p>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Intellectual Property</h2>
              <p className="text-gray-300">
                All content, features, and functionality on DesiPlayground (including graphics, logos, and code) are owned by DesiPlayground or our licensors and are protected by international copyright, trademark, and other intellectual property laws.
              </p>
            </section>

            {/* Prohibited Activities */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Prohibited Activities</h2>
              <p className="text-gray-300">
                You agree not to engage in any of the following activities:
              </p>
              <ul className="text-gray-300 space-y-2 list-disc list-inside mt-2">
                <li>Hate speech, discrimination, or harassment</li>
                <li>Exploitation or abuse of other users</li>
                <li>Cheating, hacking, or exploiting game mechanics</li>
                <li>Spamming or sending unsolicited messages</li>
                <li>Interfering with platform functionality</li>
              </ul>
            </section>

            {/* Termination */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. Termination</h2>
              <p className="text-gray-300">
                We reserve the right to terminate or suspend your account and access to DesiPlayground at any time for violations of these terms or for any reason, with or without notice.
              </p>
            </section>

            {/* Modifications */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">10. Modifications to Terms</h2>
              <p className="text-gray-300">
                We reserve the right to modify these terms at any time. Significant changes will be communicated via email or notification on our platform. Your continued use after such notification constitutes acceptance of the modified terms.
              </p>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">11. Governing Law</h2>
              <p className="text-gray-300">
                These Terms of Service are governed by and construed in accordance with the laws of applicable jurisdictions, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">12. Contact Us</h2>
              <p className="text-gray-300">
                If you have questions about these Terms of Service, please contact us:
              </p>
              <div className="text-gray-300 mt-2 space-y-1">
                <p><strong>Email:</strong> support@DesiPlayground.com</p>
                <p><strong>Website:</strong> DesiPlayground.com</p>
              </div>
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
