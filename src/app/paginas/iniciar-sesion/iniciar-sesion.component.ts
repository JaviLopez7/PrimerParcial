import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

const EMAIL_PATTERN = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,3}(\.[a-zA-Z]{2})?$/i;

@Component({
  selector: 'app-iniciar-sesion',
  imports: [RouterLink, ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './iniciar-sesion.component.html',
  styleUrl: './iniciar-sesion.component.css'
})
export class IniciarSesionComponent {

  formularioIniciarSesion!: FormGroup;
  errorMensaje: string = '';

  constructor(private router: Router, private http: HttpClient) {
    this.formularioIniciarSesion = new FormGroup({
      correo: new FormControl('', [
        Validators.required,
        Validators.pattern(EMAIL_PATTERN),
      ]),
      contrasenia: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
      ]),
    });
  }

  get correo() {
    return this.formularioIniciarSesion.get('correo')!;
  }

  get contrasenia() {
    return this.formularioIniciarSesion.get('contrasenia')!;
  }

  onSubmit() {
    this.http.post('http://localhost:3000/iniciarSesion', this.formularioIniciarSesion.value, { observe: 'response' })
      .subscribe({
        next: (response) => {
          if (response.status === 200) {
            console.log('Inicio de sesión exitoso');
            this.router.navigate(['/gestion']); // Cambiá esta ruta si es necesario
          }
        },
        error: (err) => {
          if (err.status === 401 || err.status === 404) {
            this.errorMensaje = 'Correo o contraseña incorrectos';
          } else {
            this.errorMensaje = 'Usuario o contraseña incorrectos';
          }
        }
      });
  }
}




