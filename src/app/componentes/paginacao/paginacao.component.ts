import { Component, Input, Output, EventEmitter, ChangeDetectorRef, OnInit} from '@angular/core';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import axios from 'axios';
import * as moment from 'moment';

@Component({
  selector: 'app-tabela-paginacao',
  templateUrl: './paginacao.component.html',
  styleUrls: ['./paginacao.component.css']
})
export class PaginacaoComponent implements OnInit {
  ngOnInit(): void {
    this.cdr.detectChanges();
  }

  @Input() BASE_URL: string;

  @Input() cols;

  @Input() itensPerPage;

  @Input() filtro: any[];

  @Input() filtroPesquisa;

  @Output() eventoLista = new EventEmitter();
  
  @Output() eventoEditar = new EventEmitter();

   @Input() _lista = [];

   datasource = [];

   totalRegistros: number;

   loading = true;

   iterableDiffer;

   base_temp = '';

   ultimoLimite;
  
   ultimaPagina;

   limite;

   pagina;

   paginator = false;

   event: LazyLoadEvent;

  constructor(private cdr: ChangeDetectorRef, private messageService: MessageService) {
    !this.filtroPesquisa ? this.filtroPesquisa = false : this.filtroPesquisa = true;
  }

  first: number = 0;
   
  reset() {
       this.first = 0;
   }
  
  pesquisar() {

    this.paginator = false;

    this.montarBaseUrl();

    this.event.first = 0;
    
    this.paginarOrdenar(this.event);

    
  }

  editar(id) {
    this.eventoEditar.emit(id);
  }

  setarFiltro() {
    return this.base_temp.length ? this.base_temp : '';
  }

  montarBaseUrl() {

    let inicio;
    let qs = '';

    if (this.filtro.length) {
      
      this.filtro.forEach((q,i) => {
        Object.keys(q).map( k => {
          if(q[k] !== undefined && q[k]) {
            i === 0 ? inicio = '&': inicio;

            if(q[k] instanceof Date) {
              let date  = q[k];
              date = moment(date).format('YYYY-MM-DD');
              qs += `${qs.length > 0 ? '&' : ''}${k}=${date}`;
            } else {
              if(q[k] instanceof Object) {
                Object.keys(q[k]).map(key => {
  
                  if(q[k][key] !== undefined && q[k][key] instanceof Date) {
                    let date  = q[k][key];
                    date = moment(date).format('YYYY-MM-DD');
                    qs += `${qs.length > 0 ? '&' : ''}${k}.${key}=${date}`;
                  } else if (q[k][key] !== undefined) {
                    qs += `${qs.length > 0 ? '&' : ''}${k}.${key}=${q[k][key]}`;
                  }

                  console.log(q, Object.keys(q).length)
                  
                });
              } else {
                qs += `${qs.length > 0 ? '&' : ''}${k}=${q[k]}`;
                console.log(q[k], Object.keys(q).length)
              }
            }
          }
        });

        this.base_temp = inicio ? inicio.concat(qs) : '';

      });
    }

  }
 
  paginarOrdenar(event: LazyLoadEvent) {

    this.itensPerPage ? this.limite = this.itensPerPage : this.limite = 10;

    this.event = event;

    this._lista = [];
    
    this.loading = true;

        !this.ultimoLimite ? this.ultimoLimite : this.limite = this.ultimoLimite;
        !this.ultimaPagina ? this.ultimaPagina : this.pagina = this.ultimaPagina;

        this.pagina =  (!event || !event.first || event.first === 0) && !this.pagina ? 0 : event.first / event.rows;
        this.limite = !event || !event.rows ? this.ultimoLimite : event.rows;

        this.ultimoLimite = this.limite;
        this.ultimaPagina = this.pagina;
            

        this.ultimaPagina = this.pagina;

        setTimeout(() => {
          this.service(this.limite, this.pagina).subscribe(value => {
            this.datasource = value.content;
            this._lista = this.datasource;
            this.eventoLista.emit(this._lista);
            this.formatarData(this._lista);
            this.totalRegistros = value.totalElements;
            this.paginator = true;  
            this.loading = false;
          });
        }, 1000);
        
  }

  formatarData(lista) {
    lista ? 
      lista.forEach((item, index) => {
        for (var key in item) {
          if (item.hasOwnProperty(key)) {
            if (item[key] instanceof Object) {
              this.varrerObjetos(item[key]);
            }
            item[key] && moment(item[key], "YYYY-MM-DDTHH:mm:ss.SSS+0000", true).isValid() ? 
              item[key] = moment(item[key]).format('DD/MM/YYYY HH:mm:ss') : item[key];
          }
        }
      })
    : lista;
  }

  varrerObjetos(objeto) {
    for (var key in objeto) {
      if (objeto.hasOwnProperty(key)) {
        if (objeto[key] instanceof Object) {
          this.varrerObjetos(objeto[key]);
        }
        objeto[key] && moment(objeto[key], "YYYY-MM-DDTHH:mm:ss.SSS+0000", true).isValid() ? 
        objeto[key] = moment(objeto[key]).format('DD/MM/YYYY HH:mm:ss') : objeto[key];
      }
    }
  }

  public service(limite, pagina){ 

    return Observable.create(observer => {
            axios.get(this.BASE_URL + `?limit=${limite}&page=${pagina}` + this.setarFiltro())
            .then(function(response) {

            if(response.status === 204) {   }
    
            observer.next(response.data);
            observer.complete();

          }).catch(error => {
            this.messageService.add({severity:'error', summary:'Error', detail:'Algum erro inesperado aconteceu!'});
          });
          
    });
  }

}
