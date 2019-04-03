import { Component, OnInit, Input, DoCheck, AfterContentChecked } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-combo-service',
  templateUrl: './combo-service.component.html',
  styleUrls: ['./combo-service.component.css']
})
export class ComboServiceComponent implements OnInit {

  @Input() BASE_URL;

  @Input() quantidadeRegistros;

  @Input() itemSelecionado;

  @Input() optionLabel;

  @Input() desabilitado: boolean;

  @Input() filtro: boolean;

  lista: any[];

  constructor() {
    !this.desabilitado ? this.desabilitado = false : this.desabilitado = true;
    !this.quantidadeRegistros ? this.quantidadeRegistros = '' : this.quantidadeRegistros;
  }

  ngOnInit() {
    setTimeout(() => {
      this.buscarLista();
    }, 1000);
  }

  public buscarLista() {
    this.service().subscribe(value => {
      this.lista = value.content;
    });
  }

  public service(){ 

    return Observable.create(observer => {
            axios.get(this.BASE_URL + this.setarQuantidadeRegistros())
            .then(function(response) {

            if(response.status === 204) { }
    
            observer.next(response.data);
            observer.complete();

          }).catch(function(error){
            throw error;
          });
    
    });
  }

  private setarQuantidadeRegistros() {
    return !this.quantidadeRegistros.length ? '' : `?limit=${this.quantidadeRegistros}`;
  }

}
