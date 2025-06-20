import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

const EMAIL_PATTERN =  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,3}(\.[a-zA-Z]{2})?$/i;

@Component({
  selector: 'app-iniciar-sesion',
  imports: [RouterLink, ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './iniciar-sesion.component.html',
  styleUrl: './iniciar-sesion.component.css'
})
export class IniciarSesionComponent {

  formularioIniciarSesion!: FormGroup;

  constructor(private router: Router, private http: HttpClient) {
    let controles: any = {
      correo: new FormControl('', [
        Validators.required,
        Validators.pattern(EMAIL_PATTERN),
      ]),
      contrasenia: new FormControl('', [
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

get contrasenia() {
  return this.formularioIniciarSesion.get('contrasenia')!;
}

onSubmit() {
      // Envía la solicitud POST a la API de inicio de sesión
    this.http.post('http://localhost:3000/iniciarSesion', this.formularioIniciarSesion.value, { observe: 'response' })
      .subscribe({
        next: (response) => {
          console.log('Respuesta completa:', response);
          if (response.status === 200) { // Asegúrate de que el backend devuelva 200 para éxito
            console.log('Inicio de sesión exitoso');
            // Redirige al usuario a la página deseada
            this.router.navigate(['/gestion']); // Cambia esto a la ruta deseada
          }
        },
        error: (err) => {
          console.error('Error en el inicio de sesión', err);
          // Muestra un mensaje de error al usuario
          alert(err.error || 'Error al iniciar sesión'); // Muestra el error del backend
        }
      });
  }
   
}



