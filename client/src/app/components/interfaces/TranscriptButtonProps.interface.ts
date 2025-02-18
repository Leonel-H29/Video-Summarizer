export interface TranscriptButtonProps {
  videoFile?: File | null;
  language: string;
  onTranscriptReceived: (data: {
    transcription: string;
    summary: string;
  }) => void;
  setLoading: (loading: boolean) => void;
}
