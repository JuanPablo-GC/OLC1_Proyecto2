import { Instruccion } from "../Abstract/Instruccion";
import Arbol from '../Symbol/Three';
import Simbolo from "../Symbol/Symbol";
import tablaSimbolo from '../Symbol/SymbolTable';
import Tipo, {DataType} from "../Symbol/Type";

const controller = require('../../../../controller/parser/parser');
const errores = require('../Exceptions/Error');

export default class ExpresionesArreglo extends Instruccion{ 
    private id: string;
    private condicionPop: boolean;
    private condicionAsignacion: boolean;
    private expresion: Instruccion;

    

    constructor(id: string, condicionPop: boolean, condicionAsignacion: boolean,expresion: Instruccion, linea: number, columna: number){
        super(new Tipo(DataType.INDEFINIDO),linea,columna);
        this.id =id;
        this.condicionPop=condicionPop;
        this.condicionAsignacion=condicionAsignacion;
        this.expresion=expresion;
        this.columna=columna;
        this.linea;

    }
    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        
        let objeto=tabla.getValorArreglo(this.id)
        //console.log("LLEGO AL BUSCAR EL ARREGLO")
        //si no lo encutra error semantico y return
        if(!objeto){controller.listaErrores.push(new errores.default('Error semantico','EL Vector no existe',this.linea,this.columna)); return }

        var Array=objeto.contenido as Array<any>

        if(this.condicionAsignacion==true){
            console.log("SE HIZO la asignacion ")
            let expre= this.expresion.interpretar(arbol, tabla)

            if(objeto.tipo.getTipo()==1){
                this.tipoDato.setTipo(DataType.CADENA);
                return Array[expre] ;
            }

        }
        
        if(this.condicionPop==true){
            //console.log(Array)
            //onsole.log("SE HIZO EL POP asd")
            let pop=Array.pop();
            //console.log(Array)
            //objeto.contenido=Array;
            tabla.guardar_arreglo(this.id, objeto)
            //console.log(objeto.contenido)
            if(objeto.tipo.getTipo()==1){
                this.tipoDato.setTipo(DataType.CADENA);
                return pop ;
            }
            
        }

        else{
            this.tipoDato.setTipo(DataType.ENTERO);
            return Array.length ;
        }

    }

    
    public ast(arbol: Arbol) {
        const name_nodo = `node_${this.linea}_${this.columna}_`
        
        if(this.condicionAsignacion){
            return `
            ${name_nodo};
            ${name_nodo}[label="Vector\\n ${this.id}"];
            ${name_nodo}
            ${name_nodo}->${this.expresion.ast(arbol)}
            `
        }
        if(this.condicionPop){
            return`
            ${name_nodo};
            ${name_nodo}[label="${this.id}\\n<\\Vector pop\\> "];
            `
        }else{
            return `
            ${name_nodo};
            ${name_nodo}[label="${this.id}\\n<\\Vector length\\> "];
            `

        }
    }
    
}