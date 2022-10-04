import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiadoService } from './fiado.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/modules/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { FiadoComponent } from './fiado.component';



@NgModule({
  declarations: [FiadoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [FiadoService]
})
export class FiadoModule { }
