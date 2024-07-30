import React from 'react';
import '../../assets/styles/chatbot/ChatMessage.css';

function ChatJobMessage({ message }) {
  return (
    <div className={`message ${message.isUser ? 'user' : 'bot'}`}>
      {message.text}
    </div>
  );
}

export default ChatJobMessage;