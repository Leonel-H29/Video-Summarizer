import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const VideoUploader = ({
  onFileSelect,
}: {
  onFileSelect: (file: File) => void;
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
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
    </div>
  );
};
