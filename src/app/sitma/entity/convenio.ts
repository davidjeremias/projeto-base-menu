import { Time } from "@angular/common";

export class Convenio {

    constructor(
        // Identificador do Repasse
        public id: number,
        // Convênio
        public siglaSistema: string,
        public CNPJ: string,
        public coCodigo: number,
        public coNome: string,
        public centralizadora: number,
        public nomeAgencia: string,
        public codSR: number,
        public nomeSR: string,
        public tipoTED: string,

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