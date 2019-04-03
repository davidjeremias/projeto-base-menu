import { NgModule } from '@angular/core';

import { PaginacaoComponent } from './paginacao/paginacao.component';
import { ComboServiceComponent } from './combo-service/combo-service.component';
import { PrimeNgModule } from '../core/entity-globais/primeng.module';
import { ShowDataPipe } from '../pipes/show-data.pipe';
import { LoaderComponent } from './loader/loader.component';

@NgModule({

  imports: [
    PrimeNgModule
  ],
  declarations: [
    PaginacaoComponent,
    ComboServiceComponent,
    ShowDataPipe,
    LoaderComponent
  ],
  exports: [
    PaginacaoComponent,
    ComboServiceComponent,
    LoaderComponent,
    ShowDataPipe
  ]

})
export class SharedModule { }