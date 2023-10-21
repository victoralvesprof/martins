import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { Cliente } from '../interfaces/cliente.interface';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  baseUrlClient: string = environment.bffClientes;

  constructor(public http: HttpClient) { }

  getAllClients(): Observable<any> {
    return this.http.get(this.baseUrlClient);
  }

  getOnlyClient(id: string): Observable<any>{
    return this.http.get(this.baseUrlClient + id);
  }

  newClient(newClient: Cliente): Observable<any> {
    return this.http.post(this.baseUrlClient, newClient);
  }

  updateClient(editClient: Cliente, id: string): Observable<any>{
    return this.http.put(this.baseUrlClient + id, editClient);
  }

  removeClient(id: string): Observable<any> {
    return this.http.delete<Observable<any>>(this.baseUrlClient + id);
  }
}
