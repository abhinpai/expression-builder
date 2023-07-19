import React, { useCallback } from 'react'
import { Input as AntInput } from 'antd'
import { debounce } from 'lodash'

interface Props {
  readonly onSearch: (value: string) => void
}

export const Input = (props: Props) => {
  const onSearch = (e: any) => {
    props.onSearch(e.target.value.toLowerCase())
  }

  const debounceFn = useCallback(debounce(onSearch, 200), [])

  return (
    <AntInput placeholder='Search predefined formulas' onChange={debounceFn} />
  )
}
