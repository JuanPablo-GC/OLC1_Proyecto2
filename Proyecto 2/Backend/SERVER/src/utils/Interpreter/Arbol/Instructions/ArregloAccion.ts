import { Instruccion } from "../Abstract/Instruccion";
import Arbol from '../Symbol/Three';
import Simbolo from "../Symbol/Symbol";
import tablaSimbolo from '../Symbol/SymbolTable';
import Tipo, {DataType} from "../Symbol/Type";

const controller = require('../../../../controller/parser/parser');
const errores = require('../Exceptions/Error');

export default class ArregloAccion extends Instruccion{ 
    private id: string;
    private expresion: Instruccion;
    private push: boolean;
    private pop: boolean;

    

    constructor(id: string, expresion: Instruccion, push: boolean, pop: boolean, linea: number, columna: number){
        super(new Tipo(DataType.INDEFINIDO),linea,columna);
        this.id =id;
        this.expresion=expresion;
        this.push=push;
        this.pop=pop;
        this.columna=columna;
        this.linea;

    }
    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        //se buca el arreglo en la tavla 
        let objeto=tabla.getValorArreglo(this.id)

        //si no lo encutra error semantico y return
        if(!objeto){controller.listaErrores.push(new errores.default('Error semantico','EL Vector no existe',this.linea,this.columna)); return }

        var Array=objeto.contenido as Array<any>

        if(this.pop==true){
            // se realiza solo el pop
            Array.pop();

        }else{
            var aux=this.expresion.interpretar(arbol,tabla)
                if(this.expresion.tipoDato.getTipo()!=objeto.tipo.getTipo()){
                    controller.listaErrores.push(new errores.default('Error semantico','El tipo de vector es distinto al tipo de la asignacion',this.linea,this.columna)); 
                    return;  
                }
                Array.push(aux)
            }
            
            objeto.contenido=Array;
            //console.log(objeto.contenido)
            
            
            tabla.guardar_arreglo(this.id, objeto)
    }//console.log(objeto.contenido)
    

    

    
    public ast(arbol: Arbol) {
        const name_node = `node_${this.linea}_${this.columna}_`
        const name = this.push ? "push" : "pop"
        arbol.add_ast(`
        ${name_node}[label="Instruccion \\n ${this.id+"."+name}"];
        `)
        if (this.push) {
            arbol.add_ast(`
            ${name_node}[label="Instruccion \\n ${this.id+"."+name}"];
            ${name_node}->${this.expresion.ast(arbol)}
            `)
        }
    
}
}