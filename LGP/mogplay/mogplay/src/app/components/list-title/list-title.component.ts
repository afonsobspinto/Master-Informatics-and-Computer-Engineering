import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list-title',
  templateUrl: './list-title.component.html',
  styleUrls: ['./list-title.component.css']
})
export class ListTitleComponent implements OnInit {

  @Input() title: string;

  constructor() { }

  ngOnInit() {
  }

}
