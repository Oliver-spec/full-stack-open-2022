import { useState } from 'react'

const Statistics = ({good, neutral, bad, all, avg, positive}) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <p>
        No feedback given
      </p>
    )
  } else {
    return (
      <>
        <p>
          good {good}
        </p>
        <p>
          neutral {neutral}
        </p>
        <p>
          bad {bad}
        </p>
        <p>
          all {all}
        </p>
        <p>
          average {avg}
        </p>
        <p>
          positive {positive}%
        </p>
      </>
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
      <button onClick={rateGood}>
        good
      </button>
      <button onClick={rateNeutral}>
        neutral
      </button>
      <button onClick={rateBad}>
        bad
      </button>
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
