'use client';
import { useState } from 'react';
import { VideoUploader } from '../components/VideoUploader';
import { TranscriptButton } from '../components/TranscriptionButton';
import { SummaryDisplay } from '../components/SummaryDisplay';
import { GeneratePDFButton } from '../components/GeneratePDFButton';

export default function VideoSummarizerPage() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [summary, setSummary] = useState('');
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <VideoUploader onFileSelect={setVideoFile} />
      {summary ? (
        <>
          <SummaryDisplay summary={summary} />
          <GeneratePDFButton summary={summary} />
        </>
      ) : (
        <TranscriptButton
          videoFile={videoFile}
          onTranscriptReceived={(data) => setSummary(data.summary)}
        />
      )}
    </div>
  );
}
