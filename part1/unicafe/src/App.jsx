import { useState } from 'react'
import Title from './Title'
import Button from './Button'
import Statistics from './Statistics'

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Title text="give feedback" />
      <Button text="good" handler={()=>{setGood(good+1)}}/>
      <Button text="neutral" handler ={()=>{setNeutral(neutral+1)}}/>
      <Button text="bad" handler ={()=>{setBad(bad+1)}}/>
      <Title text="statistics" />
      <Statistics stats={{'good':good,'neutral':neutral,'bad':bad}} />
    </div>
  )
}

export default App