import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Provider } from "../state/financial/financial.state";
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ProvidersService {
    constructor(private http: HttpClient) {}

    setProvider(provider: Provider): Observable<any> {
        return this.http.post(`${environment.api}/provider/`, provider);
    }

    getProviders(): Observable<any> {
        return this.http.get(`${environment.api}/provider/`);
    }

    getProvider(_id: string): Observable<any> {
        return this.http.get(`${environment.api}/provider/${_id}`);
    }

    updateProvider(provider: Provider): Observable<any> {
        return this.http.put(`${environment.api}/provider/${provider._id}`, provider);
    }

    removeProvider(_id: string): Observable<any> {
        return this.http.delete(`${environment.api}/provider/${_id}`);
    }
}