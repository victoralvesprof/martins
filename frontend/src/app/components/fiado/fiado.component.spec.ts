import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { Cliente, Items } from '../shared/interfaces/cliente.interface';
import { ClienteService } from '../shared/services/cliente.service';

import { FiadoComponent, PagarFiadoDialog } from './fiado.component';
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
        quantidade: 1,
        data: new Date(),
        valor: 0,
        pago: false
      }
    ],
    divida: 0,
    aVer: [],
    sobra: 0
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
    component.cliente = MockClient;
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
      const callback = component.getTotalCost();

      expect(callback).toBe(0);
    });
    it('else', () => {
      const callback = component.getTotalCost('outro');

      expect(callback).toBe(0);
    });
  });

  it('should test pagarFiado', (done) => {
    component.cliente.divida = 50;

    spyOn(component.dialog, 'open').and.returnValue({ afterClosed: () => of(10) } as MatDialogRef<PagarFiadoDialog>);

    component.pagarFiado().subscribe(res => {
      expect(res).toBe(10);
      done();
    });
  });

  describe('should test abterFiado', () => {
    describe('abater > 0', () => {
      it('if - item nao pago', () => {
        component.cliente.divida = 50;

        component.cliente.items = [];
        component.cliente.items.push({
          descricao: '',
          quantidade: 1,
          data: new Date(),
          valor: 50,
          pago: false
        });

        const spyUpdateDataClient = spyOn(component, 'updateDataClient').and.callFake(() => { });
        spyOn(component, 'pagarFiado').and.returnValue(of(50));
  
        component.abterFiado();
  
        expect(component.contadorFiado).toBe(1);
        expect(component.cliente.items).toEqual([]);
        expect(component.cliente.aVer).toEqual([]);
        expect(component.cliente.sobra).toEqual(0);
        expect(spyUpdateDataClient).toHaveBeenCalled();
      });
      it('else - item pago', () => {
        component.cliente.divida = 50;

        component.cliente.items = [];
        component.cliente.items.push({
          descricao: '',
          quantidade: 1,
          data: new Date(),
          valor: 10,
          pago: true
        });

        spyOn(component, 'updateDataClient').and.callFake(() => { });
        spyOn(component, 'pagarFiado').and.returnValue(of(10));

        component.abterFiado();

        expect(component.cliente.sobra).toBe(10);
        expect(component.cliente.divida).toBe(40);
        expect(component.contadorFiado).toBe(1);
      });
    });
    it('abater undefined', () => {
      const spyPagarFiado = spyOn(component, 'pagarFiado').and.returnValue(of(0));

      component.abterFiado();

      expect(spyPagarFiado).toHaveBeenCalled();
    });
  });

  it('should test updateDataClient', () => {
    const spyChargeClient = spyOn(component, 'chargeClient').and.callFake(() => { });

    component.updateDataClient();

    expect(spyChargeClient).toHaveBeenCalled();
  });
});
