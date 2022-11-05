import { Instruccion } from '../Abstract/Instruccion';
import Arbol from '../Symbol/Three';
import tablaSimbolo from '../Symbol/SymbolTable';
import Tipo, {DataType} from '../Symbol/Type';

const controller = require('../../../../controller/parser/parser');
const errores = require('../Exceptions/Error');

export default class Relacional extends Instruccion {
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
        const validTypesOperations = [DataType.ENTERO]
        const validTypesOperations2 = [DataType.BOOLEAN]

        let valueIzq = this.operacionIzq.interpretar(arbol, tabla);
        let valueDer = this.operacionDer.interpretar(arbol, tabla);
        if(validTypesOperations.includes(this.operacionIzq.tipoDato.getTipo())
            && validTypesOperations.includes(this.operacionDer.tipoDato.getTipo())) {
            if(this.tipo===tipoOp.MAYOR){        
                this.tipoDato = new Tipo(DataType.BOOLEAN);
                return Number(valueIzq) > Number(valueDer);
            }
            else if(this.tipo===tipoOp.MENOR){        
                this.tipoDato = new Tipo(DataType.BOOLEAN);
                return Number(valueIzq) < Number(valueDer);
            }
            else if(this.tipo===tipoOp.MAYOR_IGUAL){        
                this.tipoDato = new Tipo(DataType.BOOLEAN);
                return Number(valueIzq) >= Number(valueDer);
            }
            else if(this.tipo===tipoOp.MENOR_IGUAL){        
                this.tipoDato = new Tipo(DataType.BOOLEAN);
                return Number(valueIzq) <= Number(valueDer);
            }
            else if(this.tipo===tipoOp.IGUAL_QUE){        
                this.tipoDato = new Tipo(DataType.BOOLEAN);
                return Number(valueIzq) == Number(valueDer);
            }
            else if(this.tipo===tipoOp.DIFENTE_QUE){       
                this.tipoDato = new Tipo(DataType.BOOLEAN);
                return Number(valueIzq) != Number(valueDer);
            }
        }
        else if(validTypesOperations2.includes(this.operacionIzq.tipoDato.getTipo())
            && validTypesOperations2.includes(this.operacionDer.tipoDato.getTipo())) {
            if(this.tipo===tipoOp.IGUAL_QUE){        
                this.tipoDato = new Tipo(DataType.BOOLEAN);
                return Number(valueIzq) == Number(valueDer);
            }
            else if(this.tipo===tipoOp.DIFENTE_QUE){       
                this.tipoDato = new Tipo(DataType.BOOLEAN);
                return Number(valueIzq) != Number(valueDer);
            }
        }  else {
            controller.listaErrores.push(new errores.default('Error semantico','Tipo de dato distinto',this.linea,this.columna));
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
    MAYOR,
    MENOR,
    MAYOR_IGUAL,
    MENOR_IGUAL,
    DIFENTE_QUE,
    IGUAL_QUE
    
}

export function getsimbol(objeto: tipoOp): string {
    switch (objeto) {
        case 0:
            return ">"
        case 1:
            return "<"
        case 2:
            return ">="
        case 3:
            return "<="
        case 5:
            return "=="
        case 4:
                return "!="
        default:
            return ""
    }
}