import { Instruccion } from "../Abstract/Instruccion";
import Arbol from '../Symbol/Three';
import Simbolo from "../Symbol/Symbol";
import tablaSimbolo from '../Symbol/SymbolTable';
import Tipo, {DataType} from "../Symbol/Type";

const controller = require('../../../../controller/parser/parser');
const errores = require('../Exceptions/Error');

export default class Asignacion extends Instruccion{
    private id:String;
    private valor:Instruccion;
    

    constructor(id: String, valor: Instruccion, linea: number, columna: number){
        super(new Tipo(DataType.INDEFINIDO),linea,columna);
        this.id =id;
        this.valor=valor;
        this.columna=columna;
        this.linea;


    }
    public interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        //console.log(this.id);
        let variableAux=tabla.getValor(this.id);
        let valor=this.valor.interpretar(arbol,tabla)
        let tipoDatoAux=variableAux.tipo;
        //console.log(tipoDatoAux)
        if(variableAux){
            console.log("la variable existe en el sistema");
            let tipo=this.valor.tipoDato;
            console.log(this.tipoDato.getTipo())
            //console.log("la variable existe en el sistema 222222");
            console.log(this.valor.interpretar(arbol, tabla))
            if(tipo.getTipo()==tipoDatoAux.getTipo()){
                console.log("tipos de dato iguales")
                tabla.setValor(this.id, new Simbolo(tipo, this.id, valor));
            }
            else{ console.log("TIPOS DE DATO DISTINTO EN LA ASIGNACION");
            controller.listaErrores.push(new errores.default('Error semantico','Variable y dato distintos',this.linea,this.columna));}

            
        }
        else{ console.log("la variable no existe en el sistema");
        controller.listaErrores.push(new errores.default('Error semantico','Variable no encontrada',this.linea,this.columna));
        }
        //tabla.setValor(this.id, new Simbolo(this.tipo, this.id, this.valor.interpretar(arbol, tabla)));
        //return null

        return null
    }

    public ast(arbol: Arbol) {
        const nombre_nodo =`node_${this.linea}_${this.columna}_`
        arbol.add_ast(`
        ${nombre_nodo}[label="Instruccion\\nAsignacion"];
        ${nombre_nodo}1[label="Nombre\\n${this.id}"];
        ${nombre_nodo}->${nombre_nodo}1;
        ${nombre_nodo}->${this.valor.ast(arbol)}
        `)
        
    }
    

    

}