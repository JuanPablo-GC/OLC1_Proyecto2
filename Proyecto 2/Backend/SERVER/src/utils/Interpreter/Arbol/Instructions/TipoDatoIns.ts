import { Instruccion } from "../Abstract/Instruccion";
import Arbol from '../Symbol/Three';
import Simbolo from "../Symbol/Symbol";
import tablaSimbolo from '../Symbol/SymbolTable';
import Tipo, {DataType} from "../Symbol/Type";

const controller = require('../../../../controller/parser/parser');
const errores = require('../Exceptions/Error');

export default class TipoDatoIns extends Instruccion{
    private tipo1:Tipo;
    private id:String;
    private valor:Instruccion;
    

    constructor(tipo1: Tipo,id: String, valor: Instruccion, linea: number, columna: number){
        super(new Tipo(DataType.INDEFINIDO),linea,columna);
        this.tipo1=tipo1;
        this.id =id;
        this.valor=valor;
        this.columna=columna;
        this.linea;


    }
    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        //console.log("LLEGA AL CASTEOOOOOOOOOOOO")
        let variableAux=tabla.getValor(this.id);
        if(variableAux){ controller.listaErrores.push(new errores.default('Error semantico','La Variable: '+this.id.toString()+' ya esta en el sistema',this.linea,this.columna));
                    return null}
        //si el tipo de dato es string           
        else if(this.tipo1.getTipo()==1){
           //si el tipo de dato es vector
            let aux2=tabla.getValorArreglo(this.id)
            if(aux2){tabla.setValor(this.id, new Simbolo(this.tipo1, this.id,"vector")); return}

           //si es de tipo entero
            else if(this.valor.tipoDato.getTipo()==0){
                tabla.setValor(this.id, new Simbolo(this.tipo1, this.id,"Int")); return }
            //si es de tipo string
            else if(this.valor.tipoDato.getTipo()==1){
                tabla.setValor(this.id, new Simbolo(this.tipo1, this.id,"String")); return }
            //si es de tipo string
            else if(this.valor.tipoDato.getTipo()==2){
                tabla.setValor(this.id, new Simbolo(this.tipo1, this.id,"Boolean")); return }
            //si es de tipo char
            else if(this.valor.tipoDato.getTipo()==3){
                tabla.setValor(this.id, new Simbolo(this.tipo1, this.id,"Char")); return }
            return null
        }
        controller.listaErrores.push(new errores.default('Error semantico','El tipo de dato no es string',this.linea,this.columna));
        return null
    }

    public ast(arbol: Arbol) {
        const nombreNodo = `node_${this.linea}_${this.columna}_`
        arbol.add_ast(`
        ${nombreNodo}[label="Instruccion\\nTypeOf"];
        ${nombreNodo}2[label="Tipo\\n${this.tipo1.getTipo2()}"];
        ${nombreNodo}1[label="Nombre\\n${this.id}"];
        ${nombreNodo}->${nombreNodo}2
        ${nombreNodo}->${nombreNodo}1
        ${nombreNodo}->${this.valor.ast(arbol)}`);

        
    }
    
}