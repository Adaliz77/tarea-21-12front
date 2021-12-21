import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable, map } from 'rxjs';
import { AuthService } from '../usuarios/login/auth.service';
import { Producto } from './producto';



@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  urlEndPoint:string = 'http://localhost:8080/api/productos';

  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http:HttpClient, private authService:AuthService) { }

  agregarAuthorizationHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  getProductos(): Observable<Producto[]>{
  //añado { headers: this.agregarAuthorizationHeader() }
    return this.http.get(this.urlEndPoint/*,{ headers: this.agregarAuthorizationHeader() }*/).pipe(
      map((response)=> response as Producto[])
    );

  }

  create(producto: Producto) : Observable<Producto> {
    return this.http.post<Producto>(this.urlEndPoint, producto, { headers: this.agregarAuthorizationHeader() })
  }


  getProducto(id:number): Observable<Producto>{
    return this.http.get<Producto>(`${this.urlEndPoint}/${id}`, { headers: this.agregarAuthorizationHeader() })
  }

  update(producto: Producto): Observable<Producto>{
    return this.http.put<Producto>(`${this.urlEndPoint}/${producto.id}`, producto, { headers: this.agregarAuthorizationHeader() })
  }

  delete(id: number): Observable<Producto>{
    return this.http.delete<Producto>(`${this.urlEndPoint}/${id}`, { headers: this.agregarAuthorizationHeader() })
  }


  subirFoto(archivo:File, id:any): Observable<HttpEvent<any>>{

    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    let httpHeaders = new HttpHeaders();
    let token = this.authService.token;
    if(token != null){
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    }

    const req = new HttpRequest('POST', `${this.urlEndPoint}/uploads`, formData, {
      reportProgress:true,
      headers: httpHeaders
    });

    return this.http.request(req).pipe(
      resp => resp
    );

  }


}
