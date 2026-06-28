import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import { sendMessage, checkServerHealth } from './services/api';

/**
 * App principal do ChatGPT Clone
 * Gerencia estado do chat, comunicação com API e renderização
 */
function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [serverStatus, setServerStatus] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // Verifica saúde do servidor ao carregar
  useEffect(() => {
    checkServerStatus();
    const interval = setInterval(checkServerStatus, 10000); // Check a cada 10s
    return () => clearInterval(interval);
  }, []);

  // Scroll automático para última mensagem
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const checkServerStatus = async () => {
    const isHealthy = await checkServerHealth();
    setServerStatus(isHealthy);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (userMessage) => {
    // Adiciona mensagem do usuário
    const userMsg = {
      id: Date.now(),
      text: userMessage,
      isUser: true,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);
    setError(null);

    try {
      // Envia para API e aguarda resposta
      const data = await sendMessage(userMessage);

      // Adiciona resposta da IA
      const botMsg = {
        id: Date.now() + 1,
        text: data.reply,
        isUser: false,
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      // Mensagem de erro amigável
      let errorMessage = 'Erro ao conectar com o servidor. Tente novamente em alguns segundos.';
      
      if (err.message.includes('ECONNREFUSED') || err.message.includes('não foi possível conectar')) {
        errorMessage = '🔄 Servidor em manutenção. Aguarde um momento e tente novamente.';
      }

      const errorMsg = {
        id: Date.now() + 1,
        text: errorMessage,
        isUser: false,
        isError: true,
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, errorMsg]);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    if (window.confirm('Tem certeza que deseja limpar toda a conversa?')) {
      setMessages([]);
      setError(null);
    }
  };

  return (
    <div className="app">
      <Sidebar
        onClearChat={handleClearChat}
        messagesCount={messages.length}
      />

      <main className="main-content">
        <Header serverStatus={serverStatus} />

        <div className="chat-container">
          {messages.length === 0 ? (
            // Tela de boas-vindas
            <div className="welcome-screen">
              <div className="welcome-icon">🤖</div>
              <h2>Bem-vindo ao ChatGPT Clone</h2>
              <p>
                Este é um assistente de IA desenvolvido com <strong>Node.js</strong>,{' '}
                <strong>React</strong> e <strong>OpenAI API</strong>.
              </p>
              <div className="welcome-tips">
                <h3>💡 Dicas de uso:</h3>
                <ul>
                  <li>Digite sua pergunta no campo abaixo</li>
                  <li>Pressione <strong>Enter</strong> para enviar</li>
                  <li>Use <strong>Shift + Enter</strong> para quebra de linha</li>
                  <li>O servidor deve estar rodando na porta 5000</li>
                </ul>
              </div>
              {!serverStatus && (
                <div className="welcome-warning">
                  🔄 <strong>Conectando ao servidor...</strong> Aguarde um instante.
                </div>
              )}
            </div>
          ) : (
            // Área de mensagens
            <div className="messages-list">
              {messages.map((msg) => (
                <ChatMessage
                  key={msg.id}
                  message={msg.text}
                  isUser={msg.isUser}
                  isError={msg.isError}
                />
              ))}
              {isLoading && (
                <div className="message-row bot">
                  <div className="message-avatar">🤖</div>
                  <div className="message-content">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <ChatInput
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          disabled={!serverStatus}
        />
      </main>
    </div>
  );
}

export default App;
