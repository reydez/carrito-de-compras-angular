import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ClienteService } from './cliente.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class NormalGuard implements CanActivate {
  constructor(private clienteService: ClienteService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
      const isAuth = this.clienteService.getIsAuth();
       if (isAuth) {

        this.router.navigate(['/usuario/productos']);
      }

      return isAuth;
  }
}
