import { NgModule, PACKAGE_ROOT_URL } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './paginas/Home/Home.component';
import { PagListaVehiculosComponent } from './paginas/pagListaVehiculos/pagListaVehiculos.component';
import { PagNotFoundComponent } from './paginas/pagNotFound/pagNotFound.component';
import { PagVehiculoComponent } from './paginas/pagVehiculo/pagVehiculo.component';
import { PagVehiculoRegistroComponent } from './paginas/pagVehiculoRegistro/pagVehiculoRegistro.component';
import { RegistroClienteComponent } from './clientes/registroCliente/registroCliente.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'vehiculos',
    component: PagListaVehiculosComponent
  }, 
  {
    path: 'vehiculo/:codigo',
    component: PagVehiculoComponent
  },
  {
    path: 'vehiculo',
    component: PagVehiculoRegistroComponent
  },
  {
    path: 'registroCliente',
    component: RegistroClienteComponent
  },
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PagNotFoundComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
