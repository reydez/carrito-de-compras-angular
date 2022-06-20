import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClienteService } from '../../usuario/cliente/cliente.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(public clienteService: ClienteService) { }

  ngOnInit() {
    this.userIsAuthenticated = this.clienteService.getIsAuth();
      this.authListenerSubs = this.clienteService
        .getAuthStatusListener()
        .subscribe(isAutheticated => {
          this.userIsAuthenticated = isAutheticated;
        });
  }

  onLogout() {
    this.clienteService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}
