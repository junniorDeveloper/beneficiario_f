import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBeneficiaryComponent } from './form-beneficiary.component';

describe('FormBeneficiaryComponent', () => {
  let component: FormBeneficiaryComponent;
  let fixture: ComponentFixture<FormBeneficiaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormBeneficiaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormBeneficiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
