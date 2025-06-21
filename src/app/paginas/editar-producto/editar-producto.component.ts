import { Component, OnInit } from '@angular/core';
import { Producto } from '../../interfaces/producto';
import { ServicioProductoService } from '../../servicios/servicio-producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-producto',
  imports: [FormsModule, CommonModule],
  templateUrl: './editar-producto.component.html',
  styleUrl: './editar-producto.component.css'
})
export class EditarProductoComponent implements OnInit {

   producto!: Producto;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ServicioProductoService
  ) {}
  
   ngOnInit(): void {
     const id = this.route.snapshot.params['id'];
     console.log('ID del producto:', id); // Verifica el ID
     this.productoService.obtenerProductoPorId(id).subscribe({
       next: (producto) => this.producto = producto,
       error: (err) => console.error('Error al cargar producto', err)
     });
   }
   

  onSubmit() {
  if (!this.producto.id) {
    console.error('No se puede actualizar: ID no proporcionado');
    return;
  }
  
  this.productoService.actualizarProducto(this.producto.id!, this.producto).subscribe({
         next: () => this.router.navigate(['/gestion-producto/listado']),
         error: (err) => console.error('Error al actualizar', err)
       });
     }
   }
