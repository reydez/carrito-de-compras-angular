import { Producto } from './producto.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class ProductosService {

  private productos: Producto[] = [];
  private productosUpdated = new Subject<Producto[]>();
  constructor(private http: HttpClient, private router: Router) {}

  getProductos(){
    this.http.get<{mensaje: string, productos: any}>(
      'http://localhost:3000/administrador/mostrar-producto')
      .pipe(map((productoData) => {
        return productoData.productos.map(producto => {
          return {
            id: producto._id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: producto.cantidad,
            imagen: producto.imagen,
            categoria_id: producto.categoria_id
          };
        });
      }))
      .subscribe(transProductos => {
        this.productos = transProductos;
        this.productosUpdated.next([...this.productos]);
    });
  }

  getCategoriaProductos(id: string){
    this.http.get<{mensaje: string, productos: any}>(
      'http://localhost:3000/usuario/mostrar-producto-categoria/' + id)
      .pipe(map((productoData) => {
        return productoData.productos.map(producto => {
          return {
            id: producto._id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: producto.cantidad,
            imagen: producto.imagen,
            categoria_id: producto.categoria_id
          };
        });
      }))
      .subscribe(transProductos => {
        this.productos = transProductos;
        this.productosUpdated.next([...this.productos]);
    });
  }

  getProductoUpdateListener(){
    return this.productosUpdated.asObservable();
  }

  getProducto(id: string) {
    return {...this.productos.find(p => p.id === id)};
  }

  addProducto(nombre: string, precio: number, cantidad: number, imagen: File, categoria_id: string){
     const productoData = new FormData();
     productoData.append('nombre', nombre);
     productoData.append('precio', String(precio));
     productoData.append('cantidad', String(cantidad));
     productoData.append('imagen', imagen, nombre);
     productoData.append('categoria_id', categoria_id);

     this.http
     .post<{mensaje: string, producto: Producto}>(
      'http://localhost:3000/administrador/registro-producto',
      productoData)
     .subscribe((responseData) =>{

      const producto: Producto = {
        id: responseData.producto.id,
        nombre: nombre,
        precio: precio,
        cantidad: cantidad,
        imagen: responseData.producto.imagen,
        categoria_id: categoria_id
      };

      this.productos.push(producto);
      this.productosUpdated.next([...this.productos]);
      this.router.navigate(['/administrador/mostrar-producto']);
     });
  }

  updateProducto(id: string, nombre: string, precio: number, cantidad: number, imagen: File | string, categoria_id: string){

    let productoData: Producto | FormData;

    if(typeof(imagen) === 'object'){
      productoData = new FormData();
      productoData.append('id', id);
      productoData.append('nombre', nombre);
      productoData.append('precio', String(precio));
      productoData.append('cantidad', String(cantidad));
      productoData.append('imagen', imagen, nombre);
      productoData.append('categoria_id', categoria_id);

    } else {
        productoData = {
        id: id,
        nombre: nombre,
        precio: precio,
        cantidad: cantidad,
        imagen: imagen,
        categoria_id: categoria_id
      };
    }

    this.http.put('http://localhost:3000/administrador/actualizar-producto/' + id, productoData)
    .subscribe(response => {
      const updatedProductos = [...this.productos];
      const oldCategoriaIndex = updatedProductos.findIndex(p => p.id === id);
      const producto: Producto = {
        id: id,
        nombre: nombre,
        precio: precio,
        cantidad: cantidad,
        imagen: '',
        categoria_id: categoria_id
      }

      updatedProductos[oldCategoriaIndex] = producto;
      this.productos = updatedProductos;
      this.productosUpdated.next([...this.productos]);
      this.router.navigate(['/administrador/mostrar-producto']);
    });
  }

  eliminarProducto(productoId: string){
    this.http.delete(
      'http://localhost:3000/administrador/eliminar-producto/' + productoId)
    .subscribe(() => {
        const updatedProductos = this.productos.filter(producto => producto.id !== productoId);
        this.productos = updatedProductos;
        this.productosUpdated.next([...this.productos]);
    });
  }

  agregarProducto(productoId: string, cantidad: number) {
    this.http.put<{message: string, id: string, producto: any}>(
      'http://localhost:3000/usuario/agregar-a-carrito/' + productoId, {cantidad: cantidad})
      .subscribe(res => console.log(res));
  }
}
