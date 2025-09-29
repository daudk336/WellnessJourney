import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X, Camera, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { wellnessAPI } from '@/lib/api';

interface ImageUploadProps {
  onImageUpload: (file: File, url: string) => void;
  onImageRemove?: () => void;
  uploadedImage?: string;
  title: string;
  description: string;
  alignmentGuide?: string;
  accept?: string;
  maxSize?: number;
  imageType: 'scalp' | 'face' | 'body';
}

export default function ImageUpload({
  onImageUpload,
  onImageRemove,
  uploadedImage,
  title,
  description,
  alignmentGuide = "Position yourself according to the guide lines",
  accept = "image/*",
  maxSize = 2097152, // 2MB
  imageType
}: ImageUploadProps) {
  const [error, setError] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[], rejectedFiles: any[]) => {
    setError("");
    
    if (rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0];
      if (rejection.errors[0]?.code === 'file-too-large') {
        setError("File size must be less than 2MB");
      } else {
        setError("Please upload a valid image file");
      }
      return;
    }
    
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setIsUploading(true);
      
      try {
        const response = await wellnessAPI.uploadImage(file, imageType);
        onImageUpload(file, response.data.url);
      } catch (err) {
        console.error('Upload failed:', err);
        setError(err instanceof Error ? err.message : 'Upload failed');
      } finally {
        setIsUploading(false);
      }
    }
  }, [onImageUpload, imageType]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'] },
    maxSize,
    multiple: false
  });

  return (
    <div className="w-full space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-primary mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
        {alignmentGuide && (
          <p className="text-xs text-accent mt-1">💡 {alignmentGuide}</p>
        )}
      </div>
      
      {uploadedImage ? (
        <Card className="relative">
          <CardContent className="p-4">
            <div className="relative">
              <img 
                src={uploadedImage} 
                alt="Uploaded" 
                className="w-full h-64 object-cover rounded-lg"
              />
              {onImageRemove && (
                <Button
                  size="icon"
                  variant="destructive"
                  className="absolute top-2 right-2"
                  onClick={onImageRemove}
                  data-testid="button-remove-image"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-2 text-center">
              ✅ Image uploaded successfully
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card 
          {...getRootProps()} 
          className={`cursor-pointer transition-colors border-2 border-dashed hover-elevate ${
            isDragActive ? 'border-primary bg-primary/5' : 'border-border'
          }`}
          data-testid="dropzone-upload"
        >
          <CardContent className="p-8 text-center">
            <input {...getInputProps()} />
            <div className="space-y-4">
              {isUploading ? (
                <Loader2 className="w-12 h-12 mx-auto text-primary animate-spin" />
              ) : isDragActive ? (
                <Upload className="w-12 h-12 mx-auto text-primary animate-bounce" />
              ) : (
                <Camera className="w-12 h-12 mx-auto text-muted-foreground" />
              )}
              
              <div>
                <p className="text-lg font-medium text-foreground mb-2">
                  {isUploading ? 'Uploading...' : isDragActive ? 'Drop your image here' : 'Upload Your Photo'}
                </p>
                <p className="text-sm text-muted-foreground">
                  Drag & drop or click to browse
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Supports JPG, PNG (Max 2MB)
                </p>
              </div>
              
              {/* Dotted Alignment Guide */}
              <div className="relative w-48 h-48 mx-auto border-2 border-dotted border-accent/50 rounded-lg">
                <div className="absolute inset-4 border border-dotted border-accent/30 rounded"></div>
                <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-accent rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute inset-x-0 top-1/2 h-px bg-accent/30"></div>
                <div className="absolute inset-y-0 left-1/2 w-px bg-accent/30"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {error && (
        <p className="text-sm text-destructive text-center">{error}</p>
      )}
    </div>
  );
}