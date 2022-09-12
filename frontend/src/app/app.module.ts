import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CadastrarModule } from './components/cadastrar/cadastrar.module';
import { ConsultarComponent } from './components/consultar/consultar.component';
import { ConsultarModule } from './components/consultar/consultar.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CadastrarModule,
    ConsultarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
