import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AdicionarFiadoModule } from './adicionar-fiado.module';

import { EstoqueService } from './estoque.service';

describe('EstoqueService', () => {
  let service: EstoqueService;

  const MockHttpClient = {
    get() {
      return of(undefined);
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [ AdicionarFiadoModule ],
        providers: [
            { provide: HttpClient, useValue: MockHttpClient }
        ]
    });
    service = TestBed.inject(EstoqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test getAllProducts', (done) => {
    service.getAllProducts().subscribe(res => {
        expect(res).toBeUndefined();
        done();
    });
    
  });

  it('should test getOnlyProduct', (done) => {
    service.getOnlyProduct('').subscribe(res => {
        expect(res).toBeUndefined();
        done();
    });
  });
});
