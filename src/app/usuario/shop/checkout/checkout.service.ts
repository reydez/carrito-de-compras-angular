import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { Venta } from "./venta-data.model";

@Injectable({ providedIn: "root" })
export class VentasService {
  private ventas: Venta[] = [];
  private ventasUpdated = new Subject<Venta[]>();

  private categoriasUpdated = new Subject<Venta[]>();

  constructor(private http: HttpClient, private router: Router) {}

  addVenta(user_id: string, carrito: string, numero_tarjeta: string, pago_total: number, nombre: string, correo: string
  ) {

    const venta: Venta = {
      id: null,
      user_id: user_id,
      carrito: carrito,
      numero_tarjeta: numero_tarjeta,
      pago_total: pago_total,
      nombre: nombre,
      correo: correo
    };

    this.http
      .post<{ mensaje: string; ventaId: string }>(
        "http://localhost:3000/usuario/checkout",
        venta
      )
      .subscribe(responseData => {
        const id = responseData.ventaId;
        venta.id = id;
        this.ventas.push(venta);
        this.categoriasUpdated.next([...this.ventas]);
        this.router.navigate(["/usuario/productos"]);
      });
  }

  getVentas(id: string) {
    this.http
      .get<{ message: string; ventas: any }>(
        "http://localhost:3000/usuario/perfil/" + id
      )
      .pipe(
        map(ventaData => {
          return ventaData.ventas.map(venta => {
            return {
              id: venta._id,
              user_id: venta.user_id,
              carrito: venta.carrito,
              numero_tarjeta: venta.numero_tarjeta,
              pago_total: venta.pago_total,
              fecha: venta.fecha
            };
          });
        })
      )
      .subscribe(responseData => {
        this.ventas = responseData;
        this.ventasUpdated.next([...this.ventas]);
      });
  }

  getVentaUpdateListener() {
    return this.ventasUpdated.asObservable();
  }

  getVenta(id: string) {
    return { ...this.ventas.find(p => p.user_id === id) };
  }
}
