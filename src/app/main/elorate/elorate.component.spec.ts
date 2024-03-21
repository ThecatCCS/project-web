import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElorateComponent } from './elorate.component';

describe('ElorateComponent', () => {
  let component: ElorateComponent;
  let fixture: ComponentFixture<ElorateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElorateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ElorateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
