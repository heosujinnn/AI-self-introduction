import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ai-list',
  templateUrl: './ai-list.page.html',
  styleUrls: ['./ai-list.page.scss'],
})
export class AiListPage implements OnInit {

  data: any[] = []; // 데이터 배열 정의

  constructor(
    private http: HttpClient, 
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.loadData();
  }

  ionViewWillEnter() {
    this.loadData();  // 데이터를 다시 로드
  }

  loadData() {
    this.http.get<any[]>('http://34.47.98.246/ai_list.php').subscribe(
      (response) => {
        this.data = response;
      },
      (error) => {
        console.error('Error fetching data: ', error);
      }
    );
  }
  deleteItem(id: number): void {
    console.log(id); 
    this.http.post<any>('http://34.47.98.246/ai_delete.php', { id: id }).subscribe(
        (response) => {
            console.log(response); 
            console.log(id);
    
        },
        (error) => {
            console.error('Error deleting item: ', error);
        }
    );
}

  
  
  showDetails(item: any) {
    console.log('Selected item:', item);
  }

  goToMenuPage() {
    this.router.navigate(['/home']); 
  }
}
