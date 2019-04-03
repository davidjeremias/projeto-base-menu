import { TempCanal } from './../../entity/tempCanal';
import { TempTed } from './../../entity/tempTed';
import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { ConvenioService } from './../../services/convenio-service';
import { ConvenioDTO } from './../../entity/convenioDTO';
import { CalendarioPtBr } from 'src/app/core/entity-globais/calendario-pt-br';
import { CategoriaEnumFunction } from 'src/app/sitma/shared/enum-categoria';
import { MessageService, SelectItem } from 'primeng/api';
import { PaginacaoComponent } from 'src/app/componentes/paginacao/paginacao.component';
import { DadosCompartilhados } from 'src/app/core/entity-globais/dados-compartilhados';
import { ConvenioCanal } from '../../entity/convenioCanal';
import { FormGroup, FormBuilder, Validators } from '../../../../../node_modules/@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { KeycloakService } from "../../../core/auth/keycloak.service";

@Component({
  selector: 'app-cadastro-convenio',
  templateUrl: './cadastro-convenio.component.html',
  styleUrls: ['./cadastro-convenio.component.css'],
  providers: [
    CategoriaEnumFunction
  ]
})

export class CadastroConvenioComponent implements OnInit {

  convenio = new ConvenioDTO();
  sigla: SiglaSistema[];
  selectedSigla: SiglaSistema;
  tipoTEDs: Ted[];
  selectedCanal: Canal[];
  informativoRepasse: string;
  tedTemp: TempTed[] = new Array();
  canalTemp: TempCanal[] = new Array();
  listaConvenioCanal: ConvenioCanal[] = new Array();
  numeroFloat: number;

  formularioDeConvenio: FormGroup;
  
  @ViewChild('paginacao') componentePaginacao: PaginacaoComponent;

  regExp: RegExp = /^[a-záàâãéèêíïóôõöúçñ\d\-_\s]+$/i;

  traducao =  new CalendarioPtBr();

  lista;

  idPath;
  isDisabled;
  isDetalhamento = false;
  isEdicao = false;
  isExcluido = false;
  listaAllTipoTeds = new Array<Ted>();
  listaAllCanais = new Array<Canal>();
  listaConvenioCanaisSalva = new Array<ConvenioCanal>();
  checkListTipoTeds = new Array;
  checkListCanais = new Array;

  BASE_URL = "/contrato/consultar";
  cols = [
    { field: 'id', header: 'Nº do Contrato' },
    { field: 'nomeEntePublico', header: 'Ente Público' },
    { field: 'cnpj', header: 'CNPJ' },
    { field: 'uf', header: 'UF' },
    { field: 'idCategoria', enum: 'enum', header: 'Categoria' },
    { field: 'dtCadastroContrato', header: 'Dt. Cadastro' }
  ];

  nomeEntePublico;
  dataInicio: Date;
  dataFim: Date;
  cnpj: string;
  idNumeroContrato: string;

  filtro = [{
    nomeEntePublico: '',
    cnpj: '',
    dataInicio: this.dataInicio,
    dataFim: this.dataFim,
    idNumeroContrato: ''
  }];

  constructor(
    private enumCategoria: CategoriaEnumFunction,
    private dadosCompartilhados: DadosCompartilhados,
    private router: Router,
    private messageService: MessageService,
    private convenioService: ConvenioService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService, 
    private seg: KeycloakService) {

    this.sigla = [
      { id: 1, nomeSistemaConvenio: 'SICAP' },
      { id: 2, nomeSistemaConvenio: 'SIGTA' },
      { id: 3, nomeSistemaConvenio: 'SIGOV' }
    ];
  }

  ngOnInit() {
    this.criaFormularioConvenio();
    this.buscarTipoTedsAndCanais();
  }

  buscarTipoTedsAndCanais() {
    this.idPath = this.route.snapshot.params['id'];
    this.isDisabled = this.route.snapshot.params['disabled'];
    if(this.isDisabled == "false"){
      this.isEdicao = true;
    }
    if(this.isDisabled == "true"){
      this.isDetalhamento = true;
    }

    this.convenioService.buscarTipoTeds().subscribe(response => {
      this.listaAllTipoTeds = response;
    });

    this.convenioService.buscarCanais().subscribe(response => {
      this.listaAllCanais = response;
      this.startComponet();
    });
  }

