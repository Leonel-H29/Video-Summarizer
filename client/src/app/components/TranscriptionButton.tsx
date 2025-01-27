import { Button } from '@/components/ui/button';
import { TranscriptButtonProps } from '@/app/components/interfaces/TranscriptButtonProps.interface';

export const TranscriptButton: React.FC<TranscriptButtonProps> = ({
  videoFile,
  onTranscriptReceived,
}) => {
  const handleTranscript = async () => {
    if (!videoFile) {
      alert('Please upload a video first.');
      return;
    }

    const formData = new FormData();
    formData.append('video', videoFile as Blob);

    try {
      const response = await fetch(
        'http://localhost:3000/api/transcript/local_video',
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch transcript');
      }

      const data = await response.json();
      onTranscriptReceived(data);
    } catch (error) {
      alert('Error: ' + error);
    }
  };

  return <Button onClick={handleTranscript}>Get Transcript</Button>;
};
