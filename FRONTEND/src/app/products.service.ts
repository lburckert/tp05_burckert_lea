import { Injectable } from '@angular/core';

import { Product } from '../../shared/models/product';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  public productsSubject : Subject<Array<Product>> = new Subject<Array<Product>>();
  products! : Array<Product>;
  allProducts! : Array<Product>;

  constructor(private httpClient: HttpClient) { }

  public getProducts(): Observable<Array<Product>> {
      return this.httpClient.get<Array<Product>>(environment.baseUrl) ;
  }

  public getProduct(productId: number) {
    const res = this.getProducts().pipe(
      map(lstProducts => lstProducts.filter(product => product.id == productId))
    );
    return res;
  }

/*   public getAllProducts(): Observable<Array<Product>> {
    return this.httpClient.get<Array<Product>>(environment.baseUrl);
  } */

  public setProducts(data: any) : void {
    this.products = this.allProducts.slice();
    if (data["name"] !== "all") {
      this.products = this.products.filter(product => product.name === data["name"]);
    }
    if (data["brand"] !== "all") {
      this.products = this.products.filter(product => product.brand === data["brand"]);
    }
    if (data["price"] !== "all") {
      this.products = this.products.filter(product => product.price === data["price"]);
    }
    if (data["date"] !== "all") {
      this.products = this.products.filter(product => product.date === data["date"]);
    }
    if (data["description"] !== "all") {
      this.products = this.products.filter(product => product.description === data["description"]);
    }
    if (data["shortdescription"] !== "all") {
      this.products = this.products.filter(product => product.shortdescription === data["shortdescription"]);
    }
    if (data["pages"] !== "all") {
      this.products = this.products.filter(product => product.pages === data["pages"]);
    }
    if (data["ean"] !== "all") {
      this.products = this.products.filter(product => product.ean === data["ean"]);
    }
    if (data["picture"] !== "all") {
      this.products = this.products.filter(product => product.picture === data["picture"]);
    }
    if (data["logo"] !== "all") {
      this.products = this.products.filter(product => product.logo === data["logo"]);
    }
    
    this.emitProductSubject();
  }

  private emitProductSubject() {
    // slice : extrait le texte d'une chaine de caractères et retourne une nouvelle chaîne de caractères
    this.productsSubject.next(this.products.slice());
  }
}
