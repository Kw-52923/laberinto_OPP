// Export -> Este dato puede ser usado fuera de este archivo
// Objetos -Clave-Valor
export const TERRENO = { // Const -> Es una constante, no se puede reasignar(aunque si se puede modificar su contenido)
  CAMINO_LIBRE: 0,
  EDIFICIO: 1,
  AGUA: 2,
  ZONA_BLOQUEADA: 3,
  INICIO: 4,
  DESTINO: 5,
  RUTA_CALCULADA: 6
};

export const CLASES_TERRENO = {
    // Mapeo de numeros a strings -> Si el terreno tiene 0 lo muestra como libre,etc..
  0: 'libre',
  1: 'edificio',
  2: 'agua',
  3: 'bloqueado',
  4: 'inicio',
  5: 'final',
  6: 'camino'
};

export const SIMBOLOS_TERRENO = {
  0: '·',
  1: '🏢',
  2: '🌊',
  3: '🚧',
  4: '🚀',
  5: '🎯',
  6: '⭐'
};


export class Mapa {
  // Inicializa el objeto
  //This accede a la propiedades y metodos
  constructor(tamano) {
    this.tamano = tamano;
    this.matriz = []; // Propiedades internas
    this.puntoInicio = { filas: 0, columnas: 0 };
    this.puntoFinal = { filas: tamano - 1, columnas: tamano - 1 };
    this.rutaActual = [];
    this.generarMapa(); // Se crea la matriz y se agregan los obstáculos automáticamente

  }
  /*Metodos Publicos-> Permiten modificar o consultar direcctamente el estado del objeto 
  sin tocar directamente sus propiedades desde afuera.*/  
  generarMapa() {
    this.matriz = [];
    for(let i = 0; i < this.tamano; i++){
        this.matriz[i] = [];
        for(let j = 0; j < this.tamano; j++){
            this.matriz[i][j] = TERRENO.CAMINO_LIBRE;
        }
    }
    //Abstaccion -> Le oculta toda parte interna para agregar obstaculos y muestra directamente el resultado
    this.agregarObstaculos();
  }

  agregarObstaculos() {
    const cantidad = Math.floor(this.tamano * this.tamano * 0.15);
    for (let i = 0; i < cantidad; i++) {
      const fila = Math.floor(Math.random() * this.tamano);
      const columna = Math.floor(Math.random() * this.tamano);
      if ((fila === 0 && columna === 0) ||
          (fila === this.tamano - 1 && columna === this.tamano - 1)) continue;
      const tipo = Math.floor(Math.random() * 3) + 1;
      this.matriz[fila][columna] = tipo;
    }
  }

  esPosicionValida(fila, columna) {
    return fila >= 0 && fila < this.tamano && columna >= 0 && columna < this.tamano;
  }

  esObstaculo(fila, columna) {
    const val = this.matriz[fila][columna];
    return [TERRENO.EDIFICIO, TERRENO.AGUA, TERRENO.ZONA_BLOQUEADA].includes(val);// verificar si el valor val está dentro de un conjunto específico de obstáculos

  }

  limpiarRuta() {
    for (let i = 0; i < this.tamano; i++) {
      for (let j = 0; j < this.tamano; j++) {
        if (this.matriz[i][j] === TERRENO.RUTA_CALCULADA) {
          this.matriz[i][j] = TERRENO.CAMINO_LIBRE;
        }
      }
    }
    this.rutaActual = [];
  }

  actualizarPuntos(inicio, final) {
    this.puntoInicio = inicio;
    this.puntoFinal = final;
  }
}