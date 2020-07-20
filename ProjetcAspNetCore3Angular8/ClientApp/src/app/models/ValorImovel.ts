import { Base } from "./Base";

export class ValorImovel extends Base {
    
    public idValorImovel: number;
    public idImovel: number;
    public tipoValor: string;
    public valor: number;

    constructor() {
        super();
    }
}