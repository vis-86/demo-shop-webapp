import { Category } from "@/fetcher/interfaces";

interface Props {
  categories: Category[]
  onClick: (category: Category) => void
}

export default function CategoryChips({ categories, onClick }: Props) {
  return (
    <div className="parent">{
      categories.map((category) => {
        return (
          <div
            className="kid"
            key={category.id}
            onClick={() => onClick(category)}
          >
            {category.displayName}
          </div>
        )
      })
    }</div>
  )
}