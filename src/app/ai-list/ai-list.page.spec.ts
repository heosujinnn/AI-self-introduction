import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AiListPage } from './ai-list.page';

describe('AiListPage', () => {
  let component: AiListPage;
  let fixture: ComponentFixture<AiListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AiListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
