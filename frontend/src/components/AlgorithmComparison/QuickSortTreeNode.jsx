import React from "react";

// Recursive Tree View
const QuickSortTreeNode = ({ node, highlight }) => {
  if (!node) return null;

  const getColor = (index, type, indices) => {
    if (!indices?.includes(index)) return "bg-gray-200";
    switch (type) {
      case "pivot": return "bg-yellow-400";
      case "compare": return "bg-blue-400";
      case "swap": return "bg-red-400";
      case "sorted": return "bg-green-500";
      default: return "bg-gray-200";
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Center (Current Partition) */}
      <div className="flex gap-2">
        {node.array.map((num, i) => (
          <div
            key={i}
            className={`w-12 h-12 flex items-center justify-center rounded text-white text-lg font-semibold ${getColor(i, node.highlight?.type, node.highlight?.indices)}`}
          >
            {num}
          </div>
        ))}
      </div>

      {/* Children */}
      {(node.left || node.right) && (
        <div className="flex gap-8 justify-center">
          <QuickSortTreeNode node={node.left} highlight={highlight} />
          <QuickSortTreeNode node={node.right} highlight={highlight} />
        </div>
      )}
    </div>
  );
};

export default QuickSortTreeNode;
