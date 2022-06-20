import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../categorias.service';
import { Categoria } from '../categoria.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-editar-categoria',
  templateUrl: './admin-editar-categoria.component.html',
  styleUrls: ['./admin-editar-categoria.component.css']
})
export class AdminEditarCategoriaComponent implements OnInit {

  private categoriaId: string;
  categoria: Categoria;
  form: FormGroup;

  constructor(public categoriasService: CategoriasService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
      'nombre': new FormControl(null, {validators: [Validators.required]})
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
       this.categoriaId = paramMap.get('categoriaId');
       this.categoria = this.categoriasService.getCategoria(this.categoriaId);
       this.form.setValue({nombre: this.categoria.nombre});
   });
  }

  actualizarCategoria(){
    this.categoriasService.updateCategoria(this.categoriaId, this.form.value.nombre);
  }
}
