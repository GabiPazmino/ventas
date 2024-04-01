import { Component, Input, OnInit} from '@angular/core';
import { VehiculoService } from '../../servicios/vehiculo.service';
import { Vehiculo } from '../../utilitarios/modelos/vehiculo';

import Swal from 'sweetalert2';



@Component({
  selector: 'app-pagListaVehiculos',
  templateUrl: './pagListaVehiculos.component.html',
  styleUrls: ['./pagListaVehiculos.component.css']
})

export class PagListaVehiculosComponent implements OnInit {

  constructor(private vehiculoService: VehiculoService) { }

  // INICIALIZA LA TABLA no MOSTRANDO LAS IMÁGENES
  public mostrarImagen: boolean = false;
  public listaVehiculos: Array<Vehiculo> = [];

  // private _filtro: string = '';
  public rows: number = 10;
  public page: number = 1;
  public pages: number= 0;
  public filtro: string = '';

  // get filtro():string{
  //   return this._filtro 
  // }

  // set filtro(data:string){
  //   this._filtro= data;
  //   this.consultaVehiculos();
  // }

  @Input() valor:string = '';

  ngOnInit() {
    this.consultaVehiculos();
  }
  

  // FUNCION QUE PERMITE MOSTRAR U OCULTAR LA IMÁGEN DE CADA VEHÍCULO AL DAR CLICK EN EL BOTÓN
  toggleImage(): void {
    this.mostrarImagen = !this.mostrarImagen;
  }

  consultaVehiculos() {
    this.vehiculoService.getVehiculos(this.filtro, this.rows, this.page).subscribe(
      respuesta => {
        if (respuesta.codigo == '1') {
          this.listaVehiculos = respuesta.data;
          this.pages = respuesta.pages;
          this.paginar(respuesta.pages);
        }
        
        
      }
    )

    // this.vehiculoService.getVehiculos(this.filtro).subscribe(
    //   (data) => {
    //     this.listaVehiculos = data;
    //   }
    // );
  }

  cambiarPagina(pagina: number) {
    this.page = pagina;
    this.consultaVehiculos();
  }

  listaPaginas: Array<number> = [];
  paginar (pages: number) {
    this.listaPaginas = [];
    for (let i = 1; i <= pages; i++) {
      this.listaPaginas.push(i);
    }
  }

  siguiente() {
    if (this.page < this.pages) {
      this.page++;
      this.consultaVehiculos();
    }
  }

  anterior() {
    if (this.page > 1) {
      this.page--;
      this.consultaVehiculos();
    }
  }

  recepcion(dato: number) {
    console.log("Dato: " + dato);
  } 

  editar(vehiculo: Vehiculo, codigo: string) {   
  }

  eliminar(codigo: string) {
    Swal.fire({
      title: '¿Estas seguro de que deseas eliminar el vehiculo?',     
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar',
      cancelButtonText: 'Cancelar',
      icon: 'warning',    
    }).then((result) => {
      if (result.isConfirmed) {
        this.vehiculoService.eliminarVehiculo(codigo).subscribe(
          (data) => {
            if (data.codigo == '1') {
              this.consultaVehiculos();
              Swal.fire({
                title: 'Mensaje',
                text: 'El vehiculo fue eliminado con exito',
                icon: 'success'
              }
                
              )
            }
          }
        );
      }
    })
  }
}
