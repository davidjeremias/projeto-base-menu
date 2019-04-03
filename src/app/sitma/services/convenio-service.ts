import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import axios from 'axios';

import { MessageService } from "primeng/api";
import { ConvenioResposta } from "../entity/ConvenioResposta";

@Injectable({
  providedIn: 'root'
})

export class ConvenioService {

  limite = 10;

  constructor(private messageService: MessageService) { }

  buscarAgenciaCentralizadora(codAgencia: number): Observable<any> {
    return Observable.create(observer => {
      if (codAgencia != undefined) {
        axios.get('/siico/' + codAgencia + '/consultarAgenciaCentralizadora')
          .then((response) => {
            observer.next(response.data);
            observer.complete();
            if (response.status === 204) {
              this.messageService.add({ severity: 'info', summary: 'Mensagem informativa:', detail: 'Agência não encontrada.' });
            }
          }).catch(error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Algum erro inesperado aconteceu!' });
          });
      }
    });
  }

  consultarConvenio(codConvenio: string): Observable<Object[]> {
    return Observable.create(observer => {
      axios.get('/convenios/' + codConvenio + '/consultarConvenios')
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        }).catch(error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Algum erro inesperado aconteceu!' });
        });
    });
  }

  consultarConvenioPorId(idConvenio: string): Observable<ConvenioResposta> {
    return Observable.create(observer => {
      axios.get('/convenios/' + idConvenio + '/findConvenioById')
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        }).catch(error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Algum erro inesperado aconteceu!' });
        });
    });
  }

  buscarTipoTeds(): Observable<Ted[]> {
    return Observable.create(observer => {
      axios.get('/tipoTeds/consultarAllTipoTeds')
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        }).catch(error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Algum erro inesperado aconteceu!' });
        });
    });
  }

  buscarCanais(): Observable<Canal[]> {
    return Observable.create(observer => {
      axios.get('/canais/consultarAllCanais')
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        }).catch(error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Algum erro inesperado aconteceu!' });
        });
    });
  }

  verificaCovenioExistente(codConvenio: string, cnpj: string): Observable<Object> {
    return Observable.create(observer => {
      axios.get('/convenios/' + codConvenio + '/' + cnpj + '/verificaCovenioExistente')
        .then((response) => {
          observer.next(response.data);
          observer.complete();
          if (response.status === 200) {
            this.messageService.add({ severity: 'warn', summary: 'Mensagem informativa:', detail: 'Já existe Convênio com este código e CNPJ vinculado. ' });
          }
        }).catch(error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Algum erro inesperado aconteceu!' });
        });
    });
  }

  buscaSuperintendenciaRegional(codSupRegional: number): Observable<any> {
    return Observable.create(observer => {
      if (codSupRegional != undefined) {
        axios.get('/siico/' + codSupRegional + '/consultarSuperintendenciaRegional')
          .then((response) => {
            observer.next(response.data);
            observer.complete();
            if (response.status === 204) {
              this.messageService.add({ severity: 'info', summary: 'Mensagem informativa:', detail: 'Superintendencia Regional não encontrada.' });
            }
          }).catch(error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Algum erro inesperado aconteceu!' });
          });
      }
    });
  }

  salvarConvenio(convenio: Object): Observable<any> {
    return Observable.create(observer => {
      axios.post('/convenios/cadastrar', convenio)
        .then((response) => {
          if (response.status === 201) {
            this.messageService.add({ severity: 'success', summary: 'Mensagem informativa:', detail: 'Inclusão realizada com sucesso.' });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Algum erro inesperado aconteceu!' });
          }
          observer.next(response.data);
          observer.complete();
        }).catch(error => 'Ocorreu um problema ao salvar o convênio')
    });
  }

  alterarConvenio(convenio: Object): Observable<any> {
    return Observable.create(observer => {
      axios.put('/convenios/alterar', convenio)
        .then((response) => {
          if (response.status === 200) {
            this.messageService.add({ severity: 'success', summary: 'Mensagem informativa:', detail: 'Alteração realizada com sucesso.' });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Algum erro inesperado aconteceu!' });
          }
          observer.next(response.data);
          observer.complete();
        }).catch(error => 'Ocorreu um problema ao alterar o convênio')
    });
  }

  excluirConvenio(idConvenio: number, matriculaUsuario: string): Observable<any> {
    return Observable.create(observer => {
      axios.put('/convenios/'+ idConvenio + '/excluir/' + matriculaUsuario)
        .then((response) => {
          if (response.status === 200) {
            this.messageService.add({ severity: 'success', summary: 'Mensagem informativa:', detail: 'Exclusão realizada com sucesso.' });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Algum erro inesperado aconteceu!' });
          }
          observer.next(response.data);
          observer.complete();
        }).catch(error => 'Ocorreu um problema ao excluir o convênio')
    });
  }

  consultarConvenios(pagina) {
    return Observable.create(observer => {
      axios.get("/convenios" + `?limit=${this.limite}&page=${pagina}`)
        .then((response) => {

          if (response.status === 204) { }

          observer.next(response.data);
          observer.complete();

        }).catch(error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Algum erro inesperado aconteceu!' });
        });

    });
  }
}