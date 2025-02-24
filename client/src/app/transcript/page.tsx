'use client';
import { useState } from 'react';
import { VideoUploader } from '@/app/components/VideoUploader';
import { TranscriptButton } from '@/app/components/TranscriptionButton';
import { SummaryDisplay } from '@/app/components/SummaryDisplay';
import { GeneratePDFButton } from '@/app/components/GeneratePDFButton';
import { LanguageSelector } from '@/app/components/LanguageSelector';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

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

  const handleSummaryChange = (newSummary: string) => {
    setSummary(newSummary);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <br />
      <Card className="max-w-4xl mx-auto w-full">
        <CardHeader>
          <CardTitle>Transcript Local Video</CardTitle>
          <CardDescription>
            Select a video from your local computer
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto p-4">
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <VideoUploader onFileSelect={setVideoFile} />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <LanguageSelector onLanguageSelect={setLanguage} />
                </div>
              </div>
            </form>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          {videoFile && language && !loading && (
            <TranscriptButton
              videoFile={videoFile}
              language={language}
              onTranscriptReceived={handleTranscriptReceived}
              setLoading={setLoading}
            />
          )}
        </CardFooter>
      </Card>

      {loading && <p>Loading...</p>}
      <br />
      {summary && (
        <>
          <SummaryDisplay
            summary={summary}
            onSummaryChange={handleSummaryChange}
          />

          <GeneratePDFButton summary={summary} />
        </>
      )}
    </div>
  );
}
