import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(
    public rest:HttpClient
  ) { }


  getRegistros(id:number) {
    console.log(id)
    return this.rest.get(`${environment.host}registros?identification=${id}`);
  }

  setRegistro(data: any ) {

    return this.rest.post(`${environment.host}registros`, data)
  }

  updateRegistro(id:number, data: any) {
    return this.rest.put(`${environment.host}registros/${id}`, data);
  }

  getMunicipios() {
    return this.rest.get(`${environment.host}municipios`);
  }

}
