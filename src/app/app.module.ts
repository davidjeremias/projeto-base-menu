import { BancoService } from './sitma/services/banco-service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AccordionModule } from 'primeng/accordion';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './componentes/shared.module';
import { SitmaModule } from './sitma/sitma.module';
import  {  FormsModule  }  from  '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { FooterComponent } from './template/footer/footer.component';
import { HeaderComponent } from './template/header/header.component';
import { HomeComponent } from './home/home.component';
import { PrimeNgModule } from './core/entity-globais/primeng.module';
import { AuthGuard } from './core/entity-globais/auth-guards';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Globals } from './sitma/entity/globals';

import { RepasseService } from './sitma/services/repasse-service';

import { NgxMaskModule } from 'ngx-mask';
import { KeycloakService } from './core/auth/keycloak.service';
import { DadosCompartilhados } from './core/entity-globais/dados-compartilhados';

export function kcFactory(keycloakService: KeycloakService): () => void {
  return () => keycloakService.init();
}

@NgModule({

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AccordionModule,
    SharedModule,
    SitmaModule,
    FormsModule,
    PrimeNgModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent
  ],

  providers: [HttpClientModule, AuthGuard, Globals, RepasseService, 
    KeycloakService, DadosCompartilhados, BancoService,
    {
      provide: APP_INITIALIZER,
      useFactory: kcFactory,
      deps: [KeycloakService],
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
