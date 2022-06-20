import { Component, OnInit, OnDestroy } from '@angular/core';
import { VentasService } from '../../shop/checkout/checkout.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Venta } from '../../shop/checkout/venta-data.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cliente-perfil',
  templateUrl: './cliente-perfil.component.html',
  styleUrls: ['./cliente-perfil.component.css']
})
export class ClientePerfilComponent implements OnInit, OnDestroy {

  private clienteId: string;
  private helper = new JwtHelperService();
  private ventasSub: Subscription;
  ventas: Venta [] = [];
  items: any;
  arr: any;

  constructor(
    public ventasService: VentasService
  ) { }

  ngOnInit() {
    this.clienteId = this.helper.decodeToken(localStorage.getItem('token')).usuarioId;
    this.ventasService.getVentas(this.clienteId);
    this.ventasSub = this.ventasService.getVentaUpdateListener()
    .subscribe((ventas) => {
      this.ventas = ventas;
      let index: number = -1;
      for(var i = 0; i < this.ventas.length; i++){
        if(this.ventas[i].user_id === this.clienteId){
          this.items = JSON.parse(this.ventas[i].carrito);
          this.arr = Object.keys(this.items).map(key => ({
            type: key,
            value: JSON.parse(this.items[key])
          }));
        }else{
          return;
        }
      }
    });
  }

  ngOnDestroy() {
    this.ventasSub.unsubscribe();
  }

}
