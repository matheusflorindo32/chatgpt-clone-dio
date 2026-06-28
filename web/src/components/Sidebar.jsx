import React from 'react';

/**
 * Sidebar com opções do chat
 * Botão para limpar conversa e informações do projeto
 */
const Sidebar = ({ onClearChat, messagesCount }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>💬 ChatGPT Clone</h2>
        <p className="sidebar-subtitle">DIO Full Stack</p>
      </div>

      <div className="sidebar-actions">
        <button
          className="clear-button"
          onClick={onClearChat}
          disabled={messagesCount === 0}
        >
          🗑️ Limpar Conversa
        </button>
      </div>

      <div className="sidebar-info">
        <h3>ℹ️ Sobre</h3>
        <p>
          Este é um clone do ChatGPT desenvolvido como desafio prático 
          da <strong>DIO</strong> (Digital Innovation One).
        </p>
        <p>
          Tecnologias: <strong>Node.js</strong>, <strong>React</strong> e <strong>OpenAI API</strong>.
        </p>
      </div>

      <div className="sidebar-footer">
        <p>Desenvolvido por</p>
        <a
          href="https://github.com/Cateano93"
          target="_blank"
          rel="noopener noreferrer"
        >
          <strong>Matheus Florindo de Deus</strong>
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
