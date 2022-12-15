import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Transaction, Wallet } from "../state/financial/financial.state";
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class WalletsService {
    constructor(private http: HttpClient) {}

    setWallet(wallet: Wallet): Observable<any> {
        return this.http.post(`${environment.api}/wallet/`, wallet);
    }

    getWallets(): Observable<any> {
        return this.http.get(`${environment.api}/wallet/`);
    }

    getWallet(_id: string): Observable<any> {
        return this.http.get(`${environment.api}/wallet/${_id}`);
    }

    updateWallet(wallet: Wallet): Observable<any> {
        return this.http.put(`${environment.api}/wallet/${wallet._id}`, wallet);
    }

    removeWallet(id: string): Observable<any> {
        return this.http.delete(`${environment.api}/wallet/${id}`);
    }

    calculateWalletNumbers(transactions: Array<Transaction>) {

        let totalWalletCash = 0;
        let totalWalletEnter = 0;
        let totalWalletLeaving = 0;

        transactions.map( transaction => {
            if (transaction.type === 'internal') {
                totalWalletEnter += transaction.value;
            }

            if (transaction.type === 'external') {
                totalWalletLeaving += transaction.value;
            }
        });

        totalWalletCash = totalWalletEnter + totalWalletLeaving;

        return { totalWalletCash, totalWalletEnter, totalWalletLeaving }
    }
}