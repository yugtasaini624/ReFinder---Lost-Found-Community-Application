import React from "react";
import "../stylesheets/PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-container">
      <div className="privacy-box">

        <h1>Privacy Policy</h1>
        <p className="updated">Last Updated: Jan 2026</p>

        <section>
          <h2>1. Introduction</h2>
          <p>
            This Privacy Policy explains how we collect, use, and protect your
            personal information when you use our platform. By using this
            website, you agree to the practices described in this policy.
          </p>
        </section>

        <section>
          <h2>2. Information We Collect</h2>
          <ul>
            <li>Name and contact details</li>
            <li>Email address and phone number</li>
            <li>Item details you post (lost or found)</li>
            <li>Messages exchanged between users</li>
            <li>Technical information such as IP address and browser type</li>
          </ul>
        </section>

        <section>
          <h2>3. How We Use Your Information</h2>
          <p>We may use your information to:</p>
          <ul>
            <li>Help users connect for lost and found items</li>
            <li>Improve website functionality</li>
            <li>Provide customer support</li>
            <li>Prevent fraud or misuse of the platform</li>
          </ul>
        </section>

        <section>
          <h2>4. Sharing of Information</h2>
          <p>
            We do not sell or trade your personal data. Information may be
            shared only:
          </p>
          <ul>
            <li>When required by law</li>
            <li>To prevent fraud or illegal activity</li>
            <li>To facilitate communication between users</li>
          </ul>
        </section>

        <section>
          <h2>5. Data Security</h2>
          <p>
            We take reasonable measures to protect your data. However, no method
            of internet transmission is 100% secure, and we cannot guarantee
            absolute security.
          </p>
        </section>

        <section>
          <h2>6. Cookies</h2>
          <p>
            We may use cookies to enhance user experience, analyze traffic, and
            remember user preferences. You can disable cookies in your browser
            settings if you prefer.
          </p>
        </section>

        <section>
          <h2>7. Children's Privacy</h2>
          <p>
            Our platform is not intended for children under 13. We do not
            knowingly collect data from children.
          </p>
        </section>

        <section>
          <h2>8. Your Rights</h2>
          <ul>
            <li>Access your personal information</li>
            <li>Request correction or deletion</li>
            <li>Withdraw consent for certain processing</li>
          </ul>
        </section>

        <section>
          <h2>9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy occasionally. Continued use of the
            platform means you accept the updated policy.
          </p>
        </section>

        <section>
          <h2>10. Contact Us</h2>
          <p>
            For questions about this Privacy Policy, please contact us through
            the Contact section on the website.
          </p>
        </section>

      </div>
    </div>
  );
};

export default PrivacyPolicy;
