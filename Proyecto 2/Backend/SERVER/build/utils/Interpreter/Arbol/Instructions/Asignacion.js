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
class Asignacion extends Instruccion_1.Instruccion {
    constructor(id, valor, linea, columna) {
        super(new Type_1.default(Type_1.DataType.INDEFINIDO), linea, columna);
        this.id = id;
        this.valor = valor;
        this.columna = columna;
        this.linea;
    }
    interpretar(arbol, tabla) {
        //console.log(this.id);
        let variableAux = tabla.getValor(this.id);
        let valor = this.valor.interpretar(arbol, tabla);
        let tipoDatoAux = variableAux.tipo;
        //console.log(tipoDatoAux)
        if (variableAux) {
            console.log("la variable existe en el sistema");
            let tipo = this.valor.tipoDato;
            console.log(this.tipoDato.getTipo());
            //console.log("la variable existe en el sistema 222222");
            console.log(this.valor.interpretar(arbol, tabla));
            if (tipo.getTipo() == tipoDatoAux.getTipo()) {
                console.log("tipos de dato iguales");
                tabla.setValor(this.id, new Symbol_1.default(tipo, this.id, valor));
            }
            else {
                console.log("TIPOS DE DATO DISTINTO EN LA ASIGNACION");
                controller.listaErrores.push(new errores.default('Error semantico', 'Variable y dato distintos', this.linea, this.columna));
            }
        }
        else {
            console.log("la variable no existe en el sistema");
            controller.listaErrores.push(new errores.default('Error semantico', 'Variable no encontrada', this.linea, this.columna));
        }
        //tabla.setValor(this.id, new Simbolo(this.tipo, this.id, this.valor.interpretar(arbol, tabla)));
        //return null
        return null;
    }
    ast(arbol) {
        const nombre_nodo = `node_${this.linea}_${this.columna}_`;
        arbol.add_ast(`
        ${nombre_nodo}[label="Instruccion\\nAsignacion"];
        ${nombre_nodo}1[label="Nombre\\n${this.id}"];
        ${nombre_nodo}->${nombre_nodo}1;
        ${nombre_nodo}->${this.valor.ast(arbol)}
        `);
    }
}
exports.default = Asignacion;
