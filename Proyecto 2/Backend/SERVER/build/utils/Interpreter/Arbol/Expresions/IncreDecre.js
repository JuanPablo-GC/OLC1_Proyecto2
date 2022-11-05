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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getsimbol = exports.getname = exports.tipoOp = void 0;
const Instruccion_1 = require("../Abstract/Instruccion");
const Type_1 = __importStar(require("../Symbol/Type"));
const Symbol_1 = __importDefault(require("../Symbol/Symbol"));
const controller = require('../../../../controller/parser/parser');
const errores = require('../Exceptions/Error');
//clase para los incrementos y decrementos en aritmetica
class IncreDecre extends Instruccion_1.Instruccion {
    constructor(tipo, Variable, fila, columna) {
        super(new Type_1.default(Type_1.DataType.INDEFINIDO), fila, columna);
        this.tipo = tipo;
        this.Variable = Variable;
    }
    interpretar(arbol, tabla) {
        const value = tabla.getValor(this.Variable);
        //error ya que la variable no existe
        if (!value) {
            controller.listaErrores.push(new errores.default('Error semantico', 'La Variable no existe en el sistema', this.linea, this.columna));
            return;
        }
        let tipoDato = value.tipo.getTipo();
        let a = value.getvalor();
        //console.log("VALOR DE LA VARIABLE: "+a);
        //console.log("TIPO DE DATO DE LA VARIABLE: "+tipoDato);
        if (value && tipoDato == 0) {
            if (this.tipo === tipoOp.INCREMENTO1) {
                a = Number(a) + 1;
                tabla.setValor(this.Variable, new Symbol_1.default(value.tipo, this.Variable, a - 1));
                this.tipoDato.setTipo(Type_1.DataType.ENTERO);
                return a;
            }
            else if (this.tipo === tipoOp.DECREMENTO1) {
                a = Number(a) - 1;
                tabla.setValor(this.Variable, new Symbol_1.default(value.tipo, this.Variable, a + 1));
                this.tipoDato.setTipo(Type_1.DataType.ENTERO);
                return a;
            }
        }
        else {
            controller.listaErrores.push(new errores.default('Error semantico', 'La Variable no es Int o Double', this.linea, this.columna));
            return;
        }
        return null;
    }
    ast(arbol) {
        const nombre_nodo = `node_${this.linea}_${this.columna}_`;
        return `
        /**/${nombre_nodo}1;
        ${nombre_nodo}1[label="${this.Variable}"];
        ${nombre_nodo}[label="${getsimbol(this.tipo)}"];
        ${nombre_nodo}1->${nombre_nodo};
        `;
    }
}
exports.default = IncreDecre;
var tipoOp;
(function (tipoOp) {
    /*0*/ tipoOp[tipoOp["INCREMENTO1"] = 0] = "INCREMENTO1";
    /*1*/ tipoOp[tipoOp["INCREMENTO2"] = 1] = "INCREMENTO2";
    /*2*/ tipoOp[tipoOp["DECREMENTO1"] = 2] = "DECREMENTO1";
    /*3*/ tipoOp[tipoOp["DECREMENTO2"] = 3] = "DECREMENTO2"; /*--ID*/
})(tipoOp = exports.tipoOp || (exports.tipoOp = {}));
function getname(objeto) {
    switch (objeto) {
        case 0:
        case 1:
            return "incremento";
        case 2:
        case 3:
            return "decremetno";
        default:
            return "";
    }
}
exports.getname = getname;
function getsimbol(objeto) {
    switch (objeto) {
        case 0:
        case 1:
            return "++";
        case 2:
        case 3:
            return "--";
        default:
            return "";
    }
}
exports.getsimbol = getsimbol;
