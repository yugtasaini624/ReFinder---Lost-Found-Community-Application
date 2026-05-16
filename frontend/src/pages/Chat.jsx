import React, { useState } from "react";
import "../stylesheets/Chat.css";

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState("Alice");
  const [messages, setMessages] = useState([
    { sender: "Alice", text: "Hey, did you find your wallet?" },
    { sender: "Yugta", text: "Not yet, still looking 😔" },
    { sender: "Alice", text: "Let me know if you need help!" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const users = ["Alice", "Bob", "Charlie"];

  const sendMessage = () => {
    if (newMessage.trim() === "") return;
    setMessages([...messages, { sender: "Yugta", text: newMessage }]);
    setNewMessage("");
  };

  return (
    <div className="chat-page">
      <div className="contacts-list">
        <h2>Contacts</h2>
        <ul>
          {users.map((user) => (
            <li
              key={user}
              className={user === selectedUser ? "active" : ""}
              onClick={() => setSelectedUser(user)}
            >
              {user}
            </li>
          ))}
        </ul>
      </div>

      <div className="chat-window">
        <div className="chat-header">
          <h3>{selectedUser}</h3>
        </div>

        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chat-message ${msg.sender === "Yugta" ? "sent" : "received"}`}
            >
              <p>{msg.text}</p>
            </div>
          ))}
        </div>

        <div className="chat-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
