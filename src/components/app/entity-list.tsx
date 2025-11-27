import { cn } from "@/lib/utils";
import { ItemGroup, Item } from "@/components/ui/item"; // Import ItemGroup and Item

type EntityListProps<T> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  getKey?: (item: T, index: number) => string | number;
  emptyView?: React.ReactNode;
  className?: string;
};

export function EntityList<T>({
  items,
  renderItem,
  getKey,
  emptyView,
  className,
}: EntityListProps<T>) {
  if (items.length === 0) {
    return <>{emptyView || null}</>;
  }

  return (
    <ItemGroup className={cn("gap-4", className)}>
      {items.map((item, index) => (
        <Item key={getKey ? getKey(item, index) : index} className="p-0">
          {renderItem(item)}
        </Item>
      ))}
    </ItemGroup>
  );
}
