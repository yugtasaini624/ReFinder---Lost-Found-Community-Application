import React from "react";
import "../stylesheets/TermsAndConditions.css";

const TermsAndConditions = () => {
  return (
    <div className="terms-container">
      <div className="terms-box">

        <h1>Terms & Conditions</h1>
        <p className="updated">Last Updated: Jan 2026</p>

        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using this platform, you agree to be bound by these
            Terms and Conditions. If you do not agree with any part of these
            terms, please do not use the website.
          </p>
        </section>

        <section>
          <h2>2. Purpose of the Platform</h2>
          <p>
            This platform is designed to help users report lost and found items.
            We only act as a connecting medium between users and do not take
            responsibility for the validity of posted items.
          </p>
        </section>

        <section>
          <h2>3. User Responsibilities</h2>
          <ul>
            <li>Provide accurate and honest information</li>
            <li>Do not upload fake or misleading posts</li>
            <li>Do not post abusive or harmful content</li>
            <li>Respect other users at all times</li>
          </ul>
        </section>

        <section>
          <h2>4. Prohibited Activities</h2>
          <p>Users are strictly prohibited from:</p>
          <ul>
            <li>Impersonating another person</li>
            <li>Posting illegal or stolen items knowingly</li>
            <li>Scamming or attempting to defraud others</li>
            <li>Uploading viruses or malicious code</li>
          </ul>
        </section>

        <section>
          <h2>5. Limitation of Liability</h2>
          <p>
            We are not responsible for any loss, damage, or disputes arising
            from interactions between users. All agreements or item handovers
            happen at your own risk.
          </p>
        </section>

        <section>
          <h2>6. Content Ownership</h2>
          <p>
            Users are responsible for the content they upload. By posting on the
            platform, you grant us permission to display your content for
            service-related purposes.
          </p>
        </section>

        <section>
          <h2>7. Account and Data</h2>
          <p>
            You are responsible for maintaining the confidentiality of your
            account credentials. We may remove accounts involved in suspicious
            or harmful activity.
          </p>
        </section>

        <section>
          <h2>8. Changes to Terms</h2>
          <p>
            We may update these terms from time to time. Continued use of the
            platform after changes means you accept the updated Terms &
            Conditions.
          </p>
        </section>

        <section>
          <h2>9. Contact Us</h2>
          <p>
            If you have any questions regarding these Terms & Conditions,
            please reach out through our Contact section.
          </p>
        </section>

      </div>
    </div>
  );
};

export default TermsAndConditions;
