import { Instruccion } from '../Abstract/Instruccion';
import Errores from '../Exceptions/Error';

import Three from '../Symbol/Three';
import SymbolTable from '../Symbol/SymbolTable';
import Type, { DataType } from '../Symbol/Type';

export default class Imprimir extends Instruccion {
  private expresion: Instruccion;


  //constructor de la clase
  constructor(expresion: Instruccion, linea: number, columna: number) {
    super(new Type(DataType.INDEFINIDO), linea, columna);
    this.expresion = expresion;
  }

  //manda a actualizar la consola con la isntruccion que trae
  public interpretar(arbol: Three, tabla: SymbolTable) {
    let valor = this.expresion.interpretar(arbol, tabla);
    if (valor instanceof Errores) return valor;
    arbol.actualizaConsola(valor + '');
  }


  //grafica el arbol con la instruccion imprimir y una hoja de la instruccion
  public ast(arbol: Three) {
   
    const nombreNodo = `node_${this.linea}_${this.columna}_`
    arbol.add_ast(`
    ${nombreNodo}[label="Instruccion\\nImprimir"];`)
    if (this.expresion!= null){arbol.add_ast(`${nombreNodo}->${this.expresion.ast(arbol)}`)}
}
}