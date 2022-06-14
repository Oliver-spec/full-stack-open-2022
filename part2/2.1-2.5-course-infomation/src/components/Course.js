const Sum = ({parts}) => {
  const exercises = parts.map(part => part.exercises)
  const total = exercises.reduce((total, currentVal) => total + currentVal, 0)
  return (
    <b>
      total of {total} exercises
    </b>
  )
}

const Part = ({part}) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Content = ({parts}) => {
  return (
    <>
      {parts.map(part => <Part key={part.id} part={part} />)}
      <Sum parts={parts}/>
    </>
  )
}

const Header = ({course}) => {
  return (
    <h1>
      {course.name}
    </h1>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
    </div>
  )
}

export default Course
