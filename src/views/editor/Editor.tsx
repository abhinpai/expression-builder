import React from 'react'
import { useParams } from 'react-router-dom'

import { Container } from '@component/container'

export const Editor = () => {
  console.log(useParams())

  return <Container>Editor</Container>
}
