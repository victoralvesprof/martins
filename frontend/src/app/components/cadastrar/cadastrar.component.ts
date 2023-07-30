import { OnInit, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { Cliente } from '../shared/interfaces/cliente.interface';
import { ClienteService } from '../shared/services/cliente.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.scss']
})
export class CadastrarComponent implements OnInit {
  form!: FormGroup;
  clientID!: string;
  
  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute : ActivatedRoute,
    private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.clientID = this.activatedRoute.snapshot.paramMap.get("id")!;

    if(this.clientID){
      this.clienteService.getOnlyClient(this.clientID).subscribe((cliente: Cliente) => {
        this.initializeForm(cliente);
      });
    } else {
      this.initializeForm();
    }
  }

  initializeForm(cliente?: Cliente) {
    this.form = this.fb.group({
      nome: [cliente?.nome ?? '', {
        Validators: [
          Validators.required
        ]
      }],
      endereco: [cliente?.endereco ?? '', {
        Validators: [
          Validators.required
        ]
      }],
      cpf: [cliente?.cpf ?? '', {
        Validators: [
          Validators.required
        ]
      }],
      rg: [cliente?.rg ?? '', {
        Validators: [
          Validators.required
        ]
      }],
      email: [cliente?.email ?? '', Validators.compose([
        Validators.required, 
        Validators.email,
      ])],
      sexo: [cliente?.sexo ?? 'masculino', {
        validators: [
          Validators.required
        ]
      }]
    });
  }
  
  cancel(): void {
		this.router.navigate(['/consultar']);
	}

  onSubmit() {
    if(this.clientID) {
      this.clienteService.updateClient(this.form.value, this.clientID).subscribe(res => {
        console.log("RESPOSTA edicao cliente: ", res);
        this._snackBar.open(`${res.msg}`, "x", {duration: 3000, panelClass: 'success'});
        this.form.reset();
        this.router.navigate(['/consultar']);
      });
    } else {
      this.clienteService.newClient(this.form.value).subscribe(res => {
        console.log("RESPOSTA novo cliente: ", res);
        this._snackBar.open(`${res.msg}`, "x", {duration: 3000, panelClass: 'success'});
        this.router.navigate(['/consultar']);
        this.form.reset();
      });
    }
  }
}
