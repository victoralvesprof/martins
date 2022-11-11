import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { Cliente } from '../shared/interfaces/cliente';
import { ClienteService } from '../shared/services/cliente.service';

import { ConsultarComponent } from './consultar.component';
import { ConsultarModule } from './consultar.module';

describe('ConsultarComponent', () => {
  let component: ConsultarComponent;
  let fixture: ComponentFixture<ConsultarComponent>;

  const MockClient: Cliente = {
    _id: "",
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
    getAllClients() {
      return of([]);
    },
    removeClient() {
      return of(true);
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
    },
    delete() {
      return undefined;
    }
  };

  let MockRouter: { navigate: jasmine.Spy };

  beforeEach(async () => {
    MockRouter = { navigate: jasmine.createSpy('navigate') };
    await TestBed.configureTestingModule({
      imports: [ 
        ConsultarModule,
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
    fixture = TestBed.createComponent(ConsultarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test ngOnInit', () => {
    const spyChargeClients = spyOn(component, 'chargeClients').and.callFake(() => { });

    component.ngOnInit();

    expect(spyChargeClients).toHaveBeenCalled();
  });

  it('should test chargeClients', () => {
    component.chargeClients([]);

    expect(component.dataSource.data).toEqual([]);
  });

  it('should test applyFilter', () => {
    component.filter = ''

    const callback = component.applyFilter();

    expect(callback).toBeUndefined();
  });

  it('should test newClient', () => {
    component.newClient();

    expect(MockRouter.navigate).toHaveBeenCalledOnceWith(['/cadastrar']);
  });

  it('should test editClient', () => {
    component.selection = new SelectionModel<Cliente>(true, []);
    component.selection.selected[0] = MockClient;

    component.editClient();

    expect(MockRouter.navigate).toHaveBeenCalledOnceWith(['/editar/']);
  });

  it('should test fiado', () => {
    component.selection = new SelectionModel<Cliente>(true, []);
    component.selection.selected[0] = MockClient;

    component.fiado();

    expect(MockRouter.navigate).toHaveBeenCalledOnceWith(['/fiado/']);
  });

  it('should test removeClient', () => {
    component.selection = new SelectionModel<Cliente>(true, []);
    component.selection.selected[0] = MockClient;

    const spyChargeClients = spyOn(component, 'chargeClients').and.callFake(() => { });

    component.removeClient();

    expect(spyChargeClients).toHaveBeenCalled();
  });

  it('should test selectHandler', () => {
    component.selection = new SelectionModel<Cliente>(true, []);
    component.selection.selected[0] = MockClient;

    const callback = component.selectHandler(MockClient);

    expect(callback).toBeUndefined();
  });
});
