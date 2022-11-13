import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { Cliente, Items } from '../shared/interfaces/cliente.interface';
import { ClienteService } from '../shared/services/cliente.service';

import { AdicionarFiadoComponent } from './adicionar-fiado.component';
import { AdicionarFiadoModule } from './adicionar-fiado.module';
import { EstoqueService } from './estoque.service';

describe('AdicionarFiadoComponent', () => {
  let component: AdicionarFiadoComponent;
  let fixture: ComponentFixture<AdicionarFiadoComponent>;

  const MockClient: Cliente = {
    nome: "",
    endereco: "",
    cpf: "",
    rg: "",
    email: "",
    sexo: 0,
    items: [
      {
        descricao: '',
        quantidade: 0,
        data: new Date(),
        valor: 0,
        pago: false
      }
    ],
    divida: 0,
    aVer: []
  };

  const MockClienteService = {
    getOnlyClient() {
      return of(MockClient as any);
    },
    updateClient() {
      return of({});
    }
  };

  const MockEstoqueService = {
    getAllProducts() {
      return of([]);
    }
  };

  const MockActivatedRoute = {
    snapshot: {
      paramMap: {
        get() {
          return '';
        }
      }
    }
  };

  const MockHttpClient = {
    get() {
      return undefined;
    }
  };

  let MockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ AdicionarFiadoModule, BrowserAnimationsModule ],
      providers:[
        { provide: EstoqueService, useValue: MockEstoqueService },
        { provide: ClienteService, useValue: MockClienteService },
        { provide: ActivatedRoute, useValue: MockActivatedRoute },
        { provide: HttpClient, useValue: MockHttpClient },
        { provide: Router, useValue: MockRouter }
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(AdicionarFiadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test ngOnInit', () => {
    component.ngOnInit();
    
    expect(component.id).toBe('');
    expect(component.products).toEqual([]);
  });

  it('should test onProductChange', () => {
    const callback = component.onProductChange('');
    
    expect(callback).toBeUndefined()
  });

  it('should test cancel', () => {
    component.cancel();
    
    expect(MockRouter.navigate).toHaveBeenCalledWith(['/fiado/']);
  });

  it('should test onSubmit', () => {
    component.onSubmit();
    
    expect(MockRouter.navigate).toHaveBeenCalledWith(['/fiado/']);
  });
});
