import { Component, OnInit } from '@angular/core';
import { VERSION } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  title = 'Sitma - Repasse';
  version = '1.0.0.0';
  ng_version = VERSION.full;

  constructor() { }

  ngOnInit() {
  }

}
