import React from 'react';
import { useChatMedical } from '../../hooks/chatbot/useChatMedical';
import { useScrollToBottom, useMessageInput } from '../../hooks/chatbot/useScrollToBottom';
import ChatMedicalMessage from './ChatMedicalMessage';
import '../../assets/styles/chatbot/ChatWindow.css';
import sendIcon from '../../assets/images/send.png';
import RecordModal from './RecordModal';

function ChatMedicalWindow({ selectedChat, categoryNo, onChatComplete }) {
  const { messages, loading, error, sendMessage } = useChatMedical(selectedChat, categoryNo);
  const messagesContainerRef = useScrollToBottom([messages]);
  const { input, setInput, handleKeyPress } = useMessageInput(sendMessage);

  const handleSendMessage = (messageText) => {
    sendMessage(messageText);
    setInput('');
    if (onChatComplete) onChatComplete();
  };

  return (
    <div className="chat-window">
      <div className="messages" ref={messagesContainerRef}>
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <ChatMedicalMessage key={`msg-${index}`} message={message} />
          ))
        ) : (
          <p>새로운 대화를 시작하세요.</p>
        )}
        {loading && <p>로딩 중...</p>}
        {error && <p>오류: {error.message}</p>}
      </div>
      <div className='wrap-form-box'>
        <form onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(input);
        }} className='form-box'>
          <div className='modal_input_btn'>
            {/* <RecordModal
              onRecordingComplete={(blob) => console.log('Recording completed', blob)}
              onAudioSend={(data) => console.log('Audio data', data)}
            /> */}
            <input
              className='botinput'
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="메시지를 입력하세요..."
            />
          </div>
          <button className='send-btn' type="submit" disabled={!input.trim()}>
            <img src={sendIcon} alt="Send" className="window-send-icon" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatMedicalWindow;
