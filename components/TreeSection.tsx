import { ReactNode } from "react";

type TreeItemProps = {
  isLast?: boolean;
  children: ReactNode;
};

function TreeItem({ isLast = false, children }: TreeItemProps) {
  return (
    <div className="relative pl-6 sm:pl-7">
      {/* vertical line */}
      {!isLast ? (
        <span className="absolute left-0 top-0 bottom-0 w-px bg-gray-400" />
      ) : (
        <span className="absolute left-0 top-0 h-1/2 w-px bg-gray-400" />
      )}

      {/* horizontal branch */}
      <span className="absolute left-0 top-1/2 w-3 sm:w-3.5 h-px bg-gray-400" />

      {/* dot */}
      <span className="absolute left-[-3px] top-1/2 -translate-y-1/2 w-[7px] h-[7px] rounded-full bg-gray-300" />

      {children}
    </div>
  );
}

type Item = {
  key: string;
  content: ReactNode;
};

type TreeSectionProps = {
  id?: string;
  label: string;
  hint?: string;
  items: Item[];
};

export default function TreeSection({
  id,
  label,
  hint,
  items,
}: TreeSectionProps) {
  return (
    <section id={id} className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-[13px] font-bold tracking-[0.08em] text-gray-300">
          {label}
        </h2>
        {hint && (
          <span className="hidden sm:inline text-xs text-gray-400">{hint}</span>
        )}
      </div>

      <div>
        {items.map((item, i) => (
          <TreeItem key={item.key} isLast={i === items.length - 1}>
            {item.content}
          </TreeItem>
        ))}
      </div>
    </section>
  );
}
