'use client'

import { useState } from "react"

interface Props {
  onSearch: (text: string) => void
}

export default function Search({ onSearch }: Props) {
  const [searchText, setSearchText] = useState('')

  const onSearchHandler = (search: string) => {
    setSearchText(search)
    onSearch(search)
  }

  return (
    <div
      className={"search-bar-input-container " + (searchText.trim().length > 0 ? "search-bar-input-container--has-search" : "")}
      onClick={() => onSearchHandler('')}>
      <input
        placeholder="Поиск по названию"
        className="search-bar-input"
        value={searchText}
        onChange={(e) => onSearchHandler(e.target.value)} />
    </div>
  )
}