%{
    //codigo js
    const nativo = require('./Expresions/Native');
    const Tipo = require('./Symbol/Type');
    const impresion = require('./Instructions/imprimir');
    const declaracion = require('./Instructions/Declaracion');
    const controller = require('../../../controller/parser/parser')
    const errores = require('./Exceptions/Error')

    const aritmetico=require('./Expresions/Aritmetica');
    const relacional = require('./Expresions/Relacional');
    const logica = require('./Expresions/Logica');
    const asignacion =require('./Instructions/Asignacion');

    
    const Acceso = require('./Expresions/Acceso');
    const ifIns = require('./Instructions/IfIns');
    const mientras = require('./Instructions/Mientras'); 
    const estados = require('./Instructions/Estados'); 
    const IncreDecre = require('./Instructions/IncrementoDecremento'); 
    const IncreDecre2 = require('./Expresions/IncreDecre');
    const ForIns = require('./Instructions/ForIns');

    const HacerMientras = require('./Instructions/HacerMientras');
    const Arreglo = require('./Instructions/Arreglo');
    const ExpresionesArreglo = require('./Expresions/ExpresionesArreglo');

    const ArregloAsignacion = require('./Instructions/ArregloAsignacion');
    const ArregloAccion = require('./Instructions/ArregloAccion');
%}
%lex 

%options case-insensitive 
//inicio analisis lexico
%%


"imprimir"      return 'RESPRINT';

"entero" return 'RESINT';
'cadena' return 'RESSTRING';
'booleano' return 'RESBOOLEANO';
'true'     return 'true';
'false'     return 'false';
'>'     return 'MAYOR';
'<'     return 'MENOR';

'++' return 'MAS_MAS';
'--' return 'MENOS_MENOS';

"||"     return 'OR';
"&&"     return 'AND';

"=" return 'IGUAL';
"+" return 'SUMA';
"*" return 'MULTIPLICACION';





";"             return 'PTCOMA';
","             return 'COMA';
":"             return 'DOSPUNTOS';
"."             return 'PUNTO'
"("             return 'PARABRE';
")"             return 'PARCIERRA';
"{"             return 'LLAVIZQ';
"}"             return 'LLAVDER';
"["             return 'cor_izq';
"]"             return 'cor_der';


"if"            return 'RESIF';
"else"          return 'RESELSE';
"elif"            return 'RESELIF';
"mientras"      return 'RESWHILE';
"do"            return 'RESDO';

"for"           return 'RESFOR';
"length"        return 'length';
"pop"           return 'pop';
"push"           return 'push';

[ \r\t\n]+ {}

\"[^\"]*\"                  { yytext=yytext.substr(1,yyleng-2); return 'CADENA'; }



[0-9]+ return 'ENTERO';
[a-zA-Z]+["_"0-9A-Za-z]* return 'IDENTIFICADOR';
<<EOF>>                     return 'EOF';
.                           return 'INVALID';

/lex

%start INIT
//Inicio
//Definicion de gramatica

%left 'SUMA'
%left 'MULTIPLICACION'
%left 'MAYOR'
%left 'MENOR'
//%left 'OR'
%%

INIT: INSTRUCCIONES EOF     {return $1;}
;

INSTRUCCIONES : INSTRUCCIONES INSTRUCCION {$1.push($2); $$=$1;}
              | INSTRUCCION               {$$=[$1];}
;

INSTRUCCION : IMPRIMIR              {$$=$1;}
            |DECLARACION            {$$=$1;}
            |ASIGNACION             {$$=$1;}
            |WHILEINS               {$$=$1;}
            |DOWHILEINS             {$$=$1;}
            | SIMPLEIF                 {$$=$1;}
            | INCREMENTO_DECREMENTO  {$$=$1;}
            |CICLO_FOR               {$$=$1;}
            |ARRAY_DECLARACION          {$$=$1;}
            |ARRAY_MANEJO             {$$=$1;}
            | INVALID               {controller.listaErrores.push(new errores.default('Error Lexico', $1,@1.first_line, @1.first_column));}
            | error  PTCOMA         {controller.listaErrores.push(new errores.default('Error Sintactico','Se esperaba un token distinto',@1.first_line, @1.first_column));}
