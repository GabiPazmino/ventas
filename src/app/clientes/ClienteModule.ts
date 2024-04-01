import { NgModule } from '@angular/core';
import { RegistroClienteComponent } from './registroCliente/registroCliente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';




@NgModule({
    declarations: [
        RegistroClienteComponent
    ],
    imports: [
        ReactiveFormsModule,
        RouterModule,
        FormsModule,
        CommonModule
       
    ],
    exports: [
        RegistroClienteComponent           
    ]

})

export class ClienteModule {

}