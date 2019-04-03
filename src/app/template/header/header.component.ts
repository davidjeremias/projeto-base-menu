import { Component, OnInit } from '@angular/core';
import { KeycloakService } from '../../core/auth/keycloak.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title = 'SITMA REPASSE';

  constructor(private seg: KeycloakService) { }

  ngOnInit() {

  }

  public login() {
    this.seg.keyCloak.login();
  }

  public logoff() {
    this.seg.keyCloak.logout();
  }

  public get userName() {
    return this.seg.keyCloak.tokenParsed.name;;
  }

  public get userMatricula() {
    return this.seg.keyCloak.tokenParsed.preferred_username;
  }

}
