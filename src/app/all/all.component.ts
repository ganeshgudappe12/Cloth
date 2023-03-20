import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';
import { SharedService } from '../shared/shared.service';
@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css'],
})
export class AllComponent implements OnInit {
  carousel: any[] = [];
  mapURL: SafeResourceUrl;
  menProducts: any[] = [];
  kidProducts: any[] = [];
  womenProducts: any[] = [];
  size: any[] = [];
  getProduct: any;
  searchtitle: any = '';

  msg: string = 'hey im all compoo';
  constructor(
    public router: Router,
    private api: ApiService,
    public sanitize: DomSanitizer,
    private shared: SharedService
  ) {}

  ngOnInit(): void {
    console.log(
      JSON.parse(atob(sessionStorage.getItem('Roll')!)),
      'rollllllllll'
    );
    this.getCarousel();
    this.getProducts();
  }

  getCarousel() {
    this.api.getCarousel().subscribe((res: any) => {
      console.log(res, 'res');
      this.carousel = res;
      console.log(this.carousel, 'this.carousel');
    });
  }
  getSantizeUrl(url: string) {
    return this.sanitize.bypassSecurityTrustUrl(url);
  }
  getProducts() {
    this.api.getProduct('').subscribe((res: any) => {
      console.log(res, 'res');
      //this.products = res;
      res.forEach((element: any) => {
        if (element.categoryname == 'Men') {
          this.menProducts.push({
            productid: element.productid,
            title: element.title,
            size: element.size,
            price: element.price,
            categoryname: element.categoryname,
            image: element.image,
          });
        } else if (element.categoryname == 'Women') {
          this.womenProducts.push({
            productid: element.productid,
            title: element.title,
            size: element.size,
            price: element.price,
            categoryname: element.categoryname,
            image: element.image,
          });
        } else if (element.categoryname == 'Kids') {
          this.kidProducts.push({
            productid: element.productid,
            title: element.title,
            size: element.size,
            price: element.price,
            categoryname: element.categoryname,
            image: element.image,
          });
        }
      });
    });
    console.log(this.menProducts, 'men');
    console.log(this.kidProducts, 'kid');
    console.log(this.womenProducts, 'women');
  }
  cart(index: any) {
    this.menProducts[index];
    console.log(this.menProducts[index], 'this.menProducts[index]');

    this.getProduct = [];
    this.api
      .GetProductById(this.menProducts[index].productid)
      .subscribe((res: any) => {
        console.log(res, 'res');
        this.getProduct = res;
        console.log(this.getProduct, 'normal');
        console.log(JSON.stringify(this.getProduct), 'str');
        this.shared.setMessage(this.getProduct);
        this.router.navigate(['cart']);
        console.log(this.getProduct, 'this.getProduct');
      });
    //if (this.getProduct.length > 0)
  }
}
