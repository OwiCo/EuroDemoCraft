import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterCustomerComponent } from './register-customer.component';


describe('Component: Login', () => {

  let component: RegisterCustomerComponent;
  let fixture: ComponentFixture<RegisterCustomerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule],
      declarations: [RegisterCustomerComponent]
    });

    // create component and test fixture
    fixture = TestBed.createComponent(RegisterCustomerComponent);

    // get test component from the fixture
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('fname is not defined', () => {
    expect(component.fname).toBeDefined();
  });
  it('lname is not defined', () => {
    expect(component.lname).toBeDefined();
  });
  // it('ngstyles visibility is not defined', () => {
  //   //component.lname = 'mark2';
  //   // component.authForm.controls['lname'].
  //   component.customerlist;
  //   expect(component.registercustomer).toBeDefined();
  // });
  it('customer is selected is not defined', () => {
    expect(sessionStorage.getItem('user')).toBeDefined();
  });

});