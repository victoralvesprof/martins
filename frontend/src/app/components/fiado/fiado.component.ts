import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente, Items } from '../shared/interfaces/cliente';
import { ClienteService } from '../shared/services/cliente.service';

@Component({
  selector: 'app-fiado',
  templateUrl: './fiado.component.html',
  styleUrls: ['./fiado.component.scss']
})
export class FiadoComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['descricao', 'quantidade', 'data', 'valor'];
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
  
  clienteItems: Array<Items> = [];

  constructor(
    private router: Router,
    private activatedRoute : ActivatedRoute,
    private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get("id")!;
    if(this.id){
      this.clienteService.getOnlyClient(this.id).subscribe((res: any) => {
        console.log("fiado cliente: ", res);
        this.cliente = res;
        this.clienteItems = res.items!;

        this.dataSource = new MatTableDataSource(this.clienteItems);
        console.log("dataSource: ", this.dataSource);
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

  getTotalCost() {
    return this.clienteItems.map(t => t.valor * t.quantidade).reduce((acc, value) => acc + value, 0);
  }
}
