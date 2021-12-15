import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-recap',
  templateUrl: './recap.component.html',
  styleUrls: ['./recap.component.scss']
})
export class RecapComponent implements OnInit {

  constructor() { }

  @Input() firstname : string = "none";
  @Input() lastname : string = "none";
  @Input() username : string = "none";
  @Input() civility : string = "none";
  @Input() address : string = "none";
  @Input() city : string = "none";
  @Input() zip : string = "none";
  @Input() state : string = "none";
  @Input() email : string = "none";
  @Input() phone : string = "none";


  ngOnInit(): void {
  }
}
