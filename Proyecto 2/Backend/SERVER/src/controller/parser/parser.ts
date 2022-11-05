import { Response, Request } from "express";
import Errores from '../../utils/Interpreter/Arbol/Exceptions/Error';
import Three from "../../utils/Interpreter/Arbol/Symbol/Three";
import SymbolTable from "../../utils/Interpreter/Arbol/Symbol/SymbolTable";
import { Instruccion } from "../../utils/Interpreter/Arbol/Abstract/Instruccion";

/*
import { Response, Request } from "express";

import { Permanencia } from "../../utils/Compilador/Permanencia/Permanencia";
import { exec } from "child_process";
import { Ambiente } from "../../utils/Compilador/Simbolo/Ambiente";

const parser = require('../../utils/Compilador/Grammar');
*/

export let listaErrores: Array<Errores> = [];
export const parse = (req: Request & unknown, res: Response): void => {
    /*//listaErrores = new Array<Errores>();
    //let parser = require('../../utils/Interpreter/Arbol/analizador');
    const { peticion } = req.body;

    try { 
      
        
        console.log("ALVVVVVVV 1");
        const ast = parser.parse(peticion.toString());
        console.log("ALVVVVVVV 2");
        const env = new Ambiente(null);                     
        const s= Permanencia.getInstance();

        s.add_ast(`nodeOriginal[label="<\\Lista_Instrucciones\\>"];`)
        
        //generar el ast primero
        for (const instr of ast) {
            try {
                instr.ast();
                s.add_ast(`nodeOriginal->node_${instr.line}_${instr.column}_;`)
            } catch (error) {
            }
        }
        
        //recorrer las instrucciones y ejecutarlas
        for (const instruccion of ast) {
            try {
                instruccion.execute(env);
            } catch (error) {
                s.add_error(error)
            }
        }

        
        let consola=s.get_consola();
        
        let arbol="digraph G {\nnode[shape=box];" + s.get_ast() + "\n}";
        
        res.json({ consola: consola, errores: arbol});
    

      
      
    } catch (err) {
        //console.log(err)
        res.json({ consola: '', error: err, errores: "", simbolos: [] });
    }*/ 
    listaErrores = new Array<Errores>();
    let parser = require('../../utils/Interpreter/Arbol/analizador');
    const { peticion } = req.body;

    try { 
      let ast = new Three(parser.parse(peticion));
      var tabla = new SymbolTable();
      ast.settablaGlobal(tabla);

      ast.add_ast(`nodeOriginal[label="Listado Instrucciones"];`)

      //generar el ast primero
      for (const instr of ast.getinstrucciones()) {
          try {
              instr.ast(ast);
              ast.add_ast(`nodeOriginal->node_${instr.linea}_${instr.columna}_;`)
          } catch (error) {          
          }
      }
      let CodigoGraphviz=("digraph G {bgcolor=\"none\" \n" + ast.get_ast() + "\n}")
      //console.log(CodigoGraphviz);

      for (let i of ast.getinstrucciones()) {
        if (i instanceof Errores) {
          console.log("ENTRO AL IF DEL ERROR")
          listaErrores.push(i);
          //ast.actualizaConsola((<Errores>i).returnError());
        }

        var resultador = i instanceof Instruccion ?  i.interpretar(ast, tabla) : console.log("Error encontrado");
        if (resultador instanceof Errores) {
          listaErrores.push(resultador);
          //ast.actualizaConsola((<Errores>resultador).returnError());
        }        
      }

      for (let er in listaErrores){
        ast.actualizaConsola(listaErrores[er].returnError())
      }

      let TablaHTML=CrearTabla();




       /*let tablaejemplo=ast.gettablaGlobal()
       console.log(tablaejemplo)

       console.log("VARIABLES DEL SISTEMAMAAAAA")
       for (let entry of tablaejemplo.getTabla()) {
        let mapKey = entry[0];
        let mapValue = entry[1];
        console.log(`Map key is:${mapKey} and value is:${mapValue.getvalor()}`);
    }
    console.log("VECTORES DEL SISTEMAAAAAA")
    for (let entry of tablaejemplo.getTablaArreglo()) {
      let mapKey = entry[0];
      let mapValue = entry[1];
      console.log(`Map key is:${mapKey} and value is:${mapValue.contenido}`);
  }*/
  console.log("TABLA DE SIMBOLOSSSS CODIGO")
     let tablaSimbolos=CrearTablaSimbolos(ast.gettablaGlobal());
     //console.log(tablaSimbolos)
     

      res.json({ consola: ast.getconsola(), errores: TablaHTML, simbolos: tablaSimbolos, graphviz: CodigoGraphviz});
    } catch (err) {
        console.log(err)
        res.json({ consola: '', error: err, errores: listaErrores, simbolos: [] });
    }
    

}


//crear codigo html para la tabla de errores
function CrearTabla(){
  var CodigoHTML='<table style="border-collapse: collapse; width: 100%;" border="1">'+
'<tbody>'+
'<tr>'+
'<td style="text-align: center;"><strong>TIPO DE ERROR</strong></td>'+
'<td style="text-align: center;"><strong>DESCRIPCION</strong></td>'+
'<td style="text-align: center;"><strong>FILA</strong></td>'+
'<td style="text-align: center;"><strong>COLUMNA</strong></td>'+
'</tr>';
 for (let er in listaErrores){
    CodigoHTML+=(listaErrores[er].returTabla())
  }
  CodigoHTML+='</tbody>'+
  '</table>';
  return CodigoHTML;
}

function CrearTablaSimbolos(a:any){
  var CodigoHTML='<table style="border-collapse: collapse; width: 100%;" border="1">'+
  '<tbody>'+
  '<tr>'+
  '<td style="text-align: center;"><strong>NOMBRE</strong></td>'+
  '<td style="text-align: center;"><strong>TIPO</strong></td>'+
  '<td style="text-align: center;"><strong>VALOR</strong></td>'+
  '<td style="text-align: center;"><strong>FILA</strong></td>'+
  '<td style="text-align: center;"><strong>COLUMNA</strong></td>'+
  '</tr>';
        
  
      let tablaejemplo=a
       console.log(tablaejemplo)

       console.log("VARIABLES DEL SISTEMAMAAAAA")
       for (let entry of tablaejemplo.getTabla()) {
        let nombre = entry[0];
        let valor = entry[1].getvalor();
        let tipo= entry[1].tipo.getTipo2()
        console.log(`variable:${nombre} de tipo: ${tipo} con valor:${valor}`);
        CodigoHTML+='<tr>'+
                    '<td>' +nombre +'</td>\n' +
                    '<td>'+tipo +'</td>\n' +
                    '<td>'+valor+'</td>\n' +
  
                    '</tr>'

    }
    CodigoHTML+='<tr><td>'+"VECTORES"+'</td></tr>\n'
    console.log("VECTORES DEL SISTEMAAAAAA")
    for (let entry of tablaejemplo.getTablaArreglo()) {
      let nombre = entry[0];
      let valor = entry[1].contenido;
      let tipo= entry[1].tipo.getTipo2()
      let fila= entry[1].linea
      let columna= entry[1].columna
      console.log(`Nombre del vector:${nombre} and value is:${valor}`);
      CodigoHTML+='<tr>'+
                    '<td>' +nombre +'</td>\n' +
                    '<td>'+tipo +'</td>\n' +
                    '<td>'+valor+'</td>\n' +
                    '<td>'+fila+'</td>\n' +
                    '<td>'+columna+'</td>\n' +
                    '</tr>'
  }

  CodigoHTML+='</tbody>'+
  '</table>';
  return CodigoHTML;

}