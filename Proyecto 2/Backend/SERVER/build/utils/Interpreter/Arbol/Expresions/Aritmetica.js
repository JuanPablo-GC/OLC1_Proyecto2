"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_simbolo = exports.tipoOp = void 0;
const Instruccion_1 = require("../Abstract/Instruccion");
const Type_1 = __importStar(require("../Symbol/Type"));
const controller = require('../../../../controller/parser/parser');
const errores = require('../Exceptions/Error');
class Aritmetico extends Instruccion_1.Instruccion {
    constructor(tipo, opIzq, opDer, fila, columna) {
        super(new Type_1.default(Type_1.DataType.INDEFINIDO), fila, columna);
        this.tipo = tipo;
        this.operacionIzquierda = opIzq;
        this.operacionDerecha = opDer;
    }
    interpretar(arbol, tabla) {
        if (this.tipo === tipoOp.SUMA) {
            let valueIzq = this.operacionIzquierda.interpretar(arbol, tabla);
            let valueDer = this.operacionDerecha.interpretar(arbol, tabla);
            //numero mas numero
            if (this.operacionIzquierda.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                if (this.operacionDerecha.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                    this.tipoDato.setTipo(Type_1.DataType.ENTERO);
                    //console.log("tipoooo********************")
                    //console.log(this.tipoDato)
                    return (Number(valueIzq) + Number(valueDer));
                }
                //si es un numero mas una cadena
                else if (this.operacionDerecha.tipoDato.getTipo() === Type_1.DataType.CADENA) {
                    this.tipoDato.setTipo(Type_1.DataType.CADENA);
                    return (valueIzq.toString() + valueDer.toString());
                }
            }
            //cadena mas cadena 
            else if (this.operacionIzquierda.tipoDato.getTipo() === Type_1.DataType.CADENA) {
                if (this.operacionDerecha.tipoDato.getTipo() === Type_1.DataType.CADENA) {
                    this.tipoDato.setTipo(Type_1.DataType.CADENA);
                    return (valueIzq.toString() + valueDer.toString());
                }
                //si es una cadena mas un numero
                if (this.operacionDerecha.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                    this.tipoDato.setTipo(Type_1.DataType.CADENA);
                    return (valueIzq.toString() + valueDer.toString());
                }
            }
            //no coincide con ninguno o se suma un booleano
            else {
                controller.listaErrores.push(new errores.default('Error semantico', 'Tipos de datos distintos', this.linea, this.columna));
            }
        }
        else if (this.tipo === tipoOp.RESTA) {
            let valueIzq = this.operacionIzquierda.interpretar(arbol, tabla);
            let valueDer = this.operacionDerecha.interpretar(arbol, tabla);
            //numero mas numero
            if (this.operacionIzquierda.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                if (this.operacionDerecha.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                    this.tipoDato.setTipo(Type_1.DataType.ENTERO);
                    //console.log("LEGO  A LA RESTAAAAA")
                    //console.log(this.tipoDato)
                    return (Number(valueIzq) - Number(valueDer));
                }
            }
            //no coincide con ninguno o se suma un booleano o resta de string
            else {
                controller.listaErrores.push(new errores.default('Error semantico', 'Tipos de datos distintos', this.linea, this.columna));
            }
        }
        else if (this.tipo === tipoOp.MULTIPLICACION) {
            let valueIzq = this.operacionIzquierda.interpretar(arbol, tabla);
            let valueDer = this.operacionDerecha.interpretar(arbol, tabla);
            if (this.operacionIzquierda.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                if (this.operacionDerecha.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                    this.tipoDato.setTipo(Type_1.DataType.ENTERO);
                    return (Number(valueIzq) * Number(valueDer));
                }
            }
            if (this.operacionIzquierda.tipoDato.getTipo() === Type_1.DataType.CADENA) {
                if (this.operacionDerecha.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                    this.tipoDato.setTipo(Type_1.DataType.CADENA);
                    return ((valueIzq.toString()) * Number(valueDer));
                }
            }
            else {
                controller.listaErrores.push(new errores.default('Error semantico', 'Tipos de datos distintos', this.linea, this.columna));
            }
        }
        else if (this.tipo === tipoOp.DIVISION) {
            let valueIzq = this.operacionIzquierda.interpretar(arbol, tabla);
            let valueDer = this.operacionDerecha.interpretar(arbol, tabla);
            if (this.operacionIzquierda.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                if (this.operacionDerecha.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                    if (valueDer == 0) {
                        controller.listaErrores.push(new errores.default('Error semantico', 'No se puede dividir con 0', this.linea, this.columna));
                        return;
                    }
                    this.tipoDato.setTipo(Type_1.DataType.ENTERO);
                    return (Number(valueIzq) / Number(valueDer));
                }
            }
            else {
                controller.listaErrores.push(new errores.default('Error semantico', 'Tipos de datos distintos', this.linea, this.columna));
            }
        }
        else if (this.tipo === tipoOp.MODULO) {
            let valueIzq = this.operacionIzquierda.interpretar(arbol, tabla);
            let valueDer = this.operacionDerecha.interpretar(arbol, tabla);
            if (this.operacionIzquierda.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                if (this.operacionDerecha.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                    if (valueDer == 0) {
                        controller.listaErrores.push(new errores.default('Error semantico', 'No se puede ejecutat %0', this.linea, this.columna));
                        return;
                    }
                    this.tipoDato.setTipo(Type_1.DataType.ENTERO);
                    return (Number(valueIzq) % Number(valueDer));
                }
            }
            else {
                controller.listaErrores.push(new errores.default('Error semantico', 'Tipos de datos distintos', this.linea, this.columna));
            }
        }
        else if (this.tipo === tipoOp.POTENCIA) {
            let valueIzq = this.operacionIzquierda.interpretar(arbol, tabla);
            let valueDer = this.operacionDerecha.interpretar(arbol, tabla);
            if (this.operacionIzquierda.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                if (this.operacionDerecha.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                    this.tipoDato.setTipo(Type_1.DataType.ENTERO);
                    return Math.pow(Number(valueIzq), Number(valueDer));
                }
            }
            else {
                controller.listaErrores.push(new errores.default('Error semantico', 'Tipos de datos distintos', this.linea, this.columna));
            }
        }
        else if (this.tipo === tipoOp.NEGACION) {
            let valueIzq = this.operacionIzquierda.interpretar(arbol, tabla);
            let valueDer = this.operacionDerecha.interpretar(arbol, tabla);
            if (this.operacionIzquierda.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                if (this.operacionDerecha.tipoDato.getTipo() === Type_1.DataType.ENTERO) {
                    this.tipoDato.setTipo(Type_1.DataType.ENTERO);
                    return (Number(valueIzq) * (-1));
                }
            }
            else {
                controller.listaErrores.push(new errores.default('Error semantico', 'Tipos de datos distintos', this.linea, this.columna));
            }
        }
        return null;
    }
    ast(arbol) {
        const name_nodo = `node_${this.linea}_${this.columna}_`;
        return `
        ${name_nodo};
        ${name_nodo}[label="${get_simbolo(this.tipo)}"];
        ${name_nodo}->${this.operacionIzquierda.ast(arbol)}
        ${name_nodo}->${this.operacionDerecha.ast(arbol)}`;
    }
}
exports.default = Aritmetico;
var tipoOp;
(function (tipoOp) {
    tipoOp[tipoOp["SUMA"] = 0] = "SUMA";
    tipoOp[tipoOp["RESTA"] = 1] = "RESTA";
    tipoOp[tipoOp["DIVISION"] = 2] = "DIVISION";
    tipoOp[tipoOp["MULTIPLICACION"] = 3] = "MULTIPLICACION";
    tipoOp[tipoOp["MODULO"] = 4] = "MODULO";
    tipoOp[tipoOp["POTENCIA"] = 5] = "POTENCIA";
    tipoOp[tipoOp["NEGACION"] = 6] = "NEGACION";
})(tipoOp = exports.tipoOp || (exports.tipoOp = {}));
function get_simbolo(objeto) {
    switch (objeto) {
        case 0:
            return "+";
        case 1:
            return "-";
        case 2:
            return "/";
        case 3:
            return "*";
        case 4:
            return "%";
        case 5:
            return "^";
        case 6:
            return "-";
        default:
            return "";
    }
}
exports.get_simbolo = get_simbolo;
