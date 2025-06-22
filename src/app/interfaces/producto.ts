export interface Producto {
  id: number; // <-- El signo ? lo hace opcional
  nombre: string; // Asegúrate de que sea obligatorio
  categoria: string; // Asegúrate de que sea obligatorio
  precio: number; // O cualquier otra propiedad que tengas
  cantidad?: number;
}
