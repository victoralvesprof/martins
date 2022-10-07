import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";

@Injectable()
export class EstoqueService {
  baseUrlProduct: string = environment.bffProdutos;

  constructor(public http: HttpClient) { }

  getAllProducts(): Observable<any> {
    return this.http.get(this.baseUrlProduct + '/produtos');
  }

  getOnlyProduct(id: string): Observable<any>{
    return this.http.get(this.baseUrlProduct + `/produtos/${id}`);
  }
}
