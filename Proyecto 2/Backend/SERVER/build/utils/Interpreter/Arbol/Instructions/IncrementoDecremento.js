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
// clase del incremento y decremento como una instruccion no como aritmetica
class IncrementoDecremento extends Instruccion_1.Instruccion {
    //constructor de la clase
    constructor(tipo, Variable, fila, columna) {
        super(new Type_1.default(Type_1.DataType.INDEFINIDO), fila, columna);
        this.tipo = tipo;
        this.Variable = Variable;
    }
    //segun el tipo de operador ++ -- etc hace lo indicado en los casos
    interpretar(arbol, tabla) {
        const value = tabla.getValor(this.Variable);
        //si la variable no existe returna y manda el error semantico 
        if (!value) {
            controller.listaErrores.push(new errores.default('Error semantico', 'La Variable no existe en el sistema', this.linea, this.columna));
            return;
        }
        let tipoDato = value.tipo.getTipo();
        let a = value.getvalor();
        //console.log("VALOR DE LA VARIABLE: "+a);
        //console.log("TIPO DE DATO DE LA VARIABLE: "+tipoDato);
        //si el tipo de dato no es entero o decimal manda error semantico
        if (value && tipoDato == 0) {
            //si es id++
            if (this.tipo === tipoOp.INCREMENTO1) {
                a = Number(a) + 1;
                tabla.setValor(this.Variable, new Symbol_1.default(value.tipo, this.Variable, a));
                this.tipoDato.setTipo(Type_1.DataType.ENTERO);
                return a;
            }
            //si es id--
            else if (this.tipo === tipoOp.DECREMENTO1) {
                a = Number(a) - 1;
                tabla.setValor(this.Variable, new Symbol_1.default(value.tipo, this.Variable, a));
                this.tipoDato.setTipo(Type_1.DataType.ENTERO);
                return a;
            }
        }
        else {
            controller.listaErrores.push(new errores.default('Error semantico', 'La Varriable no es Entera o Decimal', this.linea, this.columna));
            return null;
        }
    }
    ast(arbol) {
        const nombre_nodo = `node_${this.linea}_${this.columna}_`;
        arbol.add_ast(`
        ${nombre_nodo}1;
        ${nombre_nodo}[label="Instruccion\\nIncreDecre"];
        ${nombre_nodo}2[label="Operador\\n${getsimbol(this.tipo)}"];
        ${nombre_nodo}1[label="Nombre\\n${this.Variable}"];
        ${nombre_nodo}->${nombre_nodo}2
        ${nombre_nodo}->${nombre_nodo}1
        `);
    }
}
exports.default = IncrementoDecremento;
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
