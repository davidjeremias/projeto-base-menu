import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import axios from 'axios';

import { MessageService } from 'primeng/components/common/messageservice';

@Injectable({
  providedIn: 'root'
})
export class BancoService {

  constructor(private messageService: MessageService) { }

  buscaBanco(codigoFebrabanBanco: string): Observable<any> {
    return Observable.create(observer => {
      if (codigoFebrabanBanco != undefined) {
        axios.get('/bancos/' + codigoFebrabanBanco + '/consultarBanco')
          .then((response) => {
            observer.next(response.data);
            observer.complete();
            if (response.status === 204) {
              this.messageService.add({ severity: 'info', summary: 'Mensagem informativa:', detail: 'Nome do Banco não encontrada.' });
            }
          }).catch(error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Algum erro inesperado aconteceu!' });
          });
      }
    });
  }
}

