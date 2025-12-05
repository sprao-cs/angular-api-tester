import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
import { ApiRequest, ApiResponse, HttpMethod, KeyValue, BodyType, RequestHistoryItem } from '../../models/api-request.model';

@Component({
  selector: 'app-api-tester',
  imports: [CommonModule, FormsModule],
  templateUrl: './api-tester.component.html',
  styleUrl: './api-tester.component.css'
})
export class ApiTesterComponent {
  // Request configuration
  url = signal('');
  method = signal<HttpMethod>('GET');
  headers = signal<KeyValue[]>([{ key: '', value: '', enabled: true }]);
  bodyType = signal<BodyType>('none');
  jsonBody = signal('{\n  \n}');
  formData = signal<KeyValue[]>([{ key: '', value: '', enabled: true }]);

  // Response data
  response = signal<ApiResponse | null>(null);
  isLoading = signal(false);

  // Request history
  history = signal<RequestHistoryItem[]>([]);
  showHistory = signal(true); // Toggle for history panel visibility

  // Available HTTP methods
  httpMethods: HttpMethod[] = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'];
  bodyTypes: BodyType[] = ['none', 'json', 'form-data'];

  constructor(private apiService: ApiService) {}

  addHeader(): void {
    this.headers.update(headers => [...headers, { key: '', value: '', enabled: true }]);
  }

  removeHeader(index: number): void {
    this.headers.update(headers => headers.filter((_, i) => i !== index));
  }

  toggleHeader(index: number): void {
    this.headers.update(headers => {
      const newHeaders = [...headers];
      newHeaders[index].enabled = !newHeaders[index].enabled;
      return newHeaders;
    });
  }

  addFormDataItem(): void {
    this.formData.update(data => [...data, { key: '', value: '', enabled: true }]);
  }

  removeFormDataItem(index: number): void {
    this.formData.update(data => data.filter((_, i) => i !== index));
  }

  toggleFormDataItem(index: number): void {
    this.formData.update(data => {
      const newData = [...data];
      newData[index].enabled = !newData[index].enabled;
      return newData;
    });
  }

  sendRequest(): void {
    if (!this.url()) {
      alert('Please enter a URL');
      return;
    }

    this.isLoading.set(true);
    this.response.set(null);

    const request: ApiRequest = {
      url: this.url(),
      method: this.method(),
      headers: this.headers(),
      bodyType: this.bodyType(),
      jsonBody: this.bodyType() === 'json' ? this.jsonBody() : undefined,
      formData: this.bodyType() === 'form-data' ? this.formData() : undefined,
      timestamp: Date.now()
    };

    this.apiService.makeRequest(request).subscribe({
      next: (response) => {
        this.isLoading.set(false);
        this.response.set(response);
        this.addToHistory(request, response);
      },
      error: (errorResponse: ApiResponse) => {
        this.isLoading.set(false);
        this.response.set(errorResponse);
        this.addToHistory(request, errorResponse);
      }
    });
  }

  private addToHistory(request: ApiRequest, response: ApiResponse): void {
    const historyItem: RequestHistoryItem = {
      id: `${Date.now()}-${Math.random()}`,
      request,
      response
    };
    this.history.update(history => [historyItem, ...history].slice(0, 10)); // Keep last 10
  }

  loadFromHistory(item: RequestHistoryItem): void {
    this.url.set(item.request.url);
    this.method.set(item.request.method);
    this.headers.set(JSON.parse(JSON.stringify(item.request.headers))); // Deep clone
    this.bodyType.set(item.request.bodyType);
    if (item.request.jsonBody) {
      this.jsonBody.set(item.request.jsonBody);
    }
    if (item.request.formData) {
      this.formData.set(JSON.parse(JSON.stringify(item.request.formData))); // Deep clone
    }
    this.response.set(item.response || null);
  }

  clearHistory(): void {
    if (confirm('Clear all history?')) {
      this.history.set([]);
    }
  }

  toggleHistory(): void {
    this.showHistory.update(show => !show);
  }

  getStatusClass(status: number): string {
    if (status >= 200 && status < 300) return 'status-success';
    if (status >= 300 && status < 400) return 'status-redirect';
    if (status >= 400 && status < 500) return 'status-client-error';
    if (status >= 500) return 'status-server-error';
    return 'status-unknown';
  }

  getErrorTypeClass(errorType: string): string {
    switch (errorType) {
      case 'CORS': return 'error-cors';
      case 'HTTP_4XX': return 'error-4xx';
      case 'HTTP_5XX': return 'error-5xx';
      case 'NETWORK': return 'error-network';
      case 'TIMEOUT': return 'error-timeout';
      default: return '';
    }
  }

  formatJson(obj: any): string {
    try {
      return JSON.stringify(obj, null, 2);
    } catch (e) {
      return String(obj);
    }
  }

  formatTimestamp(timestamp: number): string {
    return new Date(timestamp).toLocaleTimeString();
  }

  trackByIndex(index: number): number {
    return index;
  }

  trackById(index: number, item: RequestHistoryItem): string {
    return item.id;
  }
}
