'use client';

import Head from 'next/head';
//import style from './layout'
import { useState } from 'react';
import styles from "./index-module.css";


export default function Home() {

  const [count, setCounter] = useState(0);
  const[promptInput, setPromptInput] = useState("")
 
 async function onSubmit(e) {
      e.preventDefault()
      try{
      if(count==10){
        return console.log('you have reached your limit')
      }
      
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({prompt: promptInput})
      });

      const data = await response.json();
      if(response.status !== 200) {
        throw data.error || new Error(`Requst failed with status ${response.status}`);
      }

      setResult(data.result);
      setCounter(count + 1)
      setPromptInput("");
    } catch(error){
      console.error(error);
      alert(error.message);
    }



    }
  
  
  return (
    <>
    <div>
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href='/favicon.ico'/>


    </Head>
    <main>
      <h1> This is our app</h1>
      <img src='/favicon.ico'/>
      <h3>AI-GENERATOR</h3>
      <p> You have used this app {count} times </p>
      <form omSubmit={onSubmit}> 
        <input 
        type='text'
        name = 'search'
        value={promptInput}
        onChange={(e)=>{
          setPromptInput(e.target.value)
          console.log(promptInput)

        }}
        placeholder='Enter your prompt'
        
        />
        <input 
        type='submit'
        value="Generate"
        
          
        />
      </form>
      </main>  
    
    </div>
    </>
           
  )
}
