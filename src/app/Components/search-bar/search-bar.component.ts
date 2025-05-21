import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  searchTerm!: string;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  // method to call and retrieve formatted search term from product service
  formatInput(searchTerm: string): string {
    this.searchTerm = this.productService.formatSearchTerm(searchTerm);
    // console.log(this.searchTerm);
    return this.searchTerm;
  }


}
