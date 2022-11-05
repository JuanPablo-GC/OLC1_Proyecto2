import { Instruccion } from "../Abstract/Instruccion";
import Arbol from '../Symbol/Three';
import tablaSimbolo from '../Symbol/SymbolTable';
import Tipo, {DataType} from '../Symbol/Type';

const controller = require('../../../../controller/parser/parser');
const errores = require('../Exceptions/Error');


export default class Acceso extends Instruccion {
  id: String;

  constructor(id: String, fila: number, columna: number) {
    super(new Tipo(DataType.INDEFINIDO),fila, columna);
    this.id = id;
  }

  interpretar(arbol: Arbol, tabla: tablaSimbolo) {
    const value=tabla.getValor(this.id);
    if(!value){
      controller.listaErrores.push(new errores.default('Error semantico','La variable no existe en el sistema',this.linea,this.columna)); 
      return null
    }
    
    //console.log("ESPACIOOOOOOOOOOO A VER EL VALOR DE LA VARIABLE")
    let tipoDato=value.tipo.getTipo();
    let a=value.getvalor();
    //console.log("VALOR DE LA VARIABLE: "+a);
    if(value && tipoDato==0){
        this.tipoDato.setTipo(DataType.ENTERO);
        return a;
    }
    if(value && tipoDato==1){
      this.tipoDato.setTipo(DataType.CADENA);
      return a;
    }
    if(value && tipoDato==2){
      this.tipoDato.setTipo(DataType.BOOLEAN);
      return a;
    }
    if(value && tipoDato==3){
      this.tipoDato.setTipo(DataType.CARACTER);
      return a;
    }
    if(value && tipoDato==4){
      this.tipoDato.setTipo(DataType.DECIMAL);
      return a;
    }
    return null;
  
    
  }
 //para crear el arbol ast 
  public ast(arbol: Arbol) {
    const name_nodo = `node_${this.linea}_${this.columna}_`
    return `
    ${name_nodo};
    ${name_nodo}[label="${this.id}"];
    `
}
}