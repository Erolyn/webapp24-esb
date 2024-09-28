function App() {
  const student = 'Halgeir Geirson'
  const degree = 'Bachelor IT'
  const points = 180
  const experienceOne = 'Figma UI for customer X'
  const experienceTwo = 'Website for customer Y'
  const email = 'student@hiof.no'

  return (
    <div>
      <h1>{student}</h1>
      <p>
        {degree} {points} studiepoeng
      </p>
      <p>
        {experienceOne}
      </p>
      <p>
        {experienceTwo}
      </p>
      <p>{email}</p>
    </div>
  )
}

export default App