import "../stylesheets/About.css";

function About() {
  return (
    <div className="about-container">
      <div className="about-card">
        <h1 className="about-title">About ReFinder</h1>

        <p className="about-text">
          ReFinder is a platform designed to help people reconnect with their lost belongings
          and return found items to their rightful owners.
        </p>

        <p className="about-text">
          Whether you misplaced your ID card, bag, documents, or found something valuable,
          ReFinder makes the process simple, secure, and organized.
        </p>

        <h2 className="about-subtitle">Our Mission</h2>
        <p className="about-text">
          Our mission is to reduce stress and save time by building a digital bridge between
          people who lose items and those who find them 💚
        </p>

        <h2 className="about-subtitle">What You Can Do</h2>
        <ul className="about-list">
          <li>🔍 Browse lost & found items</li>
          <li>📤 Upload details of a lost item</li>
          <li>📦 Upload details of a found item</li>
          <li>🤝 Contact owners or finders securely</li>
        </ul>

        <p className="about-footer">
          Thank you for being a responsible and kind human ✨
          <br />
          — Team ReFinder
        </p>
      </div>
    </div>
  );
}

export default About;
