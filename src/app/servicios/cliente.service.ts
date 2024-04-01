import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../utilitarios/modelos/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

constructor(private http: HttpClient) { }

baseUrl: string = 'https://epico.gob.ec/vehiculo/public/api/';
httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

insertCliente(cliente: Cliente): Observable<Respuesta> { 
  return this.http.post<Respuesta>(this.baseUrl + 'cliente/', cliente, this.httpOption);
}

}


export interface Respuesta {
  codigo: string;
  mensaje: string;
  data: any;  
}