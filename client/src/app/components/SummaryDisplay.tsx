import React, { useState, useEffect } from 'react';
import * as marked from 'marked';
import { CodeEditor } from '@/app/components/CodeEditor';
import { SummaryDisplayProps } from '@/app/components/interfaces/SummaryDisplayProps.interface';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';

export const SummaryDisplay = ({
  summary,
  onSummaryChange,
}: SummaryDisplayProps) => {
  const [markdownHtml, setMarkdownHtml] = useState({ __html: '' });
  useEffect(() => {
    const processMarkdown = async () => {
      const rawMarkup = await marked.parse(summary);
      setMarkdownHtml({ __html: rawMarkup });
    };
    processMarkdown();
  }, [summary]);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Video Summary</h2>
      {summary ? (
        <ResizablePanelGroup direction="horizontal" className="md:gap-4">
          <ResizablePanel className="flex-1 min-w-0">
            <CodeEditor
              initialContent={summary}
              onContentChange={onSummaryChange}
            />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel className="flex-1 min-w-0">
            <ScrollArea style={{ height: '90vh' }}>
              <div
                className="markdown-preview p-4 overflow-auto text-gray-800 dark:text-gray-200 text-base"
                dangerouslySetInnerHTML={markdownHtml}
              />
            </ScrollArea>
          </ResizablePanel>
        </ResizablePanelGroup>
      ) : (
        <p>No summary available</p>
      )}
    </div>
  );
};
