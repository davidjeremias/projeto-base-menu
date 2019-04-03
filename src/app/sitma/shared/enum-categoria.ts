import { CategoriaEntity } from "../entity/categoria";

export enum CategoriaEnum {

    UNIAO = 1,
    ESTADO = 2,
    EMPRESA_PUBLICA = 3,
    SOCIEDADE_ECONOMIA_MISTA = 4,
    FUNDACAO = 5,
    AUTARQUIA = 6,
    ENTIDADES_LEGISLATIVO = 7,
    ENTIDADES_JUDICIARIO = 8,
    MINISTERIO_PUBLICO = 9,
    INSTITUTO_PREVIDENCIA = 10,
    MUNICIPIO_100_MIL_HABITANTES = 11,
    MUNICIPIO_50_100_MIL_HABITANTES = 12,
    MUNICIPIO_50_MIL_HABITANTES = 13,
    OUTROS = 14
}

interface CategoriaSpec {
    id: number,
    nome: string
}

export class CategoriaEnumFunction {
    public getCategoriaById(categoria): CategoriaEntity {
        switch (categoria) {
            case CategoriaEnum.UNIAO:
                return {id: 1, nome: "União"};
            case CategoriaEnum.ESTADO:
                return {id: 2, nome: "Estado/DF"};
            case CategoriaEnum.EMPRESA_PUBLICA:
                return {id: 3, nome: "Empresa Pública"};
            case CategoriaEnum.SOCIEDADE_ECONOMIA_MISTA:
                return {id: 4, nome: "Sociedade de Economia Mista"};
            case CategoriaEnum.FUNDACAO:
                return {id: 5, nome: "Fundação"};
            case CategoriaEnum.AUTARQUIA:
                return {id: 6, nome: "Autarquia"};
            case CategoriaEnum.ENTIDADES_LEGISLATIVO:
                return {id: 7, nome: "Entidades do Legislativo"};
            case CategoriaEnum.ENTIDADES_JUDICIARIO:
                return {id: 8, nome: "Entidades do Judiciário"};
            case CategoriaEnum.MINISTERIO_PUBLICO:
                return {id: 9, nome: "Ministério Público/Defensoria Pública/OAB"};
            case CategoriaEnum.INSTITUTO_PREVIDENCIA:
                return {id: 10, nome: "Instituto de Previdência"};
            case CategoriaEnum.MUNICIPIO_100_MIL_HABITANTES:
                return {id: 11, nome: "Município com mais de 100 mil habitantes"};
            case CategoriaEnum.MUNICIPIO_50_100_MIL_HABITANTES:
                return {id: 12, nome: "Município com população entre 50 e 100 mil habitantes"};
            case CategoriaEnum.MUNICIPIO_50_MIL_HABITANTES:
                return {id: 13, nome: "Município com menos de 50 mil habitantes"};
            case CategoriaEnum.OUTROS:
                return {id: 14, nome: "Outros"};
        }    
        
    }
}