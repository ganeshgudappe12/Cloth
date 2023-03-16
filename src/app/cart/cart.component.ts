import { Component, OnInit, Input } from '@angular/core';
import {} from 'module';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../shared/shared.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [SharedService],
})
export class CartComponent implements OnInit {
  productDetails: any;
  dummyArray: any[] = [];
  param: any;
  image: string = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private shared: SharedService,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.param = this.shared.getMessage();
      console.log(this.param, 'param');

      this.getProductDetailsById(this.param.productid);
      this.dummyArray = this.param;
    }, 300);
    this.check();
  }

  getProductDetailsById(id: any) {
    console.log(id, 'idfn');
    this.api.GetProductById(id).subscribe((res: any) => {
      console.log(res, 'res');
      this.productDetails = res;
      console.log(this.productDetails, 'this.productDetails');
    });
  }
  selectImg(index: any) {
    this.image = index;
  }
  check() {
    console.log(this.productDetails, 'thi');
  }
}
