import { HttpClient } from "@angular/common/http";
import { Inject } from "@angular/core";
import { Endereco } from "../models/Endereco";
import { Observable } from "rxjs";


export class EnderecoService {
    private baseUrl: string;
    constructor(private _http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        this.baseUrl = baseUrl + 'api/Endereco/';
    }


    public GetAll(spinner) {
        const options = {
            headers: { 'exibe-overlay': spinner }
        };
        return this._http.get<any>(this.baseUrl, options);
    }
    public Get(id, spinner) {
        const options = {
            headers: { 'exibe-overlay': spinner },
            params: { id }
        };
        return this._http.get<any>(`${this.baseUrl}Get`, options);
    }

    public Excluir(id, spinner) {
        const options = {
            headers: { 'exibe-overlay': spinner },
            params: { id }
        };
        return this._http.delete<any>(this.baseUrl, options);
    }

    public Salvar(model: Endereco, spinner) {

        const options = {
            headers: { 'exibe-overlay': spinner },
        };

        const body = {
            i: model
        };

        if (!model.idEndereco) {
            return this._http.post<any>((this.baseUrl), body, options);
        } else {
            body['id'] = model.idEndereco;
            return this._http.put<any>((this.baseUrl), body, options);
        }
    }

    public BuscarCEP(cep, spinner): Observable<Endereco> {
        const options = {
            headers: { 'exibe-overlay': spinner },
            params: { cep }
        };
        return this._http.get<Endereco>(this.baseUrl + 'BuscarCEP', options);
    }
}
