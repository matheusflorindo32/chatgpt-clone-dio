import axios from 'axios';

/**
 * Serviço de API para comunicação com o backend
 * Todas as chamadas à OpenAI passam pelo servidor - a chave NUNCA fica aqui
 */

const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 segundos de timeout
});

/**
 * Envia uma mensagem para a API e retorna a resposta da IA
 * @param {string} message - Mensagem do usuário
 * @returns {Promise<{reply: string, timestamp: string}>}
 */
export const sendMessage = async (message) => {
  try {
    const response = await api.post('/api/chat', { message });
    return response.data;
  } catch (error) {
    // Tratamento de erros do Axios
    if (error.code === 'ECONNREFUSED') {
      throw new Error('Não foi possível conectar ao servidor. Verifique se o backend está rodando em http://localhost:5000');
    }

    if (error.response) {
      // Erro retornado pelo servidor
      const serverError = error.response.data;
      throw new Error(serverError.details || serverError.error || 'Erro desconhecido do servidor');
    }

    if (error.request) {
      // Requisição feita mas sem resposta
      throw new Error('O servidor não respondeu. Verifique sua conexão.');
    }

    // Erro genérico
    throw new Error('Erro ao enviar mensagem. Tente novamente.');
  }
};

/**
 * Verifica se o servidor está online
 * @returns {Promise<boolean>}
 */
export const checkServerHealth = async () => {
  try {
    const response = await api.get('/health');
    return response.data.status === 'ok';
  } catch {
    return false;
  }
};

export default api;
