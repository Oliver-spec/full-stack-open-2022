import { useState } from 'react'

const ShowRating = ({good, neutral, bad}) => (
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
  </>
)

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
      <ShowRating
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </>
  )
    
}

export default App
