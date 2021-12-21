import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../section';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  titulo:string = 'Crear cliente';
  cliente: Cliente = new Cliente();

  constructor(private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id')!;
      if (id) {
        this.clienteService.getCliente(id).subscribe((cliente) => this.cliente = cliente);
      }
    });

    //this.clienteService.getRegiones().subscribe(regiones => this.regiones = regiones);
  }

  public create():void{
    console.log("Formulario Enviado");
    console.log(this.cliente);
    this.clienteService.create(this.cliente)
    .subscribe(
      cliente => {
        this.router.navigate(['/clientes']);
        swal('Nuevo cliente', `El cliente ${this.cliente.nombre} ha sido creado con éxito`, 'success');
      },
      err => {
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }

  update(): void {
    console.log(this.cliente);
    this.clienteService.update(this.cliente)
      .subscribe(
        json => {
          this.router.navigate(['/clientes']);
          swal('Cliente Actualizado', `${this.cliente.nombre}`, 'success');
        },
        err => {
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      )
  }

}
