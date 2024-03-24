import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcoursListComponent } from './concours-list.component';

describe('ConcoursListComponent', () => {
  let component: ConcoursListComponent;
  let fixture: ComponentFixture<ConcoursListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConcoursListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConcoursListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
