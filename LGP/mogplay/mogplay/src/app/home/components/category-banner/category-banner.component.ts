import { Component, OnInit, Input } from '@angular/core';
import { Banner } from 'app/models/Banner';

@Component({
  selector: 'app-category-banner',
  templateUrl: './category-banner.component.html',
  styleUrls: ['./category-banner.component.css']
})
export class CategoryBannerComponent implements OnInit {

  @Input() banner: Banner;

  constructor() { }

  ngOnInit() {
  }

}
