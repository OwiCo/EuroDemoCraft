import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Product } from '../Models/product';

import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let httpClientSpy: { get: jasmine.Spy };
  let callListSpy: any;
  let productlistSpy: any;
  let product: Product;
  let httpTestingController: HttpTestingController;

  let searchTerm = 'lemon';
  const expectedProducts: Product[] = [
    {
      asin: 'ABCD1234',
      title: 'lemonade',
      price: { value: 3.99, currency: 'USD' },
      image: 'picOfLemonade',
    },
    {
      asin: 'ABCD5678',
      title: 'lemon',
      price: { value: 1.99, currency: 'USD' },
      image: 'picOfLemon',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ProductService);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new ProductService(httpClientSpy as any);

    // httpTestingController = TestBed.inject(HttpTestingController);
    // product = {
    //   id: 'ABCD1234',
    //   title: 'lemonade',
    //   price: { value: 3.99, currency: 'USD' },
    //   image: 'picOfLemonade',
    // };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('formatSearchTerm(): should format the search term', () => {
    let searchTerm = service.formatSearchTerm('nintendo switch');
    expect(searchTerm).toEqual('nintendo+switch');
  });

  it('should call the getProductListing() method once', () => {
    callListSpy = spyOn(service, "getProductListing").and.returnValue(of());
    let searchTerm = "lemon";
    service.getProductListing(searchTerm);
    expect(callListSpy).toHaveBeenCalled();
  });

  // it('getProductListing(): should get the list of products', () => {
  //   httpClientSpy.get.and.returnValue(of(expectedProducts));

  //   const result = service.getProductListing(searchTerm);
  //   result.subscribe(products => {
  //       // retrievedProducts = products;
  //       expect(products).toEqual(expectedProducts);
  //     });
  //   // console.log(result);
  // });
});
