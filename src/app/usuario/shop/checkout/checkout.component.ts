import { Component, OnInit } from "@angular/core";
import { NgForm, FormBuilder, Validators } from '@angular/forms';
import { ClienteService } from "../../cliente/cliente.service";
import { JwtHelperService } from "@auth0/angular-jwt";
import { VentasService } from "./checkout.service";
import { ErrorComponent } from "../../../error/error.component";
import { MatDialog } from "@angular/material";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.css"]
})
export class CheckoutComponent implements OnInit {
   helper = new JwtHelperService();
   nombre: string;
   clienteId: string;
   email: string;
   total: number = 0;

  constructor(
    public clienteService: ClienteService,
    public ventasService: VentasService,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.nombre = this.helper.decodeToken(localStorage.getItem("token")).nombre;
    this.clienteId = this.helper.decodeToken(localStorage.getItem("token")).usuarioId;
    this.email = this.helper.decodeToken(localStorage.getItem("token")).correo;

    let carrito = JSON.parse(localStorage.getItem("carrito"));
    for (var i = 0; i < carrito.length; i++) {
      let item = JSON.parse(carrito[i]);
      this.total += item.producto.precio * item.cantidad;
    }
  }

  onGuardarVenta(form: NgForm) {
    if (form.invalid) {
      this.dialog.open(ErrorComponent, {
        data: { message: "Existen campos vacios" }
      });
      return;
    }
      this.ventasService.addVenta(
        this.clienteId,
        localStorage.getItem("carrito"),
        form.value.numero_tarjeta,
        this.total,
        this.nombre,
        this.email
      );
      localStorage.removeItem("carrito");
  }
}
