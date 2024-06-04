import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {
  private apiUrl = 'https://api.openai.com/v1/chat/completions';
  private apiKey = ''; 

constructor(private http: HttpClient) {}

  getChatResponse(prompt: string, temperature: number = 0.7, maxTokens: number = 1000): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });

    const body = {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: temperature,
      max_tokens: maxTokens
    };

    return this.http.post<any>(this.apiUrl, body, { headers });
  }

  createPromptTemplate(company: string, position: string, question: string, experience: string, maxLength: number): string {
    return `
      기업 입사용 자기소개서를 작성해야합니다.
      답변해야하는 질문과 이에 관련된 유저의 경험을 참고해서 자기소개서를 작성해주세요.
      문단별로 소제목을 작성해주세요.
      반드시 ${maxLength} 단어 이내로 작성해야 합니다.
      ---
      지원 회사: ${company}
      지원 직무: ${position}
      질문: ${question}
      관련 경험: ${experience}
      ---
    `.trim();
  }
}
