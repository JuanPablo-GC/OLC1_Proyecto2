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
class ExpresionesArreglo extends Instruccion_1.Instruccion {
    constructor(id, condicionPop, condicionAsignacion, expresion, linea, columna) {
        super(new Type_1.default(Type_1.DataType.INDEFINIDO), linea, columna);
        this.id = id;
        this.condicionPop = condicionPop;
        this.condicionAsignacion = condicionAsignacion;
        this.expresion = expresion;
        this.columna = columna;
        this.linea;
    }
    interpretar(arbol, tabla) {
        let objeto = tabla.getValorArreglo(this.id);
        //console.log("LLEGO AL BUSCAR EL ARREGLO")
        //si no lo encutra error semantico y return
        if (!objeto) {
            controller.listaErrores.push(new errores.default('Error semantico', 'EL Vector no existe', this.linea, this.columna));
            return;
        }
        var Array = objeto.contenido;
        if (this.condicionAsignacion == true) {
            console.log("SE HIZO la asignacion ");
            let expre = this.expresion.interpretar(arbol, tabla);
            if (objeto.tipo.getTipo() == 1) {
                this.tipoDato.setTipo(Type_1.DataType.CADENA);
                return Array[expre];
            }
        }
        if (this.condicionPop == true) {
            //console.log(Array)
            //onsole.log("SE HIZO EL POP asd")
            let pop = Array.pop();
            //console.log(Array)
            //objeto.contenido=Array;
            tabla.guardar_arreglo(this.id, objeto);
            //console.log(objeto.contenido)
            if (objeto.tipo.getTipo() == 1) {
                this.tipoDato.setTipo(Type_1.DataType.CADENA);
                return pop;
            }
        }
        else {
            this.tipoDato.setTipo(Type_1.DataType.ENTERO);
            return Array.length;
        }
    }
    ast(arbol) {
        const name_nodo = `node_${this.linea}_${this.columna}_`;
        if (this.condicionAsignacion) {
            return `
            ${name_nodo};
            ${name_nodo}[label="Vector\\n ${this.id}"];
            ${name_nodo}
            ${name_nodo}->${this.expresion.ast(arbol)}
            `;
        }
        if (this.condicionPop) {
            return `
            ${name_nodo};
            ${name_nodo}[label="${this.id}\\n<\\Vector pop\\> "];
            `;
        }
        else {
            return `
            ${name_nodo};
            ${name_nodo}[label="${this.id}\\n<\\Vector length\\> "];
            `;
        }
    }
}
exports.default = ExpresionesArreglo;
