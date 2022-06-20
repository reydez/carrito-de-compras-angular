import { Component, OnInit, OnDestroy } from '@angular/core';
import { RolesService } from '../roles.service';
import { Role } from '../role.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-mostrar-role',
  templateUrl: './admin-mostrar-role.component.html',
  styleUrls: ['./admin-mostrar-role.component.css']
})
export class AdminMostrarRoleComponent implements OnInit, OnDestroy {

  roles: Role[] = [];
  private rolesSub: Subscription;
  constructor(public rolesService: RolesService) { }

  ngOnInit() {
    this.rolesService.getRoles();
    this.rolesSub = this.rolesService.getRoleUpdateListener()
    .subscribe((roles: Role[]) =>{
      this.roles = roles;
    });
  }

  onDelete(roleId: string){
    this.rolesService.eliminarRole(roleId);
  }

  ngOnDestroy() {
    this.rolesSub.unsubscribe();
  }
}