  startComponet() {
    if (this.idPath) {
      //Busca o convenio
      this.convenioService.consultarConvenioPorId(this.idPath).subscribe(response => {
        if (response.convenio != undefined) {
          this.convenio = response.convenio;
          this.informativoRepasse = response.convenio.informativoRepasse;
          this.numeroFloat = response.numeroFloat;
          this.selectedSigla = response.convenio.sistemaConvenio;
          if(this.convenio.dataExclusao){
            this.isExcluido = true;
          }

          //Recupera ConvênioCanal
          this.convenio.convenioCanais.forEach(convenioCanalSalvo => {
            response.listaCanalDTO.forEach(canalDTO => {
              if(convenioCanalSalvo.id == canalDTO.idConvenioCanal){
                convenioCanalSalvo.canal = canalDTO.canal;
                convenioCanalSalvo.numeroFloat = canalDTO.numeroFloat;
                this.listaConvenioCanaisSalva.push(convenioCanalSalvo);
              }
            });
          });

          //criação de Arrays temporários
          let arrayTipoTedsTemp = [];
          let arrayCanaisTemp = [];

          //percorrendo tipoTEDs para settar os checkBox do formulário
          this.convenio.tipoTEDs.forEach(ted => {
            this.listaAllTipoTeds.forEach(checklist => {
              if (ted.id === checklist.id) {
                arrayTipoTedsTemp.push(ted.id.toString());
              }
            })
          });

          //percorrendo listaCanais para settar os checkBox do formulário
          this.convenio.convenioCanais.forEach(convenioCanal => {
            this.listaAllCanais.forEach(checklist => {
              if (convenioCanal.canal.id === checklist.id) {
                arrayCanaisTemp.push(convenioCanal.canal.id.toString());
              }
            })
          });

          //settando checkBox
          this.checkListTipoTeds = arrayTipoTedsTemp;
          this.checkListCanais = arrayCanaisTemp;
        } else {
          this.retornaTelaDeCadastro();
        }
      });
    }
  }

  setarTed(objeto: Ted){
    var isObjetoNovo = true;
    let indexObjeto;
    this.convenio.tipoTEDs.forEach((ted, index) => {
      if(objeto.id == ted.id){
        isObjetoNovo = false;
        indexObjeto = index;
      }
    });
    if(isObjetoNovo){
      this.convenio.tipoTEDs.push(objeto);
    }else{
      this.convenio.tipoTEDs.splice(indexObjeto, 1);
    }
  }

  setarCanal(objeto: Canal){
    var isObjetoNovo = true;
    let indexObjeto;
    this.convenio.convenioCanais.forEach((convenioCanal, index) => {
      if(objeto.id == convenioCanal.canal.id){
        isObjetoNovo = false;
        indexObjeto = index;
      }
    });
    if(isObjetoNovo){
      let convenioCanalNovo = new ConvenioCanal;
      convenioCanalNovo.canal = objeto;
      // convenioCanalNovo.numeroFloat = this.numeroFloat; 
      this.convenio.convenioCanais.push(convenioCanalNovo);
    }else{
      this.convenio.convenioCanais.splice(indexObjeto, 1);
    }
  }

  editarConvenio() {
    this.router.navigate([`editar-convenio/${this.convenio.id}/false`]);
  }

  excluirConvenio() {
    this.confirmationService.confirm({
      message: 'Deseja realmente excluir o convênio?',
      header: 'Mensagem de confirmação:',
      icon: 'pi pi-info-circle',
      accept: () => {
        let matriculaUsuario = this.seg.keyCloak.tokenParsed.preferred_username;
        this.convenioService.excluirConvenio(this.convenio.id, matriculaUsuario).subscribe(value => {
          this.retornaTelaDeConculta();
        });
      }
    });
  }

  retornaTelaDeCadastro() {
    this.router.navigate([`cadastro-convenio`]);
  }

  retornaTelaDeConculta() {
    this.router.navigate([`consulta-convenio`]);
  }

  criaFormularioConvenio() {
    this.formularioDeConvenio = this.fb.group({
      sigla: ['', Validators.compose([Validators.required])],
      cnpj: ['', Validators.compose([Validators.required])],
      codigoConvenio: ['', Validators.compose([Validators.required, Validators.maxLength(6)])],
      nomeConvenio: ['', Validators.compose([Validators.required, Validators.maxLength(40)])],
      agenciaCentralizadora: ['', Validators.compose([Validators.required, Validators.maxLength(4)])],
      nomeAgenciaCentralizadora: ['', Validators.compose([Validators.required, Validators.maxLength(40)])],
      codSR: ['', Validators.compose([Validators.required, Validators.maxLength(4)])],
      nomeSR: ['', Validators.compose([Validators.required, Validators.maxLength(40)])],
      group1: ['', Validators.compose([Validators.required])],
      group3: ['', Validators.compose([Validators.required])],
      group2: ['', Validators.compose([Validators.required])],
      float: ['', Validators.compose([Validators.required])]
    });
  }

  editar(resposta) {
    sessionStorage.setItem("entePublico", resposta.idEntePublico);
    this.router.navigate([`contrato/editar/${resposta.id}/dados-gerais/`]);
  }

  incluirContrato() {
    this.router.navigate(['contrato/manter/dados-gerais']);
  }

