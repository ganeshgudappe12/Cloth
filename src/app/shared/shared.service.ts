import { Injectable } from '@angular/core';
import { AnyARecord } from 'dns';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  data: any;
  roll: any;
  constructor() {}
  setMessage(data: any) {
    this.data = data;
    sessionStorage.setItem('dummyData', btoa(JSON.stringify(this.data)));
    console.log(data, 'service');
  }
  getMessage() {
    this.data = JSON.parse(atob(sessionStorage.getItem('dummyData')!));
    //sessionStorage.removeItem('dummyData');
    return this.data;
  }
  getRoll() {
    this.roll = JSON.parse(atob(sessionStorage.getItem('Roll')!));
    if (this.roll == 'Admin') {
      return true;
    } else {
      return false;
    }
  }
}
