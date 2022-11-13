import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { Cliente } from '../shared/interfaces/cliente.interface';
import { ClienteService } from '../shared/services/cliente.service';

import { CadastrarComponent } from './cadastrar.component';
import { CadastrarModule } from './cadastrar.module';

describe('CadastrarComponent', () => {
  let component: CadastrarComponent;
  let fixture: ComponentFixture<CadastrarComponent>;

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
          return "true";
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
    },
    newClient() {
      return of(true);
    }
  };
  
  let MockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ 
        CadastrarModule,
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

    fixture = TestBed.createComponent(CadastrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test ngOnInit', () => {
    component.ngOnInit();

    expect(component.isEditar).toBeTruthy();
    expect(component.cliente).toEqual(MockClient);
  });

  describe('should test onSubmit', () => {
    it('if true', () => {
      component.isEditar = true
      component.onSubmit();

      expect(MockRouter.navigate).toHaveBeenCalledWith(['/consultar']);
    });
    it('else', () => {
      component.isEditar = false;
      const spyConstructorNewClient = spyOn(component, 'constructorNewClient').and.returnValue(MockClient);

      component.onSubmit();

      expect(spyConstructorNewClient).toHaveBeenCalled();
      expect(MockRouter.navigate).toHaveBeenCalledWith(['/consultar']);
    });
  });

  it('should test constructorNewClient', () => {
    component.cliente = MockClient;

    const callback = component.constructorNewClient();

    expect(callback).toBeTruthy();
  });
});
