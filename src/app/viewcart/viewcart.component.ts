import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewcart',
  templateUrl: './viewcart.component.html',
  styleUrls: ['./viewcart.component.css'],
})
export class ViewcartComponent implements OnInit {
  qty: any;
  constructor() {}

  ngOnInit(): void {}
  Plus() {
    var num1 = (document.getElementById('number') as HTMLInputElement).value;
    //this.qty = this.qty + num1;
    console.log(num1, 'num1');
    console.log(event, 'event.target.value');
  }
}
