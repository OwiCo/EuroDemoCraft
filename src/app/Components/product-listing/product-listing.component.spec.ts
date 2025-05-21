import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListingComponent } from './product-listing.component';
import { ProductService } from 'src/app/Services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { Product } from 'src/app/Models/product';
import { of } from 'rxjs';

describe('ProductListingComponent', () => {
  let component: ProductListingComponent;
  let fixture: ComponentFixture<ProductListingComponent>;
  let service: ProductService;
  let product: Product;
  let httpClientSpy: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ProductListingComponent],
      providers: [ProductService],
    }).compileComponents();

    product = {
      asin: 'ABCD1234',
      title: 'memory card',
      price: {
        value: 3.99,
        currency: 'USD',
      },
      image: 'picOfMemCard',
    };
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return undefined, value not set in service by search-bar component', () => {
    component.ngOnInit();
    expect(component.searchTerm).toBeUndefined();
  });

  // it('should get the product listing', () => {
  //   // let product: Product = {
  //   //   id: 'ABCD1234',
  //   //   title: 'memory card',
  //   //   price: {
  //   //     value: 3.99,
  //   //     currency: 'USD',
  //   //   },
  //   //   image: 'picOfMemCard',
  //   // };
  //   httpClientSpy.get.and.returnValue(of(product));
  //   component.getProductListing('memory card');
  //   let list = fixture.nativeElement as HTMLElement;
  //   expect(list.querySelector('p')?.innerText).toContain('memory card');
  // });
});
