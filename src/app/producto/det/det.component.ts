import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-det',
  templateUrl: './det.component.html',
  styleUrls: ['./det.component.css']
})
export class DetComponent implements OnInit {

  producto!: Producto;
  fotoSeleccionada!: File;
  progreso:number = 0;

  constructor(private productoService:ProductoService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let id:number = +params.get('id')!;

      if(id){
        this.productoService.getProducto(id).subscribe(resp =>{
          this.producto = resp;
        })

      }
    });
  }

  seleccionarFoto(event:any){
    this.fotoSeleccionada = event.target.files[0];
    console.log(this.fotoSeleccionada);
  }

  subirFoto(){
    if(!this.fotoSeleccionada){
      swal('Error Upload: ', 'Debe seleccionar una foto', 'error');
    }else{
      this.productoService.subirFoto(this.fotoSeleccionada, this.producto.id)
      .subscribe(event => {
        if(event.type === HttpEventType.UploadProgress){
          this.progreso = Math.round((event.loaded / event.total!) * 100);
        }else if(event.type === HttpEventType.Response){
          let response: any = event.body;
          this.producto = response.cliente as Producto;
          swal('La foto se subido completamente!', response.mensaje, 'success');
        }
      });
    }

  }

}
