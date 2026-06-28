import React from 'react';

/**
 * Header do chat
 * Mostra status da conexão e título
 */
const Header = ({ serverStatus }) => {
  return (
    <header className="chat-header">
      <div className="header-title">
        <h1>🤖 ChatGPT Clone</h1>
        <span className="header-badge">DIO</span>
      </div>
      <div className={`server-status ${serverStatus ? 'online' : 'offline'}`}>
        <span className="status-dot"></span>
        {serverStatus ? 'Servidor Online' : 'Servidor Offline'}
      </div>
    </header>
  );
};

export default Header;
