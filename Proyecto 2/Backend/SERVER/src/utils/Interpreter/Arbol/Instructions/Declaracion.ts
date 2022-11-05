import { Instruccion } from "../Abstract/Instruccion";
import Arbol from '../Symbol/Three';
import Simbolo from "../Symbol/Symbol";
import tablaSimbolo from '../Symbol/SymbolTable';
import Tipo, {DataType} from "../Symbol/Type";

const controller = require('../../../../controller/parser/parser');
const errores = require('../Exceptions/Error');

export default class Declaracion extends Instruccion{
    private id:String;
    private tipo:Tipo;
    private valor:Instruccion;
    

    constructor(id: String, tipo: Tipo, valor: Instruccion, linea: number, columna: number){
        super(new Tipo(DataType.INDEFINIDO),linea,columna);
        this.id =id;
        this.tipo=tipo;
        this.valor=valor;
        this.columna=columna;
        this.linea;


    }
    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let variableAux=tabla.getValor(this.id);
        if(variableAux){ controller.listaErrores.push(new errores.default('Error semantico','La Variable: '+this.id.toString()+' ya esta en el sistema',this.linea,this.columna));
                    return null}

        if(this.valor==null){
            if(this.tipo.getTipo()==0){
                tabla.setValor(this.id, new Simbolo(this.tipo, this.id,0));
                return
            }
            else if(this.tipo.getTipo()==1){
                tabla.setValor(this.id, new Simbolo(this.tipo, this.id,""));
                return
            }
            else if(this.tipo.getTipo()==2){
                tabla.setValor(this.id, new Simbolo(this.tipo, this.id,'true'));
                return
            }
            else if(this.tipo.getTipo()==3){
                tabla.setValor(this.id, new Simbolo(this.tipo, this.id,''));
                return
            }
            else if(this.tipo.getTipo()==4){
                tabla.setValor(this.id, new Simbolo(this.tipo, this.id,0.0));
                return
            }
        }
        console.log(this.tipo);
        let a=this.valor.interpretar(arbol, tabla);
        console.log(this.valor.tipoDato);
        
        if(this.valor.tipoDato.getTipo()==this.tipo.getTipo()){
            console.log("el tipo de dato es igual que su declaracion");
            tabla.setValor(this.id, new Simbolo(this.tipo, this.id,a));

        }
        else{ console.log("el tipo de dato es diferente a su asignacion");
                controller.listaErrores.push(new errores.default('Error semantico','Tipo de Variable: '+this.valor.tipoDato.getTipo2()+" el valor no coincide",this.linea,this.columna));
        }
        return null
    }

    public ast(arbol: Arbol) {
        const nombreNodo = `node_${this.linea}_${this.columna}_`
        if(this.valor!=null){arbol.add_ast(`
        ${nombreNodo}[label="Instruccion\\nDeclaracion"];
        ${nombreNodo}2[label="Tipo\\n${this.tipo.getTipo2()}"];
        ${nombreNodo}1[label="Nombre\\n${this.id}"];
        ${nombreNodo}->${nombreNodo}2
        ${nombreNodo}->${nombreNodo}1
        ${nombreNodo}->${this.valor.ast(arbol)}`);}

        else{arbol.add_ast(`
        ${nombreNodo}[label="Instruccion\\nDeclaracion"];
        ${nombreNodo}2[label="Tipo\\n${this.tipo.getTipo2()}"];
        ${nombreNodo}1[label="Nombre\\n${this.id}"];
        ${nombreNodo}->${nombreNodo}2
        ${nombreNodo}->${nombreNodo}1
        
        `)}
        
    }
    
}