import './App.css';
import {useState} from 'react';


function App() {
  const [pantalla, setPantalla] = useState('0');
  const [aux, setAux] = useState('');

  const manejoNumeros = (e)=>{
    const numero = e.target.textContent;

    if(pantalla === '0' || pantalla==='NAN'){
      setPantalla(numero);
      setAux(numero);
    }else if(pantalla.includes('.')){
      console.log('soy el if de los puntos')
      setPantalla(pantalla + numero);
      setAux(aux + numero);
    }else{
      console.log('Soy el ultimo else')
      setPantalla(numero);
      setAux(aux + numero);
    }
    
  }

  const manejoOperaciones = (e)=>{
    const operador = e.target.textContent;

    if(aux.includes('=')){
      setAux(pantalla + ' '+ operador+' ');
      setPantalla(operador);
    }else{
      if(aux.length>0){
        console.log('Soy el primer if de operadores')
        setAux(aux + ' ' + operador + ' ');
        setPantalla(operador);
      }else if(operador==='-'){
        console.log('Soy el if del signo menos')
        setAux(aux + ' ' + operador + ' ');
        setPantalla(operador);
      }else{
        console.log('Soy el ultimo else de los operadores')
        setAux('=NAN');
        setPantalla('NAN');
      }
    }
    
  }

  const manejoIgual = () =>{
    const lastAux= aux[aux.length-1];

    if(pantalla[0]==='+' || pantalla[0]==='-' || pantalla[0]==='/' || pantalla[0]==='*'){
      setAux('=NAN');
      setPantalla('NAN');
    }else if(pantalla === '/' || pantalla === '*' || pantalla === '+' || pantalla === '-' || pantalla === '0' || pantalla==='NAN'){
      setAux('=NAN');
      setPantalla('NAN');
    }else if(pantalla[pantalla.length-1] === '.' && lastAux==='.'){
      setPantalla('0');
      setAux(pantalla[0] + '=' + pantalla[0]);
      
    }else{
      setPantalla(eval(aux));
      setAux(aux + ' = ' + eval(aux));
    }

  }

  const manejoDecimal = ()=>{
    const array = pantalla.split(' ');
    const lastElement = array[array.length-1];

    if(!lastElement.includes('.')){
      setPantalla(pantalla + '.');
      setAux(aux + '.')
    }
  }

  const limpiarPantalla=()=>{
    setPantalla('0');
    setAux('0');
  }

  const numeros =[
    {
      id:'zero',
      texto:'0',
      funcion:manejoNumeros
    },
    {
      id:'one',
      texto:'1',
      funcion:manejoNumeros
    },
    {
      id:'two',
      texto:'2',
      funcion:manejoNumeros
    },
    {
      id:'three',
      texto:'3',
      funcion:manejoNumeros
    },
    {
      id:'four',
      texto:'4',
      funcion:manejoNumeros
    },
    {
      id:'five',
      texto:'5',
      funcion:manejoNumeros
    },
    {
      id:'six',
      texto:'6',
      funcion:manejoNumeros
    },
    {
      id:'seven',
      texto:'7',
      funcion:manejoNumeros
    },
    {
      id:'eight',
      texto:'8',
      funcion:manejoNumeros
    },
    {
      id:'nine',
      texto:'9',
      funcion:manejoNumeros
    },
    {
      id:'equals',
      texto:'=',
      funcion:manejoIgual
    },
    {
      id:'add',
      texto:'+',
      funcion:manejoOperaciones
    },
    {
      id:'subtract',
      texto:'-',
      funcion:manejoOperaciones
    },
    {
      id:'multiply',
      texto:'*',
      funcion:manejoOperaciones
    },
    {
      id:'divide',
      texto:'/',
      funcion:manejoOperaciones
    },
    {
      id:'decimal',
      texto:'.',
      funcion: manejoDecimal
    },
    {
      id:'clear',
      texto:'AC',
      funcion: limpiarPantalla
    }
    
  ];

  return (
    <div className="App">
      <h1>LA CALCULADORA HECHA CON MENOS GANAS</h1>
      <div className='content__pantalla'>
        <input id="display" className='pantalla_aux' type='text' defaultValue={aux}/>
        <div className='pantalla' dangerouslySetInnerHTML={{__html:pantalla}}/>
      </div>

      <div className='content__botones'>
        {
          numeros.map(num => <button className='botones' key={num.id} onClick={num.funcion} id={num.id}>{num.texto}</button>)
        }
      </div>
    </div>
  );
}

export default App;
