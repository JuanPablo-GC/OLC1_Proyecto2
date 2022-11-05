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
class ArregloAccion extends Instruccion_1.Instruccion {
    constructor(id, expresion, push, pop, linea, columna) {
        super(new Type_1.default(Type_1.DataType.INDEFINIDO), linea, columna);
        this.id = id;
        this.expresion = expresion;
        this.push = push;
        this.pop = pop;
        this.columna = columna;
        this.linea;
    }
    interpretar(arbol, tabla) {
        //se buca el arreglo en la tavla 
        let objeto = tabla.getValorArreglo(this.id);
        //si no lo encutra error semantico y return
        if (!objeto) {
            controller.listaErrores.push(new errores.default('Error semantico', 'EL Vector no existe', this.linea, this.columna));
            return;
        }
        var Array = objeto.contenido;
        if (this.pop == true) {
            // se realiza solo el pop
            Array.pop();
        }
        else {
            var aux = this.expresion.interpretar(arbol, tabla);
            if (this.expresion.tipoDato.getTipo() != objeto.tipo.getTipo()) {
                controller.listaErrores.push(new errores.default('Error semantico', 'El tipo de vector es distinto al tipo de la asignacion', this.linea, this.columna));
                return;
            }
            Array.push(aux);
        }
        objeto.contenido = Array;
        //console.log(objeto.contenido)
        tabla.guardar_arreglo(this.id, objeto);
    } //console.log(objeto.contenido)
    ast(arbol) {
        const name_node = `node_${this.linea}_${this.columna}_`;
        const name = this.push ? "push" : "pop";
        arbol.add_ast(`
        ${name_node}[label="Instruccion \\n ${this.id + "." + name}"];
        `);
        if (this.push) {
            arbol.add_ast(`
            ${name_node}[label="Instruccion \\n ${this.id + "." + name}"];
            ${name_node}->${this.expresion.ast(arbol)}
            `);
        }
    }
}
exports.default = ArregloAccion;
