import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RolesService } from '../roles.service';
import { Role } from '../role.model';

@Component({
  selector: 'app-admin-editar-role',
  templateUrl: './admin-editar-role.component.html',
  styleUrls: ['./admin-editar-role.component.css']
})
export class AdminEditarRoleComponent implements OnInit {

  private roleId: string;
  role: Role;
  form: FormGroup;
  constructor(public rolesService: RolesService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.form = new FormGroup({
      'nombre': new FormControl(null, {validators: [Validators.required]})
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.roleId = paramMap.get('roleId');
      this.role = this.rolesService.getRole(this.roleId);
      this.form.setValue({nombre: this.role.nombre});
  });
  }

  actualizarRole(){
    this.rolesService.updateRole(this.roleId, this.form.value.nombre);
  }
}
