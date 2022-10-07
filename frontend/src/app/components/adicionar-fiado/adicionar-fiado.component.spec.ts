import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarFiadoComponent } from './adicionar-fiado.component';

describe('AdicionarFiadoComponent', () => {
  let component: AdicionarFiadoComponent;
  let fixture: ComponentFixture<AdicionarFiadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdicionarFiadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdicionarFiadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
