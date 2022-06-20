import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClienteService } from '../../../usuario/cliente/cliente.service';
import { Subscription } from 'rxjs';
import { ClienteData } from '../../../usuario/cliente/cliente-data.model';

@Component({
  selector: 'app-admin-mostrar-cliente',
  templateUrl: './admin-mostrar-cliente.component.html',
  styleUrls: ['./admin-mostrar-cliente.component.css']
})
export class AdminMostrarClienteComponent implements OnInit, OnDestroy {

  usuarios: ClienteData[] = [];
  private usuariosSub: Subscription;

  constructor(public clienteService: ClienteService) { }

  ngOnInit() {
    this.clienteService.getUsuarios();
    this.usuariosSub = this.clienteService.getUsuarioUpdateListener()
    .subscribe((usuarios: ClienteData[]) => {
      this.usuarios = usuarios;
    });
    console.log(this.usuarios);
   }

   onDelete(usuarioId: string){
    this.clienteService.eliminarCliente(usuarioId);
  }

  ngOnDestroy() {
    this.usuariosSub.unsubscribe();
  }

}
