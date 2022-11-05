import { Instruccion } from "../Abstract/Instruccion";
import Arbol from '../Symbol/Three';
import Simbolo from "../Symbol/Symbol";
import tablaSimbolo from '../Symbol/SymbolTable';
import Tipo, {DataType} from "../Symbol/Type";

const controller = require('../../../../controller/parser/parser');
const errores = require('../Exceptions/Error');

export default class Arreglo extends Instruccion{
    private tam: number; 
    
    private id: string;
    private arrayInstruccion: Array<Instruccion>
    private tipo: Tipo
    public contenido:Array<any>;
    

    constructor(id: string, tipo: Tipo, arrayInstruccion: Array<Instruccion>,contenido:Array<any>, linea: number, columna: number){
        super(new Tipo(DataType.INDEFINIDO),linea,columna);
        this.id =id;
        this.tipo=tipo;
        this.arrayInstruccion=arrayInstruccion;
        this.contenido=contenido;
        this.columna=columna;
        this.linea;

        this.tam=-1;


    }
    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        if(this.arrayInstruccion){this.arrayInstruccion.forEach(element => {
            const expre = element.interpretar(arbol,tabla);
            //if (expre.type != get_num(this.tipo)) throw new error("Semantico", `Tipo no valido, el contenido de este array tiene que ser tipo [${this.tipo}] `, this.line, this.column)
            this.contenido.push(expre)
            this.tam = this.arrayInstruccion.length
        })}
        //if (!env.guardar_arreglo(this.id, this)) throw new error("Semantico", `Este nombre {${this.id}} ya existe en este ambito`, this.line, this.column)
        tabla.guardar_arreglo(this.id,this)
        }
    

    public ast(arbol: Arbol) {
        const name_node = `node_${this.linea}_${this.columna}_`
        arbol.add_ast(`
        ${name_node}[label="Instruccion\\nDeclaracion de Vector "];
        ${name_node}1[label="Nombre\\n${this.id}"];
        ${name_node}2[label="Tipo\\n${this.tipo.getTipo2()}"];
        ${name_node}3[label="Contenido"];
        ${name_node}->${name_node}1;
        ${name_node}->${name_node}2;
        ${name_node}->${name_node}3;
        `)
        //guarda los valores del la lista
        if(this.arrayInstruccion){this.arrayInstruccion.forEach(element => {
            arbol.add_ast(`
            ${name_node}3->${element.ast(arbol)}
            `)
        
        })}
    }
    
}