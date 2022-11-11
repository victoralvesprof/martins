import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

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
});
