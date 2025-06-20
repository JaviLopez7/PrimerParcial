import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

const EMAIL_PATTERN =  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,3}(\.[a-zA-Z]{2})?$/i;

@Component({
  selector: 'app-iniciar-sesion',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './iniciar-sesion.component.html',
  styleUrl: './iniciar-sesion.component.css'
})
export class IniciarSesionComponent {

  formularioIniciarSesion!: FormGroup;

  constructor() {
    let controles: any = {
      correo: new FormControl('', [
        Validators.required,
        Validators.pattern(EMAIL_PATTERN),
      ]),
      contrasena: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
      ]),
    };

    this.formularioIniciarSesion = new FormGroup(controles);
  }

get correo() {
  return this.formularioIniciarSesion.get('correo')!;
}

get contrasena() {
  return this.formularioIniciarSesion.get('contrasena')!;
}


}
