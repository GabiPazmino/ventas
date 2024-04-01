import { NgModule } from '@angular/core';
import { PagListaVehiculosComponent } from './pagListaVehiculos/pagListaVehiculos.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilitariosModule } from '../utilitarios/UtilitariosModule';
import { PagVehiculoComponent } from './pagVehiculo/pagVehiculo.component';
import { RouterModule } from '@angular/router';
import { PagVehiculoRegistroComponent } from './pagVehiculoRegistro/pagVehiculoRegistro.component';


@NgModule({
    declarations: [
        PagListaVehiculosComponent,
        PagVehiculoComponent,
        PagVehiculoRegistroComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        UtilitariosModule,
        RouterModule,
        ReactiveFormsModule
    ],
    exports: [
        PagListaVehiculosComponent,
        PagVehiculoComponent,
        PagVehiculoRegistroComponent
       
    ]

})

export class PaginaModule {

}