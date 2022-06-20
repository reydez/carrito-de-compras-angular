import { Component, OnInit } from "@angular/core";
import { Item } from "../index/item.entity";
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { element } from 'protractor';


@Component({
  selector: "app-carrito",
  templateUrl: "./carrito.component.html",
  styleUrls: ["./carrito.component.css"]
})
export class CarritoComponent implements OnInit {
   items: Item[] = [];
   total: number = 0;
   totalCantidad: number = 0;

  constructor() {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart(): void {
    this.totalCantidad = 0;
    this.total = 0;
    this.items = [];
    if (localStorage.getItem("carrito") == null) {
      return;
    } else {
      let carrito = JSON.parse(localStorage.getItem("carrito"));
      for (var i = 0; i < carrito.length; i++) {
        let item = JSON.parse(carrito[i]);
        this.items.push({
          producto: item.producto,
          cantidad: item.cantidad
        });
        this.total += item.producto.precio * item.cantidad;
        this.totalCantidad += item.cantidad;
      }
    }
  }

  remover(id: string) {
    let carrito: any = JSON.parse(localStorage.getItem("carrito"));
    let index: number = -1;
    for (var i = 0; i < carrito.length; i++) {
      let item: Item = JSON.parse(carrito[i]);
      if (item.producto.id === id) {
        carrito.splice(i, 1);
        break;
      }
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    this.loadCart();
  }

  generarFactura() {
    console.log('generar factura');
   html2canvas(document.getElementById('contenido'), {
      allowTaint: true,
      useCORS: false,
      scale: 2
    }).then(function(canvas) {
      let imgWidth = 208;
      let pageHeight = 295;
      let imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;

      let img = canvas.toDataURL('image/png');
      let doc = new jsPDF('p', 'mm', 'a4');
      doc.addImage(img, 'PNG', 5, 5, imgWidth, imgHeight);
      doc.save('factura.pdf');
    });
  }
}
