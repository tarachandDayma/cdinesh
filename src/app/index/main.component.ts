import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  env:any;
  constructor() {
    this.env = JSON.parse(JSON.stringify(environment));
   }

  ngOnInit(): void {
  }

}
