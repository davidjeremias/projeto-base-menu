import { Injectable } from "@angular/core";

@Injectable()
export class Globals {

    role: string = 'test';

    ptbr = {
        firstDayOfWeek: 0,
        dayNames: ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"],
        dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
        dayNamesMin: ["D","S","T","Q","Q","S","S"],
        monthNames: [ "Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro" ],
        monthNamesShort: [ "Jan", "Fev", "Mar", "Abr", "Mai", "Jun","Jul", "Ago", "Set", "Out", "Nov", "Dez" ],
        today: 'Hoje',
        clear: 'Limpar',
        dateFormat: 'dd/mm/yy'
    }

    copy(object) {
        return Object.assign({}, object);
    }
}