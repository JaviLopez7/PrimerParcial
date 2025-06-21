import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../interfaces/producto';
import { ServicioProductoService } from '../../servicios/servicio-producto.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-editar',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css'
})
export class EditarComponent {

  productos: Producto[] = []; // Lista de productos

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
}
