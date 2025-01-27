import { Button } from '@/components/ui/button';

export const GeneratePDFButton = ({ summary }: { summary: string }) => {
  const handleDownloadPDF = () => {
    const blob = new Blob([summary], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'summary.pdf';
    link.click();
  };

  return <Button onClick={handleDownloadPDF}>Download PDF</Button>;
};
