import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Abatimento, Cliente, Items } from '../shared/interfaces/cliente';
import { ClienteService } from '../shared/services/cliente.service';

@Component({
  selector: 'app-fiado',
  templateUrl: './fiado.component.html',
  styleUrls: ['./fiado.component.scss']
})
export class FiadoComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  dataSourceAbatimento!: MatTableDataSource<any>;
  abater!: number;
  contadorFiado: number = 0;

  displayedColumnsDividas: string[] = ['descricao', 'quantidade', 'data', 'valor', 'parcial'];
  displayedColumnsAbatimentos: string[] = ['data', 'valor'];

  id: string = '';
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
    sobra: 0
  };

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private activatedRoute : ActivatedRoute,
    private clienteService: ClienteService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get("id")!;
    if(this.id){
      this.chargeClient();
    }
  }

  chargeClient(){
    this.clienteService.getOnlyClient(this.id).subscribe((res: any) => {
      console.log("fiado cliente: ", res);
      this.cliente = res;

      this.dataSource = new MatTableDataSource(this.cliente.items);
      this.dataSourceAbatimento = new MatTableDataSource(this.cliente.aVer!);

      this.dataSource.sort = this.sort;
    });
  }

  addData() {
    this.router.navigate([`/adicionar-fiado/${this.id}`]);
  }

  back() {
    this.router.navigate([`/consultar`]);
  }

  getTotalCost(lista: string = "Abatimento"): number {
    if(lista === "Abatimento") return this.cliente.aVer!.map(t => t.valor).reduce((acc, value) => acc + value, 0);
    else {
      return this.cliente.items!.filter(el => !el.pago).map(t => t.valor * t.quantidade).reduce((acc, value) => acc + value, 0);
    }
  }

  pagarFiado(): Observable<number> {
    const dialogRef = this.dialog.open(PagarFiadoDialog, {
      width: '250px',
      data: this.cliente.divida!
    });

    return dialogRef.afterClosed();
  }

  updateDataClient() {
    this.clienteService.updateClient(this.cliente).pipe(
      tap(() => this.chargeClient())
    ).subscribe(res => {
      console.log("fiado editado: ", this.cliente);
    })
  }

  abterFiado() {
    this.pagarFiado().subscribe((abater: number) => {
      console.log("abater test: ", abater);
  
      if(abater > 0) {
        this.cliente.sobra! += abater;
        this.cliente.aVer?.push({valor: abater} as Abatimento)
        this.cliente.divida! -= abater;
  
        this.cliente.items!.map((el: Items) => {
          if(!el.pago) {
            const item = el.valor * el.quantidade;
            if(item <= this.cliente.sobra!) {
              el.pago = true;
              this.cliente.sobra! -= item;
              this.contadorFiado++;
            } 
          } else {
            this.contadorFiado++;
            return;
          }
        });
        
        if(this.contadorFiado === this.cliente.items?.length) {
          this.cliente.items = [];
          this.cliente.aVer = [];
        }
  
        this.updateDataClient();
      }
    });
  }
}

@Component({
  selector: 'app-pagar-fiado',
  templateUrl: 'pagar-fiado.dialog.html',
})
export class PagarFiadoDialog {

  constructor(
    public dialogRef: MatDialogRef<PagarFiadoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.data = '';
    this.dialogRef.close();
  }
}
