import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Transaction } from "../state/financial/financial.state";
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TransactionsService {
    constructor(private http: HttpClient) {}

    setTransaction(transaction: Transaction): Observable<any> {
        return this.http.post(`${environment.api}/transaction/`, transaction);
    }

    getTransactions(filter: any): Observable<any> {
        filter = this.objToQueryParameter(filter);
        return this.http.get(`${environment.api}/transaction${filter}`);
    }

    getTransaction(_id: Transaction): Observable<any> {
        return this.http.get(`${environment.api}/transaction/${_id}`);
    }

    updateTransaction(transaction: Transaction): Observable<any> {
        return this.http.put(`${environment.api}/transaction/${transaction._id}`, transaction);
    }

    removeTransaction(_id: string): Observable<any> {
        return this.http.delete(`${environment.api}/transaction/${_id}`);
    }


    objToQueryParameter(filter: any): string {

        let filterList = Object.keys(filter);

        filterList = filterList.filter((key, index) => {
            return filter[filterList[index]] !== null
        });

        const query = filterList.map( (key, index) => {
            return  index === 0 ? `?${key}=` : `&${key}=`; 
        }).reduce(((query, key, index) => `${query += key += filter[filterList[index]]}`), '')

        return query;
    }
}