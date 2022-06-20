import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ClienteData } from './cliente-data.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ClienteService {

  private tokenTimer: any;
  private roleId: string;
  private isAuthenticated = false;
  private token: string;
  private authStatusListener = new Subject<boolean>();
  private helper = new JwtHelperService();

  private usuarios: ClienteData[] = [];
  private usuariosUpdated = new Subject<ClienteData[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getTokenRole() {
    if (!localStorage.getItem('token')){
      return;
    }
    this.roleId = this.helper.decodeToken(localStorage.getItem('token')).role;
    return this.roleId;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getUsuarioUpdateListener(){
    return this.usuariosUpdated.asObservable();
  }

  getUsuarios() {
    this.http.get<{mensaje: string, usuarios: any}>(
      'http://localhost:3000/administrador/mostrar-usuarios'
      )
    .pipe(map((usuarioData) => {
      return usuarioData.usuarios.map(usuario => {
        return {
          id: usuario._id,
          nombre: usuario.nombre,
          correo: usuario.correo,
          password: usuario.password,
          role_id: usuario.role_id
        };
      });
    }))
    .subscribe(transUsuarios => {
      this.usuarios = transUsuarios;
      this.usuariosUpdated.next([...this.usuarios]);
    });
  }

  getUsuario(id: string) {
    return {...this.usuarios.find(p => p.id === id)};
  }

  updateUsuario(id: string, nombre: string, correo: string, role: string){
    const usuario: ClienteData = {id: id, nombre: nombre, correo: correo, password: null, role_id: role};
    this.http.put('http://localhost:3000/administrador/actualizar-usuario/' + id, usuario)
    .subscribe(response => {
      const updatedUsuarios = [...this.usuarios];
      const oldRoleIndex = updatedUsuarios.findIndex(p => p.id === usuario.id);
      updatedUsuarios[oldRoleIndex] = usuario;
      this.usuarios = updatedUsuarios;
      this.usuariosUpdated.next([...this.usuarios]);
      this.router.navigate(['/administrador/mostrar-cliente']);
    });
  }

  eliminarCliente(usuarioId: string){
    this.http.delete(
      'http://localhost:3000/administrador/eliminar-usuario/' + usuarioId)
    .subscribe(() => {
        const updatedUsuarios = this.usuarios.filter(usuario => usuario.id !== usuarioId);
        this.usuarios = updatedUsuarios;
        this.usuariosUpdated.next([...this.usuarios]);
    });
  }

  clienteRegistrar(nombre: string, correo: string, password: string, role_id: string) {
    const clienteData: ClienteData = {
      id: null,
      nombre: nombre,
      correo: correo,
      password: password,
      role_id: role_id
    };
    this.http.post('http://localhost:3000/usuario/cliente-registrar', clienteData)
    .subscribe(response =>{
      console.log(response);
    });
  }

  inicioSesion(correo: string, password: string){
    const clienteData: ClienteData = {id: null, nombre: null, correo: correo, password: password, role_id: null};
    this.http.post<{token: string, expiresIn: number}>('http://localhost:3000/usuario/inicio-sesion', clienteData)
    .subscribe(response => {
      const token = response.token;
      this.token = token;
      if (token) {
        const expiresInDuration = response.expiresIn;
        this.setAuthTimer(expiresInDuration);
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        console.log(expirationDate);
        this.saveAuthData(token, expirationDate);
        this.router.navigate(['/usuario/productos']);
        console.log(this.getTokenRole());
      }
    });
  }

logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/usuario/inicio-sesion']);
}

autoAuthUser() {
  const authInformation = this.getAuthData();
  if (!authInformation) {
      return;
  }
  const now = new Date();
  const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
  if (expiresIn > 0) {
    this.token = authInformation.token;
    this.isAuthenticated = true;
    this.setAuthTimer(expiresIn / 1000);
    this.authStatusListener.next(true);
  }
}

private setAuthTimer(duration: number) {
    console.log('setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
    this.logout();
  }, duration * 1000);
}

private saveAuthData(token: string, expirationDate: Date) {
  localStorage.setItem('token', token);
  localStorage.setItem('expiration', expirationDate.toISOString());
}

private clearAuthData() {
  localStorage.removeItem('token');
  localStorage.removeItem('expiration');
}

private getAuthData() {
  const token = localStorage.getItem('token');
  const expirationDate = localStorage.getItem('expiration');
  if (!token || !expirationDate) {
    return;
  }
  return {
    token: token,
    expirationDate: new Date(expirationDate)
  };
}


}


