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
const controller = require('../../../../controller/parser/parser');
const errores = require('../Exceptions/Error');
class Relacional extends Instruccion_1.Instruccion {
    constructor(tipo, opIzq, opDer, fila, columna) {
        super(new Type_1.default(Type_1.DataType.INDEFINIDO), fila, columna);
        this.tipo = tipo;
        this.operacionIzq = opIzq;
        this.operacionDer = opDer;
    }
    interpretar(arbol, tabla) {
        const validTypesOperations = [Type_1.DataType.ENTERO];
        const validTypesOperations2 = [Type_1.DataType.BOOLEAN];
        let valueIzq = this.operacionIzq.interpretar(arbol, tabla);
        let valueDer = this.operacionDer.interpretar(arbol, tabla);
        if (validTypesOperations.includes(this.operacionIzq.tipoDato.getTipo())
            && validTypesOperations.includes(this.operacionDer.tipoDato.getTipo())) {
            if (this.tipo === tipoOp.MAYOR) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEAN);
                return Number(valueIzq) > Number(valueDer);
            }
            else if (this.tipo === tipoOp.MENOR) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEAN);
                return Number(valueIzq) < Number(valueDer);
            }
            else if (this.tipo === tipoOp.MAYOR_IGUAL) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEAN);
                return Number(valueIzq) >= Number(valueDer);
            }
            else if (this.tipo === tipoOp.MENOR_IGUAL) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEAN);
                return Number(valueIzq) <= Number(valueDer);
            }
            else if (this.tipo === tipoOp.IGUAL_QUE) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEAN);
                return Number(valueIzq) == Number(valueDer);
            }
            else if (this.tipo === tipoOp.DIFENTE_QUE) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEAN);
                return Number(valueIzq) != Number(valueDer);
            }
        }
        else if (validTypesOperations2.includes(this.operacionIzq.tipoDato.getTipo())
            && validTypesOperations2.includes(this.operacionDer.tipoDato.getTipo())) {
            if (this.tipo === tipoOp.IGUAL_QUE) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEAN);
                return Number(valueIzq) == Number(valueDer);
            }
            else if (this.tipo === tipoOp.DIFENTE_QUE) {
                this.tipoDato = new Type_1.default(Type_1.DataType.BOOLEAN);
                return Number(valueIzq) != Number(valueDer);
            }
        }
        else {
            controller.listaErrores.push(new errores.default('Error semantico', 'Tipo de dato distinto', this.linea, this.columna));
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
exports.default = Relacional;
var tipoOp;
(function (tipoOp) {
    tipoOp[tipoOp["MAYOR"] = 0] = "MAYOR";
    tipoOp[tipoOp["MENOR"] = 1] = "MENOR";
    tipoOp[tipoOp["MAYOR_IGUAL"] = 2] = "MAYOR_IGUAL";
    tipoOp[tipoOp["MENOR_IGUAL"] = 3] = "MENOR_IGUAL";
    tipoOp[tipoOp["DIFENTE_QUE"] = 4] = "DIFENTE_QUE";
    tipoOp[tipoOp["IGUAL_QUE"] = 5] = "IGUAL_QUE";
})(tipoOp = exports.tipoOp || (exports.tipoOp = {}));
function getsimbol(objeto) {
    switch (objeto) {
        case 0:
            return ">";
        case 1:
            return "<";
        case 2:
            return ">=";
        case 3:
            return "<=";
        case 5:
            return "==";
        case 4:
            return "!=";
        default:
            return "";
    }
}
exports.getsimbol = getsimbol;
