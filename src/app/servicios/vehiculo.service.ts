import { Injectable } from '@angular/core';
import { Vehiculo } from '../utilitarios/modelos/vehiculo';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

constructor(private http: HttpClient) { }

baseUrl: string = 'https://epico.gob.ec/vehiculo/public/api/';
httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

// Todos los vehículos = GET vehículos
// insert = POST vehículo/
// update = PUT vehículo/:codigo
// delete = DELETE vehículo/:codigo
// consultar = GET vehículo/:codigo


// getVehiculos(): Observable<Vehiculo[]> esto estaba antes
getVehiculos(filtro?: string, rows?: number, page?: number): Observable<Respuesta> {
  let body = new HttpParams();
  body = filtro ? body.set('filtro', filtro) : body;
  body = rows ? body.set('rows', rows) : body;
  body = page ? body.set('page', page) : body;

  // return this.http.get<Respuesta>(this.baseUrl + 'vehiculos/', {params: body}).pipe(
  //    map(respuesta => {
  //      return respuesta.data;
  //    })
  // )

  return this.http.get<Respuesta>(this.baseUrl + 'vehiculos/', {params: body});
} 

insertVehiculo(vehiculo: Vehiculo): Observable<Respuesta> { 
  return this.http.post<Respuesta>(this.baseUrl + 'vehiculo/', vehiculo, this.httpOption);
}

getVehiculo(codigo: string): Observable<any> {
  return this.http.get<Respuesta>(this.baseUrl + 'vehiculo/' + codigo);
}

actualizarVehiculo(vehiculo: Vehiculo, codigo: string): Observable<Respuesta> {
  return this.http.put<Respuesta>(this.baseUrl + 'vehiculo/' + codigo, vehiculo, this.httpOption);
}

eliminarVehiculo(codigo: string): Observable<Respuesta> {
  return this.http.delete<Respuesta>(this.baseUrl + 'vehiculo/' + codigo);
}

// getVehiculos(filtro:any): Observable<Array<Vehiculo>> {
//   const escucha: Observable<Array<Vehiculo>>= new Observable(escuchando =>{
//     let lista = this.listaVehiculos.filter(elem => elem.marca.toLowerCase().includes(filtro.toLowerCase()));
//     escuchando.next(lista);
//   });
//   return escucha;
// }

// getVehiculo(codigo: string): Observable<Vehiculo|undefined> {
//   const escucha: Observable<Vehiculo|undefined> = new Observable(escuchando =>{
//     setTimeout(() => {
//       let vehiculo = this.listaVehiculos.find(ele => ele.codigo === codigo);
//       escuchando.next(vehiculo);
//     }, 100);
    
//   }); 

//   return escucha;
// }

// PARA PODER HACERLO VIVIBLE AL USUARIO
addVehiculo(vehiculo: Vehiculo) {
  this.listaVehiculos.push(vehiculo);
}

// ARREGLO CON LOS DATOS DE LOS AUTOS
private listaVehiculos: Array<Vehiculo> = [
  {
    codigo: 'A001',
    marca: 'Toyota',
    modelo: 'Innova',
    anio: 2017,
    // color: 'Gris',
    kilometraje: '163000',
    precio: 18000,
    calificacion: 5,
    foto: 'https://images.patiotuerca.com/thumbs/w/990x540xC/amz_ptf_ecuador/2612024/1802143/o_o/1802143_1706300115520_224.jpg'
  },
  {
    codigo: 'A001',
    marca: 'Kia',
    modelo: 'Soul-EV',
    anio: 2024,
    // color: 'Azul',
    kilometraje: '0',
    precio: 15000,  
    calificacion: 5,
    foto: 'https://www.kia.com/kmc/images/showroom/Soul-EV-22MY/Features/Highlights/kia-pop-soul-ev-highlights-01-w.jpg'
  },
  {
    codigo: 'A002',
    marca: 'Chevrolet',
    modelo: 'Joy HB-Black',
    anio: 2023,
    // color: 'Rojo',
    kilometraje: '150000',
    precio: 16300,
    calificacion: 3,
    foto: 'https://www.chevrolet.com.ec/content/dam/chevrolet/south-america/ecuador/espanol/index/cars/2022-joy-hb/banner/2022-landing-joy-hb-banner.jpg?imwidth=600'
  },
  {
    codigo: 'A003',
    marca: 'Ford',
    modelo: 'Mustang',
    anio: 2020,
    // color: 'Gris',
    kilometraje: '0',
    precio: 40000,
    calificacion: 3,
    foto: 'https://www.ford.mx/content/ford/mx/es_mx/home/autos/mustang/2020/jcr:content/par/billboard_1205898036/imageComponent/image.imgs.full.high.jpg'
  },
  {
    codigo: 'A004',
    marca: 'Nissan',
    modelo: 'Sentra',
    anio: 2021,
    // color: 'Naranja',
    kilometraje: '0',
    precio: 20000,
    calificacion: 3,
    foto: 'https://cdn.buttercms.com/SFgerM6KQmKkflAkQAtS'
  }
]
}

// tiene el profe pero está en utilitarios modelos
// export interface Vehiculo {
//   codigo: string;
//   marca: string;
//   modelo: string;
//   anio?: number;
//   color?: string;
//   kilometraje?: string;
//   precio?: number;
//   calificacion?: number;
//   foto?: string|null;
// }

export interface Respuesta {
  codigo: string;
  mensaje: string;
  data: any;
  rows: number;
  pages: number;
  records: number;
  page: number;
}