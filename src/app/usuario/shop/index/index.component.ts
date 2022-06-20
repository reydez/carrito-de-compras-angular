import { Component, OnInit, OnDestroy } from "@angular/core";
import { ProductosService } from "../../../admin/producto/productos.service";
import { Producto } from "../../../admin/producto/producto.model";
import { Subscription } from "rxjs";
import { MatDialog } from "@angular/material";
import { Item } from "./item.entity";
import { NgForm } from "@angular/forms";
import { ErrorComponent } from "../../../error/error.component";
import { Router } from '@angular/router';

@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.css"]
})
export class IndexComponent implements OnInit, OnDestroy {
  productos: Producto[] = [];
  productoChunks: any[] = [];
  defaultCantidad = 1;
  chunkSize = 4;
  chunkArray: [] = [];
  productosSub: Subscription;

  constructor(
    public productosService: ProductosService,
    public dialog: MatDialog,
    private router: Router,
  ) {}

  ngOnInit() {
    this.productosService.getProductos();
    this.productosSub = this.productosService
      .getProductoUpdateListener()
      .subscribe(productos => {
        this.productos = productos;
        for (let i = 0; i < this.productos.length; i += this.chunkSize) {
          this.productoChunks.push(this.productos.slice(i, i + this.chunkSize));
        }
      });
  }

  onAgregarProducto(productoId: string, form: NgForm) {
    if (form.value.cantidad === "") {
      this.dialog.open(ErrorComponent, {
        data: { message: "Campo de cantidad esta vacio" }
      });
    } else {
      var item: Item = {
        producto: this.productosService.getProducto(productoId),
        cantidad: form.value.cantidad
      };
      if (localStorage.getItem("carrito") == null) {
        let carrito: any = [];
        carrito.push(JSON.stringify(item));
        localStorage.setItem("carrito", JSON.stringify(carrito));
      } else {
        let carrito: any = JSON.parse(localStorage.getItem("carrito"));
        let index: number = -1;
        for (var i = 0; i < carrito.length; i++) {
          let item: Item = JSON.parse(carrito[i]);
          if (item.producto.id === productoId) {
            index = i;
            break;
          }
        }
        if (index === -1) {
          carrito.push(JSON.stringify(item));
          localStorage.setItem("carrito", JSON.stringify(carrito));
        } else {
          let item: Item = JSON.parse(carrito[index]);
          item.cantidad += form.value.cantidad;
          carrito[index] = JSON.stringify(item);
          localStorage.setItem("carrito", JSON.stringify(carrito));
        }
      }
    }
  }

  ngOnDestroy() {
    this.productosSub.unsubscribe();
  }
}
