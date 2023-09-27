'use client'

import { useState } from "react"

interface Props {
  onSearch: (text: string) => void
}

export default function Search({ onSearch }: Props) {
  const [searchText, setSearchText] = useState('')

  return (
    <div className="search-bar-input-container">
      <input placeholder="Поиск по названию" className="search-bar-input" value={searchText} onChange={(e) => {
        setSearchText(e.target.value)
        onSearch(e.target.value)
      }} />
    </div>
  )
}