import { Component } from '@angular/core';
import { ServicioProductoService } from '../../servicios/servicio-producto.service';
import { FormGroup, FormControl, FormsModule } from '@angular/forms';


@Component({
  selector: 'app-alta',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './alta.component.html',
  styleUrl: './alta.component.css'
})
export class AltaComponent {
  nombre: string = '';
  categoria: string = '';
  precio: number = 0;
  descripcion: string = '';
  imagen: string = '';
  
  constructor(private productoService: ServicioProductoService) {}
  onSubmit() {
    const producto = {
      nombre: this.nombre,
      categoria: this.categoria,
      precio: this.precio,
      descripcion: this.descripcion,
      imagen: this.imagen
    };
    console.log('Datos a enviar:', producto);
    this.productoService.crearProducto(producto).subscribe({
      next: () => {
        alert('¡Producto guardado!');
        this.limpiarFormulario();
      },
      error: (err) => alert('Error: ' + err.message)
    });
  }
  limpiarFormulario() {
    this.nombre = '';
    this.categoria = '';
    this.precio = 0;
    this.descripcion = '';
    this.imagen = '';
  }

}
