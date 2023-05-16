import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EstoqueService } from './estoque.service';
import { MaterialModule } from '../shared/modules/material/material.module';
import { AdicionarFiadoComponent } from './adicionar-fiado.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';



@NgModule({
  declarations: [
    AdicionarFiadoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CurrencyMaskModule
  ],
  providers: [EstoqueService]
})
export class AdicionarFiadoModule { }
