import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { RestService } from 'src/app/rest.service';
import { infoStore } from 'src/app/store';
import {map, startWith} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../../interfaces/registro.interface';
import { registroInterface } from 'src/app/interfaces/data.interface';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  public listTypesCodument: any = []
  public listMunicipios:any = [];

  registroLogged$:Observable<registroInterface[]>;
  filteredMunicipio$: Observable<string[]>;

  constructor(
    public fb: FormBuilder,
    public ld: infoStore,
    public rest: RestService,
    public store: Store<AppState>,
    public route: Router,
    public _snackbar: MatSnackBar
  ) {

    this.registroLogged$ = this.store.select(state => state.registro)

    this.registroLogged$.subscribe((resp:any) => {
      if(resp.length == 0) {
        this.route.navigate['loginh']
      } else {
        this.registerForm.patchValue({
          id: resp[0].id,
          type_document: resp[0].type_document,
          identification: resp[0].identification,
          detail:{
            name_company: resp[0].detail.name_company,
            first_name: resp[0].detail.first_name,
            second_name: resp[0].detail.second_name,
            first_surname: resp[0].detail.first_surname,
            second_surname: resp[0].detail.second_surname
          },
          email: resp[0].email,
          town: resp[0].town,
          mobile: resp[0].mobile,
          autorization: resp[0].autorization,
          second_autorization: resp[0].second_autorization,
        })

      }
    })


    this.rest.getMunicipios().subscribe((resp:any) => {
      this.listMunicipios = resp;
    })


    this.listTypesCodument = this.ld.listTypeDocument();
  }





  justLetters: string = '^[A-Za-z-ñÑáéíóúÁÉÍÓÚ ]+$';
  public registerForm = this.fb.group({
    id: [Math.floor((Math.random()*100)+1), [Validators.required]],
    type_document: ['', [Validators.required]],
    identification: ['', [Validators.required, Validators.maxLength(12), ]],
    detail: this.fb.group({
      name_company: ['',],
      first_name: ['',],
      second_name: ['',],
      first_surname: ['',],
      second_surname: ['',],
    }, { validators: Validators.nullValidator }),
    email: [, [Validators.required, Validators.email ]],
    town: [, [Validators.required]],
    mobile: [0, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    autorization: [, [Validators.requiredTrue]],
    second_autorization: [, [Validators.requiredTrue ]],
  })

  changeValidators(event) {

    console.log(event.value);

    if(event.value == 'nit' || event.value == 'ie') {
      this.registerForm.controls.detail['controls'].name_company.setValidators([Validators.required, Validators.pattern(this.justLetters)])
      this.registerForm.controls.detail['controls'].first_name.setValidators([Validators.required, Validators.pattern(this.justLetters)])
      this.registerForm.controls.detail['controls'].second_name.setValidators([Validators.required, Validators.pattern(this.justLetters)])
      this.registerForm.controls.detail['controls'].first_surname.setValidators([Validators.required, Validators.pattern(this.justLetters)])
      this.registerForm.controls.detail['controls'].second_surname.setValidators([Validators.required, Validators.pattern(this.justLetters)])
    } else {
      this.registerForm.controls.detail['controls'].name_company.clearValidators();
      this.registerForm.controls.detail['controls'].first_name.clearValidators();
      this.registerForm.controls.detail['controls'].second_name.clearValidators();
      this.registerForm.controls.detail['controls'].first_surname.clearValidators();
      this.registerForm.controls.detail['controls'].second_surname.clearValidators();
      this.registerForm.controls.detail.reset();

    }

  }

  ngOnInit(): void {

    this.registerForm.value
    this.filteredMunicipio$ = this.registerForm.get('town').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  saveData() {

    console.log(this.registerForm);

    if(this.registerForm.value.type_document == 'nit' || this.registerForm.value.type_document == 'ie' ) {
      if(this.registerForm.controls.detail['controls'].name_company == '') {
        this.registerForm.controls.detail['controls'].name_company.errors = {
          require: true
        }
      }
    }

    if(!this.registerForm.valid) {
      this._snackbar.open('Debe de ingresar todos los campos requeridos.', 'Ok', {
        duration: 5000
      })
    }


    // this.rest.setRegistro(this.registerForm.value).subscribe((resp:any) => {

    // })

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    if(this.listMunicipios.length) {
      return this.listMunicipios.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    }

  }


}
