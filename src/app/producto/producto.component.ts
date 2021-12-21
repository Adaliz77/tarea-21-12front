import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { AuthService } from '../usuarios/login/auth.service';
import { Producto } from './producto';
import { ProductoService } from './producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  productos!: Producto[];
  imagenSrc!:string;

  constructor(private productoService:ProductoService, public authService: AuthService) { }

  ngOnInit(): void {//onInit se ejecuta nada más después del constructor, y queremos que muestre los datos en el navegador cuando levanta la vista, por eso lo ponemos en onInit
    this.imagenSrc= 'assets/avatar.jpg';
    this.productoService.getProductos().subscribe(
    resp => this.productos = resp
    ); //estos datos vienen del servicio
  }

  delete(producto: Producto): void {
    swal({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar al cliente ${producto.nombre} ${producto.descripcion}?`,
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

        this.productoService.delete(producto.id).subscribe(
          () => {
            this.productos = this.productos.filter(cli => cli !== producto)
            swal(
              'Producto Eliminado!',
              `Producto ${producto.nombre} eliminado con éxito.`,
              'success'
            )
          }
        )

      }
    });
  }

}
