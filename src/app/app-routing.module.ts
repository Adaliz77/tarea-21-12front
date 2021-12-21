import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { DetComponent } from "./producto/det/det.component";
import { FormularioComponent } from "./producto/formulario/formulario.component";
import { ProductoComponent } from "./producto/producto.component";
import { DetalleComponent } from "./section/detalle/detalle.component";
import { FormComponent } from "./section/form/form.component";
import { SectionComponent } from "./section/section.component";
import { LoginComponent } from "./usuarios/login/login.component";

const routes :Routes = [
  {
    path:'',
    redirectTo: '/clientes',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'clientes',
    component: SectionComponent
  },
  {
    path: 'clientes/crear',
    component: FormComponent
  },
  {
    path:'clientes/editar/:id',
    component: FormComponent
  },
  {
    path:'clientes/ver/:id',
    component: DetalleComponent
  },
  {
    path: 'productos',
    component: ProductoComponent
  },
  {
    path: 'productos/crear',
    component: FormularioComponent
  },
  {
    path:'productos/editar/:id',
    component: FormularioComponent
  },
  {
    path:'productos/ver/:id',
    component: DetComponent
  },

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo:''
  }

];

@NgModule({
  imports:[
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule{

}
