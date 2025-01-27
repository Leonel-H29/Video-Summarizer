export interface TranscriptButtonProps {
  videoFile?: File | null;
  onTranscriptReceived: (data: { summary: string }) => void;
}
