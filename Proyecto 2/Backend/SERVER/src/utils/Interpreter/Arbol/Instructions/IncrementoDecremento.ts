import { Instruccion } from "../Abstract/Instruccion";
import Arbol from '../Symbol/Three';
import tablaSimbolo from '../Symbol/SymbolTable';
import Tipo, {DataType} from '../Symbol/Type';
import Symbol from "../Symbol/Symbol";

const controller = require('../../../../controller/parser/parser');
const errores = require('../Exceptions/Error');

// clase del incremento y decremento como una instruccion no como aritmetica
export default class IncrementoDecremento extends Instruccion{
    Variable: String;
    tipo: tipoOp;


    //constructor de la clase
    constructor(tipo: tipoOp, Variable:String, fila:number, columna:number){
        super(new Tipo(DataType.INDEFINIDO),fila,columna);
        this.tipo=tipo;
        this.Variable=Variable;
    }

    //segun el tipo de operador ++ -- etc hace lo indicado en los casos
    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
    
    const value=tabla.getValor(this.Variable);
    
    //si la variable no existe returna y manda el error semantico 
    if(!value){controller.listaErrores.push(new errores.default('Error semantico','La Variable no existe en el sistema',this.linea,this.columna));
    return }

    
    let tipoDato=value.tipo.getTipo();
    let a=value.getvalor();
    
    
    //console.log("VALOR DE LA VARIABLE: "+a);
    //console.log("TIPO DE DATO DE LA VARIABLE: "+tipoDato);

    //si el tipo de dato no es entero o decimal manda error semantico
    if(value && tipoDato==0){
        //si es id++
        if(this.tipo===tipoOp.INCREMENTO1){
            a=Number(a)+1;
            tabla.setValor(this.Variable, new Symbol(value.tipo, this.Variable, a));

            this.tipoDato.setTipo(DataType.ENTERO);
            return a;
        }
        //si es id--
        else if(this.tipo===tipoOp.DECREMENTO1){
            a=Number(a)-1;
            tabla.setValor(this.Variable, new Symbol(value.tipo, this.Variable, a));

            this.tipoDato.setTipo(DataType.ENTERO);
            return a;
        }
            
    }
    else{  controller.listaErrores.push(new errores.default('Error semantico','La Varriable no es Entera o Decimal',this.linea,this.columna)); 
        return null;
        }

        
    }

    public ast(arbol:Arbol) {
        
        const nombre_nodo=`node_${this.linea}_${this.columna}_`
        arbol.add_ast( `
        ${nombre_nodo}1;
        ${nombre_nodo}[label="Instruccion\\nIncreDecre"];
        ${nombre_nodo}2[label="Operador\\n${getsimbol(this.tipo)}"];
        ${nombre_nodo}1[label="Nombre\\n${this.Variable}"];
        ${nombre_nodo}->${nombre_nodo}2
        ${nombre_nodo}->${nombre_nodo}1
        `)
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