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
const Instruccion_1 = require("../Abstract/Instruccion");
const Symbol_1 = __importDefault(require("../Symbol/Symbol"));
const Type_1 = __importStar(require("../Symbol/Type"));
const controller = require('../../../../controller/parser/parser');
const errores = require('../Exceptions/Error');
class Declaracion extends Instruccion_1.Instruccion {
    constructor(id, tipo, valor, linea, columna) {
        super(new Type_1.default(Type_1.DataType.INDEFINIDO), linea, columna);
        this.id = id;
        this.tipo = tipo;
        this.valor = valor;
        this.columna = columna;
        this.linea;
    }
    interpretar(arbol, tabla) {
        let variableAux = tabla.getValor(this.id);
        if (variableAux) {
            controller.listaErrores.push(new errores.default('Error semantico', 'La Variable: ' + this.id.toString() + ' ya esta en el sistema', this.linea, this.columna));
            return null;
        }
        if (this.valor == null) {
            if (this.tipo.getTipo() == 0) {
                tabla.setValor(this.id, new Symbol_1.default(this.tipo, this.id, 0));
                return;
            }
            else if (this.tipo.getTipo() == 1) {
                tabla.setValor(this.id, new Symbol_1.default(this.tipo, this.id, ""));
                return;
            }
            else if (this.tipo.getTipo() == 2) {
                tabla.setValor(this.id, new Symbol_1.default(this.tipo, this.id, 'true'));
                return;
            }
            else if (this.tipo.getTipo() == 3) {
                tabla.setValor(this.id, new Symbol_1.default(this.tipo, this.id, ''));
                return;
            }
            else if (this.tipo.getTipo() == 4) {
                tabla.setValor(this.id, new Symbol_1.default(this.tipo, this.id, 0.0));
                return;
            }
        }
        console.log(this.tipo);
        let a = this.valor.interpretar(arbol, tabla);
        console.log(this.valor.tipoDato);
        if (this.valor.tipoDato.getTipo() == this.tipo.getTipo()) {
            console.log("el tipo de dato es igual que su declaracion");
            tabla.setValor(this.id, new Symbol_1.default(this.tipo, this.id, a));
        }
        else {
            console.log("el tipo de dato es diferente a su asignacion");
            controller.listaErrores.push(new errores.default('Error semantico', 'Tipo de Variable: ' + this.valor.tipoDato.getTipo2() + " el valor no coincide", this.linea, this.columna));
        }
        return null;
    }
    ast(arbol) {
        const nombreNodo = `node_${this.linea}_${this.columna}_`;
        if (this.valor != null) {
            arbol.add_ast(`
        ${nombreNodo}[label="Instruccion\\nDeclaracion"];
        ${nombreNodo}2[label="Tipo\\n${this.tipo.getTipo2()}"];
        ${nombreNodo}1[label="Nombre\\n${this.id}"];
        ${nombreNodo}->${nombreNodo}2
        ${nombreNodo}->${nombreNodo}1
        ${nombreNodo}->${this.valor.ast(arbol)}`);
        }
        else {
            arbol.add_ast(`
        ${nombreNodo}[label="Instruccion\\nDeclaracion"];
        ${nombreNodo}2[label="Tipo\\n${this.tipo.getTipo2()}"];
        ${nombreNodo}1[label="Nombre\\n${this.id}"];
        ${nombreNodo}->${nombreNodo}2
        ${nombreNodo}->${nombreNodo}1
        
        `);
        }
    }
}
exports.default = Declaracion;