;
DECLARACION :
    RESINT IDENTIFICADOR IGUAL EXPRESION PTCOMA {$$=new declaracion.default($2, new Tipo.default(Tipo.DataType.ENTERO), $4, @1.first_line, @1.first_column );}
    |RESSTRING IDENTIFICADOR IGUAL EXPRESION PTCOMA {$$=new declaracion.default($2, new Tipo.default(Tipo.DataType.CADENA), $4, @1.first_line, @1.first_column );}
    |RESBOOLEANO IDENTIFICADOR IGUAL IMPRIMIBLE PTCOMA {$$=new declaracion.default($2, new Tipo.default(Tipo.DataType.BOOLEAN), $4, @1.first_line, @1.first_column );}
;

ASIGNACION :
    IDENTIFICADOR IGUAL EXPRESION PTCOMA {$$=new asignacion.default($1, $3, @2.first_line, @2.first_column );}
    
;

IMPRIMIR : RESPRINT PARABRE EXPRESION PARCIERRA PTCOMA {$$=new impresion.default($3,@2.first_line,@2.first_column);}
;

EXPRESION :
        EXPRESION SUMA EXPRESION {$$= new aritmetico.default(aritmetico.tipoOp.SUMA,$1,$3,@2.first_line, @2.first_column);}
        |EXPRESION MULTIPLICACION EXPRESION {$$= new aritmetico.default(aritmetico.tipoOp.MULTIPLICACION,$1,$3,@2.first_line, @2.first_column);}

        |ENTERO {$$= new nativo.default(new Tipo.default(Tipo.DataType.ENTERO),$1, @1.first_line, @1.first_column);}
        | IDENTIFICADOR {$$= new Acceso.default($1, @1.first_line, @1.first_column);}
        | CADENA {$$= new nativo.default(new Tipo.default(Tipo.DataType.CADENA),$1, @1.first_line, @1.first_column);}
        | true {$$= new nativo.default(new Tipo.default(Tipo.DataType.BOOLEAN),$1, @1.first_line, @1.first_column);}
        | false {$$= new nativo.default(new Tipo.default(Tipo.DataType.BOOLEAN),$1, @1.first_line, @1.first_column);}

        |IDENTIFICADOR MAS_MAS{ $$ = new IncreDecre2.default(IncreDecre.tipoOp.INCREMENTO1,$1, @1.first_line, @1.first_column); }
        |IDENTIFICADOR MENOS_MENOS { $$ = new IncreDecre2.default(IncreDecre.tipoOp.DECREMENTO1,$1, @1.first_line, @1.first_column); }
 
        //para acceder a la inf del vector 
        | IDENTIFICADOR PUNTO length { $$ = new ExpresionesArreglo.default($1,false,false,null, @1.first_line, @1.first_column); }
        | IDENTIFICADOR PUNTO pop { $$ = new ExpresionesArreglo.default($1,true,false,null, @1.first_line, @1.first_column); }
        | IDENTIFICADOR cor_izq EXPRESION cor_der { $$ = new ExpresionesArreglo.default($1,false,true,$3, @1.first_line, @1.first_column); }
        
        //| EXPRESION MAYOR EXPRESION {$$= new relacional.default(relacional.tipoOp.MAYOR,$1,$3,@1.first_line, @1.first_column);}
        //| EXPRESION MENOR EXPRESION {$$= new relacional.default(relacional.tipoOp.MENOR,$1,$3,@1.first_line, @1.first_column);}

        

    

    
;

IMPRIMIBLE:
    EXPRESION {$$=$1;}  
    | EXPRESION_RELACIONAL {$$=$1;}  
    | EXPRESION_LOGICA {$$=$1;}  
;

EXPRESION_RELACIONAL:
    EXPRESION MAYOR EXPRESION {$$= new relacional.default(relacional.tipoOp.MAYOR,$1,$3,@2.first_line, @2.first_column);}
    |EXPRESION MENOR EXPRESION {$$= new relacional.default(relacional.tipoOp.MENOR,$1,$3,@2.first_line, @2.first_column);}
;

EXPRESION_LOGICA:
    EXPRESION_RELACIONAL OR EXPRESION_RELACIONAL {$$= new logica.default(logica.tipoOp.OR,$1,$3,@2.first_line, @2.first_column);}
    |EXPRESION_RELACIONAL AND EXPRESION_RELACIONAL {$$= new logica.default(logica.tipoOp.AND,$1,$3,@2.first_line, @2.first_column);}
;


