import { Component, OnInit } from '@angular/core';
import { RolesService } from '../roles.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-registro-role',
  templateUrl: './admin-registro-role.component.html',
  styleUrls: ['./admin-registro-role.component.css']
})
export class AdminRegistroRoleComponent implements OnInit {

  constructor(public rolesService: RolesService) { }
  form: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      'nombre': new FormControl(null, {validators: [Validators.required]})
    });
  }

  onAddRole(){
    this.rolesService.addRole(this.form.value.nombre);
  }
}
