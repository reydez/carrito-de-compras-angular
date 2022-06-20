import { Component, OnInit, OnDestroy } from "@angular/core";
import { ClienteService } from "../cliente/cliente.service";
import { Subscription } from "rxjs";
import { Item } from "../shop/index/item.entity";
import { JwtHelperService } from "@auth0/angular-jwt";
import { CategoriasService } from '../../admin/categoria/categorias.service';
import { Categoria } from 'src/app/admin/categoria/categoria.model';

@Component({
  selector: "app-usuario-header",
  templateUrl: "./usuario-header.component.html",
  styleUrls: ["./usuario-header.component.css"]
})
export class UsuarioHeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  private categoriasSub: Subscription;
  items: Item[] = [];
  totalCantidad: number = 0;
  private helper = new JwtHelperService();
  clienteId: string;
  categorias: Categoria[] = [];

  constructor(
    public clienteService: ClienteService,
    public categoriasService: CategoriasService
    ) {}

  ngOnInit() {
    if (this.helper.decodeToken(localStorage.getItem('token')) === null) {
      return;
    } else {
      this.clienteId = this.helper.decodeToken(
        localStorage.getItem('token')
      ).usuarioId;
      this.userIsAuthenticated = this.clienteService.getIsAuth();
      this.authListenerSubs = this.clienteService
        .getAuthStatusListener()
        .subscribe(isAutheticated => {
          this.userIsAuthenticated = isAutheticated;
        });
        this.categoriasService.getCategorias();
        this.categoriasSub = this.categoriasService.getCategoriaUpdateListener()
        .subscribe((categorias: Categoria[]) => {
        this.categorias = categorias;
    });
      this.loadCart();
    }
  }

  onLogout() {
    this.clienteService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
    this.categoriasSub.unsubscribe();
  }

  loadCart(): void {
    this.totalCantidad = 0;
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
        this.totalCantidad += item.cantidad;
      }
    }
  }
}
