import { Instruccion } from "../Abstract/Instruccion";
import Arbol from '../Symbol/Three';
import Simbolo from "../Symbol/Symbol";
import tablaSimbolo from '../Symbol/SymbolTable';
import Tipo, {DataType} from "../Symbol/Type";

const controller = require('../../../../controller/parser/parser');
const errores = require('../Exceptions/Error');

export default class ArregloAsignacion extends Instruccion{ 
    private id: string;
    private Array: Array<Instruccion>;
    private expresionPosicion: Instruccion;
    private expresionValor: Instruccion;

    

    constructor(id: string, Array: Array<Instruccion>, expresionPosicion: Instruccion, expresionValor: Instruccion, linea: number, columna: number){
        super(new Tipo(DataType.INDEFINIDO),linea,columna);
        this.id =id;
        this.Array=Array;
        this.expresionPosicion=expresionPosicion;
        this.expresionValor=expresionValor;
        this.columna=columna;
        this.linea;

    }
    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        //se buca el arreglo en la tavla 
        let objeto=tabla.getValorArreglo(this.id)

        //si no lo encutra error semantico y return
        if(!objeto){controller.listaErrores.push(new errores.default('Error semantico','EL Vector no existe',this.linea,this.columna)); return }

        var Array=objeto.contenido as Array<any>

        if(this.Array==null){
            // se asigna un valor a una posicion
            let exprePosicion= this.expresionPosicion.interpretar(arbol, tabla)
            let espreValor=this.expresionValor.interpretar(arbol, tabla)
            //console.log("POSICION DEL VECTOR")
        
            // si la poscion no existe en el caso de que sea una variable 
            if(!exprePosicion){ controller.listaErrores.push(new errores.default('Error semantico','La posicion del vector no existe',this.linea,this.columna)); 
            return;  }
            //si es index no es tipo numerica
            if(this.expresionPosicion.tipoDato.getTipo()!=0){
                controller.listaErrores.push(new errores.default('Error semantico','La posicion del vector no es Entero',this.linea,this.columna)); 
                return;    
            }
            console.log(objeto.tipo.getTipo())
            if(objeto.tipo.getTipo()!=this.expresionValor.tipoDato.getTipo()){
                controller.listaErrores.push(new errores.default('Error semantico','El tipo de vector es distinto al tipo de la asignacion',this.linea,this.columna)); 
                return;  
            }
            Array[exprePosicion]=espreValor;

        }else{
            var aux:Array<any>=[]
            this.Array.forEach(Element =>{
                let x=Element.interpretar(arbol,tabla)
                if(Element.tipoDato.getTipo()!=objeto.tipo.getTipo()){
                    controller.listaErrores.push(new errores.default('Error semantico','El tipo de vector es distinto al tipo de la asignacion',this.linea,this.columna)); 
                    return;  
                }
                aux.push(x)
            })
            
            objeto.contenido=aux;
            //console.log(objeto.contenido)
            
            
            tabla.guardar_arreglo(this.id, objeto)
        }//console.log(objeto.contenido)
    

    }

    
    public ast(arbol: Arbol) {
        const name_node = `node_${this.linea}_${this.columna}_`
        if (this.Array == null) {
            arbol.add_ast(`
            ${name_node}[label="Instruccion\\nAsignacion de Vector"];
            ${name_node}1[label="Indice"];
            ${name_node}2[label="Asignar"];
            ${name_node}->${name_node}1;
            ${name_node}->${name_node}2;
            ${name_node}1->${this.expresionPosicion.ast(arbol)}
            ${name_node}2->${this.expresionValor.ast(arbol)}
            `)
        } else {
            arbol.add_ast(`
            ${name_node}[label="Instruccion\\nVector signacion"];
            `)
            this.Array.forEach(element => {
                arbol.add_ast(`
                ${name_node}->${element.ast(arbol)}
                `)
            });
    }
    
}
}