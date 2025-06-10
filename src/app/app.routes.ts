import { Routes } from '@angular/router';
import { IniciarSesionComponent } from './paginas/iniciar-sesion/iniciar-sesion.component';
import { RegistrarUsuarioComponent } from './paginas/registrar-usuario/registrar-usuario.component';
import { NoEncontradoComponent } from './paginas/no-encontrado/no-encontrado.component';

export const routes: Routes = [
    { path: '', component: IniciarSesionComponent },
    { path: 'iniciar-sesion', component: IniciarSesionComponent },
    { path: 'registrar-usuario', component: RegistrarUsuarioComponent },
    { path: '**', component: NoEncontradoComponent }
];
