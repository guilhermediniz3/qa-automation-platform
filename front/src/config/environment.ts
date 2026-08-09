/**
 * URL única da API para todo o frontend.
 *
 * Desenvolvimento: VITE_API_URL=http://localhost:8081
 * Produção: configure VITE_API_URL nas variáveis de ambiente da hospedagem.
 */
export const environment = {
  apiUrl: (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, ''),
};
