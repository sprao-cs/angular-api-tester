export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD';

export type ErrorType = 'CORS' | 'HTTP_4XX' | 'HTTP_5XX' | 'NETWORK' | 'TIMEOUT' | 'UNKNOWN' | 'NONE';

export type BodyType = 'json' | 'form-data' | 'none';

export interface KeyValue {
  key: string;
  value: string;
  enabled?: boolean;
}

export interface ApiRequest {
  url: string;
  method: HttpMethod;
  headers: KeyValue[];
  bodyType: BodyType;
  jsonBody?: string;
  formData?: KeyValue[];
  timestamp?: number;
}

export interface ApiResponse {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: any;
  timing: number;
  errorType: ErrorType;
  errorMessage?: string;
  timestamp: number;
}

export interface RequestHistoryItem {
  request: ApiRequest;
  response?: ApiResponse;
  id: string;
}
