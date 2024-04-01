import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../../utilitarios/modelos/vehiculo';
import { ActivatedRoute } from '@angular/router';
import { VehiculoService } from '../../servicios/vehiculo.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { validadorCodigo } from '../../validaciones/vehiculoValidacion';


@Component({
  selector: 'app-pagVehiculo',
  templateUrl: './pagVehiculo.component.html',
  styleUrls: ['./pagVehiculo.component.css']
})
export class PagVehiculoComponent implements OnInit {
  vehiculo?: Vehiculo;
  formulario: FormGroup;

  // vehiculo?:Vehiculo = {
  //   codigo: "",
  //   marca: "",
  //   modelo: "",    
  // };
  constructor(
    private activatedRoute: ActivatedRoute,
    private vehiculoService: VehiculoService,
    private formBuilder: FormBuilder
  ) { 
    this.formulario = this.formBuilder.group({
      "codigo": ['',[Validators.required, validadorCodigo()]],
      "marca": ['', [Validators.required]],
      "modelo": ['', [Validators.required]],
      "anio": ['', [Validators.required]],      
      "kilometraje": ['', [Validators.required]],
      "precio": [],
      "calificacion": ['', [Validators.required]]   
    });
    this.formulario.controls["codigo"].disable();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.vehiculoService.getVehiculo(params['codigo']).subscribe(
        data => {
          if (data.codigo == "1"){
            this.vehiculo = data.data;
            this.formulario.controls['codigo'].setValue(this.vehiculo?.codigo);
            this.formulario.controls['marca'].setValue(this.vehiculo?.marca);
            this.formulario.controls['modelo'].setValue(this.vehiculo?.modelo);            
            this.formulario.controls['anio'].setValue(this.vehiculo?.anio);
            this.formulario.controls['kilometraje'].setValue(this.vehiculo?.kilometraje);
            this.formulario.controls['precio'].setValue(this.vehiculo?.precio);
            this.formulario.controls['calificacion'].setValue(this.vehiculo?.calificacion);

          }else{
            Swal.fire({
              title: "Error",
              text: "No se pudo cargar la información",
              icon: "error"
            });
          }
          
          
        }
      )
        // this.vehiculo = this.vehiculoService.getVehiculo(params['codigo']);
      }
    )
  }

  guardar() {
    if (this.formulario.valid) {
      this.vehiculoService.actualizarVehiculo({...this.formulario.value}, this.formulario.controls['codigo'].value).subscribe(data => {
        if (data.codigo == "1") {
          Swal.fire({
            title: "Exito",
            text: "Vehiculo actualizado correctamente",
            icon: "success"
          });
        } else {
          Swal.fire({
            title: "Error",
            text: "No se pudo actualizar el vehiculo: "+data.mensaje,
            icon: "warning"
          });
        }
      })
    } else{
        Swal.fire({
          title: "Mensaje",
          text: "Complete todos los campos",
          icon: "error"
        })
      }  

  }

  imprimir(data: any) {
    console.log('Calificación: ', data);
  }
}
