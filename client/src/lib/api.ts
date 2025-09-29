// API service layer for backend integration

const API_BASE_URL = '';

interface HealthMetrics {
  hairHealth: number;
  skinHealth: number;
  bodyHealth: number;
  mindHealth: number;
  dryPercentage: number;
  oilPercentage: number;
}

interface QuizSubmissionResponse {
  success: boolean;
  data: {
    id: string;
    healthMetrics: HealthMetrics;
  };
}

interface ImageUploadResponse {
  success: boolean;
  data: {
    url: string;
    type: string;
    originalName: string;
    size: number;
  };
}

interface QRCodeResponse {
  success: boolean;
  data: {
    qrCode: string;
    qrData: any;
    expiresAt: string;
  };
}

export class WellnessAPI {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`API Error: ${response.status} - ${error}`);
    }

    return response.json();
  }

  async submitQuiz(quizData: any): Promise<QuizSubmissionResponse> {
    return this.request<QuizSubmissionResponse>('/api/quiz/submit', {
      method: 'POST',
      body: JSON.stringify(quizData),
    });
  }

  async uploadImage(file: File, type: 'scalp' | 'face' | 'body'): Promise<ImageUploadResponse> {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('type', type);

    const response = await fetch(`${API_BASE_URL}/api/images/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Upload Error: ${response.status} - ${error}`);
    }

    return response.json();
  }

  async generateQRCode(quizResponseId: string, userInfo: any): Promise<QRCodeResponse> {
    return this.request<QRCodeResponse>('/api/qr/generate', {
      method: 'POST',
      body: JSON.stringify({ quizResponseId, userInfo }),
    });
  }

  async getQuizResponse(id: string): Promise<any> {
    return this.request(`/api/quiz/${id}`);
  }
}

export const wellnessAPI = new WellnessAPI();