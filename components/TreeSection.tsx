type TreeItemProps = {
  isLast?: boolean;
  children: React.ReactNode;
};

function TreeItem({ isLast = false, children }: TreeItemProps) {
  return (
    <div className="relative pl-6">
      <span
        className={`absolute left-0 top-0 w-3 h-1/2 border-l border-b border-gray-500 ${
          isLast ? "" : ""
        }`}
      />
      {!isLast && (
        <span className="absolute left-0 top-1/2 bottom-0 w-px border-l border-gray-500" />
      )}
      {children}
    </div>
  );
}

type TreeSectionProps = {
  label: string;
  children: React.ReactNode[];
};

export default function TreeSection({ label, children }: TreeSectionProps) {
  return (
    <div className="mb-8">
      <p className="text-gray-300 mb-2">{label}</p>
      <div className="relative">
        {children.map((child, i) => (
          <TreeItem key={i} isLast={i === children.length - 1}>
            {child}
          </TreeItem>
        ))}
      </div>
    </div>
  );
}