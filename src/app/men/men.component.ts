import { Component, OnInit, ViewChild } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { AllComponent } from '../all/all.component';
import { SharedService } from '../shared/shared.service';

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
  getProduct: any;

  @ViewChild(AllComponent) allcomp: AllComponent;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private api: ApiService,
    private shared: SharedService
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
      console.log(this.products, 'this.products');
    });
  }
  cart(index: any) {
    this.getProduct = [];
    this.api
      .GetProductById(this.products[index].productid)
      .subscribe((res: any) => {
        console.log(res, 'res');
        this.getProduct = res;
        console.log(this.getProduct, 'normal');
        console.log(JSON.stringify(this.getProduct), 'str');
        this.shared.setMessage(this.getProduct);
        this.router.navigate(['cart']);
        console.log(this.getProduct, 'this.getProduct');
      });
  }
}
