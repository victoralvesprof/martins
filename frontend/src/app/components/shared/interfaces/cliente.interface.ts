export interface Cliente {
    _id?: string;
    nome: string;
    endereco: string;
    cpf: string;
    rg: string;
    email: string;
    sexo: Sexo;
    items?: Array<Items>;
    divida?: number;
    aVer?: Array<Abatimento>;
    sobra?: number;
}

export enum Sexo {
    masculino = 0,
    feminino = 1
}

export interface Items {
    descricao: string;
    quantidade: number;
    data: Date;
    valor: number;
    codigo?: string;
    pago: boolean;
}

export interface Abatimento {
    data?: Date;
    valor: number;
}
