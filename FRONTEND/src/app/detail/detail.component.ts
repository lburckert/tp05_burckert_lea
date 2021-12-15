import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';

// lier le service Products
import { ProductsService } from '../products.service';
// lier class Product
import { Product } from '../../../shared/models/product';
import { Observable } from 'rxjs';
import { AddProduct } from 'shared/actions/product-action';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

product$!: Observable<Product[]>;
  id: number = 0;

  constructor(private route: ActivatedRoute, private productService: ProductsService, private store: Store) {

    this.id = this.route.snapshot.params.id;
    console.log(this.id);

    if (!this.product$) {
      this.product$ = this.productService.getProduct(this.id)
    }
  }

  AddProductToCart(product : Product) {

    this.store.dispatch(new AddProduct(product));
    console.log(product);
  }

  ngOnInit(): void {

  }
}

