import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../productos.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoriasService } from '../../categoria/categorias.service';
import { Categoria } from '../../categoria/categoria.model';
import { Subscription } from 'rxjs';
import { mimeType } from '../admin-registro-producto/mime-type.validator';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Producto } from '../producto.model';

@Component({
  selector: 'app-admin-editar-producto',
  templateUrl: './admin-editar-producto.component.html',
  styleUrls: ['./admin-editar-producto.component.css']
})
export class AdminEditarProductoComponent implements OnInit {

  form: FormGroup;
  categorias: Categoria[] = [];
  cateSelected: Number;
  private categoriasSub: Subscription;
  imagePreview: string;
  producto: Producto;
  private productoId: string;

  constructor(public productosService: ProductosService,
    public categoriasService: CategoriasService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.categoriasService.getCategorias();
    this.categoriasSub = this.categoriasService.getCategoriaUpdateListener()
    .subscribe((categorias: Categoria[]) => {
        this.categorias = categorias;
    });

    this.form = new FormGroup({
      'nombre': new FormControl(null, {validators: [Validators.required]}),
      'precio': new FormControl(null, {validators: [Validators.required]}),
      'cantidad': new FormControl(null, {validators: [Validators.required]}),
      'imagen': new FormControl(null, {validators: [Validators.required],
        asyncValidators: [mimeType]}),
      'categoria_id': new FormControl(null, {validators: [Validators.required]})
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) =>{
      this.productoId = paramMap.get('productoId');
      this.producto = this.productosService.getProducto(this.productoId);
      this.form.patchValue({
        nombre: this.producto.nombre,
        precio: this.producto.precio,
        cantidad: this.producto.cantidad,
        imagen: this.producto.imagen,
        categoria_id: this.producto.categoria_id,
      });
    });
  }

  onImagePicked(event: Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({imagen: file});
    this.form.get('imagen').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () =>{
      this.imagePreview = <string>reader.result;
    };
    reader.readAsDataURL(file);
  }

  actualizarProducto(){
    this.productosService.updateProducto(
      this.productoId,
      this.form.value.nombre,
      this.form.value.precio,
      this.form.value.cantidad,
      this.form.value.imagen,
      this.form.value.categoria_id);
  }
}
