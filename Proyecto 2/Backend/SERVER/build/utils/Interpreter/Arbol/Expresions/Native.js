"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstract/Instruccion");
const Type_1 = require("../Symbol/Type");
class Nativo extends Instruccion_1.Instruccion {
    constructor(tipo, valor, fila, columna) {
        super(tipo, fila, columna);
        this.valor = valor;
    }
    interpretar(arbol, tabla) {
        if (this.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
            return this.valor;
        }
        else if (this.tipoDato.getTipo() === Type_1.DataType.CADENA) {
            return this.valor.toString();
        }
        else if (this.tipoDato.getTipo() === Type_1.DataType.CARACTER) {
            return this.valor.toString();
        }
        else if (this.tipoDato.getTipo() === Type_1.DataType.DECIMAL) {
            return this.valor;
        }
        else if (this.tipoDato.getTipo() === Type_1.DataType.BOOLEAN) {
            if (this.valor == 'true') {
                return true;
            }
            else {
                return false;
            }
        } /*else if(this.tipoDato.getTipo() === DataType.IDENTIFICADOR){
          let value = tabla.getValor(this.valor);
          this.tipoDato=get(value,'tipo', new Type(DataType.ENTERO));
          return get(value,'valor');
        }*/
    }
    ast(arbol) {
        const nombre = `node_${this.linea}_${this.columna}_`;
        if (this.tipoDato.getTipo() === Type_1.DataType.CADENA) {
            return `
        ${nombre};
         ${nombre}[label="\\"${this.valor.toString()}\\""];`;
        }
        else {
            return `
      ${nombre};
      ${nombre}[label="${this.valor.toString()}"];`;
        }
    }
}
exports.default = Nativo;
