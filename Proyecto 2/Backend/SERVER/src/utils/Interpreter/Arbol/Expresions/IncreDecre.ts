import { Instruccion } from "../Abstract/Instruccion";
import Arbol from '../Symbol/Three';
import tablaSimbolo from '../Symbol/SymbolTable';
import Tipo, {DataType} from '../Symbol/Type';
import Symbol from "../Symbol/Symbol";

const controller = require('../../../../controller/parser/parser');
const errores = require('../Exceptions/Error');

//clase para los incrementos y decrementos en aritmetica
export default class IncreDecre extends Instruccion{
    Variable: String;

    tipo: tipoOp;

    constructor(tipo: tipoOp, Variable:String, fila:number, columna:number){
        super(new Tipo(DataType.INDEFINIDO),fila,columna);
        this.tipo=tipo;
        this.Variable=Variable;
    }
    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
    
    const value=tabla.getValor(this.Variable);

    //error ya que la variable no existe
    if(!value){controller.listaErrores.push(new errores.default('Error semantico','La Variable no existe en el sistema',this.linea,this.columna));
    return }


    let tipoDato=value.tipo.getTipo();
    let a=value.getvalor();
    //console.log("VALOR DE LA VARIABLE: "+a);
    //console.log("TIPO DE DATO DE LA VARIABLE: "+tipoDato);
    if(value && tipoDato==0){
        if(this.tipo===tipoOp.INCREMENTO1){
            a=Number(a)+1;
            tabla.setValor(this.Variable, new Symbol(value.tipo, this.Variable, a-1));

            this.tipoDato.setTipo(DataType.ENTERO);
            return a;
        }
        else if(this.tipo===tipoOp.DECREMENTO1){
            a=Number(a)-1;
            tabla.setValor(this.Variable, new Symbol(value.tipo, this.Variable, a+1));

            this.tipoDato.setTipo(DataType.ENTERO);
            return a;
        }
            
    }
    else{controller.listaErrores.push(new errores.default('Error semantico','La Variable no es Int o Double',this.linea,this.columna));
    return }
        

        
        return null;
    }

    public ast(arbol:Arbol) {
        
        const nombre_nodo=`node_${this.linea}_${this.columna}_`
        return `
        /**/${nombre_nodo}1;
        ${nombre_nodo}1[label="${this.Variable}"];
        ${nombre_nodo}[label="${getsimbol(this.tipo)}"];
        ${nombre_nodo}1->${nombre_nodo};
        `
    }

}
export enum tipoOp{
    /*0*/INCREMENTO1,/*ID++*/
    /*1*/INCREMENTO2,/*++ID*/
    /*2*/DECREMENTO1,/*ID--*/
    /*3*/DECREMENTO2 /*--ID*/
}
export function getname(objeto: tipoOp): string {
    switch (objeto) {
        case 0:
        case 1:
            return "incremento"
        case 2:
        case 3:
            return "decremetno"
        default:
            return ""
    }
}

export function getsimbol(objeto: tipoOp): string {
    switch (objeto) {
        case 0:
        case 1:
            return "++"
        case 2:
        case 3:
            return "--"
        default:
            return ""
    }
}