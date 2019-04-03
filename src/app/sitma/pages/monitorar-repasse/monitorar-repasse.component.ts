import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate, state, query, stagger, keyframes } from '@angular/animations';
import { Repasse } from '../../entity/repasse';
import * as moment from 'moment';
import { Globals } from '../../entity/globals';
import { RepasseService } from '../../services/repasse-service';

@Component({
  selector: 'app-monitorar-repasse',
  templateUrl: './monitorar-repasse.component.html',
  styleUrls: ['./monitorar-repasse.component.css'],
  animations: [
    trigger('animated', [
      transition('* <=> *', [
        query(':enter', [
          style({ transform: 'translate3d(0, -25%, 0)', opacity: 0 }),
          stagger(30, [
            animate('0.14s', style({ transform: 'translate3d(0, 0, 0)', opacity: 1 }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('staticAnimated', [
      transition(':enter', [
        query("div", style({ opacity: 0, transform: 'translateY(-10%)' })),
        query("div", stagger(100, [
          animate('0.3s', style({ opacity: 1, transform: 'translateY(0)' })),
        ]))
      ])
    ])
  ]
})
export class MonitorarRepasseComponent implements OnInit {
  public repasseDetalhado: any;
  public listaRepasses: Array<any>;
  public listaRepassesBck: Array<any>;
  public detalhando = false;
  public ldDetalhamento = false;
  public isAtualizandoAuto = false;
  constructor(public globals: Globals, private mainService: RepasseService) { }

  ngOnInit() {
    this.cargaInicial();
  }

  cargaInicial() {
    // TODO: Serviço para buscar carga inicial
    this.listaRepasses = [
      new Repasse(1, 5013, "SEFAZ RS", 2021, 1, 2001, "0012150-5", "Banco do Brasil", "TED", 960140.50, "A Verificar", moment().add(-2, 'd').toDate(), new Date()),
      new Repasse(2, 5013, "SEFAZ RS", 2021, 1, 2001, "0012150-5", "Banco do Brasil", "TED", 3506.50, "Devolvido", new Date(), new Date()),
      new Repasse(3, 5013, "SEFAZ RS", 2021, 1, 2001, "0012150-5", "Banco do Brasil", "TED", 50120.50, "Pendente", new Date(), new Date()),
      new Repasse(4, 5013, "SEFAZ RS", 2021, 1, 2001, "0012150-5", "Banco do Brasil", "TED", 4200.32, "Pendente", new Date(), new Date()),
      new Repasse(5, 5013, "SEFAZ RS", 2021, 1, 2001, "0012150-5", "Banco do Brasil", "TED", 35020.36, "Pendente", new Date(), new Date()),
      new Repasse(6, 5013, "SEFAZ RS", 2021, 1, 2001, "0012150-5", "Banco do Brasil", "TED", 59870.88, "Enviado", new Date(), new Date()),
      new Repasse(7, 5013, "SEFAZ RS", 2021, 1, 2001, "0012150-5", "Banco do Brasil", "TED", 60561.56, "Enviado", new Date(), new Date()),
      new Repasse(8, 5013, "SEFAZ RS", 2021, 1, 2001, "0012150-5", "Banco do Brasil", "TED", 1000000.02, "Enviado", new Date(), new Date())
    ]

    this.carregarListaRepasses();


  }

  atualizacaoAutomatica(isForced = false) {
    if (!this.isAtualizandoAuto !== isForced) {
      if(this.listaRepasses.some(e => e.status === 'Pendente')) {
        this.isAtualizandoAuto = true;
        setTimeout( () => {
          // TODO: Carregar dados do serviço, substituir
          const repasse = this.listaRepasses.find(e => e.status === 'Pendente');
          repasse ? repasse.status = 'Enviado' : null;
          this.listaRepasses.sort(this.sortRepasses);
          // ---
          this.atualizacaoAutomatica(true);
        }, 4321);
      } else {
        this.isAtualizandoAuto = false;
      }
    }
  }

  novoRepasse(repasse) {
    const elemento = this.listaRepassesBck.find(e => e.id === repasse.id);
    const index = this.listaRepassesBck.indexOf(elemento);
    this.listaRepassesBck[index] = repasse;
    !this.isAtualizandoAuto ? this.atualizacaoAutomatica() : null;
    this.toggleDetalhamento(repasse);
  }

  private carregarListaRepasses() {
    // alert(1);
    //setTimeout(() => this.mainService.pesquisar().subscribe(response => console.log(response)), 1000);
      
    // TODO: Refactor para real necessidade de método
    setTimeout(() => {this.listaRepasses.sort(this.sortRepasses), this.atualizacaoAutomatica()}, 1000);
  }

  private carregarDetalhes(repasse) {
    // TODO: Carregar informações de repasse
    this.repasseDetalhado = this.globals.copy(repasse);
    this.ldDetalhamento = true;
    setTimeout(() => this.ldDetalhamento = false, 1000); // Simular o carregamento de dados
  }

  public toggleDetalhamento(repasse) {
    if (this.detalhando) {
      this.listaRepasses = this.listaRepassesBck;
      this.listaRepassesBck = null;
      this.listaRepasses.sort(this.sortRepasses);
    } else {
      this.listaRepassesBck = this.listaRepasses;
      this.listaRepasses = this.listaRepasses.filter(e => e.id === repasse.id);
      this.carregarDetalhes(repasse);
    }
    this.atualizacaoAutomatica();
    this.detalhando = !this.detalhando;
  }
  
  sortRepasses(a: Repasse, b: Repasse) {
    if (a.status === b.status) {
      return 0;
    } else if (a.status === 'Devolvido') {
      return -1;
    } else if (b.status === 'Devolvido') {
      return 1;
    } else if (a.status === 'A Verificar') {
      return -1;
    } else if (b.status === 'A Verificar') {
      return 1;
    } else if (a.status === 'Pendente') {
      return -1;
    } else if (b.status === 'Pendente') {
      return 1;
    } else if (a.status === 'Enviado') {
      return -1;
    } else if (b.status === 'Enviado') {
      return 1;
    }
  }

}
