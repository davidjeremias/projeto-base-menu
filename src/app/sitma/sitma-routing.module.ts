import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/entity-globais/auth-guards';

import { MonitorarRepasseComponent } from './pages/monitorar-repasse/monitorar-repasse.component';
import { CadastroConvenioComponent } from './pages/cadastro-convenio/cadastro-convenio.component';
import { ConsultaConvenioComponent } from './pages/consulta-convenio/consulta-convenio.component';
import { ContasConvenioComponent } from './pages/contas-convenio/contas-convenio.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'monitorar-repasse', component: MonitorarRepasseComponent, canActivate: [AuthGuard] , data: {roles: ['uma_authorization']} },
  { path: 'cadastro-convenio', component: CadastroConvenioComponent, canActivate: [AuthGuard] , data: {roles: ['uma_authorization']} },
  { path: 'consulta-convenio', component: ConsultaConvenioComponent, canActivate: [AuthGuard] , data: {roles: ['uma_authorization']} },
  { path: 'contas-convenio', component: ContasConvenioComponent, canActivate: [AuthGuard] , data: {roles: ['uma_authorization']} },
  { path: 'editar-convenio/:id/:disabled', component: CadastroConvenioComponent, canActivate: [AuthGuard] , data: {roles: ['uma_authorization']} },
  { path: 'detalhar-convenio/:id/:disabled', component: CadastroConvenioComponent, canActivate: [AuthGuard] , data: {roles: ['uma_authorization']} }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes, { useHash: false }) ],
})
export class SitmaRoutingModule {}