import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';
  isSignup: boolean = false;

  constructor(private http: HttpClient, private router: Router) { }
 
  ngOnInit() {}

  onSignupClick(event: Event) {
    event.preventDefault();
    this.isSignup = true;
  }

  onSigninClick(event: Event) {
    event.preventDefault();
    this.isSignup = false;
  }

  onResetClick(event: Event) {
    event.preventDefault();
    this.username = '';
    this.password = '';
  
  }

  onSubmit() {
    if (this.isSignup) {
      // 회원가입 로직 처리
      // 여기에 로그인 처리 로직을 추가
    // Prepare JSON data
    const requestData = {
      username: this.username,
      password: this.password
    };

    // Send JSON data to the server
    this.http.post('http://34.47.98.246/ai_regist.php', requestData)
      .subscribe(
        (response) => {
          // Handle the server response if needed
          console.log('Server Response:', response);
        },
        (error) => {
          // Handle error if the request fails
          console.error('Error:', error);
        }
      );
    } else {
      // 로그인 로직 처리
      const requestData = {
        username: this.username,
        password: this.password
      };
      // 로그인 API 호출 로직
      this.http.post('http://34.47.98.246/ai_login.php', requestData)
        .subscribe(
          (response) => {
            this.router.navigate(['/home']);
            console.log('Server Response:', response);
          },
          (error) => {
            console.error('Error:', error);
          }
        );
    }
  }
}
