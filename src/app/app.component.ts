import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ClienteService } from './usuario/cliente/cliente.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{

  constructor(private clienteService: ClienteService) {}

  ngOnInit() {
    this.clienteService.autoAuthUser();
  }

}
