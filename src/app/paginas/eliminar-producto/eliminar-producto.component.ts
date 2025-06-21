import { Component } from '@angular/core';
import { Producto } from '../../interfaces/producto';
import { ServicioProductoService } from '../../servicios/servicio-producto.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-eliminar-producto',
  imports: [FormsModule, CommonModule],
  templateUrl: './eliminar-producto.component.html',
  styleUrl: './eliminar-producto.component.css'
})
export class EliminarProductoComponent {

   productos: Producto[] = [];
  productoAEliminar: Producto | null = null;
  eliminando = false;

   constructor(private productoService: ServicioProductoService) {}
  
  ngOnInit(): void {
    this.cargarProductos();
  }
  
  cargarProductos() {
    this.productoService.listarProductos().subscribe({
      next: (productos) => {
        this.productos = productos;
        console.log('Productos cargados:', productos);
      },
      error: (err) => console.error('Error al cargar productos:', err)
    });
  }

   prepararEliminacion(producto: Producto) {
    this.productoAEliminar = producto;
  }
  confirmarEliminacion() {
    if (!this.productoAEliminar) return;
    
    this.eliminando = true;
    this.productoService.eliminarProducto(this.productoAEliminar.id)
      .subscribe({
        next: () => {
          this.productos = this.productos.filter(p => p.id !== this.productoAEliminar?.id);
          this.productoAEliminar = null;
        },
        error: (err) => console.error('Error al eliminar:', err),
        complete: () => this.eliminando = false
      });
  }
  cancelarEliminacion() {
    this.productoAEliminar = null;
  }
  
}
