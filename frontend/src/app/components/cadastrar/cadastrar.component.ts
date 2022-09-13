import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { Cliente } from '../shared/interfaces/cliente';
import { ClienteService } from '../shared/services/cliente.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.scss']
})
export class CadastrarComponent implements OnInit {
  isEditar: boolean = false;
  cliente: Cliente = {
    nome: "",
    endereco: "",
    cpf: "",
    rg: "",
    email: "",
    sexo: 0,
    items: [],
    divida: 0,
    aVer: [],
    abatido: 0
  };

  form = this.fb.group({
    name: ['', {
      Validators: [
        Validators.required
      ]
    }],
    endereco: ['', {
      Validators: [
        Validators.required
      ]
    }],
    cpf: ['', {
      Validators: [
        Validators.required
      ]
    }],
    rg: ['', {
      Validators: [
        Validators.required
      ]
    }],
    email: ['', {
        validators: [
            Validators.required, 
            Validators.email
        ],
        updateOn: 'blur'
    }],
    gender: ['masculino', {
      validators: [
        Validators.required
      ]
    }]
  });  
  
  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute : ActivatedRoute,
    private clienteService: ClienteService) { }

  ngOnInit(): void {
    const cpf = this.activatedRoute.snapshot.paramMap.get("cpf");
    if(cpf){
      this.isEditar = true;
      this.clienteService.getOnlyClient(cpf).subscribe((res: any) => {
        this.cliente = res;
      });
    }
  }

  get name() {
    return this.form.controls['name'];
  }

  get endereco() {
    return this.form.controls['endereco'];
  }

  get cpf() {
    return this.form.controls['cpf'];
  }

  get rg() {
    return this.form.controls['rg'];
  }

  get email() {
    return this.form.controls['email'];
  }

  get gender() {
    return this.form.controls['gender'];
  }
  
  cancel(): void {
		this.router.navigate(['/consultar']);
	}

  onSubmit() {
    if(this.isEditar) {
      this.clienteService.updateClient(this.cliente).subscribe(res => {
        console.log("RESPOSTA: ", res);
        this._snackBar.open("Registro salvo com sucesso!", "x", {duration: 3000, panelClass: 'success'});
        this.router.navigate(['/consultar']);
        this.form.reset();
      });
    } else {
      this.clienteService.newClient(this.form.value as Cliente).subscribe(res => {
        console.log("RESPOSTA: ", res);
        this._snackBar.open("Registro salvo com sucesso!", "x", {duration: 3000, panelClass: 'success'});
        this.router.navigate(['/consultar']);
        this.form.reset();
      });
    }
    
  }
}