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
class Metodo extends Instruccion_1.Instruccion {
    constructor(id, parametros, Instrucciones, tipo, linea, columna) {
        super(new Type_1.default(Type_1.DataType.INDEFINIDO), linea, columna);
        this.id = id;
        this.parametros = parametros;
        this.Instrucciones = Instrucciones;
        this.tipo = tipo;
        this.columna = columna;
        this.linea;
    }
    interpretar(arbol, tabla) {
        //console.log(this.parametros)
    }
    ast(arbol) {
        const nombre_nodo = `node_${this.linea}_${this.columna}_`;
        arbol.add_ast(`
        ${nombre_nodo};
        ${nombre_nodo} [label="Instruccion\\nMetodo"];
        ${nombre_nodo}1[label="Nombre\\n${this.id}"];
        ${nombre_nodo}2[label="Parametros"];
        ${nombre_nodo}->${nombre_nodo}1;
        ${nombre_nodo}->${nombre_nodo}2;
        ${nombre_nodo}->node_${this.Instrucciones.linea}_${this.Instrucciones.columna}_;
        `);
        this.Instrucciones.ast(arbol);
        //grafica cada uno de los parametros 
        let tmp = 5;
        this.parametros.forEach(x => {
            arbol.add_ast(`
            ${nombre_nodo}${tmp}[label="Tipo,Nombre\\n${x}"];
            ${nombre_nodo}2->${nombre_nodo}${tmp};
            `);
            tmp++;
        });
    }
}
exports.default = Metodo;
