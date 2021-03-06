import './styles.css';
import { useRef, useEffect } from 'react';

interface CodePreviewProps {
  code: string;
  error: string;
}

const html = `
<html>
  <head>
  <style>html {background-color: #fff}</style>
  </head>
  <body>
    <div id="root"></div>
    <script>
    const handleError = (err) =>{
      const root = document.querySelector('#root');
          root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
          console.error(err);
    }
    window.addEventListener('error',(event)=>{
      event.preventDefault()
      handleError(event.error)
    })
      window.addEventListener('message', (event) => {
        try {
          eval(event.data);
        } catch (err) {
          handleError(err)
        }
      }, false);
    </script>
  </body>
</html>
`;

const CodePreview: React.FC<CodePreviewProps> = ({ code, error }) => {
  const iframeRef = useRef<any>();

  useEffect(() => {
    iframeRef.current.srcdoc = html;
    setTimeout(() => {
      iframeRef.current.contentWindow.postMessage(code, '*');
    }, 50);
  }, [code]);

  return (
    <div className='preview-wrapper'>
      <iframe
        title='Code preview'
        ref={iframeRef}
        sandbox='allow-scripts'
        srcDoc={html}
      />
      {error && <div className='preview-error'>{error}</div>}
    </div>
  );
};

export default CodePreview;
