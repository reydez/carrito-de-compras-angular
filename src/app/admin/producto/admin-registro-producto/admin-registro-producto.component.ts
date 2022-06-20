import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../productos.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoriasService } from '../../categoria/categorias.service';
import { Categoria } from '../../categoria/categoria.model';
import { Subscription } from 'rxjs';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-admin-registro-producto',
  templateUrl: './admin-registro-producto.component.html',
  styleUrls: ['./admin-registro-producto.component.css']
})
export class AdminRegistroProductoComponent implements OnInit {

  form: FormGroup;
  categorias: Categoria[] = [];
  cateSelected: Number;
  private categoriasSub: Subscription;
  imagePreview: string;

  constructor(public productosService: ProductosService, public categoriasService: CategoriasService) { }

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
      'imagen': new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]}),
      'categoria_id': new FormControl(null, {validators: [Validators.required]})
    });
  }

  onImagePicked(event: Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({'imagen': file});
    this.form.get('imagen').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () =>{
      this.imagePreview = <string>reader.result;
    };
    reader.readAsDataURL(file);
  }
  onAddProducto(){
    this.productosService.addProducto(
      this.form.value.nombre, this.form.value.precio, this.form.value.cantidad, this.form.value.imagen, this.form.value.categoria_id);
  }
}
