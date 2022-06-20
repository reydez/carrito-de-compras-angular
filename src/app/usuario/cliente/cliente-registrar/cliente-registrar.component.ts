import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClienteService } from '../cliente.service';
import { ErrorComponent } from "../../../error/error.component";
import { MatDialog } from "@angular/material";

@Component({
  selector: 'app-cliente-registrar',
  templateUrl: './cliente-registrar.component.html',
  styleUrls: ['./cliente-registrar.component.css']
})
export class ClienteRegistrarComponent {
  constructor(public clienteService: ClienteService,
    public dialog: MatDialog) {}

  onRegistrar(form: NgForm) {
    if (form.invalid) {
      this.dialog.open(ErrorComponent, {
        data: { message: 'Existen campos vacios' }
      });
      return;
    }else{
      this.dialog.open(ErrorComponent, {
        data: { message: 'Usuario registrado' }
      });
      this.clienteService.clienteRegistrar(form.value.nombre, form.value.correo,
        form.value.password, '5cdc9fb2060140351004e967');
    }
  }
}
