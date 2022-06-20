import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductosService } from '../productos.service';
import { Producto } from '../producto.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-mostrar-producto',
  templateUrl: './admin-mostrar-producto.component.html',
  styleUrls: ['./admin-mostrar-producto.component.css']
})
export class AdminMostrarProductoComponent implements OnInit, OnDestroy {

  productos: Producto [] = [];
  private productosSub: Subscription;
  constructor(public productosService: ProductosService) { }

  ngOnInit() {
    this.productosService.getProductos();
    this.productosSub = this.productosService.getProductoUpdateListener()
    .subscribe((productos) => {
      this.productos = productos;
    });
  }

  onDelete(productoId: string){
    this.productosService.eliminarProducto(productoId);
  }

  ngOnDestroy() {
    this.productosSub.unsubscribe();
  }
}
