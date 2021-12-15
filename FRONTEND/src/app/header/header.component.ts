import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { ProductState } from 'shared/states/product-state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  //@Select(ProductState.getNbProducts) nbPaniers!: number;

  @Select(ProductState.getNbProducts) nbPanier$! : Observable<number>;

  constructor() { }

  ngOnInit(): void {
  }

}
