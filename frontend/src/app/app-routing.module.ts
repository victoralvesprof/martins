import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarComponent } from './components/cadastrar/cadastrar.component';
import { ConsultarComponent } from './components/consultar/consultar.component';

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
    path: 'editar/:cpf',
    component: CadastrarComponent
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
