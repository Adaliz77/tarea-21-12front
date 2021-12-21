import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SectionComponent } from './section/section.component';
import { LoginComponent } from './usuarios/login/login.component';
import { DetalleComponent } from './section/detalle/detalle.component';
import { FormComponent } from './section/form/form.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ClienteService } from './section/cliente.service';
import { HomeComponent } from './home/home.component';
import { ProductoComponent } from './producto/producto.component';
import { FormularioComponent } from './producto/formulario/formulario.component';
import { DetComponent } from './producto/det/det.component';
import { ProductoService } from './producto/producto.service';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    SectionComponent,
    LoginComponent,
    DetalleComponent,
    FormComponent,
    HomeComponent,
    ProductoComponent,
    FormularioComponent,
    DetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    ClienteService,
    ProductoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
