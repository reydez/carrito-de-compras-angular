import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { AdminRegistroProductoComponent } from './admin/producto/admin-registro-producto/admin-registro-producto.component';
import { AdminMostrarProductoComponent } from './admin/producto/admin-mostrar-producto/admin-mostrar-producto.component';
import { AdminEditarProductoComponent } from './admin/producto/admin-editar-producto/admin-editar-producto.component';
import { AdminRegistroCategoriaComponent } from './admin/categoria/admin-registro-categoria/admin-registro-categoria.component';
import { AdminMostrarCategoriaComponent } from './admin/categoria/admin-mostrar-categoria/admin-mostrar-categoria.component';
import { AdminEditarCategoriaComponent } from './admin/categoria/admin-editar-categoria/admin-editar-categoria.component';
import { AdminRegistroClienteComponent } from './admin/cliente/admin-registro-cliente/admin-registro-cliente.component';
import { AdminMostrarClienteComponent } from './admin/cliente/admin-mostrar-cliente/admin-mostrar-cliente.component';
import { AdminEditarClienteComponent } from './admin/cliente/admin-editar-cliente/admin-editar-cliente.component';
import { AdminComprasClienteComponent } from './admin/cliente/admin-compras-cliente/admin-compras-cliente.component';
import { AdminRegistroRoleComponent } from './admin/role/admin-registro-role/admin-registro-role.component';
import { AdminMostrarRoleComponent } from './admin/role/admin-mostrar-role/admin-mostrar-role.component';
import { AdminEditarRoleComponent } from './admin/role/admin-editar-role/admin-editar-role.component';
import { AdminMostrarVentaComponent } from './admin/venta/admin-mostrar-venta/admin-mostrar-venta.component';
import { UsuarioHeaderComponent } from './usuario/usuario-header/usuario-header.component';
import { UsuarioHomeComponent } from './usuario/usuario-home/usuario-home.component';
import { IndexComponent } from './usuario/shop/index/index.component';
import { CheckoutComponent } from './usuario/shop/checkout/checkout.component';
import { CarritoComponent } from './usuario/shop/carrito/carrito.component';
import { ClienteRegistrarComponent } from './usuario/cliente/cliente-registrar/cliente-registrar.component';
import { ClienteInicioComponent } from './usuario/cliente/cliente-inicio/cliente-inicio.component';
import { ClientePerfilComponent } from './usuario/cliente/cliente-perfil/cliente-perfil.component';
import { AuthInterceptor } from './usuario/cliente/auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './error/error.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IndexCategoriaComponent } from './usuario/shop/index-categoria/index-categoria.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminHomeComponent,
    AdminHeaderComponent,
    AdminRegistroProductoComponent,
    AdminMostrarProductoComponent,
    AdminEditarProductoComponent,
    AdminRegistroCategoriaComponent,
    AdminMostrarCategoriaComponent,
    AdminEditarCategoriaComponent,
    AdminRegistroClienteComponent,
    AdminMostrarClienteComponent,
    AdminEditarClienteComponent,
    AdminComprasClienteComponent,
    AdminRegistroRoleComponent,
    AdminMostrarRoleComponent,
    AdminEditarRoleComponent,
    AdminMostrarVentaComponent,
    UsuarioHeaderComponent,
    UsuarioHomeComponent,
    IndexComponent,
    CheckoutComponent,
    CarritoComponent,
    ClienteRegistrarComponent,
    ClienteInicioComponent,
    ClientePerfilComponent,
    ErrorComponent,
    IndexCategoriaComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
