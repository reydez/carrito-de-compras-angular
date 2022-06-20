import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ClienteService } from './cliente.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private clienteService: ClienteService, private router: Router) {}

  private clienteRole: string;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
      const isAuth = this.clienteService.getIsAuth();

      if (!isAuth) {
        this.router.navigate(['/usuario/inicio-sesion']);
      }
      return isAuth;
  }
}
