import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditBeneficiaryComponent } from './form-edit-beneficiary.component';

describe('FormEditBeneficiaryComponent', () => {
  let component: FormEditBeneficiaryComponent;
  let fixture: ComponentFixture<FormEditBeneficiaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormEditBeneficiaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormEditBeneficiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
