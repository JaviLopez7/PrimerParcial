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

  @Input() productos: Producto[] = [];
  @Output() confirmarCompra = new EventEmitter<{
    productos: Producto[],
    totalARS: number,
    totalUSD: number,
    tipoCambio: number
  }>();

  tipoCambio: number = 0;

  constructor(private tipoCambioService: ServicoTipoCambioService) {}

ngOnInit(): void {
  // Fecha desde: 2024-01-01
  const fechaDesde = '2024-01-01'; 
  // Fecha hasta: hoy (fecha actual)
  const hoy = new Date().toISOString().split('T')[0];

  // Llamada al servicio con las fechas ajustadas
  this.tipoCambioService.getTipoCambio(fechaDesde, hoy).subscribe({
    next: (respuesta: any) => {
      if (respuesta?.results?.length > 0) {
        const detalle = respuesta.results[0].detalle;
        if (detalle && detalle.length > 0) {
          this.tipoCambio = Number(detalle[0].tipoCotizacion);
        } else {
          this.tipoCambio = 0;
        }
      } else {
        this.tipoCambio = 0;
      }
    },
    error: (error) => {
      console.error('Error al obtener tipo de cambio:', error);
      this.tipoCambio = 0;
    },
    complete: () => {
      console.log('Llamada a la API de tipo de cambio completada.');
    }
  });
}

  calcularTotalARS(precio: number, cantidad: number): number {
    return precio * (cantidad || 1);
  }

  calcularTotalUSD(precio: number, cantidad: number): number {
    if (!this.tipoCambio || this.tipoCambio <= 0) return 0;
    return this.calcularTotalARS(precio, cantidad) / this.tipoCambio;
  }

  getTotalCantidad(): number {
    return this.productos.reduce((sum, p) => sum + (p.cantidad || 1), 0);
  }

  getTotalARS(): number {
    return this.productos.reduce((sum, p) => sum + this.calcularTotalARS(p.precio, p.cantidad), 0);
  }

  getTotalUSD(): number {
    return this.productos.reduce((sum, p) => sum + this.calcularTotalUSD(p.precio, p.cantidad), 0);
  }

  onConfirmarCompra() {
    if (!this.productos || this.productos.length === 0) return;
    this.confirmarCompra.emit({
      productos: this.productos,
      totalARS: this.getTotalARS(),
      totalUSD: this.getTotalUSD(),
      tipoCambio: this.tipoCambio
    });
  }
  
}
