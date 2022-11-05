import { Instruccion } from "../Abstract/Instruccion";
import Arbol from '../Symbol/Three';
import tablaSimbolo from '../Symbol/SymbolTable';
import Tipo, {DataType} from '../Symbol/Type';

const controller = require('../../../../controller/parser/parser');
const errores = require('../Exceptions/Error');

export default class Aritmetico extends Instruccion{
    operacionIzquierda: Instruccion;
    operacionDerecha: Instruccion;
    tipo: tipoOp;

    constructor(tipo: tipoOp, opIzq:Instruccion, opDer:Instruccion, fila:number, columna:number){
        super(new Tipo(DataType.INDEFINIDO),fila,columna);
        this.tipo=tipo;
        this.operacionIzquierda=opIzq;
        this.operacionDerecha=opDer;
    }
    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        if(this.tipo===tipoOp.SUMA){
            let valueIzq=this.operacionIzquierda.interpretar(arbol,tabla);
            let valueDer=this.operacionDerecha.interpretar(arbol,tabla);
            //numero mas numero
            if(this.operacionIzquierda.tipoDato.getTipo()===DataType.ENTERO){
                if(this.operacionDerecha.tipoDato.getTipo()===DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.ENTERO);
                    //console.log("tipoooo********************")
                    //console.log(this.tipoDato)
                    return (Number(valueIzq)+Number(valueDer));
                }

                //si es un numero mas una cadena
                else if(this.operacionDerecha.tipoDato.getTipo()===DataType.CADENA){
                    this.tipoDato.setTipo(DataType.CADENA);
                    return (valueIzq.toString()+valueDer.toString());
                }
            }   
            //cadena mas cadena 
            else if(this.operacionIzquierda.tipoDato.getTipo()===DataType.CADENA){
                    if(this.operacionDerecha.tipoDato.getTipo()===DataType.CADENA){
                        this.tipoDato.setTipo(DataType.CADENA);
                        return (valueIzq.toString()+valueDer.toString());
                    }
                    //si es una cadena mas un numero
                    if(this.operacionDerecha.tipoDato.getTipo()===DataType.ENTERO){
                        this.tipoDato.setTipo(DataType.CADENA);
                        return (valueIzq.toString()+valueDer.toString());
                    }
            }
            //no coincide con ninguno o se suma un booleano
            else{
                controller.listaErrores.push(new errores.default('Error semantico','Tipos de datos distintos',this.linea,this.columna));
            }
            
        }

        else if(this.tipo===tipoOp.RESTA){
            let valueIzq=this.operacionIzquierda.interpretar(arbol,tabla);
            let valueDer=this.operacionDerecha.interpretar(arbol,tabla);
            //numero mas numero
            if(this.operacionIzquierda.tipoDato.getTipo()===DataType.ENTERO){
                if(this.operacionDerecha.tipoDato.getTipo()===DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.ENTERO);
                    //console.log("LEGO  A LA RESTAAAAA")
                    //console.log(this.tipoDato)
                    return (Number(valueIzq)-Number(valueDer));
                }

            }   
            
            //no coincide con ninguno o se suma un booleano o resta de string
            else{
                controller.listaErrores.push(new errores.default('Error semantico','Tipos de datos distintos',this.linea,this.columna));
            }
            
        }
       
        else if(this.tipo===tipoOp.MULTIPLICACION){
            let valueIzq=this.operacionIzquierda.interpretar(arbol,tabla);
            let valueDer=this.operacionDerecha.interpretar(arbol,tabla);

            if(this.operacionIzquierda.tipoDato.getTipo()===DataType.ENTERO){
                if(this.operacionDerecha.tipoDato.getTipo()===DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.ENTERO);
                    return (Number(valueIzq)*Number(valueDer));
                }
            }
            if(this.operacionIzquierda.tipoDato.getTipo()===DataType.CADENA){
                if(this.operacionDerecha.tipoDato.getTipo()===DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.CADENA);
                    return ((valueIzq.toString())*Number(valueDer));
                }
            }
            else {
                controller.listaErrores.push(new errores.default('Error semantico','Tipos de datos distintos',this.linea,this.columna));
            }
        }

        else if(this.tipo===tipoOp.DIVISION){
            let valueIzq=this.operacionIzquierda.interpretar(arbol,tabla);
            let valueDer=this.operacionDerecha.interpretar(arbol,tabla);

            if(this.operacionIzquierda.tipoDato.getTipo()===DataType.ENTERO){
                if(this.operacionDerecha.tipoDato.getTipo()===DataType.ENTERO){
                    if(valueDer==0){
                        controller.listaErrores.push(new errores.default('Error semantico','No se puede dividir con 0',this.linea,this.columna));
                        return
                    }

                    this.tipoDato.setTipo(DataType.ENTERO);
                    return (Number(valueIzq)/Number(valueDer));
                }
            }
            else {
                controller.listaErrores.push(new errores.default('Error semantico','Tipos de datos distintos',this.linea,this.columna));
            }
        }
        else if(this.tipo===tipoOp.MODULO){
            let valueIzq=this.operacionIzquierda.interpretar(arbol,tabla);
            let valueDer=this.operacionDerecha.interpretar(arbol,tabla);

            if(this.operacionIzquierda.tipoDato.getTipo()===DataType.ENTERO){
                if(this.operacionDerecha.tipoDato.getTipo()===DataType.ENTERO){
                    if(valueDer==0){
                        controller.listaErrores.push(new errores.default('Error semantico','No se puede ejecutat %0',this.linea,this.columna));
                        return
                    }

                    this.tipoDato.setTipo(DataType.ENTERO);
                    return (Number(valueIzq)%Number(valueDer));
                }
            }
            else {
                controller.listaErrores.push(new errores.default('Error semantico','Tipos de datos distintos',this.linea,this.columna));
            }
        }
        else if(this.tipo===tipoOp.POTENCIA){
            let valueIzq=this.operacionIzquierda.interpretar(arbol,tabla);
            let valueDer=this.operacionDerecha.interpretar(arbol,tabla);
            if(this.operacionIzquierda.tipoDato.getTipo()===DataType.ENTERO){
                if(this.operacionDerecha.tipoDato.getTipo()===DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.ENTERO);
                    return Math.pow(Number(valueIzq),Number(valueDer));
                }
            }
            else {
                controller.listaErrores.push(new errores.default('Error semantico','Tipos de datos distintos',this.linea,this.columna));
            }
        }
        else if(this.tipo===tipoOp.NEGACION){
            let valueIzq=this.operacionIzquierda.interpretar(arbol,tabla);
            let valueDer=this.operacionDerecha.interpretar(arbol,tabla);

            if(this.operacionIzquierda.tipoDato.getTipo()===DataType.ENTERO){
                if(this.operacionDerecha.tipoDato.getTipo()===DataType.ENTERO){
                    this.tipoDato.setTipo(DataType.ENTERO);
                    return (Number(valueIzq)*(-1));
                }
            }
            else {
                controller.listaErrores.push(new errores.default('Error semantico','Tipos de datos distintos',this.linea,this.columna));
            }
        }
        return null;
    }

    public ast(arbol:Arbol) {

        const name_nodo = `node_${this.linea}_${this.columna}_`
        return `
        ${name_nodo};
        ${name_nodo}[label="${get_simbolo(this.tipo)}"];
        ${name_nodo}->${this.operacionIzquierda.ast(arbol)}
        ${name_nodo}->${this.operacionDerecha.ast(arbol)}`
    }
}
export enum tipoOp{
    SUMA,
    RESTA,
    DIVISION,
    MULTIPLICACION, 
    MODULO,
    POTENCIA,
    NEGACION 

}
export function get_simbolo(objeto: tipoOp): string {
    switch (objeto) {
        case 0:
            return "+"
        case 1:
            return "-"
        case 2:
            return "/"
        case 3:
            return "*"
        case 4:
                return "%"
        case 5:
                return "^"
        case 6:
                    return "-"
        default:
            return ""
    }
}