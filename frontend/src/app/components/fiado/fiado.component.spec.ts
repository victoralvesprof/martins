import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';

import { FiadoComponent } from './fiado.component';
import { FiadoModule } from './fiado.module';

describe('FiadoComponent', () => {
  let component: FiadoComponent;
  let fixture: ComponentFixture<FiadoComponent>;

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
    post() {
      return undefined;
    },
    put() {
      return undefined;
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ 
        FiadoModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: MockActivatedRoute },
        { provide: HttpClient, useValue: MockHttpClient }
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
});
