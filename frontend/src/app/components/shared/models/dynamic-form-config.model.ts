import { ValidatorFn } from '@angular/forms';
import { ErrorStateMatcher, ThemePalette } from '@angular/material/core';

export type Fields = 'input' | 'radio';

export type DynamicFormConfig = {
    field: Fields;
    label: string;
    name: string;
    required: boolean;
    id: string;
    initialValue?: any;
    validation?: ValidatorFn[];

    type?: string;
    errorState?: boolean;
    errorStateMatcher?: ErrorStateMatcher;
    placeholder?: string;
    maxLength?: string;
    minLength?: string;
    readonly?: boolean;

    color?: ThemePalette;
    disabled?: boolean;
    labelPosition?: 'before' | 'after';
    options?: Array<string>;
};
