import { HttpClient } from "@angular/common/http";
import { Inject } from "@angular/core";
import { Tipo } from "../models/Tipo";


export class TipoService {
    private baseUrl: string;
    constructor(private _http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        this.baseUrl = baseUrl + 'api/Tipo';
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
        return this._http.get<any>(this.baseUrl, options);
    }

    public Excluir(id, spinner) {
        const options = {
            headers: { 'exibe-overlay': spinner },
            params: { id }
        };
        return this._http.delete<any>(this.baseUrl, options);
    }

    public Salvar(model: Tipo, spinner) {

        const options = {
            headers: { 'exibe-overlay': spinner },
        };

        const body = {
            i: model
        };

        if (!model.idTipo) {
            return this._http.post<any>((this.baseUrl), body, options);
        } else {
            body['id'] = model.idTipo;
            return this._http.put<any>((this.baseUrl), body, options);
        }
    }
}
