import { FC, useState } from "react";
import ContentEditable from "react-contenteditable";
import sanitizeHtml from "sanitize-html";
import styles from "./AddBlockModal.module.scss";

type TextEditorProps = {
  updateContentData: (contentData: any) => void;
};

const sanitizeConf = {
  allowedTags: ["b", "i", "em", "strong", "a", "p", "h1"],
  allowedAttributes: { a: ["href"] },
};

function EditButton(props: any) {
  return (
    <button
      key={props.cmd}
      onMouseDown={(evt) => {
        evt.preventDefault(); // Avoids loosing focus from the editable area
        document.execCommand(props.cmd, false, props.arg); // Send the command to the browser
      }}
    >
      {props.name || props.cmd}
    </button>
  );
}

export const TextEditor: FC<TextEditorProps> = ({ updateContentData }) => {
  const [myState, setMyState] = useState({
    html: `<p>Hello <b>World</b> !</p><p>Paragraph 2</p>`,
    editable: true,
  });

  const handleChange = (evt: any) => {
    setMyState({ ...myState, html: evt.target.value });
  };

  const sanitize = () => {
    setMyState({
      ...myState,
      html: sanitizeHtml(myState.html, sanitizeConf),
    });
  };

  const toggleEditable = () => {
    setMyState({ ...myState, editable: !myState.editable });
  };

  console.log(myState.html);

  return (
    <div>
      <EditButton cmd="italic" />
      <EditButton cmd="bold" />
      <EditButton cmd="formatBlock" arg="h1" name="heading" />
      <EditButton
        cmd="createLink"
        arg="https://github.com/lovasoa/react-contenteditable"
        name="hyperlink"
      />
      <ContentEditable
        className={styles.editable}
        tagName="pre"
        html={myState.html} // innerHTML of the editable div
        disabled={!myState.editable} // use true to disable edition
        onChange={handleChange} // handle innerHTML change
        // onBlur={sanitize}
      />
      <button onClick={toggleEditable}>
        Make {myState.editable ? "readonly" : "editable"}
      </button>
      <button onClick={() => updateContentData(myState.html)}>save</button>
    </div>
  );
};
