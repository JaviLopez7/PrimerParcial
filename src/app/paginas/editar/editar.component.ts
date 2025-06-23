import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioProductoService } from '../../servicios/servicio-producto.service';
import { Producto } from '../../interfaces/producto';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {

  productoEditado: Producto = {
    id: 0,
    nombre: '',
    categoria: '',
    precio: 0
  };

  exitoAlGuardar: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private servicioProducto: ServicioProductoService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.servicioProducto.obtenerProductoPorId(id).subscribe({
      next: (producto) => {
        this.productoEditado = producto;
      },
      error: (err) => {
        console.error('Error al obtener el producto:', err);
        this.router.navigate(['/gestion-producto']);
      }
    });
  }

  guardarCambios(): void {
    this.servicioProducto.actualizarProducto(this.productoEditado).subscribe({
      next: () => {
        this.exitoAlGuardar = true;
        setTimeout(() => this.exitoAlGuardar = false, 4000);
      },
      error: (err) => {
        console.error('Error al actualizar el producto:', err);
        // Aquí podrías mostrar un mensaje de error si querés
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/gestion-producto']);
  }
}

