import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CustomerService } from './customer.service';


describe('CustomerService', () => {
  let service: CustomerService;
  let valueServiceSpy: jasmine.SpyObj<CustomerService>;


  beforeEach(() => {
    const spy = jasmine.createSpyObj('CustomerService', ['CustomerList']);
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule], providers: [CustomerService] });
  });

  it('should be created', () => {
    service = TestBed.inject(CustomerService);
    expect(service.CustomerList).toBeDefined();
  });
});
