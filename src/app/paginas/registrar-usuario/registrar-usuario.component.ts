import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

const EMAIL_PATTERN = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,3}(\.[a-zA-Z]{2})?$/i;
const SOLO_LETRAS_PATTERN = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

@Component({
  selector: 'app-registrar-usuario',
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './registrar-usuario.component.html',
  styleUrl: './registrar-usuario.component.css'
})
export class RegistrarUsuarioComponent {

  
soloLetras(event: KeyboardEvent) {
  const inputChar = event.key;
  const pattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]$/;

  if (!pattern.test(inputChar)) {
    event.preventDefault();
  }
}


  registerForm = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.pattern(SOLO_LETRAS_PATTERN)
    ]),
    apellido: new FormControl('', [
      Validators.required,
      Validators.pattern(SOLO_LETRAS_PATTERN)
    ]),
    correo: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    contrasenia: new FormControl('', [
      Validators.required,
      Validators.pattern(PASSWORD_PATTERN)
    ])
  });

  constructor(private router: Router, private http: HttpClient) {}

  onSubmit() {
    if (this.registerForm.invalid) {
      console.warn('Formulario inválido:', this.registerForm.value);
      return;
    }

    this.http.post('http://localhost:3000/registro', this.registerForm.value, { observe: 'response' })
      .subscribe({
        next: (response) => {
          console.log('Respuesta completa:', response);
          if (response.status === 201) {
            console.log('Registro exitoso');
            this.router.navigate(['/iniciar-sesion']);
          }
        },
        error: (err) => {
          console.error('Error en el registro', err);
          alert(err.error || 'Error al registrar el usuario');
        }
      });
  }
}


