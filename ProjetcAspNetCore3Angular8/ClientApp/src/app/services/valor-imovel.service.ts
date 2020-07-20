import { HttpClient } from "@angular/common/http";
import { Inject } from "@angular/core";
import { ValorImovel } from "../models/ValorImovel";


export class ValorImovelService {
    private baseUrl: string;
    constructor(private _http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        this.baseUrl = baseUrl + 'api/ValorImovel';
    }


    public GetAll() {
        const options = {
            headers: { 'exibe-overlay': 'valorImovel' }
        };
        return this._http.get<any>(this.baseUrl + '/Get', options);
    }
    public Get(id) {
        const options = {
            headers: { 'exibe-overlay': 'valorImovel' },
            params: { id }
        };
        return this._http.get<any>(this.baseUrl + '/Get', options);
    }

    public Excluir(id) {
        const options = {
            headers: { 'exibe-overlay': 'valorImovel' },
            params: { id }
        };
        return this._http.delete<any>(this.baseUrl + '/Delete', options);
    }

    public Salvar(model: ValorImovel) {

        const options = {
            headers: { 'exibe-overlay': 'valorImovel' },
        };

        const body = {
            i: model
        };

        if (!model.idValorImovel) {
            return this._http.post<any>((this.baseUrl + '/Post'), body, options);
        } else {
            body['id'] = model.idValorImovel;
            return this._http.put<any>((this.baseUrl + '/Put'), body, options);
        }
    }
}
