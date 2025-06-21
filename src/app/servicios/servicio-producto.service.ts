import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../interfaces/producto';

@Injectable({
  providedIn: 'root'
})

export class ServicioProductoService {
  private apiUrl = 'http://localhost:3000/registrarproducto'; // Ajusta la URL según tu API
  
  constructor(private http: HttpClient) {}

  crearProducto(producto: Omit<Producto, 'id'>): Observable<Producto> {
     return this.http.post<Producto>(this.apiUrl, producto);
  }
  
   // Nuevo método para listar
  listarProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  // Método para obtener un producto por ID
  obtenerProductoPorId(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }
  // Método para actualizar un producto
  actualizarProducto(id: number, producto: Omit<Producto, 'id'>): Observable<Producto> {
     return this.http.put<Producto>(`${this.apiUrl}/${id}`, producto);
    // Si tu API usa PATCH:
    // return this.http.patch<Producto>(`${this.apiUrl}/${id}`, producto);
  }

  eliminarProducto(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
}


}


