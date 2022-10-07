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
  }
  // {
  //   path: 'consultar',
  //   loadChildren: () =>
  //     import(`./moduleTwo/module-two.module`).then((m) => m.ModuleTwoModule),
  // },
  // {
  //   path: 'editar',
  //   loadChildren: () =>
  //     import(`./moduleOne/module-one.module`).then((m) => m.ModuleOneModule),
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
