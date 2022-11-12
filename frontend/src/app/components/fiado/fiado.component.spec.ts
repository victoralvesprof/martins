import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { Cliente } from '../shared/interfaces/cliente';
import { ClienteService } from '../shared/services/cliente.service';

import { FiadoComponent } from './fiado.component';
import { FiadoModule } from './fiado.module';

describe('FiadoComponent', () => {
  let component: FiadoComponent;
  let fixture: ComponentFixture<FiadoComponent>;

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

  const MockActivatedRoute = {
    snapshot: {
      paramMap: {
        get() {
          return 'id';
        }
      }
    }
  };

  const MockHttpClient = {
    get() {
      return undefined;
    },
    post() {
      return undefined;
    },
    put() {
      return undefined;
    }
  };

  const MockClienteService = {
    getOnlyClient() {
      return of(MockClient as any);
    },
    updateClient() {
      return of(true);
    }
  };

  let MockRouter: { navigate: jasmine.Spy };

  beforeEach(async () => {
    MockRouter = { navigate: jasmine.createSpy('navigate') };
    await TestBed.configureTestingModule({
      imports: [ 
        FiadoModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: ClienteService, useValue: MockClienteService },
        { provide: ActivatedRoute, useValue: MockActivatedRoute },
        { provide: HttpClient, useValue: MockHttpClient },
        { provide: Router, useValue: MockRouter }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test ngOnInit', () => {
    const spyChargeClient = spyOn(component, 'chargeClient').and.callFake(() => { });

    component.ngOnInit();

    expect(component.id).toBe('id');
    expect(spyChargeClient).toHaveBeenCalled();
  });

  it('should test chargeClient', () => {
    component.sort = new MatSort();

    const callback = component.chargeClient();

    expect(callback).toBeUndefined();
  });

  it('should test addData', () => {
    component.id = '';

    component.addData();

    expect(MockRouter.navigate).toHaveBeenCalledWith(['/adicionar-fiado/']);
  });

  it('should test back', () => {
    component.id = '';

    component.back();

    expect(MockRouter.navigate).toHaveBeenCalledWith(['/consultar']);
  });

  describe('should test getTotalCost', () => {
    it('lista abatimento', () => {
      component.cliente = MockClient;

      const callback = component.getTotalCost();

      expect(callback).toBe(0);
    });
    it('else', () => {
      component.cliente = MockClient;

      const callback = component.getTotalCost('outro');

      expect(callback).toBe(0);
    });
  })
});