//ciclo if
//IFINS:
//    SIMPLEIF                {$$ = $1;}  
//    | RESIF PARABRE IMPRIMIBLE PARCIERRA LLAVIZQ BLOQUE LLAVDER  RESELSE LLAVIZQ BLOQUE LLAVDER 
//                            {$$=new ifIns.default($3,$6,undefined,$10,@1.first_line,@1.first_column);}                           
    //| RESIF PARABRE IMPRIMIBLE PARCIERRA LLAVIZQ INSTRUCCIONES LLAVDER ELSEIFSINS RESELSE LLAVIZQ INSTRUCCIONES LLAVDER 
    //                        {$$=new ifIns.default($3,$6,$8,$11,@1.first_line,@1.first_column);} 
//;

SIMPLEIF:
    RESIF PARABRE IMPRIMIBLE PARCIERRA LLAVIZQ BLOQUE LLAVDER ELSEIFSINS
                            {$$=new ifIns.default($3,$6,$8, @1.first_line, @1.first_column);}
    |RESIF PARABRE IMPRIMIBLE PARCIERRA LLAVIZQ BLOQUE LLAVDER 
                            {$$=new ifIns.default($3,$6,undefined, @1.first_line, @1.first_column);}
    
;

ELSEIFSINS :
    RESELSE LLAVIZQ BLOQUE LLAVDER              {$$=$3;}                                          
    //|RESELSE SIMPLEIF                           {$$=$2;}
    |RESELIF PARABRE IMPRIMIBLE PARCIERRA LLAVIZQ BLOQUE LLAVDER ELSEIFSINS
                            {$$=new ifIns.default($3,$6,$8, @1.first_line, @1.first_column);}

                                                 
    
;


//while
WHILEINS:
    RESWHILE PARABRE IMPRIMIBLE PARCIERRA LLAVIZQ BLOQUE LLAVDER
                            {$$ = new mientras.default($3,$6,@1.first_line,@1.first_column)}
;

//do while
DOWHILEINS:
    RESDO LLAVIZQ BLOQUE LLAVDER RESWHILE PARABRE IMPRIMIBLE PARCIERRA 
                            {$$ = new HacerMientras.default($7,$3,@1.first_line,@1.first_column)}
;


//bloque para las instrucciones

BLOQUE
    :  INSTRUCCIONES  { $$ = new estados.default($1 , @1.first_line, @1.first_column); }
    |             { $$ = new estados.default(new Array(), @1.first_line, @1.first_column); }
;

INCREMENTO_DECREMENTO : 
    IDENTIFICADOR MAS_MAS PTCOMA { $$ = new IncreDecre.default(IncreDecre.tipoOp.INCREMENTO1,$1, @1.first_line, @1.first_column); }
    |IDENTIFICADOR MENOS_MENOS PTCOMA { $$ = new IncreDecre.default(IncreDecre.tipoOp.DECREMENTO1,$1, @1.first_line, @1.first_column); }
;

//para el ciclo for  ForIns

CICLO_FOR :
    RESFOR PARABRE DECLARACION  IMPRIMIBLE PTCOMA INCREMENTO_DECREMENTO      PARCIERRA LLAVIZQ     INSTRUCCIONES      LLAVDER
        {$$ = new ForIns.default($3,$4,$6,$9, @1.first_line,@1.first_column)}
;

ARRAY_DECLARACION:
    IDENTIFICADOR DOSPUNTOS RESSTRING cor_izq cor_der IGUAL cor_izq PARAMETROS_FUNCION_LLAMADA cor_der
    {$$ = new Arreglo.default($1,new Tipo.default(Tipo.DataType.CADENA),$8,[], @1.first_line,@1.first_column)}
;

PARAMETROS_FUNCION_LLAMADA :
        PARAMETROS_FUNCION_LLAMADA COMA EXPRESION 
            {    $1.push($3);    $$ = $1;   }
        |EXPRESION
            {    $$ = [$1];                 }
;


ARRAY_MANEJO:
    IDENTIFICADOR PUNTO push PARABRE EXPRESION PARCIERRA
        {$$ = new ArregloAccion.default($1,$5, true, false, @1.first_line,@1.first_column)}

    |IDENTIFICADOR PUNTO pop PARABRE PARCIERRA PTCOMA
        {$$ = new ArregloAccion.default($1,null, false, true, @1.first_line,@1.first_column)}
    |IDENTIFICADOR  IGUAL cor_izq PARAMETROS_FUNCION_LLAMADA cor_der PTCOMA
        {$$ = new ArregloAsignacion.default($1,$4, null, null, @1.first_line,@1.first_column)}
    |IDENTIFICADOR cor_izq EXPRESION cor_der IGUAL EXPRESION PTCOMA
    {$$ = new ArregloAsignacion.default($1,null, $3, $6, @1.first_line,@1.first_column)}
;