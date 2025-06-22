import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioCarritoService {

  private productosSubject = new BehaviorSubject<Producto[]>([]);
  productosCarrito$ = this.productosSubject.asObservable();

  constructor() { }

  agregarProducto(producto: Producto): void {
    const productosActuales = this.productosSubject.value;
    const productoExistente = productosActuales.find(p => p.id === producto.id);
    if (productoExistente) {
      productoExistente.cantidad = (productoExistente.cantidad || 0) + 1;
    } else {
      productosActuales.push({...producto, cantidad: 1});
    }
    this.productosSubject.next([...productosActuales]);
  }
  // Otros métodos como eliminar, actualizar, etc. pueden ser añadidos aquí
}
