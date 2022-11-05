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
class ArregloAsignacion extends Instruccion_1.Instruccion {
    constructor(id, Array, expresionPosicion, expresionValor, linea, columna) {
        super(new Type_1.default(Type_1.DataType.INDEFINIDO), linea, columna);
        this.id = id;
        this.Array = Array;
        this.expresionPosicion = expresionPosicion;
        this.expresionValor = expresionValor;
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
        if (this.Array == null) {
            // se asigna un valor a una posicion
            let exprePosicion = this.expresionPosicion.interpretar(arbol, tabla);
            let espreValor = this.expresionValor.interpretar(arbol, tabla);
            //console.log("POSICION DEL VECTOR")
            // si la poscion no existe en el caso de que sea una variable 
            if (!exprePosicion) {
                controller.listaErrores.push(new errores.default('Error semantico', 'La posicion del vector no existe', this.linea, this.columna));
                return;
            }
            //si es index no es tipo numerica
            if (this.expresionPosicion.tipoDato.getTipo() != 0) {
                controller.listaErrores.push(new errores.default('Error semantico', 'La posicion del vector no es Entero', this.linea, this.columna));
                return;
            }
            console.log(objeto.tipo.getTipo());
            if (objeto.tipo.getTipo() != this.expresionValor.tipoDato.getTipo()) {
                controller.listaErrores.push(new errores.default('Error semantico', 'El tipo de vector es distinto al tipo de la asignacion', this.linea, this.columna));
                return;
            }
            Array[exprePosicion] = espreValor;
        }
        else {
            var aux = [];
            this.Array.forEach(Element => {
                let x = Element.interpretar(arbol, tabla);
                if (Element.tipoDato.getTipo() != objeto.tipo.getTipo()) {
                    controller.listaErrores.push(new errores.default('Error semantico', 'El tipo de vector es distinto al tipo de la asignacion', this.linea, this.columna));
                    return;
                }
                aux.push(x);
            });
            objeto.contenido = aux;
            //console.log(objeto.contenido)
            tabla.guardar_arreglo(this.id, objeto);
        } //console.log(objeto.contenido)
    }
    ast(arbol) {
        const name_node = `node_${this.linea}_${this.columna}_`;
        if (this.Array == null) {
            arbol.add_ast(`
            ${name_node}[label="Instruccion\\nAsignacion de Vector"];
            ${name_node}1[label="Indice"];
            ${name_node}2[label="Asignar"];
            ${name_node}->${name_node}1;
            ${name_node}->${name_node}2;
            ${name_node}1->${this.expresionPosicion.ast(arbol)}
            ${name_node}2->${this.expresionValor.ast(arbol)}
            `);
        }
        else {
            arbol.add_ast(`
            ${name_node}[label="Instruccion\\nVector signacion"];
            `);
            this.Array.forEach(element => {
                arbol.add_ast(`
                ${name_node}->${element.ast(arbol)}
                `);
            });
        }
    }
}
exports.default = ArregloAsignacion;
