import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CadastrarComponent } from './cadastrar.component';
import { MaterialModule } from '../shared/modules/material/material.module';

@NgModule({
  declarations: [
    CadastrarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class CadastrarModule { }
