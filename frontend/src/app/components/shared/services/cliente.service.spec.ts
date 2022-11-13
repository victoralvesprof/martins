import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Cliente } from '../interfaces/cliente.interface';

import { ClienteService } from './cliente.service';

describe('ClienteService', () => {
  let service: ClienteService;

  const MockHttpClient = {
    get() {
      return undefined;
    },
    post() {
      return undefined;
    },
    put() {
      return undefined;
    },
    delete() {
      return undefined;
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

  it('should test getAllClients', () => {
    const callback = service.getAllClients();
    
    expect(callback).toBeUndefined();
  });

  it('should test getOnlyClient', () => {
    const callback = service.getOnlyClient('');
    
    expect(callback).toBeUndefined();
  });

  it('should test newClient', () => {
    const callback = service.newClient({} as Cliente);
    
    expect(callback).toBeUndefined();
  });

  it('should test updateClient', () => {
    const callback = service.updateClient({} as Cliente);
    
    expect(callback).toBeUndefined();
  });

  it('should test removeClient', () => {
    const callback = service.removeClient('');
    
    expect(callback).toBeUndefined();
  });
});
