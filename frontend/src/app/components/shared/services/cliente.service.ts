import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { Cliente } from '../interfaces/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  baseUrlClient: string = environment.clientesApi;

  constructor(public http: HttpClient) { }

  getAllClients(): Observable<any> {
    // const headers = new HttpHeaders()
    //   .append('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With')
    //   .append('Content-Type', 'application/json; charset=utf-8')
    //   .append('ETag', `W/"e26-lchCs6o6uvrNdfq6rONJlBa7gw4"`)
    //   .append('Access-Control-Allow-Origin', '*')
    //   .append('Access-Control-Allow-Methods', 'POST, PUT, GET, OPTIONS')
    return this.http.get(this.baseUrlClient + 'clientes');
  }

  getOnlyClient(id: string): Observable<any>{
    return this.http.get(this.baseUrlClient + `clientes/${id}`);
  }

  newClient(newClient: Cliente): Observable<any> {
    return this.http.post(this.baseUrlClient + 'clientes', newClient);
  }

  updateClient(editClient: Cliente): Observable<any>{
    return this.http.put(this.baseUrlClient + 'clientes', editClient);
  }

  removeClient(id: string): Observable<any> {
    return this.http.delete<Observable<any>>(this.baseUrlClient + `clientes/${id}`);
  }
}
