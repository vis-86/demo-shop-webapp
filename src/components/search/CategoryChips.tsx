import { Category } from "@/fetcher/interfaces";

interface Props {
  value?: Category
  categories: Category[]
  onClick: (category?: Category) => void
}

export default function CategoryChips({ value, categories, onClick }: Props) {
  return (
    <div className="parent">{
      categories.map((category) => {
        const isActive = category === value
        return (
          <div
            className={"kid" + (isActive ? " kid--active" : "")}
            key={category.id}
            onClick={() => onClick(isActive ? undefined : category)}
          >
            {category.displayName}
          </div>
        )
      })
    }</div>
  )
}