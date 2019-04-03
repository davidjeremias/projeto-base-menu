import { Component, OnInit } from '@angular/core';
import { ConvenioService } from '../../services/convenio-service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/components/common/messageservice';
import {ConfirmationService} from 'primeng/api';
import { KeycloakService } from "../../../core/auth/keycloak.service";  

@Component({
  selector: 'app-consulta-convenio',
  templateUrl: './consulta-convenio.component.html',
  styleUrls: ['./consulta-convenio.component.css']
})
export class ConsultaConvenioComponent implements OnInit {

  listaConvenios: Array<any>;
  listaAllConvenios: Array<any>;
  listaConveniosPaginada: Array<any>;
  codigoConvenio: string;
  nomeConvenio: string;
  realizarConsulta: false;

  pesquisandoListaCodigoConvenio = true;
  pesquisandoListaAll = true;
  totalRegistros;

  cols = [
    { field: 'codigoConvenio', header: 'Código do Convênio' },
    { field: 'nomeConvenio', header: 'Nome do Convênio' },
    { field: 'tipoTEDs', header: 'TED' },
    { field: 'dataExclusao', header: 'Situação' }
  ];

  constructor(
    private mainService: ConvenioService, 
    private router: Router, 
    private messageService: MessageService, 
    private confirmationService: ConfirmationService, 
    private seg: KeycloakService) { }

  ngOnInit() {
  }

  consultarConvenio(codConvenio: string) {
    this.listaConvenios = new Array;
    this.listaAllConvenios = new Array;
    this.listaConveniosPaginada = new Array;
    if (codConvenio == undefined || codConvenio == "") {
      this.pesquisandoListaAll = false;
      this.buscarConvenios(null);
    } else {
      this.pesquisandoListaCodigoConvenio = false;
      this.mainService.consultarConvenio(codConvenio).subscribe(response => {
        if (response.length == 0) {
          this.messageService.add({ severity: 'info', summary: 'Mensagem informativa:', detail: 'Não existe convênios  com esses parâmetros.' });
        }
        this.listaConvenios = response;
        let event = { first: 0, rows: 10 }
        this.buscarConveniosPaginados(event);
      })
    }
    // this.pesquisandoListaCodigoConvenio = true;
    // this.pesquisandoListaAll = true;
  }

  buscarConvenios(event) {
    if (this.listaAllConvenios.length == 0) {
      this.mainService.consultarConvenios(0).subscribe(value => {
        this.totalRegistros = value.totalElements;
        this.listaAllConvenios = value.content;
        if (this.listaAllConvenios.length == 0) {
          this.messageService.add({ severity: 'info', summary: 'Mensagem informativa:', detail: 'Nenhum convênio encontrado!' });
        }
        this.pesquisandoListaAll = true;
      });
    } else {
      this.mainService.consultarConvenios(event.first / event.rows).subscribe(value => {
        this.totalRegistros = value.totalElements;
        this.listaAllConvenios = value.content;
      });
      this.pesquisandoListaAll = true;
    }
  }

  buscarConveniosPaginados(event) {
    return new Promise((resolve, reject) => {
      if (!this.listaConvenios.length) {
        setTimeout(() => {
          this.mainService.consultarConvenio(this.codigoConvenio).subscribe(value => {
            this.listaConvenios = value;
            this.totalRegistros = this.listaConvenios.length;
            this.paginate(event);
            resolve();
          });
        }, 1000);
      } else {
        this.paginate(event);
        resolve();
      }
    })
  }

  paginate(event) {
    if (this.listaConvenios.length > event.rows) {

      let init = event.first;
      let end = init + event.rows;

      if (end > this.listaConvenios.length) {
        end = this.listaConvenios.length;
      }

      this.listaConveniosPaginada = this.listaConvenios.slice(init, end);
      this.totalRegistros = this.listaConvenios.length;

    } else {
      this.listaConveniosPaginada = this.listaConvenios;
      this.totalRegistros = this.listaConvenios.length;
    }
    this.pesquisandoListaCodigoConvenio = true;
  }

  clear() {
    this.listaConvenios = new Array;
    this.listaAllConvenios = new Array;
    this.listaConveniosPaginada = new Array;
    this.codigoConvenio = "";
    this.nomeConvenio = "";
  }

  cadastrar() {
    this.router.navigate(['cadastro-convenio']);
  }

  excluirConvenioDalistaConveniosPaginada(convenio, paginador) {
    this.confirmationService.confirm({
        message: 'Deseja realmente excluir o convênio?',
        header: 'Mensagem de confirmação:',
        icon: 'pi pi-info-circle',
        accept: () => {
          let matriculaUsuario = this.seg.keyCloak.tokenParsed.preferred_username;
          this.mainService.excluirConvenio(convenio.id, matriculaUsuario).subscribe(value => {
            console.log(value);
            // convenio = value;
            this.listaConvenios.forEach(con => {
              let index = this.listaConvenios.indexOf(convenio);
              if(index > -1){
                this.listaConvenios[index] = value;
              }
            });
            this.buscarConveniosPaginados(paginador);
          });
        }
    });
  }

  excluirConvenioDalistaAllConvenios(convenio, paginador) {
    this.confirmationService.confirm({
        message: 'Deseja realmente excluir o convênio?',
        header: 'Mensagem de confirmação:',
        icon: 'pi pi-info-circle',
        accept: () => {
          let matriculaUsuario = this.seg.keyCloak.tokenParsed.preferred_username;
          this.mainService.excluirConvenio(convenio.id, matriculaUsuario).subscribe(value => {
            console.log(value);
            this.buscarConvenios(paginador);
          });
        }
    });
  }

  detelharConvenio(resposta){
    this.router.navigate([`detalhar-convenio/${resposta.id}/true`]);
  }

  editarConvenio(resposta){
    this.router.navigate([`editar-convenio/${resposta.id}/false`]);
  }
}
