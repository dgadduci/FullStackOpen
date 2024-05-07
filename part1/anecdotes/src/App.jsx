import { useState } from 'react'
import Button from './Button'
import Title from './Title'
import Anecdote from './Anecdote'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [appState, setAppState] = useState({'selected':0,'points':{}})

  const generateAnecdote = () =>{
    let randomNumber = Math.floor(Math.random() * anecdotes.length);
    setAppState({...appState, 'selected':randomNumber});
  }

  const voteAnecdote = ()=>{
    const copyPoints = {...appState.points};
    if(isNaN(copyPoints[appState.selected])){
      copyPoints[appState.selected] =0;
    }
    copyPoints[appState.selected] = copyPoints[appState.selected]+1;
    //short method:
    // copyPoints[appState.selected] = isNaN(copyPoints[appState.selected]) ? 0 :copyPoints[appState.selected]+1;
    setAppState({...appState, 'points':copyPoints});
  }

  const theWinner = ()=>{
    let winner;
    let max=0;
    for(let key in appState.points){
      if(appState.points[key] > max){
        max = appState.points[key];
        winner =key;
      }
    }
    return anecdotes[winner];
  }

  return (
    <div>
      <Title text="Anecdote of the day" />
      <Anecdote text={anecdotes[appState.selected]} />
      <Button text="Next anecdote" handler = {generateAnecdote}/>
      <Button text="Vote" handler ={voteAnecdote}/>
      <Title text="Anecdote with most votes" />
      <Anecdote text = {theWinner()} />
    </div>
  )
}

export default App
