import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { AuthService } from '../usuarios/login/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  nombreapp:string = 'App';

  constructor(public authService: AuthService, private router: Router) { }

  logout(): void {
    let username = this.authService.usuario.username;
    this.authService.logout();
    swal('Logout', `Hola ${username}, has cerrado sesión con éxito!`, 'success');
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
  }

}
