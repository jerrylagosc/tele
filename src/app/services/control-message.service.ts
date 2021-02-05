import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ControlMessageService {

  constructor() { }
  /**
   * You can create any kind of custom validation here.
   */
  static getValidatorErrorMessage(controlName: string, validatorName: string, validatorValue?: any) {
    let config = {
      required: `${controlName} es Obligatorio`,
      pattern: `El tipo de dato no corresponde ${validatorValue.requiredPattern}`,
      invalidEmail: 'Correo electrónico invalido.',
      minlength: `Número minimo ${validatorValue.requiredLength} caracteres`,
      maxlength: `Número máximo ${validatorValue.requiredLength} caracteres`,
    }
    return config[validatorName];
  }

  static showValidatorErrorMessage(validatorName: string, validatorValue: any) {
    let config = {}
    return config[validatorName];
  }
}
