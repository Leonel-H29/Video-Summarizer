import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { GeneratePDFButtonProps } from '@/app/components/interfaces/GeneratePDFButtonProps.interface';
import React from 'react';
import { useToast } from '@/hooks/use-toast';

export const GeneratePDFButton: React.FC<GeneratePDFButtonProps> = ({
  summary,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const showToast = useToast();
  const handleDownloadPDF = async () => {
    try {
      setIsGenerating(true);
      if (!summary) {
        console.error('The summary content is empty or undefined.');
        return;
      }
      const response = await fetch(`${process.env.NEXT_PUBLIC_WORKFLOW_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ markdownContent: summary }),
      });

      console.log(response);

      if (!response.ok) {
        throw new Error('Error generating PDF');
      }

      setIsGenerating(false);
      showToast.toast({
        title: 'Success',
        description: 'Transcription completed successfully.',
      });
    } catch (error) {
      console.error('Error downloading PDF:', error);
      showToast.toast({
        title: 'Error',
        description: `Error: ${error}`,
        variant: 'destructive',
      });
      setIsGenerating(false);
    }
  };

  return (
    <Button onClick={handleDownloadPDF} disabled={isGenerating}>
      {isGenerating ? 'Generating PDF...' : 'Download PDF'}
    </Button>
  );
};
