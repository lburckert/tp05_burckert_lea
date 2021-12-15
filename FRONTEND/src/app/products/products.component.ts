import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';

// lier le service Products
import { ProductsService } from '../products.service';
// lier class Product
import { Product } from '../../../shared/models/product';
import { Observable } from 'rxjs';
import { AddProduct } from 'shared/actions/product-action';
import { FormControl } from '@angular/forms';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {

  products$!: Observable<Array<Product>>;

  productMinPrice = new FormControl("");
  productMaxPrice = new FormControl("");
  productName = new FormControl("");

  observer: any;

  constructor(private productService: ProductsService, private store: Store) { }

  ngOnInit(): void {
    
    this.products$ = this.productService.getProducts();

    if (this.observer) {
      this.observer.unsubscribe();
    }
    this.observer = this.products$.subscribe(
      (value) => {
        console.log(value);
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log('End');
      }
    );
  }

  AddProductToCart(product : Product) {

    this.store.dispatch(new AddProduct(product));
    console.log(product);
  }

  onApplyFilter() {
    if(this.productName.value != "" && this.productMinPrice.value != "" && this.productMaxPrice.value != ""){
      this.products$ = this.productService.getProducts().pipe(map(products => products.filter(prod => (prod.name.toLowerCase().includes(this.productName.value.toLowerCase().trim()) && prod.price >= this.productMinPrice.value && prod.price <= this.productMaxPrice.value))));
    }

    else if(this.productName.value != "" && this.productMinPrice.value != ""){
      this.products$ = this.productService.getProducts().pipe(map(products => products.filter(prod => (prod.name.toLowerCase().includes(this.productName.value.toLowerCase().trim()) && prod.price >= this.productMinPrice.value))));
    }
    else if(this.productName.value != "" && this.productMaxPrice.value != ""){
      this.products$ = this.productService.getProducts().pipe(map(products => products.filter(prod => (prod.name.toLowerCase().includes(this.productName.value.toLowerCase().trim()) && prod.price <= this.productMaxPrice.value))));
    }

    else if(this.productMinPrice.value != "" && this.productMaxPrice.value != ""){
      this.products$ = this.productService.getProducts().pipe(map(products => products.filter(prod => (prod.price === this.productMinPrice.value && prod.price === this.productMaxPrice.value))));
    }
    
    else if(this.productName.value != ""){
      this.products$ = this.productService.getProducts().pipe(map(products => products.filter(prod => prod.name.toLowerCase().includes(this.productName.value.toLowerCase().trim()))));
    }
    else if(this.productMinPrice.value != ""){
      this.products$ = this.productService.getProducts().pipe(map(products => products.filter(prod => prod.price >= this.productMinPrice.value)));
    }
    else if(this.productMaxPrice.value != ""){
      this.products$ = this.productService.getProducts().pipe(map(products => products.filter(prod => prod.price <= this.productMaxPrice.value)));
    }

    else{
      this.products$ = this.productService.getProducts();
    }
  }

  OnResetButtonClick(): void {
    this.productMinPrice.reset("");
    this.productMaxPrice.reset("");
    this.productName.reset("");
  }
}
