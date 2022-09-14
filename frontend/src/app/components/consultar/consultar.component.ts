import { SelectionModel } from '@angular/cdk/collections';
import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { concatMap, tap } from 'rxjs';

import { Cliente } from '../shared/interfaces/cliente';
import { ClienteService } from '../shared/services/cliente.service';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.scss']
})
export class ConsultarComponent implements OnInit {
  dataSource!: MatTableDataSource<Cliente[]>;
  displayedColumns: string[] = ['select', 'nome', 'cpf', 'data', 'aVer', 'divida'];
  selection = new SelectionModel<Cliente>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private clienteService: ClienteService,
    private _snackBar: MatSnackBar
  ) { }
  ngOnInit(): void {
    this.clienteService.getAllClients().subscribe((res: any) => {
      this.chargeClients(res);
    });
  }

  chargeClients(response: any) {
      console.log("response getall: ", response);
      response.forEach((element: any) => {
        element.aVer.forEach((el: any) => {
          element.abatido = element.abatido + el.valor;
        });
        element.items.forEach((el: any) => {
          element.divida = element.divida + el.valor * el.quantidade;
        });
        element.divida = element.divida - element.abatido;
      });
      
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  newClient() {
    this.router.navigate(['/cadastrar']);
  }

  editClient() {
    console.log("ID para edição: ", this.selection.selected[0]._id)
    this.router.navigate([`/editar/${this.selection.selected[0]._id}`]);
  }

  removeClient() {
    this.clienteService.removeClient(this.selection.selected[0]._id!).pipe(
      tap(() => {
        this._snackBar.open("Registro salvo com sucesso!", "x", {duration: 3000, panelClass: 'success'});
        this.selection.clear();
      }),
      concatMap(() => this.clienteService.getAllClients())
    ).subscribe((res: any) => {
      this.chargeClients(res);
    });
  }

  selectHandler(row: Cliente) {
    if (!this.selection.isSelected(row)) {
      this.selection.clear();
    }
    this.selection.toggle(row);
  }
}
