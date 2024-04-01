import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../servicios/cliente.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { validadorTelefono } from '../../validaciones/registroClienteValidacion';
import { validadorEmail } from '../../validaciones/registroClienteValidacion';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-registroCliente',
  templateUrl: './registroCliente.component.html',
  styleUrls: ['./registroCliente.component.css']
})
export class RegistroClienteComponent implements OnInit {

  public title: string = 'Registro de Clientes'; 
  formulario: FormGroup;   
  
  quiereContacto: boolean = false;


  constructor(private _router: Router, private cliente: ClienteService, private formBuilder: FormBuilder) { 

    this.formulario = this.formBuilder.group({
      "nombre": ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      "apellido": ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      "password": ['', [Validators.required, Validators.minLength(6)]],
      "telefono": ['', [validadorTelefono()]],
      "email": ['', [validadorEmail()]],      
       
    })
  }

  ngOnInit(): void {
   
 
  }

  goInicio(): void {
    this._router.navigate([ '/home' ]);
  }

  registra(): void {
    if (this.formulario.valid) {
      this.cliente.insertCliente(this.formulario.value).subscribe(
        respuesta => {
          if(respuesta.codigo == '1'){
            Swal.fire({
              title: 'Registro Exitoso',
                  text: 'El cliente ha sido creado',
                  icon: 'success',
                  showConfirmButton: false,
                  timer: 2000
            }).then((result) => {
              this.formulario.reset();
            });
          }else{
            // Aquí puedes mostrar un mensaje de error al usuario
            Swal.fire({
              title: 'Error',
              text: 'Por favor, completa correctamente todos los campos.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
            
          }       
        }        
      )
    }
  }

  // registra(): void {
  //   if (this.formulario.valid) {      
  //     Swal.fire({
  //     title: 'Registro Exitoso',
  //     text: 'El cliente ha sido creado',
  //     icon: 'success',
  //     showConfirmButton: false,
  //     timer: 2000
  //   })
  //   this.insertCliente();
  //   //  this._router.navigate( ["/vehiculos"] );   
    
  //   }else {
  //     // Aquí puedes mostrar un mensaje de error al usuario
  //     Swal.fire({
  //       title: 'Error',
  //       text: 'Por favor, completa correctamente todos los campos.',
  //       icon: 'error',
  //       confirmButtonText: 'OK'
  //   });
  //   }
  // }
}
