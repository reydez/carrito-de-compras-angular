import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../categorias.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-registro-categoria',
  templateUrl: './admin-registro-categoria.component.html',
  styleUrls: ['./admin-registro-categoria.component.css']
})
export class AdminRegistroCategoriaComponent implements OnInit {

  constructor(public categoriasService: CategoriasService) {}

  form: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      'nombre': new FormControl(null, {validators: [Validators.required]})
    });
  }

  onAddCategoria(){
    this.categoriasService.addCategoria(this.form.value.nombre);
  }
}
