import React, { useState } from "react";
import "../stylesheets/FAQs.css";

const faqs = [
  {
    question: "How do I post a lost item?",
    answer: "Click on 'Post Lost Item', fill in the details about your item, and submit it. Our system will notify users nearby.",
  },
  {
    question: "How do I claim a found item?",
    answer: "Click on 'Post Found Item' and provide details. The system will help you connect with the owner securely.",
  },
  {
    question: "Is my personal information safe?",
    answer: "Yes. We only share your contact info with the user directly involved in the lost/found match.",
  },
  {
    question: "Can I edit or delete my post later?",
    answer: "Yes, you can edit or remove your post anytime from your profile dashboard.",
  },
  {
    question: "Is ReFinder free to use?",
    answer: "Yes. Posting and searching lost or found items is completely free.",
  },
  {
    question: "Do I need an account to post?",
    answer: "Yes. You must create an account to post lost or found items to prevent spam and ensure safety.",
  },
  {
    question: "What happens after I report a found item?",
    answer: "Owners can contact you through the platform chat or details you provide. You should verify ownership before handing over.",
  },
  {
    question: "What if someone falsely claims my item?",
    answer: "Always ask for proof such as receipts, photos, descriptions, or security marks before giving any item.",
  },
  {
    question: "Can I upload images of my item?",
    answer: "Yes. Adding clear images increases chances of matching items quickly.",
  },
  {
    question: "How long does my post stay active?",
    answer: "Posts remain active until you manually mark them as resolved or delete them.",
  },
  {
    question: "Can I report inappropriate or fake posts?",
    answer: "Yes, you can report any suspicious post using the 'Report' button. Our team will review it.",
  },
  {
    question: "Which items are not allowed?",
    answer: "Illegal items, weapons, prohibited goods, or anything against the law cannot be posted.",
  },
  {
    question: "Can I use ReFinder on mobile?",
    answer: "Yes. The platform is fully responsive and works on mobile, tablet, and desktop devices.",
  },
];

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h2 className="faq-title">Frequently Asked Questions</h2>

      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              {faq.question}
              <span className="faq-icon">
                {activeIndex === index ? "-" : "+"}
              </span>
            </div>

            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
