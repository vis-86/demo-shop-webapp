import { Category } from "@/fetcher/interfaces"
import CategoryChips from "./CategoryChips"
import Search from "./Search";

interface Props {
  category?: Category
  categories: Category[]
  onSearch: (search: string) => void
  onCategoryClick: (category?: Category) => void
}

export default function SearchBar({ category, categories, onSearch, onCategoryClick }: Props) {
  
  return (
    <div className="search-bar">
      <CategoryChips value={category} onClick={onCategoryClick} categories={categories} />
      <Search onSearch={onSearch} />
    </div>
  )
}