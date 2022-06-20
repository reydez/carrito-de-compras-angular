import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ClienteService } from './cliente.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private clienteService: ClienteService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
      const isAuth = this.clienteService.getIsAuth();
      const role = this.clienteService.getTokenRole();

      if(role){
        if (role !== '5cdc9fb2060140351004e967') {
          this.router.navigate(['/administrador']);
          return false;
        }else{
          return true;
        }
      }
      return true;
  }
}
