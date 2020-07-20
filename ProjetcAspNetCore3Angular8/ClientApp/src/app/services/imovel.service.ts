import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from "@angular/common/http";
import { Inject } from "@angular/core";
import { Imovel } from "../models/Imovel";
import { Observable } from "rxjs";


export class ImovelService {
    private baseUrl: string;
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8'
        })
    };
    constructor(private _http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        this.baseUrl = baseUrl + 'api/Imovel/';
    }
    

    public GetAll(filtro, spinner) {
        const options = {
            headers: { 'exibe-overlay': 'imovel' },
        };
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                'exibe-overlay': spinner
            })
        };
        // return this._http.post<any>(this.baseUrl + 'GetAll', params, options);
        return this._http.post<any>((this.baseUrl + 'GetAll'), JSON.stringify(filtro), httpOptions);
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
        return this._http.delete<any>(this.baseUrl + 'Delete', options);
    }

    public Salvar(model: Imovel, spinner) {

        const options = {
            headers: { 'exibe-overlay': 'imovel', 'Content-Type': 'application/json; charset=utf-8' },
        };
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                'exibe-overlay': spinner
            })
        };
        if (!model.idImovel) {
            return this._http.post<any>((this.baseUrl + 'Insert'), JSON.stringify(model), httpOptions);
        } else {
            return this._http.put<any>((this.baseUrl) + 'Update', JSON.stringify(model), httpOptions);
        }
    }

    upload(file: File, idImovel, spinner): Observable<HttpEvent<any>> {
        const formData: FormData = new FormData();

        formData.append('file', file);
        formData.append('idImovel', idImovel);

        const req = new HttpRequest('POST', `${this.baseUrl}UploadFile`, formData, {
            reportProgress: true,
            responseType: 'json'
        });

        return this._http.request(req);
    }

    getFiles(id, spinner) {
        const options = {
            headers: { 'exibe-overlay': spinner },
            params: { id }
        };
        return this._http.get<any>(`${this.baseUrl}GetFiles`, options);
    }

    delete(file, spinner) {
        const options = {
            headers: { 'exibe-overlay': spinner },
        };
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                'exibe-overlay': spinner
            })
        };
        return this._http.post<any>((this.baseUrl + 'DeleteFile'), JSON.stringify(file), httpOptions);
    }
}
