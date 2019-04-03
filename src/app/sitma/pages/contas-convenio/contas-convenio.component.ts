import { Globals } from './../../entity/globals';
import { Banco } from '../../entity/banco';
import { BancoService } from '../../services/banco-service';
import { Conta } from '../../entity/conta';
import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';


@Component({
  selector: 'app-contas-convenio',
  templateUrl: './contas-convenio.component.html',
  styleUrls: ['./contas-convenio.component.css']
})
export class ContasConvenioComponent implements OnInit {

  formularioDeContas: FormGroup;
  conta = new Conta();
  banco = new Banco();
  contaTemp = new Conta();
  bancoTemp = new Banco();

  contas: Conta[] = new Array;
  contasTemp: Conta[] = new Array;

  habilitaDelete: boolean = false;
  habilitaUpdate: boolean = false;

  cols = [
    { field: 'codigoFebrabanBanco', header: 'Núm Banco' },
    { field: 'nomeBanco', header: 'Nome Banco' },
    { field: 'numeroAgencia', header: 'Agência' },
    { field: 'numeroConta', header: 'Conta' },
    { field: 'email', header: 'E-mail' }
  ];

  constructor(private fb: FormBuilder, private messageService: MessageService, private bancoService: BancoService, 
    private globals: Globals, private confirmationService: ConfirmationService) {
    
   }

  ngOnInit() {
    this.criaFormulario();
  }

  criaFormulario(){
    this.formularioDeContas = this.fb.group({
      codigoFebrabanBanco: ['', Validators.compose([Validators.required, Validators.maxLength(3)])],
      nomeBanco: ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
      numeroAgencia: ['', Validators.compose([Validators.required, Validators.maxLength(8)])],
      numeroConta: ['', Validators.compose([Validators.required, Validators.maxLength(15)])],
      digitoVerificador: ['', Validators.compose([Validators.required, Validators.maxLength(1)])],
      email: ['', Validators.compose([Validators.required, Validators.maxLength(40), Validators.email])]
    });
  }

  buscaBanco(){
    if(this.banco.codigoFebrabanBanco == undefined || this.banco.codigoFebrabanBanco.length != 3){
      this.messageService.add({severity:'info', summary: 'Mensagem informativa:', detail:'O campo número do banco deve conter 3 digitos'});
    }else{
      let codigoFebrabanBanco = parseInt(this.banco.codigoFebrabanBanco, 10);
      this.bancoService.buscaBanco(codigoFebrabanBanco.toString()).subscribe(response => {
      var resposta = response;
      this.banco.nomeBanco = resposta.nomeBanco;
    });
      
    }
    
  }

  clean(){
    this.formularioDeContas.reset();
  }

  adicionaConta(){
    let contaTemp = new Conta();
    contaTemp = this.globals.copy(this.conta);
    contaTemp.banco = this.globals.copy(this.banco);
    contaTemp.id = this.contas.length;
    
    this.contas.push(contaTemp);
    if(this.contas.indexOf(contaTemp) == contaTemp.id){
      this.messageService.add({severity:'success', summary:'Mensagem informativa:', detail:'Inclusão realizada com sucesso'});
    }else{
      this.messageService.add({severity:'error', summary: 'Mensagem informativa:', detail:'Erro ao incluir conta'});
    }
    this.clean();
  }

  removeConta(obj: Conta) {
    this.confirmationService.confirm({
        message: 'Deseja realmente excluir a conta?',
        header: 'Mensagem de confirmação:',
        icon: 'pi pi-info-circle',
        accept: () => {
          let index = this.contas.indexOf(obj);
          this.contas.splice(index, 1);
          this.messageService.add({severity:'success', summary:'Mensagem informativa:', detail:'Exclusão realizada com sucesso'});
        },
        reject: () => {
          return;
        }
    });
  }

  preparaUpdate(obj: Conta){
    this.banco = this.globals.copy(obj.banco);
    this.conta = this.globals.copy(obj);
    this.habilitaUpdate = true;
    this.bancoTemp = this.globals.copy(obj.banco);
    this.contaTemp = this.globals.copy(obj);
  }

  alteraConta(){
    let contaTemp = new Conta();
    contaTemp = this.globals.copy(this.conta);
    contaTemp.banco = this.globals.copy(this.banco);

    let contaExclusao = new Conta();
    contaExclusao = this.globals.copy(this.contaTemp);
    contaExclusao.banco = this.globals.copy(this.bancoTemp);

    if(contaExclusao.id == contaTemp.id){
      this.contas.splice(contaExclusao.id, 1, contaTemp);
      this.messageService.add({severity:'success', summary:'Mensagem informativa:', detail:'Alteração realizada com sucesso'});
    }

    this.clean();
    this.habilitaUpdate = false;
  }




}
