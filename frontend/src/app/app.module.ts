import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CadastrarModule } from './components/cadastrar/cadastrar.module';
import { ConsultarModule } from './components/consultar/consultar.module';
import { FiadoModule } from './components/fiado/fiado.module';
import { AdicionarFiadoModule } from './components/adicionar-fiado/adicionar-fiado.module';
import { DynamicFormModule } from './modules/features/src/lib/dynamic-form.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CadastrarModule,
    ConsultarModule,
    FiadoModule,
    AdicionarFiadoModule,
    DynamicFormModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
