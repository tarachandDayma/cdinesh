import { Component, OnInit } from '@angular/core';
import { EnvironmentService } from 'service-common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  env:any;
  constructor(private environmentservice:EnvironmentService) {
    this.env = JSON.parse(JSON.stringify(environment));
   }

  ngOnInit(): void {
    setInterval(function(){ this.environmentservice.CheckLogin()},30000);
  }

}
