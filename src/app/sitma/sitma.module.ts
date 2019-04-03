import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxCurrencyModule } from "ngx-currency";
import { PrimeNgModule } from '../core/entity-globais/primeng.module';
import { SharedModule } from '../componentes/shared.module';

import { SitmaRoutingModule } from './sitma-routing.module';

import { ExemploSitmaComponent } from './pages/exemplo-sitma/exemplo-sitma.component';
import { RepasseFormComponent } from '../forms/repasse-form/repasse-form.component';
import { ConvenioFormComponent } from '../forms/convenio-form/convenio-form.component';
import { MonitorarRepasseComponent } from './pages/monitorar-repasse/monitorar-repasse.component';
import { CadastroConvenioComponent } from './pages/cadastro-convenio/cadastro-convenio.component';
import { ContasConvenioComponent } from './pages/contas-convenio/contas-convenio.component';
import { ConsultaConvenioComponent } from '../sitma/pages/consulta-convenio/consulta-convenio.component';

export const customCurrencyMaskConfig = {
    align: "right",
    allowNegative: true,
    allowZero: true,
    decimal: ",",
    precision: 2,
    prefix: "R$ ",
    suffix: "",
    thousands: ".",
    nullable: true
};

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        PrimeNgModule,
        NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
        SitmaRoutingModule,
        SharedModule,
        ReactiveFormsModule
    ],
    declarations: [
        ExemploSitmaComponent,
        RepasseFormComponent,
        ConvenioFormComponent,
        MonitorarRepasseComponent,
        CadastroConvenioComponent,
        ContasConvenioComponent,
        ConsultaConvenioComponent
    ]

})
export class SitmaModule { }