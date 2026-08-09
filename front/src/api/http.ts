import { environment } from '../config/environment';

export class ApiError extends Error {
  constructor(message: string, public readonly status: number) {
    super(message);
    this.name = 'ApiError';
  }
}

type RequestOptions = Omit<RequestInit, 'body'> & { body?: unknown };

export async function request<TResponse>(path: string, options: RequestOptions = {}): Promise<TResponse> {
  const { body, headers, ...requestOptions } = options;
  const response = await fetch(`${environment.apiUrl}${path}`, {
    ...requestOptions,
    headers: { 'Content-Type': 'application/json', ...headers },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (!response.ok) {
    throw new ApiError(await getErrorMessage(response), response.status);
  }

  if (response.status === 204) return undefined as TResponse;
  return response.json() as Promise<TResponse>;
}

export function post<TResponse>(path: string, body: unknown) {
  return request<TResponse>(path, { method: 'POST', body });
}

async function getErrorMessage(response: Response) {
  if (response.status === 401) return 'E-mail ou senha inválidos.';

  const message = await response.text();
  return message || 'Não foi possível concluir a solicitação. Tente novamente.';
}
