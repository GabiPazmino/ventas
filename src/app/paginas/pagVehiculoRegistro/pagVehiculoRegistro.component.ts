import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../../utilitarios/modelos/vehiculo';
import { VehiculoService } from '../../servicios/vehiculo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validadorCodigo } from '../../validaciones/vehiculoValidacion';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-pagVehiculoRegistro',
  templateUrl: './pagVehiculoRegistro.component.html',
  styleUrls: ['./pagVehiculoRegistro.component.css']
})
export class PagVehiculoRegistroComponent implements OnInit {
  formulario:FormGroup;

  constructor(
    private vehiculoService: VehiculoService,
    private formBuilder: FormBuilder
        
    ){
    
    this.formulario = this.formBuilder.group({
      "codigo": ['',[Validators.required, validadorCodigo()]],
      "marca": ['',[Validators.required]],
      "modelo": ['',[Validators.required]],
      "anio": ['',[Validators.required]],      
      "kilometraje": ['',[Validators.required]],
      "precio": [],
      "calificacion": ['',[Validators.required]],      
    })
   }

  ngOnInit() {
    
    // this.formulario.controls["codigo"].disable();
  }

  guardar(){
    let vehiculo: Vehiculo = {
      ...this.formulario.value
    };

    if(this.formulario.valid){
      this.vehiculoService.insertVehiculo(vehiculo).subscribe(
        respuesta => {
          if(respuesta.codigo == '1'){
            Swal.fire({
              title: "Exito",
              text: "Se grabó correctamente el vehículo",
              icon: "success"
            }).then((result) => {
              this.formulario.reset();
            });
          }else{
            Swal.fire({
              title: "Error",
              text: "No se pudo registrar el vehículo: "+respuesta.mensaje,
              icon: "error"
            });
          }
        }
      );
    }else{
      Swal.fire({
        title: "Error",
        text: "Te falta campos de llenar",
        icon: "error"
      });
    }
  
    // estaba primero
    //   let vehiculo: Vehiculo = {
    //     ...this.formulario.value
    //   };
    //   this.vehiculoService.addVehiculo(vehiculo);
      
    //   if(this.formulario.valid){
    //     Swal.fire({
    //       title: "Mensaje",
    //       text: "Se grabó correctamente el vehículo",
    //       icon: "info"
    //     } );
    //   }else{
    //     Swal.fire({
    //       title: "Error",
    //       text: "Te falta campos de llenar",
    //       icon: "error"
    //     } );
        
    //   }
    //   console.log("Formulario: ", this.formulario.value);
    // }
}}

