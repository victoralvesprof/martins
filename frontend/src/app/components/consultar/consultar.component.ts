import { SelectionModel } from '@angular/cdk/collections';
import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { Router } from '@angular/router';
import { concatMap, tap } from 'rxjs';

import { Cliente } from '../shared/interfaces/cliente.interface';
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
  filter: string = '';

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
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }

  applyFilter() {
    this.dataSource.filter = this.filter.trim().toLowerCase();

    if (this.dataSource.paginator) {
      console.log('entrouuuu')
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

  fiado() {
    this.router.navigate([`/fiado/${this.selection.selected[0]._id}`]);
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
