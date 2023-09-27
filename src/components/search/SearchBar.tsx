import { Category } from "@/fetcher/interfaces"
import CategoryChips from "./CategoryChips"
import Search from "./Search";

interface Props {
  categories: Category[]
  onSearch: (search: string) => void
  onCategoryClick: (category: Category) => void
}

export default function SearchBar({ categories, onSearch, onCategoryClick }: Props) {
  
  return (
    <div className="search-bar">
      <CategoryChips onClick={onCategoryClick} categories={categories} />
      <Search onSearch={onSearch} />
    </div>
  )
}