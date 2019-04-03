import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exemplo-sitma',
  templateUrl: './exemplo-sitma.component.html',
  styleUrls: ['./exemplo-sitma.component.css']
})
export class ExemploSitmaComponent implements OnInit {

  cols = [
    { field: 'nome', header: 'Nome' },
    { field: 'email', header: 'E-mail' },
    { field: 'data', header: 'Data' }
  ];
  usuario = '/usuarios';

  optionLabel = 'nome';

  constructor() { }

  ngOnInit() {
  }

}
