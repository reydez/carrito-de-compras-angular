import { Role } from './role.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class RolesService {

  private roles: Role[] = [];
  private rolesUpdated = new Subject<Role[]>();
  constructor(private http: HttpClient, private router: Router) {}

  getRoles(){
    this.http.get<{mensaje: string, roles: any}>(
      'http://localhost:3000/administrador/mostrar-role'
      )
    .pipe(map((roleData) => {
      return roleData.roles.map(role =>{
        return {
          nombre: role.nombre,
          id: role._id
        };
      });
    }))
    .subscribe(transRoles => {
      this.roles = transRoles;
      this.rolesUpdated.next([...this.roles]);
    });
  }

  getRoleUpdateListener(){
    return this.rolesUpdated.asObservable();
  }

  getRole(id: string){
    return {...this.roles.find(p => p.id === id)};
  }

  addRole(nombre: string){
    const role: Role = {id: null, nombre: nombre};
    this.http.post<{mensaje: string, roleId: string}>(
      'http://localhost:3000/administrador/registro-role', role
      )
    .subscribe((responseData) => {
      const id = responseData.roleId;
      role.id = id;
      this.roles.push(role);
      this.rolesUpdated.next([...this.roles]);
      this.router.navigate(['/administrador/mostrar-role']);
    });
  }

  updateRole(id: string, nombre: string){
    const role: Role = {id: id, nombre: nombre};
    this.http.put('http://localhost:3000/administrador/actualizar-role/' + id, role)
    .subscribe(response => {
      const updatedRoles = [...this.roles];
      const oldRoleIndex = updatedRoles.findIndex(p => p.id === role.id);
      updatedRoles[oldRoleIndex] = role;
      this.roles = updatedRoles;
      this.rolesUpdated.next([...this.roles]);
      this.router.navigate(['/administrador/mostrar-role']);
    });
  }

  eliminarRole(roleId: string){
    this.http.delete(
      'http://localhost:3000/administrador/eliminar-role/' + roleId)
    .subscribe(() => {
        const updatedRoles = this.roles.filter(role => role.id !== roleId);
        this.roles = updatedRoles;
        this.rolesUpdated.next([...this.roles]);
    });
  }
}
