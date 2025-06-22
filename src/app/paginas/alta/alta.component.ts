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

  // Propiedades del formulario
  nombre: string = '';
  categoria: string = '';
  precio: number = 0;
  descripcion: string = '';
  imagen: string = '';
  

  constructor(private productoService: ServicioProductoService) {}

  // Acción al enviar el formulario
  onSubmit(): void {
    if (!this.nombre || !this.categoria || this.precio <= 0) {
      alert('Por favor completá nombre, categoría y un precio mayor a 0.');
      return;
    }

    const producto = {
      nombre: this.nombre,
      categoria: this.categoria,
      precio: this.precio,
      descripcion: this.descripcion,
      imagen: this.imagen,
      cantidad: 0
    };

    // Enviar a la API
    this.productoService.crearProducto(producto).subscribe({
      next: () => {
        alert('¡Producto guardado!');
        this.limpiarFormulario();
      },
      error: (err) => {
        console.error('Error al guardar producto:', err);
        alert('Ocurrió un error al guardar el producto.');
      }
    });
  }

  limpiarFormulario(): void {
    this.nombre = '';
    this.categoria = '';
    this.precio = 0;
    this.descripcion = '';
    this.imagen = '';
  }

}
