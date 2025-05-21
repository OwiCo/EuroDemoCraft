import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LoginCustomerComponent } from './login-customer.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerService } from '../../Services/customer.service';
//import { httpClientInMemBackendServiceFactory } from 'angular-in-memory-web-api';


describe('Component: Login', () => {

  let component: LoginCustomerComponent;
  let fixture: ComponentFixture<LoginCustomerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule],
      declarations: [LoginCustomerComponent]
    });

    // create component and test fixture
    fixture = TestBed.createComponent(LoginCustomerComponent);
    TestBed.configureTestingModule({ providers: [CustomerService] });



    // get test component from the fixture

    component = fixture.componentInstance;

    //component.ngOnInit();
    // component.customerlist = [
    //   { id: 1, firstName: "mark", lastName: "Moore" },
    //   { id: 2, firstName: "Jeffrey", lastName: "Moore" },
    //   { id: 3, firstName: "Brian", lastName: "Stockton" },
    //   { id: 4, firstName: 'john5', lastName: 'turning' }
    // ];
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
  // it('fname is not defined', () => {
  //   expect(component.fname).toBeDefined();
  // });
  // it('lname is not defined', () => {
  //   expect(component.lname).toBeDefined();
  // });


});