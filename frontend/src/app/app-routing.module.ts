import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdicionarFiadoComponent } from './components/adicionar-fiado/adicionar-fiado.component';
import { CadastrarComponent } from './components/cadastrar/cadastrar.component';
import { ConsultarComponent } from './components/consultar/consultar.component';
import { FiadoComponent } from './components/fiado/fiado.component';

const routes: Routes = [
  {
    path: 'cadastrar',
    component: CadastrarComponent
  },
  {
    path: 'consultar',
    component: ConsultarComponent
  },
  {
    path: 'editar/:id',
    component: CadastrarComponent
  },
  {
    path: 'fiado/:id',
    component: FiadoComponent
  },
  {
    path: 'adicionar-fiado/:id',
    component: AdicionarFiadoComponent
  },
  { 
    path: '**', 
    redirectTo: 'consultar' 
  },
  // {
  //   path: 'consultar',
  //   loadChildren: () =>
  //     import(`./components/consultar/consultar.module`).then((m) => m.ConsultarModule),
  // },
  // {
  //   path: 'cadastrar',
  //   loadChildren: () =>
  //     import(`./components/cadastrar/cadastrar.module`).then((m) => m.CadastrarModule),
  // },
  // {
  //   path: 'editar/:id',
  //   loadChildren: () =>
  //     import(`./components/cadastrar/cadastrar.module`).then((m) => m.CadastrarModule),
  // },
  // {
  //   path: 'fiado/:id',
  //   loadChildren: () =>
  //     import(`./components/fiado/fiado.module`).then((m) => m.FiadoModule),
  // },
  // {
  //   path: 'adicionar-fiado/:id',
  //   loadChildren: () =>
  //     import(`./components/adicionar-fiado/adicionar-fiado.module`).then((m) => m.AdicionarFiadoModule),
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
