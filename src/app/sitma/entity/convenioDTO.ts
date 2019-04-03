import { ConvenioCanal } from "./convenioCanal";

export class ConvenioDTO {
    // Identificador do Repasse
    public id: number;
    // Convênio
    public sistemaConvenio: SiglaSistema;
    public cnpj: string;
    public codigoConvenio: number;
    public nomeConvenio: string;
    public situacao: String;
    public codigoAgenciaCentralizadora: number;
    public nomeAgenciaCentralizadora: string;
    public codigoSr: number;
    public nomeSr: string;
    public dataExclusao: Date;
    public tipoTEDs: Array<Ted>;
    public convenioCanais: Array<ConvenioCanal>;
    public informativoRepasse: string;

}