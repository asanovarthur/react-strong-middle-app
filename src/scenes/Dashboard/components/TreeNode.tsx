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
  nestingLevel?: number;
};

export const TreeNode: FC<TreeNodeProps> = ({
  name,
  childNodes,
  className,
  showIcon,
  nestingLevel = 1,
}) => {
  const hasChildren = childNodes.length > 0;

  const [showChildren, setShowChildren] = useState(false);

  return (
    <div className={`${styles.treeElement} ${className ? className : ""}`}>
      <div
        className={`${styles.wrapper} ${showIcon ? "" : styles.empty}`}
        style={{ paddingLeft: `${nestingLevel * 20}px` }}
      >
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
              showIcon
              nestingLevel={nestingLevel + 1}
              className={styles.child}
            />
          ))
        ) : (
          <TreeNode
            name="No pages inside"
            childNodes={[]}
            nestingLevel={nestingLevel + 1}
            className={styles.empty}
          />
        ))}
    </div>
  );
};
