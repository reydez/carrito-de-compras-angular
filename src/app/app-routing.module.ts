import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminRegistroClienteComponent } from './admin/cliente/admin-registro-cliente/admin-registro-cliente.component';
import { AdminMostrarClienteComponent } from './admin/cliente/admin-mostrar-cliente/admin-mostrar-cliente.component';
import { AdminEditarClienteComponent } from './admin/cliente/admin-editar-cliente/admin-editar-cliente.component';
import { AdminRegistroProductoComponent } from './admin/producto/admin-registro-producto/admin-registro-producto.component';
import { AdminMostrarProductoComponent } from './admin/producto/admin-mostrar-producto/admin-mostrar-producto.component';
import { AdminEditarProductoComponent } from './admin/producto/admin-editar-producto/admin-editar-producto.component';
import { AdminComprasClienteComponent } from './admin/cliente/admin-compras-cliente/admin-compras-cliente.component';
import { AdminRegistroRoleComponent } from './admin/role/admin-registro-role/admin-registro-role.component';
import { AdminMostrarRoleComponent } from './admin/role/admin-mostrar-role/admin-mostrar-role.component';
import { AdminEditarRoleComponent } from './admin/role/admin-editar-role/admin-editar-role.component';
import { AdminRegistroCategoriaComponent } from './admin/categoria/admin-registro-categoria/admin-registro-categoria.component';
import { AdminMostrarCategoriaComponent } from './admin/categoria/admin-mostrar-categoria/admin-mostrar-categoria.component';
import { AdminEditarCategoriaComponent } from './admin/categoria/admin-editar-categoria/admin-editar-categoria.component';
import { AdminMostrarVentaComponent } from './admin/venta/admin-mostrar-venta/admin-mostrar-venta.component';
import { UsuarioHomeComponent } from './usuario/usuario-home/usuario-home.component';
import { CarritoComponent } from './usuario/shop/carrito/carrito.component';
import { IndexComponent } from './usuario/shop/index/index.component';
import { CheckoutComponent } from './usuario/shop/checkout/checkout.component';
import { ClienteRegistrarComponent } from './usuario/cliente/cliente-registrar/cliente-registrar.component';
import { ClienteInicioComponent } from './usuario/cliente/cliente-inicio/cliente-inicio.component';
import { ClientePerfilComponent } from './usuario/cliente/cliente-perfil/cliente-perfil.component';
import { AuthGuard } from './usuario/cliente/auth.guard';
import { NormalGuard } from './usuario/cliente/guard-normal.guard';
import { AdminGuard } from './usuario/cliente/guard-admin.guard';
import { IndexCategoriaComponent } from './usuario/shop/index-categoria/index-categoria.component';



const routes: Routes = [
  {
    path: '', redirectTo: '/usuario/productos' , pathMatch: 'full'
  },
  {
    path: 'usuario', redirectTo: '/usuario/productos' , pathMatch: 'full'
  },
  {
    path: 'usuario',
    component: UsuarioHomeComponent,
    children: [
      {
        path: 'productos',
        component: IndexComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'productos/categoria/:id',
        component: IndexCategoriaComponent
      },
      {
        path: 'carrito',
        component: CarritoComponent
      },
      {
        path: 'checkout',
        component: CheckoutComponent,
        canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: 'perfil/:id',
        component: ClientePerfilComponent,
        canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: 'registrar',
        component: ClienteRegistrarComponent
      },
      {
        path: 'inicio-sesion',
        component: ClienteInicioComponent
      }
    ]
  },
  {
    path: 'administrador',
    component: AdminHomeComponent,
    children: [
      {
        path: 'registro-producto',
        component: AdminRegistroProductoComponent
      },
      {
        path: 'mostrar-producto',
        component: AdminMostrarProductoComponent
      },
      {
        path: 'editar-producto/:productoId',
        component: AdminEditarProductoComponent
      },
      {
        path: 'registro-cliente',
        component: AdminRegistroClienteComponent
      },
      {
        path: 'mostrar-cliente',
        component: AdminMostrarClienteComponent
      },
      {
        path: 'editar-cliente/:usuarioId',
        component: AdminEditarClienteComponent
      },
      {
        path: 'compras-cliente',
        component: AdminComprasClienteComponent
      },
      {
        path: 'registro-role',
        component: AdminRegistroRoleComponent
      },
      {
        path: 'mostrar-role',
        component: AdminMostrarRoleComponent
      },
      {
        path: 'editar-role/:roleId',
        component: AdminEditarRoleComponent
      },
      {
        path: 'registro-categoria',
        component: AdminRegistroCategoriaComponent
      },
      {
        path: 'mostrar-categoria',
        component: AdminMostrarCategoriaComponent
      },
      {
        path: 'editar-categoria/:categoriaId',
        component: AdminEditarCategoriaComponent
      },
      {
        path: 'mostrar-venta',
        component: AdminMostrarVentaComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, NormalGuard, AdminGuard]
})

export class AppRoutingModule {}
