import { useState, FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretSquareRight,
  faCaretSquareDown,
} from "@fortawesome/free-solid-svg-icons";
import { Note } from "types";
import { mockNotes } from "mock";
import styles from "./NotesTree.module.scss";

type TreeNodeProps = {
  name: string;
  childNodes: any[];
  className?: string;
  showIcon?: boolean;
  nestingLevel?: number;
  action?: any;
  note?: Note;
};

export const TreeNode: FC<TreeNodeProps> = ({
  name,
  childNodes,
  className,
  showIcon,
  action,
  note,
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
        <span
          onClick={() => {
            if (action) {
              action(note);
            }
          }}
        >
          {name}
        </span>
      </div>
      {showChildren &&
        (hasChildren ? (
          childNodes.map((node) => (
            <TreeNode
              name={node.name}
              note={node}
              action={action}
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
