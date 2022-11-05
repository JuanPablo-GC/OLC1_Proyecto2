import { Instruccion } from "../Abstract/Instruccion";
import Arbol from '../Symbol/Three';
import Simbolo from "../Symbol/Symbol";
import tablaSimbolo from '../Symbol/SymbolTable';
import Tipo, {DataType} from "../Symbol/Type";

const controller = require('../../../../controller/parser/parser');
const errores = require('../Exceptions/Error');

export default class Casteo extends Instruccion{
    private tipo1:Tipo;
    private id:String;
    private tipo2:Tipo;
    private valor:Instruccion;
    

    constructor(tipo1: Tipo,id: String, tipo2: Tipo, valor: Instruccion, linea: number, columna: number){
        super(new Tipo(DataType.INDEFINIDO),linea,columna);
        this.tipo1=tipo1;
        this.id =id;
        this.tipo2=tipo2;
        this.valor=valor;
        this.columna=columna;
        this.linea;


    }
    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        //console.log("LLEGA AL CASTEOOOOOOOOOOOO")
        let variableAux=tabla.getValor(this.id);
        if(variableAux){ controller.listaErrores.push(new errores.default('Error semantico','La Variable: '+this.id.toString()+' ya esta en el sistema',this.linea,this.columna));
                    return null}
        //console.log(this.tipo1)            
        else if(this.tipo1.getTipo()==this.tipo2.getTipo()){
            //console.log("LLEGA AL CASTEOOOOOOOOOOOO y son iguales los tipos")
            let valor=this.valor.interpretar(arbol,tabla)
            //console.log(valor)
            if(this.tipo1.getTipo()==0){
                //si el valor es booleano 
                if(valor==true){tabla.setValor(this.id, new Simbolo(this.tipo1, this.id,1)); return}
                else if(valor==false){tabla.setValor(this.id, new Simbolo(this.tipo1, this.id,0)); return}
                tabla.setValor(this.id, new Simbolo(this.tipo1, this.id,parseInt(valor)));
            }
            //se trasforma a cadena
            else if(this.tipo1.getTipo()==1){
                tabla.setValor(this.id, new Simbolo(this.tipo1, this.id,(valor).toString()));
            }
            else if(this.tipo1.getTipo()==2){
                tabla.setValor(this.id, new Simbolo(this.tipo1, this.id,!!(parseInt(valor))));
            }
            else if(this.tipo1.getTipo()==3){
                let letra=((valor).toString())
                tabla.setValor(this.id, new Simbolo(this.tipo1, this.id,letra[0]));
            }
            return
        }
        controller.listaErrores.push(new errores.default('Error semantico','tipos de dato distinto en el casteo',this.linea,this.columna));
        return null
    }

    public ast(arbol: Arbol) {
        const nombreNodo = `node_${this.linea}_${this.columna}_`
        arbol.add_ast(`
        ${nombreNodo}[label="Instruccion\\nCasteo"];
        ${nombreNodo}2[label="Tipo\\n${this.tipo1.getTipo2()}"];
        ${nombreNodo}1[label="Nombre\\n${this.id}"];
        ${nombreNodo}->${nombreNodo}2
        ${nombreNodo}->${nombreNodo}1
        ${nombreNodo}->${this.valor.ast(arbol)}`);

        
    }
    
}