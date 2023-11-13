import { ClienteService } from './../../../../../components/shared/services/cliente.service';
import { DynamicFormConfig } from './../../../../../components/shared/models/dynamic-form-config.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'lib-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  config: DynamicFormConfig[] = [
    {
      field: 'input',
      label: 'Nome completo',
      name: 'nome',
      type: 'text',
      id: 'input-name',
      maxLength: '50',
      placeholder: 'Victor Hugo Carvalho Alves',
      required: true,
      validation: [Validators.required],
    },
    {
      field: 'input',
      label: 'Endereço',
      name: 'endereco',
      type: 'text',
      id: 'input-address',
      maxLength: '120',
      placeholder: 'Ex. Rua Manuel Vitorino, 10 - baitinga de cima',
      required: true,
      validation: [Validators.required],
    },
    {
      field: 'input',
      label: 'CPF',
      name: 'cpf',
      type: 'text',
      id: 'input-cpf',
      placeholder: 'Ex. Rua Manuel Vitorino, 10 - baitinga de cima',
      minLength: '11',
      required: true,
      validation: [Validators.required, Validators.minLength(11)],
    },
    {
      field: 'input',
      label: 'Documento',
      name: 'rg',
      type: 'text',
      id: 'input-rg',
      placeholder: '0929774213',
      minLength: '11',
      required: true,
      validation: [Validators.required, Validators.minLength(11)],
    },
    {
      field: 'input',
      label: 'Email',
      name: 'email',
      type: 'email',
      id: 'input-email',
      placeholder: 'victoralves.prof@gmail.com',
      minLength: '11',
      required: true,
      validation: [Validators.required, Validators.minLength(11)],
    },
    {
      field: 'radio',
      label: 'Gênero',
      name: 'gender',
      id: 'input-gender',
      required: true,
      options: ['Masculino', 'Feminino'],
      validation: [Validators.required],
    },
  ];
  public form = new FormGroup({});

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private clienteService: ClienteService
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.config.forEach((control) =>
      this.form.addControl(
        control.name,
        new FormControl(control.initialValue, control.validation)
      )
    );
  }

  cancel(): void {
    this.router.navigate(['/consultar']);
  }

  onSubmit() {
    console.log("submit")
  //   this.clienteService
  //     .newClient(this.form.value as Cliente)
  //     .subscribe((res) => {
  //       console.log('RESPOSTA novo cliente: ', res);
  //       this._snackBar.open(`${res.msg}`, 'x', {
  //         duration: 3000,
  //         panelClass: 'success',
  //       });
  //       this.router.navigate(['/consultar']);
  //       this.form.reset();
  //     });
  }
}
