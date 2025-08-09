import { TERRENO } from './Mapa.js';

export class BuscadorRuta {
  constructor(mapa) {
    this.mapa = mapa;
  }

  buscarBFS(inicio, destino) {
    const cola = [{ ...inicio, camino: [inicio] }];
    const visitados = new Set();
    visitados.add(`${inicio.filas},${inicio.columnas}`);

    const direcciones = [
      { filas: -1, columnas: 0 },
      { filas: 1, columnas: 0 },
      { filas: 0, columnas: -1 },
      { filas: 0, columnas: 1 }
    ];

    while (cola.length > 0) {
      const actual = cola.shift();
      const { filas, columnas, camino } = actual;
      
      if (filas === destino.filas && columnas === destino.columnas) {
        return camino;
      }
      
      for (const dir of direcciones) {
        const nuevaFila = filas + dir.filas;
        const nuevaCol = columnas + dir.columnas;
        const clave = `${nuevaFila},${nuevaCol}`;
        
        if (this.mapa.esPosicionValida(nuevaFila, nuevaCol) &&
            !visitados.has(clave) &&
            !this.mapa.esObstaculo(nuevaFila, nuevaCol)) {
          visitados.add(clave);
          cola.push({ 
            filas: nuevaFila, 
            columnas: nuevaCol, 
            camino: [...camino, { filas: nuevaFila, columnas: nuevaCol }] 
          });
        }
      }
    }
    return [];
  }
}