import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Producto } from '../../interfaces/producto';
import { CommonModule } from '@angular/common';
import { ServicoTipoCambioService } from '../../servicios/servico-tipo-cambio.service';

@Component({
  selector: 'app-factura',
  imports: [CommonModule],
  templateUrl: './factura.component.html',
  styleUrl: './factura.component.css'
})
export class FacturaComponent {

  @Input() productos: Producto[] = []; // Recibe productos del padre
  // Emite cuando se confirma la compra
  @Output() confirmarCompra = new EventEmitter<{
    productos: Producto[],
    totalARS: number,
    totalUSD: number,
    tipoCambio: number
  }>();
  tipoCambio: number = 0;

  constructor(private tipoCambioService: ServicoTipoCambioService) {
     this.obtenerTipoCambioPorFechas('2024-01-01', '2025-06-19');
  }

   // Método para emitir el evento de confirmación
 onConfirmarCompra() {
    if (!this.productos || this.productos.length === 0) {
      console.warn('No hay productos para confirmar');
      return;
    }
    const datosCompra = {
      productos: this.productos,
      totalARS: this.getTotalARS(),
      totalUSD: this.getTotalUSD(),
      tipoCambio: this.tipoCambio
    };
    this.confirmarCompra.emit(datosCompra);
  }



   obtenerTipoCambioPorFechas(fechaDesde: string, fechaHasta: string) {
  this.tipoCambioService.obtenerTipoCambio(fechaDesde, fechaHasta).subscribe({
    next: (data) => {
      console.log('Respuesta API BCRA:', data); // Para debug
      if (data?.results && data.results.length > 0) {
        const detalle = data.results[0].detalle;
        if (detalle && detalle.length > 0) {
          this.tipoCambio = Number(detalle[0].tipoCotizacion); // Accediendo a tipoCotizacion
          console.log('Tipo de cambio asignado:', this.tipoCambio); // Para debug
        } else {
          console.warn('No se encontraron detalles para el tipo de cambio.');
          this.tipoCambio = 0; // O establece un valor por defecto
        }
      } else {
        console.warn('No se encontraron datos para el tipo de cambio.');
        this.tipoCambio = 0; // O establece un valor por defecto
      }
    },
    error: (err) => {
      console.error('Error obteniendo tipo de cambio:', err);
      this.tipoCambio = 0; // O establece un valor por defecto
    }
  });
}


  calcularTotalARS(precio: number, cantidad: number): number {
    return precio * (cantidad || 1);
  }

   calcularTotalUSD(precio: number, cantidad: number): number {
    if (!this.tipoCambio || this.tipoCambio <= 0) {
      console.warn('Tipo de cambio no válido:', this.tipoCambio);
      return 0;
    }
    const totalARS = this.calcularTotalARS(precio, cantidad);
    return totalARS / this.tipoCambio;
  }

  getTotalCantidad(): number {
  return this.productos.reduce((sum, producto) => sum + (producto.cantidad || 1), 0);
}
getTotalARS(): number {
  return this.productos.reduce((sum, producto) => 
    sum + this.calcularTotalARS(producto.precio || 0, producto.cantidad || 1), 0);
}
getTotalUSD(): number {
  return this.productos.reduce((sum, producto) => 
    sum + this.calcularTotalUSD(producto.precio || 0, producto.cantidad || 1), 0);
}
}
