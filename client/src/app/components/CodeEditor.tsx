import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';

export const CodeEditor = ({
  initialContent,
  onContentChange,
}: {
  initialContent: string;
  onContentChange?: (content: string) => void;
}) => {
  const [content, setContent] = useState<string>(initialContent || '');

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  function handleEditorChange(value: string | undefined) {
    const newValue = value || '';
    setContent(newValue);
    if (onContentChange) {
      onContentChange(newValue);
    }
  }

  return (
    <div className="flex">
      <div className="flex-1">
        <Editor
          height="90vh"
          theme="vs-dark"
          defaultLanguage="markdown"
          value={content}
          onChange={handleEditorChange}
        />
      </div>
    </div>
  );
};
