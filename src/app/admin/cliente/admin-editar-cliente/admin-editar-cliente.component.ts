import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClienteData } from '../../../usuario/cliente/cliente-data.model';
import { ClienteService } from '../../../usuario/cliente/cliente.service';

@Component({
  selector: 'app-admin-editar-cliente',
  templateUrl: './admin-editar-cliente.component.html',
  styleUrls: ['./admin-editar-cliente.component.css']
})
export class AdminEditarClienteComponent implements OnInit {

  private usuarioId: string;
  usuario: ClienteData;
  form: FormGroup;

  constructor(public clienteService: ClienteService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
      'nombre': new FormControl(null, {validators: [Validators.required]}),
      'correo': new FormControl(null, {validators: [Validators.required]})
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.usuarioId = paramMap.get('usuarioId');
      this.usuario = this.clienteService.getUsuario(this.usuarioId);
      console.log(this.usuarioId);
      this.form.setValue({
        nombre: this.usuario.nombre,
        correo: this.usuario.correo,
      });
  });
  }

  actualizarUsuario(){
    this.clienteService.updateUsuario(this.usuarioId, this.form.value.nombre, this.form.value.correo, this.form.value.role);
  }

}