  setFiltro() {
    this.cnpj ? this.cnpj = this.cnpj.replace(/[./-]/gi, '') : this.cnpj;
    this.filtro.forEach(atributo => {
      atributo.nomeEntePublico = this.nomeEntePublico;
      atributo.cnpj = this.cnpj;
      atributo.dataFim = this.dataFim;
      atributo.dataInicio = this.dataInicio;
      atributo.cnpj = this.cnpj;
      atributo.idNumeroContrato = this.idNumeroContrato;
    });
  }

  recebeLista(lista) {
    if (lista.length) {
      lista.forEach(contrato => {
        if (!(!contrato.idCategoria)) {
          let categoria = this.enumCategoria.getCategoriaById(contrato.idCategoria);
          let categoriaTemp = categoria;
          categoria.nome.substring(0, 7) === 'Estado/' ? (
            categoriaTemp.nome = categoria.nome.substring(0, 7),
            categoriaTemp.nome = categoriaTemp.nome.concat(contrato.uf)
          )
            : categoria;

          categoria = categoriaTemp
          categoria ? contrato.idCategoria = categoria.nome : contrato.idCategoria;
        }

        if (contrato.cnpj) {
          contrato.cnpj = contrato.cnpj.toString();

          let tamanhoCnpj = 14 - contrato.cnpj.length;

          if (tamanhoCnpj > 0) {
            for (let i = 0; i < tamanhoCnpj; i++) {
              contrato.cnpj = '0' + contrato.cnpj;
            }
          }

          contrato.cnpj = contrato.cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");

        }
      });
    } else {
      this.messageService.add({ severity: 'info', summary: 'Informação:', detail: 'Nenhum contrato encontrado' });
    }
  }

  validaData() {
    if (this.dataInicio > this.dataFim) {
      this.messageService.add({ severity: 'info', summary: 'Informação:', detail: 'Data início deve ser menor que data fim' });
      return false
    } else {
      return true;
    }
  }

  emitted() {
    this.validaData() ? this.componentePaginacao.pesquisar() : '';
  }

  salvarConvenio() {
    this.convenio.sistemaConvenio = this.selectedSigla;
    this.convenio.informativoRepasse = this.informativoRepasse;
    this.convenio.situacao = 'A';

    //Verifica se Algum ConvenioCanal já estava salvo
    this.listaConvenioCanaisSalva.forEach(convenioCanalSalvo => {
      this.convenio.convenioCanais.forEach(convenioCanal => {
        if (convenioCanalSalvo.canal.id == convenioCanal.canal.id){
          convenioCanal.id = convenioCanalSalvo.id;
          convenioCanal.canal = convenioCanalSalvo.canal;
          convenioCanal.numeroFloat = convenioCanalSalvo.numeroFloat;
        }
      });
    });

    //  (Melhoria acontecer em Sprint futura) MUDAR PARA CADA CANAL PODER TER UM "NUMERO_FLOAT" DIFERENTE(variavel na TMARTB003_CONVENIO_CANAL)
    this.convenio.convenioCanais.forEach(convenioCanal => {
      if(convenioCanal.numeroFloat == undefined){
        convenioCanal.numeroFloat = this.numeroFloat;
      }  
      
    });
    
    if(this.convenio.id == undefined){
      this.convenioService.salvarConvenio(this.convenio).subscribe(response => {
        this.clean();
      });
    }else{
      this.confirmationService.confirm({
        message: 'Deseja realmente alterar os dados do convênio?',
        header: 'Mensagem de confirmação:',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.convenioService.alterarConvenio(this.convenio).subscribe(response => {
            this.retornaTelaDeConculta();
          });
        }
      });
    }
  }

  buscaAgenciaCentralizadora() {
    this.convenioService.buscarAgenciaCentralizadora(this.convenio.codigoAgenciaCentralizadora).subscribe(response => {
      var resposta = response;
      this.convenio.nomeAgenciaCentralizadora = resposta.nomeAgencia;
    });
  }

  buscaSuperintendenciaRegional() {
    this.convenioService.buscaSuperintendenciaRegional(this.convenio.codigoSr).subscribe(response => {
      var resposta = response;
      this.convenio.nomeSr = resposta.nomeSuperintendencia;
    });
  }

  clean() {
    this.formularioDeConvenio.reset();
  }

  verificaCovenioExistente() {
    if ((this.convenio.codigoConvenio != undefined && this.convenio.cnpj != undefined) && (this.convenio.cnpj != '')) {
      let cod = this.convenio.codigoConvenio.toString();
      if (cod != '' && this.convenio.cnpj != '') {
        this.convenioService.verificaCovenioExistente(cod, this.convenio.cnpj).subscribe(response => {
          if (response) {
            this.convenio.codigoConvenio = undefined;
          }
        });
      }
    }
  }

}
