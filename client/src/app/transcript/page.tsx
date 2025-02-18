'use client';
import { useState } from 'react';
import { VideoUploader } from '../components/VideoUploader';
import { TranscriptButton } from '../components/TranscriptionButton';
import { SummaryDisplay } from '../components/SummaryDisplay';
import { GeneratePDFButton } from '../components/GeneratePDFButton';
import { LanguageSelector } from '../components/LanguageSelector';

export default function VideoSummarizerPage() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [language, setLanguage] = useState<string | null>(null);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTranscriptReceived = (data: {
    transcription: string;
    summary: string;
  }) => {
    setSummary(data.summary);
    setLoading(false);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <VideoUploader onFileSelect={setVideoFile} />
      <LanguageSelector onLanguageSelect={setLanguage} />
      {videoFile && language && !loading && (
        <TranscriptButton
          videoFile={videoFile}
          language={language}
          onTranscriptReceived={handleTranscriptReceived}
          setLoading={setLoading}
        />
      )}
      {loading && <p>Loading...</p>}
      {summary && (
        <>
          <SummaryDisplay summary={summary} />
          <GeneratePDFButton summary={summary} />
        </>
      )}
    </div>
  );
}
