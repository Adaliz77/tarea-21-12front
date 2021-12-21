import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { AuthService } from '../usuarios/login/auth.service';
import { ClienteService } from './cliente.service';
import { Cliente } from './section';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {

  clientes!: Cliente[];
  imagenSrc!:string;

  constructor(private clienteService:ClienteService, public authService: AuthService) { }

  ngOnInit(): void {//onInit se ejecuta nada más después del constructor, y queremos que muestre los datos en el navegador cuando levanta la vista, por eso lo ponemos en onInit
    this.imagenSrc= 'assets/avatar.jpg';
    this.clienteService.getClientes().subscribe(
    resp => this.clientes = resp
    ); //estos datos vienen del servicio
  }

  delete(cliente: Cliente): void {
    swal({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.clienteService.delete(cliente.id).subscribe(
          () => {
            this.clientes = this.clientes.filter(cli => cli !== cliente)
            swal(
              'Cliente Eliminado!',
              `Cliente ${cliente.nombre} eliminado con éxito.`,
              'success'
            )
          }
        )

      }
    });
  }


}
