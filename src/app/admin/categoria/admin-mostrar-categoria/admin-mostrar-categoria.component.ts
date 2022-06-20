import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoriasService } from '../categorias.service';
import { Categoria } from '../categoria.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-mostrar-categoria',
  templateUrl: './admin-mostrar-categoria.component.html',
  styleUrls: ['./admin-mostrar-categoria.component.css']
})
export class AdminMostrarCategoriaComponent implements OnInit, OnDestroy {
  categorias: Categoria[] = [];
  private categoriasSub: Subscription;

  constructor(public categoriasService: CategoriasService) { }

  ngOnInit() {
    this.categoriasService.getCategorias();
    this.categoriasSub = this.categoriasService.getCategoriaUpdateListener()
    .subscribe((categorias: Categoria[]) => {
        this.categorias = categorias;
    });
  }

  onDelete(categoriaId: string){
    this.categoriasService.eliminarCategoria(categoriaId);
  }

  ngOnDestroy() {
    this.categoriasSub.unsubscribe();
  }
}
