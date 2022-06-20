import { Categoria } from './categoria.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class CategoriasService {

  private categorias: Categoria[] = [];

  private categoriasUpdated = new Subject<Categoria[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getCategorias(){
    this.http.get<{mensaje: string, categorias: any}>(
      'http://localhost:3000/administrador/mostrar-categoria'
      )
    .pipe(map((categoriaData) => {
      return categoriaData.categorias.map(categoria => {
        return {
          nombre: categoria.nombre,
          id: categoria._id
        };
      });
    }))
    .subscribe(transCategorias => {
      this.categorias = transCategorias;
      this.categoriasUpdated.next([...this.categorias]);
    });
  }

  getCategoriaUpdateListener(){
    return this.categoriasUpdated.asObservable();
  }

  getCategoria(id: string){
    return {...this.categorias.find(p => p.id === id)};
  }

  addCategoria(nombre: string){
    const categoria: Categoria = {id: null, nombre: nombre};

    this.http.post<{mensaje: string, categoriaId: string}>(
      'http://localhost:3000/administrador/registro-categoria', categoria
      )
    .subscribe((responseData) => {
      const id = responseData.categoriaId;
      categoria.id = id;
      this.categorias.push(categoria);
      this.categoriasUpdated.next([...this.categorias]);
      this.router.navigate(['/administrador/mostrar-categoria']);
    });
  }

  updateCategoria(id: string, nombre: string){
    const categoria: Categoria = {id: id, nombre: nombre};
    this.http.put('http://localhost:3000/administrador/actualizar-categoria/' + id, categoria)
    .subscribe(response => {
      const updatedCategorias = [...this.categorias];
      const oldCategoriaIndex = updatedCategorias.findIndex(p => p.id === categoria.id);
      updatedCategorias[oldCategoriaIndex] = categoria;
      this.categorias = updatedCategorias;
      this.categoriasUpdated.next([...this.categorias]);
      this.router.navigate(['/administrador/mostrar-categoria']);
    });
  }

  eliminarCategoria(categoriaId: string){
    this.http.delete(
      'http://localhost:3000/administrador/eliminar-categoria/' + categoriaId)
    .subscribe(() => {
        const updatedCategorias = this.categorias.filter(categoria => categoria.id !== categoriaId);
        this.categorias = updatedCategorias;
        this.categoriasUpdated.next([...this.categorias]);
    });
  }
}
