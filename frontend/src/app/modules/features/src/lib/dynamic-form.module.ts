import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './../../../../components/shared/modules/material/material.module';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormInputComponent } from './dynamic-form-input/dynamic-form-input.component';
import { DynamicFormRadioComponent } from './dynamic-form-radio/dynamic-form-radio.component';
import { DynamicFieldDirective } from './dynamic-field.directive';
// import { NO_ERRORS_SCHEMA } from '@angular/compiler';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  declarations: [
    RegisterComponent,
    DynamicFormInputComponent,
    DynamicFormRadioComponent,
    DynamicFieldDirective,
    MaterialModule
  ],
  exports: [RegisterComponent],
  // schemas: [NO_ERRORS_SCHEMA]
})
export class DynamicFormModule {}
