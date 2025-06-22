import { Component } from '@angular/core';
import { Producto } from '../../interfaces/producto';
import { ServicioProductoService } from '../../servicios/servicio-producto.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FacturaComponent } from '../factura/factura.component';
import { ServicoTipoCambioService } from '../../servicios/servico-tipo-cambio.service';


@Component({
  selector: 'app-factura-carrito',
  imports: [FormsModule, CommonModule,FacturaComponent],
  templateUrl: './factura-carrito.component.html',
  styleUrl: './factura-carrito.component.css'
})
export class FacturaCarritoComponent {

 productosDisponibles: Producto[] = []; // Todos los productos
  productosSeleccionados: Producto[] = []; // Productos para facturar
  mostrarFactura: boolean = false; // Controla visibilidad del hijo
   tipoCambio: number = 0; // Almacena el tipo de cambio


  constructor(private productoService: ServicioProductoService, private tipoCambioService: ServicoTipoCambioService) {}
  
  ngOnInit(): void {
    this.cargarProductos();
    this.obtenerTipoCambio();
  }
  
  cargarProductos() {
    this.productoService.listarProductos().subscribe({
      next: (productos) => {
        this.productosDisponibles = productos;
      },
      error: (err) => console.error('Error al cargar productos:', err)
    });
  }


   agregarAlCarrito(producto: Producto): void {
    const productoExistente = this.productosSeleccionados.find(p => p.id === producto.id);
    
    if (productoExistente) {
      productoExistente.cantidad = (productoExistente.cantidad || 0) + 1;
    } else {
      this.productosSeleccionados.push({...producto, cantidad: 1});
    }
  }

  confirmarSeleccion(): void {
    this.mostrarFactura = true;
  }

  manejarConfirmacionCompra(datosCompra: {
    productos: Producto[],
    totalARS: number,
    totalUSD: number,
    tipoCambio: number
  }): void {
    console.log('Compra confirmada!', datosCompra);
    // Aquí puedes manejar la lógica de la compra, como guardar en la base de datos o mostrar un mensaje al usuario
    this.productosSeleccionados = []; // Limpiar el carrito
    this.mostrarFactura = false; // Ocultar la factura
  }

  obtenerTipoCambio() {
    const hoy = new Date().toISOString().split('T')[0];
    // Ahora pasamos los parámetros requeridos
    this.tipoCambioService.obtenerTipoCambio(hoy, hoy).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.tipoCambio = data[0].cotizacion;
        }
      },
      error: (err) => console.error('Error al obtener tipo de cambio:', err)
    });
  }
}
