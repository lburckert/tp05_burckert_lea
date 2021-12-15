import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Product } from 'shared/models/product';

import { ProductsService } from '../products.service';

@Component({
  selector: 'app-searchengine',
  templateUrl: './searchengine.component.html',
  styleUrls: ['./searchengine.component.scss']
})
export class SearchengineComponent implements OnInit {

  ngOnInit(): void {
  }


/*   FILTRE DEPLACE DANS LE COMPOSANT PRODUCT */

/*
  products?: Product[];

  productMinPrice = new FormControl("");
  productMaxPrice = new FormControl("");
  productName = new FormControl("");

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    // Récupération de la liste des produits de manière asynchrone
    this.productService.getProducts().subscribe(res => {
      this.products = res;
    });
  }

  //#region Business Logic
  GetProductsFromCriteria(): void {
    let tempProductList: Product[] = [];
    let finalProductList: Product[] = [];
    
    // Récupération de la liste complète des produits
    this.productService.getProducts().subscribe(res => {
      tempProductList = res;
      // Itération sur les produits pour sélectionner ceux qui répondent au critères
      tempProductList.forEach(product => {
        console.log(product);
        if (product.price >= this.productMinPrice.value || this.productMinPrice.value === "") {
          console.log("  - Prix min = OK");
          if (product.price <= this.productMaxPrice.value || this.productMaxPrice.value === "") {
            console.log("  - Prix max = OK");
            if (product.name.includes(this.productName.value.trim()) || this.productName.value.trim() === "") {
              console.log("  - Nom = OK");
              finalProductList.push(product);
            }
          }
        }
      });
      this.products = finalProductList;

      onApplyFilter(this.productName, this.productMinPrice, this.productMaxPrice)
    });
  }

  OnResetButtonClick(): void {
    this.productMinPrice.reset("");
    this.productMaxPrice.reset("");
    this.productName.reset("");
  }

  OnValidateButtonClick(): void {
    console.log(this.productMinPrice.value);
    console.log(this.productMaxPrice.value);
    console.log(this.productName.value);
    this.GetProductsFromCriteria();
  }
}

function onApplyFilter(productName: FormControl, productMinPrice: FormControl, productMaxPrice: FormControl) {
}
 */

}