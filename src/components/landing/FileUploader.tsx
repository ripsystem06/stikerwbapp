"use client";

import { useRef, useState, type DragEvent, type ChangeEvent } from "react";
import { Upload, FileText, X } from "lucide-react";

interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void;
  label?: string;
  accept?: string;
}

const DEFAULT_ACCEPT = ".pdf,.png,.jpg,.jpeg,.ai,.psd,.svg";
const MAX_FILES = 5;
const MAX_SIZE_MB = 10;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

export default function FileUploader({
  onFilesSelected,
  label,
  accept = DEFAULT_ACCEPT,
}: FileUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const validateAndAdd = (newFiles: File[]) => {
    setError(null);

    if (files.length + newFiles.length > MAX_FILES) {
      setError(`Máximo ${MAX_FILES} archivos permitidos`);
      return;
    }

    for (const file of newFiles) {
      if (file.size > MAX_SIZE_BYTES) {
        setError(`${file.name} supera los ${MAX_SIZE_MB}MB`);
        return;
      }
    }

    const updated = [...files, ...newFiles];
    setFiles(updated);
    onFilesSelected(updated);
  };

  const removeFile = (index: number) => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    onFilesSelected(updated);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    if (selected.length > 0) validateAndAdd(selected);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const dropped = Array.from(e.dataTransfer.files);
    if (dropped.length > 0) validateAndAdd(dropped);
  };

  const openFileDialog = () => inputRef.current?.click();

  return (
    <div className="space-y-3">
      {label && (
        <label className="mb-1 block font-[family-name:var(--font-mono)] text-xs font-medium uppercase tracking-wider text-on-surface-variant">
          {label}
        </label>
      )}

      <div
        onClick={openFileDialog}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openFileDialog();
          }
        }}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-none border-2 border-dashed border-surface-container-high bg-surface-container-low p-8 text-center transition-colors ${
          isDragging
            ? "border-primary-container bg-primary-container/5"
            : "hover:border-primary-container/40"
        }`}
      >
        <Upload
          className={`mb-2 h-8 w-8 ${isDragging ? "text-primary-container" : "text-on-surface-variant"}`}
          aria-hidden="true"
        />
        <p className="text-center font-[family-name:var(--font-mono)] text-sm uppercase text-on-surface-variant">
          Arrastrá tus archivos o hacé clic para adjuntar
        </p>
        <p className="mt-1 text-center font-[family-name:var(--font-mono)] text-xs text-on-surface-variant/60">
          Logotipo, diseño, foto, boceto o referencia (PDF, PNG, JPG, AI, PSD)
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        multiple
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
        aria-hidden="true"
      />

      {error && (
        <p className="font-[family-name:var(--font-mono)] text-xs text-error" role="alert">
          {error}
        </p>
      )}

      {files.length > 0 && (
        <ul className="space-y-1.5">
          {files.map((file, i) => (
            <li
              key={`${file.name}-${i}`}
              className="flex items-center justify-between bg-surface-container-high px-2 py-1 font-[family-name:var(--font-mono)] text-xs text-on-surface-variant"
            >
              <span className="flex items-center gap-2 truncate">
                <FileText className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="truncate">{file.name}</span>
                <span className="shrink-0 text-on-surface-variant/60">
                  ({(file.size / 1024 / 1024).toFixed(1)} MB)
                </span>
              </span>
              <button
                type="button"
                onClick={() => removeFile(i)}
                className="ml-2 shrink-0 p-0.5 text-error transition-colors hover:text-error-container"
                aria-label={`Eliminar ${file.name}`}
              >
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
