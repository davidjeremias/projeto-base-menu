import { Time } from "@angular/common";

export class Consulta {

    constructor(
        // Identificador do Repasse
        public id: number,
        // Convênio
        public coCodigo: number,
        public coNome: string,
        public centralizadora: number,
        // Dados Bancários
        public nuBanco: number,
        public agencia: number,
        public conta: string,
        public noBanco: string,
        // Repasse
        public tipo: string,
        public valor: number,
        public status: string,
        public dtArrecadacao: Date,
        public dtRepasse: Date,
        public justificativa?: string
      ) {  }
}