import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';

const EMAIL_PATTERN =  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,3}(\.[a-zA-Z]{2})?$/i;

@Component({
  selector: 'app-registrar-usuario',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registrar-usuario.component.html',
  styleUrl: './registrar-usuario.component.css'
})
export class RegistrarUsuarioComponent {

  formularioRegistrarUsuario!: FormGroup;

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

    this.formularioRegistrarUsuario = new FormGroup(controles);
  }

}
