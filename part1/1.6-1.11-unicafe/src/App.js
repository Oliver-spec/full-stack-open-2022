import { useState } from 'react'

// compontents are here
const Button = ({text, onClick}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const StatisticsLine = ({text, value}) => (
  <tr>
    <td>
        {text} {value}
    </td>
  </tr>
)

const Statistics = ({good, neutral, bad, all, avg, positive}) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <p>
        No feedback given
      </p>
    )
  } else {
    return (
      <table>
        <StatisticsLine
          text='good'
          value={good}
        />
        <StatisticsLine
          text='neutral'
          value={neutral}
        />
        <StatisticsLine
          text='bad'
          value={bad}
        />
        <StatisticsLine
          text='all'
          value={all}
        />
        <StatisticsLine
          text='avg'
          value={avg}
        />
        <StatisticsLine
          text='positive'
          value={positive + ' %'}
        />
      </table>
    )
  }
}

const App = () => {

  // states are here
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // event handlers are here
  const rateGood = () => setGood(good + 1)
  const rateNeutral = () => setNeutral(neutral + 1)
  const rateBad = () => setBad(bad + 1)

  return (
    <>
      <h1>
        give feedback
      </h1>
      <Button
        text='good'
        onClick={rateGood}
      />
      <Button
        text='neutral'
        onClick={rateNeutral}
      />
      <Button
        text='bad'
        onClick={rateBad}
      />
      <h1>
        statistics
      </h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={good + neutral + bad}
        avg={(good - bad) / (good + neutral + bad)}
        positive={good / (good + neutral + bad) * 100}
      />
    </>
  )
}

export default App
