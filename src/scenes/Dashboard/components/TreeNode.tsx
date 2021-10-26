import { useState, FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretSquareRight,
  faCaretSquareDown,
} from "@fortawesome/free-solid-svg-icons";
import { mockNotes } from "../mock";
import styles from "../Dashboard.module.scss";

type TreeNodeProps = {
  name: string;
  childNodes: any[];
  className?: string;
  showIcon?: boolean;
};

export const TreeNode: FC<TreeNodeProps> = ({
  name,
  childNodes,
  className,
  showIcon,
}) => {
  const hasChildren = childNodes.length > 0;

  const [showChildren, setShowChildren] = useState(false);

  return (
    <div className={`${styles.treeElement} ${className ? className : ""}`}>
      <div className={`${styles.wrapper} ${showIcon ? "" : styles.empty}`}>
        {showIcon && (
          <FontAwesomeIcon
            onClick={() => setShowChildren(!showChildren)}
            icon={showChildren ? faCaretSquareDown : faCaretSquareRight}
          />
        )}
        {name}
      </div>
      {showChildren &&
        (hasChildren ? (
          childNodes.map((node) => (
            <TreeNode
              name={node.name}
              childNodes={mockNotes.filter(
                (childNote) => childNote.parentId === node.id
              )}
              className={styles.child}
              showIcon
            />
          ))
        ) : (
          <TreeNode
            name="No pages inside"
            childNodes={[]}
            className={`${styles.child} ${styles.empty}`}
          />
        ))}
    </div>
  );
};
