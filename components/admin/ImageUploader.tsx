'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { UploadCloud, X, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUploader({ value, onChange, label = 'Image' }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Only image files are allowed');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image must be under 10 MB');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Upload failed');
      onChange(json.url);
      toast.success('Image uploaded');
    } catch (err: any) {
      toast.error(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) uploadFile(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
    // reset so re-selecting same file triggers onChange
    e.target.value = '';
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium">{label}</label>

      {/* Preview */}
      {value && !uploading && (
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
          <Image src={value} alt="Uploaded preview" fill className="object-cover" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-red-500"
            title="Remove image"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Drop Zone */}
      {!value && (
        <div
          onClick={() => !uploading && inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`flex min-h-40 cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed transition-colors
            ${dragOver
              ? 'border-primary bg-primary/5'
              : 'border-slate-300 bg-slate-50 hover:border-primary hover:bg-primary/5 dark:border-slate-700 dark:bg-slate-900/40'}
            ${uploading ? 'pointer-events-none opacity-60' : ''}`}
        >
          {uploading ? (
            <>
              <Loader2 size={32} className="animate-spin text-primary" />
              <p className="text-sm font-medium text-slate-500">Uploading…</p>
            </>
          ) : (
            <>
              <UploadCloud size={32} className="text-primary" />
              <div className="text-center">
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Drag & drop or <span className="text-primary underline">click to upload</span>
                </p>
                <p className="mt-1 text-xs text-slate-500">PNG, JPG, WEBP — max 10 MB</p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Optional: also allow pasting a URL directly */}
      <div>
        <label className="mb-1 block text-xs text-slate-500">Or paste an image URL</label>
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://example.com/image.jpg"
          className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-2.5 text-sm outline-none transition focus:border-primary dark:border-slate-800"
        />
      </div>
    </div>
  );
}
