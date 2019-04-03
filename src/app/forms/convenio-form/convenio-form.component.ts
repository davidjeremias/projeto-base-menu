import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Repasse } from '../../sitma/entity/repasse';
import { Globals } from '../../sitma/entity/globals';
import { MessageService } from 'primeng/api';
import * as moment from 'moment';

@Component({
  selector: 'app-convenio-form',
  templateUrl: './convenio-form.component.html'
})

export class ConvenioFormComponent implements OnInit {
  constructor(public globals: Globals, private messageService: MessageService) {}

  @Input() modelo =  new Repasse(1, 5000, 'SEFAZ RS', 2021, 2, 2823, "0012179-7", 'Banco de Teste', 'TED', 54321.2, 'Pendente', new Date(), new Date());
  @Output() repasseSalvo = new EventEmitter();
  public repasse: Repasse;
  isEnviando = false;
  
  ngOnInit() {
    this.repasse = this.modelo;
  }

  dataMinima() {
    return moment().add(1, 'h').toDate();
  }

  onSubmit() {
    this.isEnviando = true;
    setTimeout(() => {
      this.messageService.add({severity:'success', summary:'Sucesso', detail:'Repasse salvo com sucesso'});
      this.isEnviando = false;
      this.repasse.status = "Pendente";
      this.repasseSalvo.emit(this.repasse);
    }, 2000);
  }
}
