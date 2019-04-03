import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { KeycloakService } from '../auth/keycloak.service';

@Injectable()
export class AuthGuard implements CanActivate {

  private rolesKeycloack;

  constructor(private seg: KeycloakService) {
    this.rolesKeycloack = this.seg.keyCloak.realmAccess.roles;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

    let permissao: boolean = false;

    let roles = route.data["roles"] as Array<string>;

    for(let j = 0; j < roles.length; j++) {
      for (let i = 0; i < this.rolesKeycloack.length; i++) {
        if(roles[j] === this.rolesKeycloack[i]) {
          return true;
        } else {
          permissao = false;
        }
       }
    }
    return permissao;
  }
}