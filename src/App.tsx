
import { use, useState } from 'react'
import './App.css'

function App() {
  const [passLength, setPassLength] = useState(8);
  const [passSymbols, setPassSymbols] = useState(1);
  const [passNumber, setPasNumbers] = useState(1);
  const [password, setPassword] = useState('');

  const words = ['A','B', 'C', 'D']
  const numbers = ['0', '1', '2', '3', '4', '5', '6','7','8', '9'];
  const symbols = ['@', '$','%', '&', '*'];
  const genPassword = (length: number, sLength: number, numberLength: number) =>{
    setPassword('')
    let listNumber = []
    let listSymbols = []
    for(let i = 0; i< numberLength; i++){
      listNumber.push(numbers[i])
    }

    for(let i = 0; i< sLength; i++){
      listSymbols.push(symbols[i])
    }

    let fullPass = [...words, ...listNumber, ...listSymbols]


    for (let i = 0; i < length; i++){
      let wordIndex = Math.floor(Math.random() * (fullPass.length))
      setPassword((prev)=> prev += fullPass[wordIndex])
    }
  }


  const copyTransferArea = async () =>{
    try{
      await navigator.clipboard.writeText(password)
      alert('Copiado para a área de transferência')
    }catch(err){
      console.log('Erro ao copiar')
    }
  }

  return (
    <>
    <div className='password-box'>
      <h1>Gerador de Senhas</h1>
      <div className="render-pass">
        <input className='copy-pass'value={password} placeholder=' Gere sua senha' type="text" />
        <button onClick={copyTransferArea} >Copiar</button>
      </div>
      <div className="options-box">
        <div className="range-box">
         <label htmlFor="length">Length</label>
         <input type="range" id='length' value={passLength}  onChange={({target})=> setPassLength(parseInt(target.value)) } min={4} max={64} />
         <p>{passLength}</p>
        </div>
      </div>
      <div className="options-box">
        <div className="range-box">
         <label htmlFor="symbols">Symbols</label>
         <input type="range" id='symbols' value={passSymbols}  onChange={({target})=> setPassSymbols(parseInt(target.value)) } min={1} max={9} />
         <p>{passSymbols}</p>
        </div>
      </div>
      <div className="options-box">
        <div className="range-box">
         <label htmlFor="numbers">Numbers</label>
         <input type="range" id='numbers' value={passNumber}  onChange={({target})=> setPasNumbers(parseInt(target.value)) } min={1} max={9} />
         <p>{passNumber}</p>
        </div>
      </div>
      <div className="btn-password">
        <button onClick={() => genPassword(passLength, passNumber, passSymbols)}>
          Gerar Senha
        </button>
      </div>
    </div>
    </>
  )
}

export default App
