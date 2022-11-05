import { Instruccion } from '../Abstract/Instruccion';
import Arbol from '../Symbol/Three';
import tablaSimbolo from '../Symbol/SymbolTable';
import Tipo, {DataType} from '../Symbol/Type';

export default class Logica extends Instruccion {
  operacionIzq: Instruccion;
  operacionDer: Instruccion;
  tipo: tipoOp;
  

  constructor(tipo: tipoOp, opIzq: Instruccion, opDer: Instruccion, fila: number, columna: number) {
    super(new Tipo(DataType.INDEFINIDO), fila, columna);
    this.tipo = tipo;
    this.operacionIzq = opIzq;
    this.operacionDer = opDer;
  }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        const validTypesOperations = [DataType.BOOLEAN]

        let valueIzq = this.operacionIzq.interpretar(arbol, tabla);
        let valueDer = this.operacionDer.interpretar(arbol, tabla);
        if(validTypesOperations.includes(this.operacionIzq.tipoDato.getTipo())
            && validTypesOperations.includes(this.operacionDer.tipoDato.getTipo())) {
            if(this.tipo===tipoOp.OR){      
                this.tipoDato = new Tipo(DataType.BOOLEAN);  
                return valueIzq || valueDer;
            }
            else if(this.tipo===tipoOp.AND){      
                this.tipoDato = new Tipo(DataType.BOOLEAN);  
                return valueIzq && valueDer;
            }
            else if(this.tipo===tipoOp.NOT){      
                this.tipoDato = new Tipo(DataType.BOOLEAN);  
                return !valueDer;
            }
        }  else {
            return null;
        }
    }
    
    public ast(arbol: Arbol) {
        const nombreNodo = `node_${this.linea}_${this.columna}_`
        return `
        ${nombreNodo};
        ${nombreNodo}[label="${getsimbol(this.tipo)}"];
        ${nombreNodo}->${this.operacionIzq.ast(arbol)}
        ${nombreNodo}->${this.operacionDer.ast(arbol)}
        `
    }
}

export enum tipoOp{
    AND,
    OR,
    NOT
}
export function getsimbol(objeto: tipoOp): string {
    switch (objeto) {
        case 0:
            return "&&"
        case 1:
            return "||"
        case 2:
                return "!"
        default:
            return ""
    }
}