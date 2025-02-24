import { Button } from '@/components/ui/button';
import { TranscriptButtonProps } from '@/app/components/interfaces/TranscriptButtonProps.interface';

import React from 'react';
import { useToast } from '@/hooks/use-toast';

export const TranscriptButton: React.FC<TranscriptButtonProps> = ({
  videoFile,
  language,
  onTranscriptReceived,
  setLoading,
}) => {
  const showToast = useToast();

  const handleTranscript = async () => {
    if (!videoFile) {
      showToast.toast({
        title: 'Error',
        description: 'Please upload a video first.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('video', videoFile as Blob);
    formData.append('language', language);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch transcript');
      }

      const data = await response.json();
      onTranscriptReceived(data);
      showToast.toast({
        title: 'Success',
        description: 'Transcription completed successfully.',
      });
    } catch (error) {
      console.error(error);
      showToast.toast({
        title: 'Error',
        description: `Error: ${error}`,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={handleTranscript} disabled={!videoFile || !language}>
        Get Transcript
      </Button>
    </>
  );
};
