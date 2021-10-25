import { useState, FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretSquareRight } from "@fortawesome/free-solid-svg-icons";
import { mockNotes } from "../mock";
import styles from "../Dashboard.module.scss";

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
      <FontAwesomeIcon
        onClick={() => setShowChildren(!showChildren)}
        icon={faCaretSquareRight}
      />
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
