import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateConcourComponent } from './create-concour.component';

describe('CreateConcourComponent', () => {
  let component: CreateConcourComponent;
  let fixture: ComponentFixture<CreateConcourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateConcourComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateConcourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
