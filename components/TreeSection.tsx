import { Children } from "react";

type TreeItemProps = {
  isLast?: boolean;
  children: React.ReactNode;
};

function TreeItem({ isLast = false, children }: TreeItemProps) {
  return (
    <div className="relative pl-6 py-1">
      {/* dot marker */}
      <span className="absolute left-[-3px] top-1/2 -translate-y-1/2 w-[7px] h-[7px] rounded-full bg-gray-300" />

      {/* horizontal branch to the dot */}
      <span className="absolute left-0 top-1/2 w-3 h-px bg-gray-400" />

      {/* vertical line down to next item (skip on last) */}
      {!isLast && (
        <span className="absolute left-0 top-1/2 bottom-[-4px] w-px bg-gray-400" />
      )}

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
    <div className="mb-8">
      <p className="text-gray-300 mb-2">{label}</p>
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