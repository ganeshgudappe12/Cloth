import { Component, OnInit } from '@angular/core';
//import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Console } from 'console';
declare var $: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  userform: FormGroup;
  productform: FormGroup;
  carouselform: FormGroup;

  roll: any = [];
  Category: any = [];
  allProduct: any = [];
  searchtitle: any = '';
  imageUrl1: any;
  imageUrl2: any;
  imageUrl3: any;
  imageUrl4: any;
  fileToUpload: any;
  mainImageUrl: any;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.carouselform = this.formBuilder.group({
      carousel: ['', [Validators.required]],
    });
    this.userform = this.formBuilder.group({
      fname: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      uid: ['', [Validators.required]],
      pwd: ['', [Validators.required]],
      role: ['', [Validators.required]],
      cnfpwd: ['', [Validators.required]],
      date: [''],
      gender: [''],
    });

    this.productform = this.formBuilder.group({
      pname: ['', [Validators.required]],
      category: [''],
      subcategory: [''],
      price: [''],
      qty: [''],
      brand: [''],
      color: [''],
      img1: [''],
      img2: [''],
      img3: [''],
      img4: [''],
      mainimg: [''],
      s: [''],
      m: [''],
      l: [''],
      xl: [''],
    });

    this.userRoll();
    this.getCategory();
  }

  addUser() {
    if (this.userform.value.pwd == this.userform.value.cnfpwd) {
      const userdata = {
        firstname: this.userform.value.fname,
        lastname: this.userform.value.lname,
        username: this.userform.value.uid,
        password: this.userform.value.pwd,
        role: this.userform.value.role,

        dob: this.userform.value.date,
        gender: this.userform.value.gender,
      };
      console.log(userdata, 'userdata');

      this.api.addUserApi(userdata).subscribe((res: any) => {
        console.log(res, 'res');
        if (res == 'User Added successfully') {
          this.toastr.success('User Added successfully!!');
        } else {
          this.toastr.warning('User Not Added!!');
        }
      });

      //this.userform.reset();
    } else {
      this.toastr.warning('password did not matched!!');
    }
  }
  userRoll() {
    this.api.roll().subscribe((data: any) => {
      data.forEach((element: any) => {
        this.roll.push({
          rollid: element.roll_Id,
          rollname: element.roll_Name,
        });
      });
    });
  }
  addProduct() {
    let size = '';
    if (this.productform.value.S == true) {
      size += 'S' + ',';
    }
    if (this.productform.value.M == true) {
      size += 'M' + ',';
    }
    if (this.productform.value.L == true) {
      size += 'L' + ',';
    }
    if (this.productform.value.XL == true) {
      size += 'XL' + ',';
    }
    size = size.slice(0, -1);
    let imgpath = 'assets/productimg/';
    var file1 = this.productform.value.img1.split('\\');
    var file2 = this.productform.value.img2.split('\\');
    var file3 = this.productform.value.img3.split('\\');
    var file4 = this.productform.value.img4.split('\\');
    var file5 = this.productform.value.mainimg.split('\\');

    var imagename1 = file1[2].split('.');
    var image2 = file2[2].split('.');
    var image3 = file3[2].split('.');
    var image4 = file4[2].split('.');
    var image5 = file5[2].split('.');

    const productData = {
      productname: this.productform.value.pname,
      category: this.productform.value.category,
      subcategory: this.productform.value.subcategory,
      price: this.productform.value.price,
      quantity: this.productform.value.qty,
      brand: this.productform.value.brand,
      color: this.productform.value.color,
      img1: imgpath + file1[2],
      img2: imgpath + file2[2],
      img3: imgpath + file3[2],
      img4: imgpath + file4[2],
      mainimg: imgpath + file5[2],
      size: size,
      imagename: imagename1[0],
    };
    console.log(productData, 'productDta');
    this.api.AddProducts(productData).subscribe((res: any) => {
      console.log(res, 'res');
      if (res == 'Product inserted successfully') {
        this.toastr.success('Product inserted successfully...!!');
      } else {
        this.toastr.warning('Product Not inserted...!!');
      }
    });
  }
  addCarousel() {
    let imgpath = 'assets/carousel/';
    var carousel1 = this.carouselform.value.carousel.split('\\');
    const Carousel = {
      carouselpath: imgpath + carousel1[2],
    };
    console.log(Carousel, 'Carousel');

    this.api.addCarousel(Carousel).subscribe((res: any) => {
      console.log(res, 'res');
      if (res == 'Carousel inserted successfully') {
        this.toastr.success('Carousel inserted successfully...!!');
      } else {
        this.toastr.warning('Carousel Not inserted...!!');
      }
    });
  }

  getCategory() {
    this.api.getCategory().subscribe((res: any) => {
      console.log(res, 'res');
      this.Category = res;
      console.log(this.Category, 'this.carousel');
    });
  }
  productDetails() {
    $('#productDetails').modal('show');
    this.allProducts();
  }
  productModalClose() {
    $('#productDetails').modal('hide');
  }
  Carousel() {
    $('#add-carousel').modal('show');
  }
  carouselClose() {
    $('#add-carousel').modal('hide');
  }
  User() {
    $('#addproduct').modal('show');
  }
  closeUserModal() {
    $('#addproduct').modal('hide');
  }
  userAdd() {
    $('#adduser').modal('show');
  }
  userModalClose() {
    $('#adduser').modal('hide');
  }
  allProducts() {
    this.api.getProduct('all').subscribe((res: any) => {
      console.log(res, 'res');
      this.allProduct = res;
    });
    console.log(this.allProduct, 'this.allProduct');
  }
  editFieldValue(index: any) {
    this.allProduct[index].disabled = false;
  }
  updateValue(index: any) {
    this.allProduct[index];
    console.log(this.allProduct[index], 'this.allProduct[index]');
    this.api.updateProduct(this.allProduct[index]).subscribe((res: any) => {
      if (res == 'Data Is Updated Successfully') {
        this.toastr.success(res.toString());
      } else {
        this.toastr.warning(res.toString());
      }
    });
  }
  handleFileInput(file: any, img: any) {
    this.fileToUpload = file.target.files;
    this.fileToUpload = this.fileToUpload.item(0);
    if (img == 'img1') {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageUrl1 = event.target.result;
      };
      reader.readAsDataURL(this.fileToUpload);
    } else if (img == 'img2') {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageUrl2 = event.target.result;
      };
      reader.readAsDataURL(this.fileToUpload);
    } else if (img == 'img3') {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageUrl3 = event.target.result;
      };
      reader.readAsDataURL(this.fileToUpload);
    } else if (img == 'img4') {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageUrl4 = event.target.result;
      };
      reader.readAsDataURL(this.fileToUpload);
    } else if (img == 'mainimg') {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.mainImageUrl = event.target.result;
      };
      reader.readAsDataURL(this.fileToUpload);
    }
  }
}
