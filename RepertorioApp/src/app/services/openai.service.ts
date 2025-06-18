import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OpenAIService {
  // private apiUrl = 'https://api.openai.com/v1/chat/completions';
  // private apiKey =
  //   ''; // Coloque sua chave da OpenAI aqui

  constructor(private http: HttpClient) {}

  // gerarRepertorio(prompt: string) {
  //   const body = {
  //     model: 'gpt-4o',
  //     messages: [
  //       {
  //         role: 'system',
  //         content:
  //           'Você é um assistente de música cristã. Seu papel é montar repertórios inteligentes para cultos, baseado no tema e/ou sub-tema fornecido.',
  //       },
  //       {
  //         role: 'user',
  //         content: prompt,
  //       },
  //     ],
  //     temperature: 0.7,
  //   };

  //   return this.http.post(this.apiUrl, body, {
  //     headers: {
  //       Authorization: `Bearer ${this.apiKey}`,
  //       'Content-Type': 'application/json',
  //     },
  //   });
  // }

  generateRepertorioFake(tema: string, subtema: string): Observable<string> {
    const repertorioSimulado = `
  Aqui está um repertório sugerido com base em "${tema}" e "${subtema}":

  1. Ao Único
  2. Grande é o Senhor
  3. Tu És Fiel
  4. Santo Espírito
  5. Me Derramar

  (Repertório gerado automaticamente com base nos critérios fornecidos.)
  `;

    return of(repertorioSimulado).pipe(delay(1000)); // simula tempo de resposta
  }
}
