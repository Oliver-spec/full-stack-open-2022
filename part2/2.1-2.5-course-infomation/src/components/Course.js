const Sum = ({parts}) => {
  const exercises = parts.map(part => part.exercises)
  const total = exercises.reduce((total, currentVal) => total + currentVal, 0)
  return (
    <b>
      total of {total} exercises
    </b>
  )
}

const Part = ({parts}) => {
  return (
    parts.map(
      part =>
      <p key={part.id}>
        {part.name} {part.exercises}
      </p>
    )
  )
}

const Content = ({parts}) => {
  return (
    <>
      <Part parts={parts} />
      <Sum parts={parts} />
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

const Course = ({courses}) => {
  return (
    courses.map(
      course =>
      <div key={course.id}>
        <Header course={course} />
        <Content parts={course.parts} />
      </div>
    )
  )
}

export default Course
