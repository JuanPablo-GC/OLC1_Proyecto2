import { Instruccion } from "../Abstract/Instruccion";
import Arbol from '../Symbol/Three';
import tablaSimbolo from '../Symbol/SymbolTable';
import Tipo, {DataType} from "../Symbol/Type";

const controller = require('../../../../controller/parser/parser');
const errores = require('../Exceptions/Error');

export default class Metodo extends Instruccion{
    private id: string;
    public parametros: Array<String>
    private Instrucciones: Instruccion
    private tipo: string
    
    

    constructor(id: string,  parametros: Array<String>,Instrucciones:Instruccion,tipo: string, linea: number, columna: number){
        super(new Tipo(DataType.INDEFINIDO),linea,columna);
        this.id =id;
        this.parametros=parametros;
        this.Instrucciones=Instrucciones;
        this.tipo=tipo;
        this.columna=columna;
        this.linea;



    }
    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        //console.log(this.parametros)
            
        }
    

    public ast(arbol: Arbol) {

        const nombre_nodo=`node_${this.linea}_${this.columna}_`
        arbol.add_ast(`
        ${nombre_nodo};
        ${nombre_nodo} [label="Instruccion\\nMetodo"];
        ${nombre_nodo}1[label="Nombre\\n${this.id}"];
        ${nombre_nodo}2[label="Parametros"];
        ${nombre_nodo}->${nombre_nodo}1;
        ${nombre_nodo}->${nombre_nodo}2;
        ${nombre_nodo}->node_${this.Instrucciones.linea}_${this.Instrucciones.columna}_;
        `)
        this.Instrucciones.ast(arbol);
        //grafica cada uno de los parametros 
        let tmp = 5 
        this.parametros.forEach(x => {
            arbol.add_ast(`
            ${nombre_nodo}${tmp}[label="Tipo,Nombre\\n${x}"];
            ${nombre_nodo}2->${nombre_nodo}${tmp};
            `)
            
            tmp++
        })
    }
    
}