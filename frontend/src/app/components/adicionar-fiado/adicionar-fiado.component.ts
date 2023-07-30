import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap, last, tap } from 'rxjs';
import { Items } from '../shared/interfaces/cliente.interface';
import { ClienteService } from '../shared/services/cliente.service';
import { EstoqueService } from './estoque.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-adicionar-fiado',
  templateUrl: './adicionar-fiado.component.html',
  styleUrls: ['./adicionar-fiado.component.scss']
})
export class AdicionarFiadoComponent implements OnInit {
  selectedProduct: any = {
    nome: "",
    quantidade: 1,
    validade: new Date(),
    preco: 0,
    imagem: "",
    descricao: "",
    lancamento: new Date(0),
    compras: []
  };
  id: string = '';
  products: any;
  quantity: number | null = null;

  form = this.fb.group({
    product: ['', {
      Validators: [
        Validators.required
      ]
    }],
    quantidade: ['', {
      Validators: [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(this.selectedProduct.quantidade)
      ]
    }]
  });

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute : ActivatedRoute,
    private clienteService: ClienteService,
    private estoqueService: EstoqueService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get("id")!;

    this.estoqueService.getAllProducts().subscribe((res: any) => {
      console.log("response getall: ", res);
      this.products = res;
    })
  }

  get product() {
    return this.form.controls['product'];
  }

  get quantidade() {
    return this.form.controls['quantidade'];
  }

  onProductChange(event: any) {
    console.log("Produto selecionado EVENT: ", event);
    console.log("Produto selecionado NGMODEL: ", this.selectedProduct);
  }

  cancel() {
    this.router.navigate([`/fiado/${this.id}`]);
  }

  onSubmit() {
    const newItem: Items = {
      descricao: this.selectedProduct.nome,
      quantidade: this.quantity!,
      data: new Date(Date.now()),
      valor: this.selectedProduct.preco,
      pago: false
    }
    this.clienteService.getOnlyClient(this.id)
      .pipe(
        tap(res => {
          res.items.push(newItem);
          res.divida = res.items.map((t: Items) => t.valor * t.quantidade).reduce((acc: number, value: number) => acc + value, 0) 
        }),
        concatMap(res => this.clienteService.updateClient(res, res._id)),
        last()
      )
      .subscribe((res: any) => {
        console.log("response adicionar produto: ", res);
        this.router.navigate([`/fiado/${this.id}`]);
      });
  }
}
