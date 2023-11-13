import { Component } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { DynamicControl } from 'src/app/components/shared/interfaces/dynamic-control.interface';
import { DynamicFormConfig } from 'src/app/components/shared/models/dynamic-form-config.model';

@Component({
  selector: 'lib-dynamic-form-radio',
  templateUrl: './dynamic-form-radio.component.html',
  styleUrls: ['./dynamic-form-radio.component.scss'],
  viewProviders: [{
    provide: ControlContainer, 
    useExisting: FormGroupDirective 
  }]
})
export class DynamicFormRadioComponent implements DynamicControl {
  config!: DynamicFormConfig;
}
