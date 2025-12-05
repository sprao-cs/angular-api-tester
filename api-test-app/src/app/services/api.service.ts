import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiRequest, ApiResponse, ErrorType, KeyValue } from '../models/api-request.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  makeRequest(request: ApiRequest): Observable<ApiResponse> {
    const startTime = performance.now();

    // Build headers
    const headers = this.buildHeaders(request.headers, request.bodyType);

    // Build body
    const body = this.buildBody(request);

    // Make HTTP call
    const httpCall = this.http.request(request.method, request.url, {
      headers,
      body,
      observe: 'response',
      responseType: 'text'
    });

    return httpCall.pipe(
      map((response: any) => {
        const endTime = performance.now();
        const timing = endTime - startTime;

        // Parse response headers
        const responseHeaders: Record<string, string> = {};
        response.headers.keys().forEach((key: string) => {
          responseHeaders[key] = response.headers.get(key) || '';
        });

        // Try to parse body as JSON
        let parsedBody: any;
        try {
          parsedBody = JSON.parse(response.body);
        } catch (e) {
          parsedBody = response.body;
        }

        return {
          status: response.status,
          statusText: response.statusText,
          headers: responseHeaders,
          body: parsedBody,
          timing: Math.round(timing),
          errorType: 'NONE' as ErrorType,
          timestamp: Date.now()
        };
      }),
      catchError((error: HttpErrorResponse) => {
        const endTime = performance.now();
        const timing = endTime - startTime;

        const errorType = this.categorizeError(error);
        const errorMessage = this.getErrorMessage(error, errorType);

        // Parse error response headers
        const responseHeaders: Record<string, string> = {};
        if (error.headers) {
          error.headers.keys().forEach((key: string) => {
            responseHeaders[key] = error.headers.get(key) || '';
          });
        }

        // Try to parse error body
        let parsedBody: any;
        try {
          parsedBody = typeof error.error === 'string' ? JSON.parse(error.error) : error.error;
        } catch (e) {
          parsedBody = error.error || error.message;
        }

        const response: ApiResponse = {
          status: error.status || 0,
          statusText: error.statusText || 'Unknown Error',
          headers: responseHeaders,
          body: parsedBody,
          timing: Math.round(timing),
          errorType,
          errorMessage,
          timestamp: Date.now()
        };

        // Return as observable with error response
        return throwError(() => response);
      })
    );
  }

  private buildHeaders(headerArray: KeyValue[], bodyType: string): HttpHeaders {
    let headers = new HttpHeaders();

    // Add custom headers
    headerArray.filter(h => h.enabled !== false && h.key && h.value).forEach(header => {
      headers = headers.set(header.key, header.value);
    });

    // Set content-type based on body type if not already set
    if (bodyType === 'json' && !headers.has('Content-Type')) {
      headers = headers.set('Content-Type', 'application/json');
    }

    return headers;
  }

  private buildBody(request: ApiRequest): any {
    if (request.bodyType === 'json' && request.jsonBody) {
      return request.jsonBody;
    } else if (request.bodyType === 'form-data' && request.formData) {
      const formData = new FormData();
      request.formData
        .filter(item => item.enabled !== false && item.key)
        .forEach(item => {
          formData.append(item.key, item.value);
        });
      return formData;
    }
    return null;
  }

  private categorizeError(error: HttpErrorResponse): ErrorType {
    // CORS errors typically have status 0 and specific error messages
    if (error.status === 0) {
      if (error.error instanceof ProgressEvent || 
          error.message.toLowerCase().includes('cors') ||
          error.message.toLowerCase().includes('unknown')) {
        return 'CORS';
      }
      return 'NETWORK';
    }

    // HTTP error codes
    if (error.status >= 400 && error.status < 500) {
      return 'HTTP_4XX';
    }

    if (error.status >= 500) {
      return 'HTTP_5XX';
    }

    // Timeout errors
    if (error.message && error.message.toLowerCase().includes('timeout')) {
      return 'TIMEOUT';
    }

    return 'UNKNOWN';
  }

  private getErrorMessage(error: HttpErrorResponse, errorType: ErrorType): string {
    switch (errorType) {
      case 'CORS':
        return 'CORS Error: The server did not include the required CORS headers. This might be due to:\n' +
               '• Missing Access-Control-Allow-Origin header\n' +
               '• Invalid CORS configuration on the server\n' +
               '• Request blocked by browser security policy';
      case 'NETWORK':
        return 'Network Error: Unable to reach the server. Check your internet connection or verify the URL.';
      case 'HTTP_4XX':
        return `Client Error ${error.status}: ${error.statusText || 'Bad Request'}`;
      case 'HTTP_5XX':
        return `Server Error ${error.status}: ${error.statusText || 'Internal Server Error'}`;
      case 'TIMEOUT':
        return 'Timeout Error: The request took too long to complete.';
      default:
        return `Error: ${error.message || 'Unknown error occurred'}`;
    }
  }
}
