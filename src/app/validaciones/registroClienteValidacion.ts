import { AbstractControl, ValidationErrors,  ValidatorFn  } from '@angular/forms';

export function validadorTelefono(): ValidatorFn {
    return (control: AbstractControl):ValidationErrors|null => {
      // debe tener solo números
      const telefonoV = /^[0-9]{7,}$/;
      let value = control.value;
      // Comprobar si el valor coincide con el patrón
      if(telefonoV.test(value)){
      return null; // Valor válido, no hay errores
      } 
      return {'telefonoInvalido': true}; // Valor inválido, devolver un error
    }    
  }

 
export function validadorEmail(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // Expresión regular para validar un correo electrónico
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const value = control.value;

    // Comprobar si el valor coincide con el patrón
    if (emailPattern.test(value)) {
      return null; // Valor válido, no hay errores
    } else {
      return { 'emailInvalido': true }; // Valor inválido, devolver un error
    }
  };
}