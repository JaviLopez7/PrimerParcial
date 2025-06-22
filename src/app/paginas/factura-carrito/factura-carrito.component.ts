import { Component } from '@angular/core';
import { Producto } from '../../interfaces/producto';
import { ServicioProductoService } from '../../servicios/servicio-producto.service';
import { ServicoTipoCambioService } from '../../servicios/servico-tipo-cambio.service';
import { ServicioCarritoService } from '../../servicios/servicio-carrito.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FacturaComponent } from '../factura/factura.component';


@Component({
  selector: 'app-factura-carrito',
  imports: [FormsModule, CommonModule,FacturaComponent],
  templateUrl: './factura-carrito.component.html',
  styleUrl: './factura-carrito.component.css'
})
export class FacturaCarritoComponent {

  productosDisponibles: Producto[] = [];
  mostrarFactura: boolean = false;
  tipoCambio: number = 0;

  constructor(
    private productoService: ServicioProductoService,
    private tipoCambioService: ServicoTipoCambioService,
    public carritoService: ServicioCarritoService // público para usar en template
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
    this.obtenerTipoCambio();
  }

  cargarProductos(): void {
    this.productoService.listarProductos().subscribe({
      next: productos => this.productosDisponibles = productos,
      error: err => console.error('Error al cargar productos:', err)
    });
  }

  agregarAlCarrito(producto: Producto): void {
    this.carritoService.agregarProducto(producto);
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
    this.carritoService.vaciarCarrito();
    this.mostrarFactura = false;
  }

  obtenerTipoCambio(): void {
    const hoy = new Date().toISOString().split('T')[0];
    
    this.tipoCambioService.getTipoCambio(hoy, hoy).subscribe({
      next: data => {
        if (data && data.length > 0) {
          this.tipoCambio = data[0].tipoCotizacion;
        }
      },
      error: err => console.error('Error al obtener tipo de cambio:', err)
    });
  }
  
}
