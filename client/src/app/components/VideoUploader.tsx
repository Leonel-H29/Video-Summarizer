'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export const VideoUploader = ({
  onFileSelect,
}: {
  onFileSelect: (file: File) => void;
}) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      onFileSelect(selectedFile);
    }
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="video">Video</Label>
      <Input
        id="video"
        type="file"
        onChange={handleFileChange}
        accept="video/*"
      />
      {file && <Button onClick={() => onFileSelect(file)}>Upload Video</Button>}
    </div>
  );
};
