import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Cliente } from '../shared/interfaces/cliente.interface';
import { ClienteService } from '../shared/services/cliente.service';

import { CadastrarComponent } from './cadastrar.component';
import { CadastrarModule } from './cadastrar.module';
import { FormBuilder } from '@angular/forms';

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
  
  let MockRouter: {
    navigate: jasmine.SpyObjPropertyNames
  };

  beforeEach(async () => {
    MockRouter = {
      navigate: jasmine.createSpy('navigate')
    };
    await TestBed.configureTestingModule({
      imports: [ 
        CadastrarModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: ClienteService, useValue: MockClienteService },
        { provide: ActivatedRoute, useValue: MockActivatedRoute },
        { provide: HttpClient, useValue: MockHttpClient },
        { provide: Router, useValue: MockRouter },
        FormBuilder 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe('should test ngOnInit', () => {
    it('clientID true', () => {
      const ngOninitSpy = spyOn(component, 'initializeForm').and.callFake(() => { });
  
      component.ngOnInit();
  
      expect(component.clientID).toBeTruthy();
      expect(ngOninitSpy).toHaveBeenCalled();
    });

    it('clientID false', () => {
      spyOn(MockActivatedRoute.snapshot.paramMap, 'get').and.returnValue(undefined as any);
      const ngOninitSpy = spyOn(component, 'initializeForm').and.callFake(() => { });
  
      component.ngOnInit();
  
      expect(component.clientID).toBeUndefined();
      expect(ngOninitSpy).toHaveBeenCalled();
    });

  });

  it('should test cancel', () => {
    component.cancel();

    expect(MockRouter.navigate).toHaveBeenCalledOnceWith(['/consultar']);
  });

  describe('should test onSubmit', () => {
    it('if true', () => {
      component.clientID = 'true';
      component.onSubmit();

      expect(MockRouter.navigate).toHaveBeenCalledWith(['/consultar']);
    });
    it('else', () => {
      component.clientID = undefined as any;

      component.onSubmit();

      expect(MockRouter.navigate).toHaveBeenCalledWith(['/consultar']);
    });
  });
});
