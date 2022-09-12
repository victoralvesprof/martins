import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    return this.http.get<Observable<any>>(this.baseUrlClient + 'clients');
  }

  getOnlyClient(cpf: string) {
    return this.http.get<Observable<any>>(this.baseUrlClient + `client/${cpf}`);
  }

  newClient(newClient: Cliente) {
    return this.http.post<Observable<any>>(this.baseUrlClient + 'add-client', newClient);
  }

  updateClient(editClient: Cliente){
    return this.http.put<Observable<any>>(this.baseUrlClient + 'edit-client', editClient);
  }

  removeClient(cpf: string) {
    return this.http.delete<Observable<any>>(this.baseUrlClient + `client/${cpf}`);
  }
}
