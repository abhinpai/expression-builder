import React from 'react'
import Search from 'antd/es/input/Search'

export const Input = () => {
  const onSearch = (value: string) => {}

  return (
    <Search
      placeholder='Search predefined formulas'
      onSearch={onSearch}
    />
  )
}
