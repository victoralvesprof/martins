import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable()
export class EstoqueService {
  baseUrlProduct = environment;
  

  constructor(public http: HttpClient) {
    console.log("env", this.baseUrlProduct)
  }

  getAllProducts(): Observable<any> {
    return this.http.get(this.baseUrlProduct.bffClientes + '/produtos');
  }

  getOnlyProduct(id: string): Observable<any>{
    return this.http.get(this.baseUrlProduct + `/produtos/${id}`);
  }
}
