import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  queryParams: any;
  roll = false;
  searchtitle: any = '';

  constructor(private router: Router, private share: SharedService) {
    this.queryParams = [];
    const url = router.url;
    this.queryParams = url.split('/')[1].split('?');
    if (this.queryParams[0] == 'men') {
      $(function () {
        $('.menu').removeClass('active-one');
        $('#men').addClass('active-one');
      });
    } else if (this.queryParams[0] == 'women') {
      $(function () {
        $('.menu').removeClass('active-one');
        $('#women').addClass('active-one');
      });
    }
    this.roll = share.getRoll();
  }

  ngOnInit(): void {}
  logout() {
    this.router.navigate(['login']);
  }
  profileDetails() {}
}
