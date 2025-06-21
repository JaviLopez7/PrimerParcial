import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ServicioProductoService } from '../../servicios/servicio-producto.service';
import { Producto } from '../../interfaces/producto';
import { FormsModule } from '@angular/forms';
import { FiltroProductosPipe } from '../../pipes/filtro-productos.pipe';

@Component({
  selector: 'app-listado',
  imports: [CommonModule, FormsModule, FiltroProductosPipe],
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css'
})
export class ListadoComponent {

  productos: Producto[] = []; // Lista de productos
  terminoBusqueda: string = ''; // <-- Agrega esta línea para el filtro
  
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
