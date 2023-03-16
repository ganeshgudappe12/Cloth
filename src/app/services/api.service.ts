import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private ip = 'http://192.168.1.44:5001';
  addUserApi(data: any) {
    let url = '' + this.ip + '/api/add';

    console.log(data, 'data ');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
    return this.http.post(url, data, { headers });
  }

  roll() {
    let url = '' + this.ip + '/api/Getuser';
    return this.http.get(url);
  }

  AddProducts(data: any) {
    let url = '' + this.ip + '/api/AddProducts';
    console.log(data, 'data ');
    return this.http.post(url, data);
  }
  addCarousel(data: any) {
    let url = '' + this.ip + '/api/AddCarousel';
    console.log(data, 'data ');
    return this.http.post(url, data);
  }

  getCarousel() {
    let url = '' + this.ip + '/api/GetCarousel';
    return this.http.get(url);
  }
  getCategory() {
    let url = '' + this.ip + '/api/GetCategory';
    return this.http.get(url);
  }
  signUP(data: any) {
    let url = '' + this.ip + '/api/SignupData';
    console.log(data, 'data ');
    return this.http.post(url, data);
  }
  checkLogin(mail: any, pass: any) {
    let url =
      '' + this.ip + '/api/CheckLogin?mail=' + mail + '&pass=' + pass + '';
    console.log(url, 'data ');
    return this.http.post(url, '');
  }
  getProduct(data: any) {
    let url = '' + this.ip + '/api/GetProductDetails?category=' + data + '';
    return this.http.get(url);
  }
  GetProductById(id: any) {
    let url = '' + this.ip + '/api/GetProductDetailsById?Productid=' + id + '';
    return this.http.get(url);
  }
  updateProduct(data: any) {
    let url = '' + this.ip + '/api/UpdateProduct';
    //console.log(url, 'data ');
    return this.http.post(url, data);
  }
}
