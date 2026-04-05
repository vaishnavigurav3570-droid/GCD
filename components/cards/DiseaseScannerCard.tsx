'use client';

import { useRef, useState } from 'react';
import { Upload, Leaf, CheckCircle, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type AnalysisResult = 'idle' | 'loading' | 'healthy' | 'disease';

interface DiseaseScannerCardProps {
  onUpload?: (file: File) => Promise<void>;
}

export function DiseaseScannerCard({ onUpload }: DiseaseScannerCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<AnalysisResult>('idle');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      await processFile(files[0]);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files[0]) {
      await processFile(files[0]);
    }
  };

  const processFile = async (file: File) => {
    // Check if it's an image
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Simulate analysis
    setStatus('loading');
    if (onUpload) {
      await onUpload(file);
    } else {
      // Mock analysis - simulate 1.5s delay
      setTimeout(() => {
        setStatus('healthy');
      }, 1500);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const resetAnalysis = () => {
    setStatus('idle');
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className="col-span-1 rounded-2xl p-6 bg-card shadow-md hover:shadow-lg transition-shadow">
      <div className="space-y-4">
        {/* Header */}
        <div>
          <h3 className="text-lg font-bold text-foreground">Disease Scanner</h3>
          <p className="text-sm text-muted-foreground">AI-powered analysis</p>
        </div>

        {status === 'idle' || status === 'loading' ? (
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={handleClick}
            className="border-2 border-dashed border-primary/30 rounded-xl p-8 cursor-pointer hover:border-primary/50 transition-colors bg-muted/30"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              aria-label="Upload crop image"
            />
            
            {status === 'loading' ? (
              <div className="flex flex-col items-center justify-center gap-3">
                <div className="animate-spin h-8 w-8 border-4 border-primary/30 border-t-primary rounded-full" />
                <p className="text-sm font-medium text-foreground">Analyzing...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-3">
                <Upload className="h-8 w-8 text-primary/60" />
                <div className="text-center">
                  <p className="text-sm font-semibold text-foreground">
                    Drag & drop your image
                  </p>
                  <p className="text-xs text-muted-foreground">
                    or click to select
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {/* Image Preview */}
            {uploadedImage && (
              <div className="relative rounded-lg overflow-hidden bg-muted/50 h-32">
                <img
                  src={uploadedImage}
                  alt="Uploaded crop"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Result */}
            <div className={`p-4 rounded-lg flex items-center gap-3 ${
              status === 'healthy' 
                ? 'bg-green-50 dark:bg-green-950/30'
                : 'bg-red-50 dark:bg-red-950/30'
            }`}>
              {status === 'healthy' ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-green-600">Healthy</p>
                    <p className="text-xs text-green-600/70">No diseases detected</p>
                  </div>
                </>
              ) : (
                <>
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-red-600">Disease Detected</p>
                    <p className="text-xs text-red-600/70">Consult expert</p>
                  </div>
                </>
              )}
            </div>

            {/* Action Button */}
            <Button
              onClick={resetAnalysis}
              variant="outline"
              className="w-full"
            >
              Analyze Another
            </Button>
          </div>
        )}

        {/* Info */}
        <div className="p-3 rounded-lg bg-muted/50">
          <div className="flex items-start gap-2">
            <Leaf className="h-4 w-4 text-primary/60 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-muted-foreground">
              Upload clear photos of leaves or affected parts for best results
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
