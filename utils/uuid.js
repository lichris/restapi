import uuid4 from 'uuid4'

const uuid = () => {
  const tokens = uuid4().split('-')
  return tokens[2] + tokens[1] + tokens[0] + tokens[3] + tokens[4]
}

export { uuid }
