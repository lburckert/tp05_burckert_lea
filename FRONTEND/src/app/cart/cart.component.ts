import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RemoveProduct } from 'shared/actions/product-action';
import { Product } from 'shared/models/product';
import { ProductState } from 'shared/states/product-state';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  @Select(ProductState.getListProducts)
  products$!: Observable<Array<Product>>;

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  RemoveProductToCart(prod: Product){
    this.store.dispatch(new RemoveProduct(prod));
  }
}
