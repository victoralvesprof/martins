import { Component } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { DynamicControl } from 'src/app/components/shared/interfaces/dynamic-control.interface';
import { DynamicFormConfig } from 'src/app/components/shared/models/dynamic-form-config.model';

@Component({
  selector: 'lib-dynamic-form-input',
  viewProviders: [{ 
    provide: ControlContainer, 
    useExisting: FormGroupDirective 
  }],
  templateUrl: './dynamic-form-input.component.html',
  styleUrls: ['./dynamic-form-input.component.scss'],
})
export class DynamicFormInputComponent implements DynamicControl {
  config!: DynamicFormConfig;
}
