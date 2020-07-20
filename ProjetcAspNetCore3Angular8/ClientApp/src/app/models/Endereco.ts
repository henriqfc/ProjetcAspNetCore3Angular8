import { Base } from "./Base";

export class Endereco extends Base {

    public idEndereco: number;
    public cep: string;
    public rua: string;
    public bairro: string;
    public cidade: string;
    public uf: string;


    constructor() {
        super();
    }
}