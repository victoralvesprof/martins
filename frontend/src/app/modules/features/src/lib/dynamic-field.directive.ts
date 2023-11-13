import {
  Directive,
  OnInit,
  Input,
  ViewContainerRef,
  Type,
} from '@angular/core';
import {
  DynamicFormConfig,
  Fields,
} from 'src/app/components/shared/models/dynamic-form-config.model';
import { DynamicControl } from 'src/app/components/shared/interfaces/dynamic-control.interface';
import { DynamicFormInputComponent } from './dynamic-form-input/dynamic-form-input.component';
import { DynamicFormRadioComponent } from './dynamic-form-radio/dynamic-form-radio.component';

type ComponentFields = {
  [Property in Fields]: Type<DynamicControl>;
};

const components: ComponentFields = {
  input: DynamicFormInputComponent,
  radio: DynamicFormRadioComponent,
};

@Directive({
  selector: '[libDynamicField]',
})
export class DynamicFieldDirective implements OnInit {
  @Input('libDynamicField') config!: DynamicFormConfig;

  constructor(private viewContainerRef: ViewContainerRef) {}

  ngOnInit(): void {
    const component = components[this.config.field];
    const componentRef = this.viewContainerRef.createComponent(component);
    componentRef.instance.config = this.config;
  }
}
