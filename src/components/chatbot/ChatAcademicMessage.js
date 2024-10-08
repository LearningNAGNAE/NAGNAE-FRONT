import React from 'react';
import '../../assets/styles/chatbot/ChatMessage.css';
import userIcon from '../../assets/images/user.png';
import botIcon from '../../assets/images/chatbot.png';

function ChatAcademicMessage({ message }) {
  const formatText = (text) => {
    if (typeof text !== 'string') return JSON.stringify(text);

    const lines = text.split('\n');

    return lines.map((line, lineIndex) => {
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const formattedLine = parts.map((part, partIndex) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={`${lineIndex}-${partIndex}`}>{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      return (
        <React.Fragment key={lineIndex}>
          {formattedLine}
          {lineIndex < lines.length - 1 && <br />}
        </React.Fragment>
      );
    });
  };

  const userIconStyle = {
    backgroundImage: `url(${userIcon})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '30px 30px',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: '#775A45',
  };

  const botIconStyle = {
    width: '55px',
    height: '55px',
    objectFit: 'contain',
  };

  return (
    <div className={`message-container ${message.isUser ? 'user' : 'bot'}`}>
      {message.isUser ? (
        <div className="message-icon user-icon" style={userIconStyle} />
      ) : (
        <img
          src={botIcon}
          alt="Bot"
          className="message-icon bot-icon"
          style={botIconStyle}
        />
      )}
      <div className={`message ${message.isUser ? 'user' : 'bot'}`}>
        {message.image && (
          <div className="message-image-container">
            <img src={message.image} alt="Uploaded" className="message-image" />
          </div>
        )}
        {message.isLoading ? (
          <div className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        ) : (
          message.text && formatText(message.text)
        )}
      </div>
    </div>
  );
}

export default ChatAcademicMessage;