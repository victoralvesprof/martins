import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
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

  displayedColumnsDividas: string[] = ['descricao', 'quantidade', 'data', 'valor'];
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
    abatido: 0
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
      this.clienteService.getOnlyClient(this.id).subscribe((res: any) => {
        console.log("fiado cliente: ", res);
        this.cliente = res;

        this.dataSource = new MatTableDataSource(this.cliente.items);
        this.dataSourceAbatimento = new MatTableDataSource(this.cliente.aVer);

        this.dataSource.sort = this.sort;
      });
    }
  }

  addData() {
    this.router.navigate([`/adicionar-fiado/${this.id}`]);
  }

  removeData() {
    // this.dataSource.pop();
    // this.table.renderRows();
  }

  back() {
    this.router.navigate([`/consultar`]);
  }

  getTotalCost(lista: string): number {
    if(lista === "Abatimento") return this.cliente.aVer!.map(t => t.valor).reduce((acc, value) => acc + value, 0);
    else {
      return this.cliente.items!.map(t => t.valor).reduce((acc, value) => acc + value, 0)
    };
  }

  pagarFiado(){
    const dialogRef = this.dialog.open(PagarFiadoDialog, {
      width: '250px',
      data: this.abater
    });

    dialogRef.afterClosed().subscribe(result => {
      this.abater = result;
      console.log("abater: ", this.abater);

      this.cliente.aVer?.push({valor: this.abater})
      this.cliente.abatido = this.getTotalCost('abatimento');

      this.cliente.items!.map((el: Items) => {
        if(this.cliente.abatido! > 0 && !el.pago) {
          const item = el.valor * el.quantidade;
          if(item <= this.cliente.abatido!) {
            el.pago = true;
            this.cliente.abatido = this.cliente.abatido! - item;
          } else{
            return;
          }
        } else {
          return;
        }
      })
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
    this.dialogRef.close();
  }
}
