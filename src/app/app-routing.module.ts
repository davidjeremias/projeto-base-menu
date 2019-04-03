import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MonitorarRepasseComponent } from './sitma/pages/monitorar-repasse/monitorar-repasse.component';
import { CadastroConvenioComponent } from './sitma/pages/cadastro-convenio/cadastro-convenio.component';
import { ConsultaConvenioComponent } from './sitma/pages/consulta-convenio/consulta-convenio.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes, { useHash: false }) ],
})
export class AppRoutingModule {}
