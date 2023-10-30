import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Cliente } from '../interfaces/cliente.interface';

import { ClienteService } from './cliente.service';

describe('ClienteService', () => {
  let service: ClienteService;

  const MockHttpClient = {
    get() {
      return of(undefined);
    },
    post() {
      return of(undefined);
    },
    put() {
      return of(undefined);
    },
    delete() {
      return of(undefined);
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: MockHttpClient }
      ]
    });
    service = TestBed.inject(ClienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test getAllClients', (done) => {
    service.getAllClients().subscribe(res => {
      expect(res).toBeUndefined();
      done();
    });
  });

  it('should test getOnlyClient', (done) => {
    service.getOnlyClient('').subscribe(res => {
      expect(res).toBeUndefined();
      done();
    });
  });

  it('should test newClient', (done) => {
    service.newClient({} as Cliente).subscribe(res => {
      expect(res).toBeUndefined();
      done();
    });
  });

  it('should test updateClient', (done) => {
    service.updateClient({} as Cliente, '').subscribe(res => {
      expect(res).toBeUndefined();
      done();
    });
  });

  it('should test removeClient', (done) => {
    service.removeClient('').subscribe(res => {
      expect(res).toBeUndefined();
      done();
    });
  });
});
