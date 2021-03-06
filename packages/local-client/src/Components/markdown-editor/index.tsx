import MDEditor from '@uiw/react-md-editor';
import { useState, useEffect, useRef } from 'react';
import { Cell } from '../../state';
import './style.css';
import { useActions } from '../../hooks/use-actions';
interface MarkdownEditorProps {
  cell: Cell;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ cell }) => {
  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const { updateCell } = useActions();

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return;
      }
      setEditing(false);
    };
    document.addEventListener('click', listener, { capture: true });

    return () =>
      document.removeEventListener('click', listener, { capture: true });
  }, []);

  if (editing) {
    return (
      <div className='markdown-editor' ref={ref}>
        <MDEditor
          value={cell.content}
          onChange={(v) => updateCell(cell.id, v || '')}
        />
      </div>
    );
  }

  return (
    <div className='markdown-editor card' onClick={() => setEditing(true)}>
      <div className='card-content'>
        <MDEditor.Markdown source={cell.content || 'Click here to edit'} />
      </div>
    </div>
  );
};

export default MarkdownEditor;
