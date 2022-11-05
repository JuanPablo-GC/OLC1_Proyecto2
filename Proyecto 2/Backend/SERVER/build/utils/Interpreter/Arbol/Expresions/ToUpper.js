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
const Instruccion_1 = require("../Abstract/Instruccion");
const Type_1 = __importStar(require("../Symbol/Type"));
const controller = require('../../../../controller/parser/parser');
const errores = require('../Exceptions/Error');
class ToUpper extends Instruccion_1.Instruccion {
    constructor(valor, linea, columna) {
        super(new Type_1.default(Type_1.DataType.INDEFINIDO), linea, columna);
        this.valor = valor;
        this.columna = columna;
        this.linea;
    }
    interpretar(arbol, tabla) {
        //console.log("LLEGA AL CASTEOOOOOOOOOOOO")
        let variableAux = this.valor.interpretar(arbol, tabla);
        if (this.valor.tipoDato.getTipo() != 1) {
            controller.listaErrores.push(new errores.default('Error semantico', 'toUpper no tiene un valor de tipo string', this.linea, this.columna));
            return null;
        }
        this.tipoDato.setTipo(Type_1.DataType.CADENA);
        return (variableAux).toUpperCase();
    }
    ast(arbol) {
        const name_nodo = `node_${this.linea}_${this.columna}_`;
        return `
        ${name_nodo};
        ${name_nodo}[label="ToUpper"];
        ${name_nodo}->${this.valor.ast(arbol)}`;
    }
}
exports.default = ToUpper;
