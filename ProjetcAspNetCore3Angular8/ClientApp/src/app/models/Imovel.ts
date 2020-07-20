import { Base } from "./Base";
import { Endereco } from "./Endereco";
import { Tipo } from "./Tipo";
import { ImagensImovel } from "./ImagensImovel";

export class Imovel extends Base {

    public idImovel: number;
    public numero: number;
    public numComodos: number;
    public numQuartos: number;
    public numBanheiros: number;
    public descricao: string;
    public complemento: string;

    public idTipo: number;
    public idEndereco: number;
    public tipo: Tipo;
    public Endereco: Endereco;

    public valorAluguel: Number;
    public valorVenda: Number;

    public imagens: Array<ImagensImovel>;

    constructor() {
        super();
        this.Endereco = new Endereco();
        this.imagens = new Array<ImagensImovel>();
    }
}