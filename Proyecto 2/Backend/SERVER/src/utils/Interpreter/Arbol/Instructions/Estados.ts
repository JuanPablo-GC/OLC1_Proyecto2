import { Instruccion } from '../Abstract/Instruccion';
import Three from '../Symbol/Three';
import SymbolTable from '../Symbol/SymbolTable';
import Type, { DataType } from '../Symbol/Type';

export default class Estados extends Instruccion {
  codigo:Instruccion[]

  constructor(codigo: Instruccion[], linea: number, columna: number) {
    super(new Type(DataType.INDEFINIDO), linea, columna);
    this.codigo=codigo;
    this.linea=linea;
    this.columna=columna;
  
  }

  public interpretar(arbol: Three, tabla: SymbolTable) {

    const tablaLocal = new SymbolTable(tabla)
    


    //recorre todas las instrucciones
    for (const x of this.codigo) {
        if (x instanceof Instruccion) {
        x.interpretar(arbol,tabla);
        }

      }

  }

  public ast(arbol: Three) { 
   
      const name_node = `node_${this.linea}_${this.columna}_`
        arbol.add_ast(`
        ${name_node}[label="Instrucciones"];        
        `)
        //recorre cada una de las intrucciones 
        this.codigo.forEach(x => {
            arbol.add_ast(`${name_node}->node_${x.linea}_${x.columna}_;`)
            x.ast(arbol)
        })

    }
}