import { useState, FC } from "react";
import styles from "../Dashboard.module.scss";
import { mockNotes } from "../mock";

type TreeNodeProps = {
  name: string;
  childNodes: any[];
  className?: string;
};

export const TreeNode: FC<TreeNodeProps> = ({
  name,
  childNodes,
  className,
}) => {
  const hasChildren = childNodes.length > 0;

  const [showChildren, setShowChildren] = useState(false);

  return (
    <div className={`${styles.treeElement} ${className ? className : ""}`}>
      {hasChildren && (
        <button onClick={() => setShowChildren(!showChildren)}>expand</button>
      )}
      {name}
      {showChildren &&
        childNodes.map((node) => (
          <TreeNode
            name={node.name}
            childNodes={mockNotes.filter(
              (childNote) => childNote.parentId === node.id
            )}
            className={styles.child}
          />
        ))}
    </div>
  );
};
