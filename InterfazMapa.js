import { CLASES_TERRENO, SIMBOLOS_TERRENO, TERRENO } from './Mapa.js';

export class InterfazMapa {
  constructor(mapa) {
    this.mapa = mapa;
    this.grilla = document.getElementById('grillaMapa');
  }

  renderizar() {
    const tamano = this.mapa.tamano;
    this.grilla.innerHTML = '';
    this.grilla.style.gridTemplateColumns = `repeat(${tamano}, 1fr)`;
    
    for (let i = 0; i < tamano; i++) {
      for (let j = 0; j < tamano; j++) {
        const celda = document.createElement('div');
        celda.className = 'cell';
        celda.dataset.filas = i;
        celda.dataset.columnas = j;
        celda.addEventListener('click', () => this.alternarCelda(i, j));
        this.grilla.appendChild(celda);
      }
    }
    this.actualizarVisual();
  }

  alternarCelda(fila, columna) {
    if ((fila === this.mapa.puntoInicio.filas && columna === this.mapa.puntoInicio.columnas) ||
        (fila === this.mapa.puntoFinal.filas && columna === this.mapa.puntoFinal.columnas)) return;

    const tipo = parseInt(document.getElementById('tipo_obstaculos').value);
    if ([TERRENO.CAMINO_LIBRE, TERRENO.RUTA_CALCULADA].includes(this.mapa.matriz[fila][columna])) {
      this.mapa.matriz[fila][columna] = tipo;
    } else {
      this.mapa.matriz[fila][columna] = TERRENO.CAMINO_LIBRE;
    }
    this.mapa.limpiarRuta();
    this.actualizarVisual();
  }

  actualizarVisual() {
    document.querySelectorAll('.cell').forEach(celda => {
      const fila = parseInt(celda.dataset.filas);
      const col = parseInt(celda.dataset.columnas);
      let tipo = this.mapa.matriz[fila][col];

      if (fila === this.mapa.puntoInicio.filas && col === this.mapa.puntoInicio.columnas) {
        tipo = TERRENO.INICIO;
      } else if (fila === this.mapa.puntoFinal.filas && col === this.mapa.puntoFinal.columnas) {
        tipo = TERRENO.DESTINO;
      }
      
      celda.className = 'cell ' + CLASES_TERRENO[tipo];
      celda.textContent = SIMBOLOS_TERRENO[tipo];
    });
  }

  mostrarMensaje(texto, tipo = 'info') {
    const info = document.getElementById('info');
    const div = document.createElement('div');
    div.className = tipo;
    div.textContent = texto;
    info.appendChild(div);
    setTimeout(() => div.remove(), 3000);
  }
}