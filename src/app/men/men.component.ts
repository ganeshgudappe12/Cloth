import { Component, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-men',
  templateUrl: './men.component.html',
  styleUrls: ['./men.component.css'],
})
export class MenComponent implements OnInit {
  value: number = 100;
  options: Options = {
    floor: 0,
    ceil: 200,
  };
  products: any[] = [];
  size: any[] = [];
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }
  // getProducts() {
  //   fetch('http://fakestoreapi.com/products').then((response) =>
  //     response.json().then((data) => {
  //       this.products = data;
  //     })
  //   );
  //   console.log(this.products, 'this.products');
  // }
  getProducts() {
    this.api.getProduct('men').subscribe((res: any) => {
      console.log(res, 'res');
      this.products = res;
      console.log(this.size, 'this.products');
    });
  }
}
