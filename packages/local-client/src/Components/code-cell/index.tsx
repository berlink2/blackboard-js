import './style.css';
import { useEffect } from 'react';
import CodeEditor from '../code-editor';
import CodePreview from '../code-preview';
import Resizable from '../resizable';
import { Cell } from '../../state';
import { useActions } from '../../hooks/use-actions';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import { useAccumulatedCode } from '../../hooks/use-accumulated-code';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);
  const accumulatedCode = useAccumulatedCode(cell.id);
  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, accumulatedCode);
      return;
    }
    const timer = setTimeout(async () => {
      createBundle(cell.id, accumulatedCode);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accumulatedCode, cell.id, createBundle]);

  return (
    <Resizable direction='vertical'>
      <div
        style={{
          height: 'calc(100% - 10px)',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Resizable direction='horizontal'>
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <div className='progress-wrapper'>
          {!bundle || bundle.isBundling ? (
            <div className='progress-cover'>
              <progress className='progress is-small is-primary' max='100'>
                Loading
              </progress>
            </div>
          ) : (
            <CodePreview code={bundle.code} error={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
