import { ReactNode } from "react";

type TreeItemProps = {
  isLast?: boolean;
  children: React.ReactNode;
};

function TreeItem({ isLast = false, children }: TreeItemProps) {
  return (
    <div className="relative pl-6 py-2.5">
      {/* vertical line */}
      {!isLast ? (
        <span className="absolute left-0 top-0 bottom-0 w-px bg-gray-400" />
      ) : (
        <span className="absolute left-0 top-0 h-1/2 w-px bg-gray-400" />
      )}

      {/* horizontal branch */}
      <span className="absolute left-0 top-1/2 w-3 h-px bg-gray-400" />

      {/* dot */}
      <span className="absolute left-[-3px] top-1/2 -translate-y-1/2 w-[7px] h-[7px] rounded-full bg-gray-300" />

      {children}
    </div>
  );
}

type Item = {
  content: ReactNode;
  meta?: string;
};

type TreeSectionProps = {
  label: string;
  items: Item[];
};

export default function TreeSection({
  label,
  items,
}: TreeSectionProps) {
  return (
    <div className="mb-14">
      <p className="text-gray-300 mb-3">{label}</p>

      <div>
        {items.map((item, i) => (
          <TreeItem key={i} isLast={i === items.length - 1}>
            <div>
              {item.content}

              {item.meta && (
                <p className="text-xs font-bold text-gray-500 mt-0.5">
                  {item.meta}
                </p>
              )}
            </div>
          </TreeItem>
        ))}
      </div>
    </div>
  );
}