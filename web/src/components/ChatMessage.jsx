import React from 'react';

/**
 * Componente de mensagem do chat
 * Renderiza mensagens do usuário e da IA com estilos diferentes
 */
const ChatMessage = ({ message, isUser, isError }) => {
  return (
    <div className={`message-row ${isUser ? 'user' : 'bot'} ${isError ? 'error' : ''}`}>
      <div className="message-avatar">
        {isUser ? '👤' : '🤖'}
      </div>
      <div className="message-content">
        <div className="message-bubble">
          {isError ? (
            <span className="error-text">⚠️ {message}</span>
          ) : (
            <p>{message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
