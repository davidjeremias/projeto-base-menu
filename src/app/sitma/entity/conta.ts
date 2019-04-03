import { Banco } from './banco';

export class Conta{
    id: number;
    banco: Banco;
    numeroAgencia: string;
    numeroConta: string;
    digitoVerificador: number;
    email: string;
}