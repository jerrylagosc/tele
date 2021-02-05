import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { registroInterface } from 'src/app/interfaces/data.interface';
import { AppState } from 'src/app/interfaces/registro.interface';
import { RestService } from 'src/app/rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    public fb: FormBuilder,
    public _snackbar: MatSnackBar,
    public rest: RestService,
    private route: Router,
    private store: Store<AppState>
  ) {

  }

  formLogin = this.fb.group({
    nit: [, [Validators.required]]
  })

  login() {

    if(!this.formLogin.valid) {
      this._snackbar.open('Debe de ingresar le número de NIT', 'Ok', {
        duration: 5000
      })
    }

    this.rest.getRegistros(this.formLogin.value.nit).subscribe((resp:any) => {

      if(resp && resp[0]) {
        if(resp[0].state) {
          this._snackbar.open('¡Bienvenido!', 'Ok', {
            duration: 5000
          })

          this.store.dispatch({
            type: 'ADD_REGISTRO',
            payload: <registroInterface> resp[0]
          })

          this.route.navigate(['/registro']);
        } else {
          this._snackbar.open('Acceso no autorizado', 'Ok', {
            duration: 5000
          })
        }
      } else {
        this._snackbar.open('Nit no encontrado', 'Ok', {
          duration: 5000
        })
      }
    })

  }

  ngOnInit(): void {
  }

}
