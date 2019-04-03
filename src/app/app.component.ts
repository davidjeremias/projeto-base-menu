import { Component } from '@angular/core';
import { MenuComponent } from './core/entity-globais/menu';
import { KeycloakService } from './core/auth/keycloak.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  menuCompleto = new MenuComponent().getMenu();
 
  ativaMenu: boolean = false;

  menuAtual = new Array();

  constructor(private seg: KeycloakService) {
    this.verificarAutorizacao();
  }

  ativarMenu() {
    this.ativaMenu = (this.ativaMenu) ? false : true;
  }

  public verificarAutorizacao() {

    this.menuCompleto.filter(menu => {
      menu.roles && menu.roles.length ?
        menu.roles.forEach((roleMenu, index) => {
          this.seg.keyCloak.realmAccess.roles.forEach(role => {
            if (role === roleMenu) {
                this.menuAtual.push(menu);
            }
          });
        })
        : this.menuAtual.push(menu);
    });
  }

}