import React from "react";
import "../stylesheets/HowItWorks.css";
import img2 from '../images/concept-house-searching-landing-page.png';
import img3 from '../images/5749403_2999852.jpg'
import img4 from '../images/20827506_Woman giving flower to man on dating.jpg';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Post a Lost Item",
      desc: "Share what you lost and where you lost it.",
      image: "https://img.freepik.com/free-vector/cartoon-people-chatting-online_74855-6730.jpg?w=2000",
    },
    {
      id: 2,
      title: "Find a Match",
      desc: "Someone finds an item and posts it to Kanpid.",
      image: img2,
    },
    {
      id: 3,
      title: "Connect",
      desc: "Both users connect securely to confirm ownership.",
      image: img3,
    },
    {
      id: 4,
      title: "Item Returned",
      desc: "The lost item is safely returned to its owner.",
      image: img4,
    },
  ];

  return (
    <div className="hiw-container">
      <h2 className="hiw-title">How It Works</h2>
      <div className="hiw-grid">
        {steps.map((step) => (
          <div key={step.id} className="hiw-card">
            <img src={step.image} alt={step.title} className="hiw-img" />
            <div className="hiw-content">
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
            <div className="hiw-step">{step.id}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
