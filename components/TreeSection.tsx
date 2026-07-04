import { Children } from "react";

type TreeItemProps = {
  isLast?: boolean;
  children: React.ReactNode;
};

function TreeItem({ isLast = false, children }: TreeItemProps) {
  return (
    <div className="relative pl-6 py-1">
      {/* vertical line: runs full row height, stops at midpoint on last item */}
      {!isLast ? (
        <span className="absolute left-0 top-0 bottom-0 w-px bg-gray-400" />
      ) : (
        <span className="absolute left-0 top-0 h-1/2 w-px bg-gray-400" />
      )}

      {/* horizontal branch to the dot */}
      <span className="absolute left-0 top-1/2 w-3 h-px bg-gray-400" />

      {/* dot marker */}
      <span className="absolute left-[-3px] top-1/2 -translate-y-1/2 w-[7px] h-[7px] rounded-full bg-gray-300" />

      {children}
    </div>
  );
}

type TreeSectionProps = {
  label: string;
  children: React.ReactNode;
};

export default function TreeSection({ label, children }: TreeSectionProps) {
  const items = Children.toArray(children);

  return (
    <div className="mb-14">
      <p className="text-gray-300 mb-3">{label}</p>
      <div className="relative">
        {items.map((child, i) => (
          <TreeItem key={i} isLast={i === items.length - 1}>
            {child}
          </TreeItem>
        ))}
      </div>
    </div>
  );
}