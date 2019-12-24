import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css']
})
export class BackgroundComponent implements OnInit {

  @Input() type?: string;

  constructor() { }

  ngOnInit() {
  }

  setClasses() {
    return {
      'banner-home': this.type === 'home',
      'banner-default': this.type !== 'home'
    }
  }

}
