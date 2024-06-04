import { Component } from '@angular/core';
import { OpenaiService } from '../openai.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  prompt: string = '';
  response: string = '';
  temperature: number = 0.7;
  maxTokens: number = 1000;
  company: string = '';
  position: string = '';
  question: string = '';
  experience: string = '';
  maxLength: number = 3000;

  constructor(private openaiService: OpenaiService,private http: HttpClient, private router: Router) {}

  getResponse() { 
    const promptTemplate = this.openaiService.createPromptTemplate(this.company, this.position, this.question, this.experience, this.maxLength);

    this.openaiService.getChatResponse(promptTemplate, this.temperature, this.maxTokens).subscribe(
      (res) => {
        this.response = res.choices[0].message.content;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  addToDatabase() {
    const data = {
      company: this.company,
      position: this.position,
      question: this.question,
      experience: this.experience,
      response: this.response // 지피티 대답 
    };


    this.http.post<any>('http://34.47.98.246/ai_answer.php', data)
      .subscribe(response => {
        console.log(response);
        this.response = response.message;
      }, error => {
        console.error('Error:', error); 
      });
  }

  goToBoard(){
    this.router.navigate(['./ai-list']); 

  }
  
}


