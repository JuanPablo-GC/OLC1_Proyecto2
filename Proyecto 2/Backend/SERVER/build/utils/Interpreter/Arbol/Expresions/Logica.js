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
exports.getsimbol = exports.tipoOp = void 0;
const Instruccion_1 = require("../Abstract/Instruccion");
const Type_1 = __importStar(require("../Symbol/Type"));
class Logica extends Instruccion_1.Instruccion {
    constructor(tipo, opIzq, opDer, fila, columna) {
        super(new Type_1.default(Type_1.DataType.INDEFINIDO), fila, columna);
        this.tipo = tipo;
        this.operacionIzq = opIzq;
        this.operacionDer = opDer;
    }
    interpretar(arbol, tabla) {
        const validTypesOperations = [Type_1.DataType.BOOLEAN];
        let valueIzq = this.operacionIzq.interpretar(arbol, tabla);
        let valueDer = this.operacionDer.interpretar(arbol, tabla);
        if (validTypesOperations.includes(this.operacionIzq.tipoDato.getTipo())
            && validTypesOperations.includes(this.operacionDer.tipoDato.getTipo())) {
            if (this.tipo === tipoOp.OR) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEAN);
                return valueIzq || valueDer;
            }
            else if (this.tipo === tipoOp.AND) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEAN);
                return valueIzq && valueDer;
            }
            else if (this.tipo === tipoOp.NOT) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEAN);
                return !valueDer;
            }
        }
        else {
            return null;
        }
    }
    ast(arbol) {
        const nombreNodo = `node_${this.linea}_${this.columna}_`;
        return `
        ${nombreNodo};
        ${nombreNodo}[label="${getsimbol(this.tipo)}"];
        ${nombreNodo}->${this.operacionIzq.ast(arbol)}
        ${nombreNodo}->${this.operacionDer.ast(arbol)}
        `;
    }
}
exports.default = Logica;
var tipoOp;
(function (tipoOp) {
    tipoOp[tipoOp["AND"] = 0] = "AND";
    tipoOp[tipoOp["OR"] = 1] = "OR";
    tipoOp[tipoOp["NOT"] = 2] = "NOT";
})(tipoOp = exports.tipoOp || (exports.tipoOp = {}));
function getsimbol(objeto) {
    switch (objeto) {
        case 0:
            return "&&";
        case 1:
            return "||";
        case 2:
            return "!";
        default:
            return "";
    }
}
exports.getsimbol = getsimbol;
