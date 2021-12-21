import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  titulo:string = 'Crear Producto';
  producto: Producto = new Producto();

  constructor(private productoService: ProductoService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id')!;
      if (id) {
        this.productoService.getProducto(id).subscribe((producto) => this.producto = producto);
      }
    });


  }

  public create():void{
    console.log("Formulario Enviado");
    console.log(this.producto);
    this.productoService.create(this.producto)
    .subscribe(
      producto => {
        this.router.navigate(['/productos']);
        swal('Nuevo producto', `El producto ${this.producto.nombre} ha sido creado con éxito`, 'success');
      },
      err => {
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }

  update(): void {
    console.log(this.producto);
    this.productoService.update(this.producto)
      .subscribe(
        json => {
          this.router.navigate(['/productos']);
          swal('Producto Actualizado', `${this.producto.nombre}`, 'success');
        },
        err => {
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      )
  }

}
