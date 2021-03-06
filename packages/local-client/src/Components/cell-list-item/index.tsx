import './style.css';
import { Cell } from '../../state';
import CodeCell from '../code-cell';
import MarkdownEditor from '../markdown-editor';
import ActionBar from '../action-bar';
interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  let child: JSX.Element;
  if (cell.type === 'code') {
    child = (
      <>
        <div className='action-bar-wrapper'>
          <ActionBar id={cell.id} />
        </div>
        <CodeCell cell={cell} />
      </>
    );
  } else {
    child = (
      <>
        <MarkdownEditor cell={cell} />
        <ActionBar id={cell.id} />
      </>
    );
  }
  return <div className='cell-list-item'>{child}</div>;
};

export default CellListItem;
