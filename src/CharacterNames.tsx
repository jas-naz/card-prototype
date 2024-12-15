
const CharacterNames = (props: { names: string[] }) => {
  const { names } = props;
  return (
    <div>
      <p>Character Names</p>
      <div style={{
        columnCount: 5,
        columnGap: '10px',
        margin: '32px 0',
        textAlign: 'left'
      }}>
        {names.map((name, index) => (
          <p key={index} style={{ fontSize: '1em', opacity: 0.35 }}>{name}</p>
        ))}
      </div>
    </div>
  )
}

export default CharacterNames;
