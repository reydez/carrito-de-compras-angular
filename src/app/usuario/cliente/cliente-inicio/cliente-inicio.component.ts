import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-cliente-inicio',
  templateUrl: './cliente-inicio.component.html',
  styleUrls: ['./cliente-inicio.component.css']
})
export class ClienteInicioComponent {
  constructor(public clienteService: ClienteService) {}
  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.clienteService.inicioSesion(form.value.correo, form.value.password);
  }
}
