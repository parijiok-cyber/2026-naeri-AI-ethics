import React, { useState, useRef } from 'react';
import { X, Upload, CheckCircle2, AlertCircle, Trash2, FileImage, RefreshCw } from 'lucide-react';
import { ALL_IMAGE_NAMES } from '../data/curriculumData';

interface FileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  loadedImages: Record<string, string>;
  onImagesUpdated: (newImages: Record<string, string>) => void;
  onClearImages: () => void;
}

export const FileUploadModal: React.FC<FileUploadModalProps> = ({
  isOpen,
  onClose,
  loadedImages,
  onImagesUpdated,
  onClearImages,
}) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const processFiles = (files: FileList | File[]) => {
    const matched: Record<string, string> = {};
    let matchedCount = 0;

    Array.from(files).forEach(file => {
      // Normalize filename to match
      const fileName = file.name.trim();
      const targetMatch = ALL_IMAGE_NAMES.find(
        name => name.toLowerCase() === fileName.toLowerCase() ||
                fileName.includes(name.replace('.png', ''))
      );

      if (targetMatch) {
        const url = URL.createObjectURL(file);
        matched[targetMatch] = url;
        matchedCount++;
      }
    });

    if (matchedCount > 0) {
      onImagesUpdated(matched);
      setUploadMessage(`🎉 총 ${matchedCount}개의 인포그래픽 파일이 성공적으로 연결되었습니다!`);
    } else {
      setUploadMessage('⚠️ 파일명이 일치하는 항목을 찾지 못했습니다. 파일명을 확인해 주세요.');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const connectedCount = ALL_IMAGE_NAMES.filter(name => !!loadedImages[name]).length;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="원본 인포그래픽 PNG 파일 관리"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-150"
    >
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              원본 인포그래픽 PNG 파일 연결
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              첨부된 8개의 고해상도 인포그래픽 PNG 파일을 웹사이트에 연결하고 영구 저장합니다.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Status Counter Banner */}
          <div className="flex items-center justify-between p-4 bg-indigo-50/70 border border-indigo-100 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                {connectedCount}/8
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">
                  {connectedCount === 8
                    ? '8종 원본 인포그래픽 파일이 모두 연결되어 있습니다'
                    : `현재 ${connectedCount}개의 원본 파일이 등록되었습니다`}
                </p>
                <p className="text-xs text-indigo-700">
                  컴퓨터에 저장된 PNG 파일을 아래 영역으로 끌어다 놓으세요.
                </p>
              </div>
            </div>

            {connectedCount > 0 && (
              <button
                onClick={onClearImages}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-lg transition-colors"
                title="모든 연결 해제"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>초기화</span>
              </button>
            )}
          </div>

          {/* Drag & Drop Zone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
              isDragging
                ? 'border-indigo-500 bg-indigo-50/50 scale-[1.01]'
                : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              multiple
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
            />
            <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto mb-3 shadow-inner">
              <Upload className="w-7 h-7" />
            </div>
            <p className="font-bold text-slate-800 text-base mb-1">
              PNG 파일들을 여기에 드래그하거나 클릭하여 선택
            </p>
            <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
              `유치원.png`, `1학년.png`, `2학년.png` 등 8개의 파일을 한 번에 드래그하시면 자동으로 매칭됩니다.
            </p>
          </div>

          {uploadMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>{uploadMessage}</span>
            </div>
          )}

          {/* Checklist of 8 Files */}
          <div>
            <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">
              인포그래픽 파일 매칭 현황 (8개)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {ALL_IMAGE_NAMES.map(filename => {
                const isLoaded = !!loadedImages[filename];
                return (
                  <div
                    key={filename}
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs transition-colors ${
                      isLoaded
                        ? 'bg-emerald-50/40 border-emerald-200 text-emerald-900'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate mr-2">
                      <FileImage
                        className={`w-4 h-4 flex-shrink-0 ${
                          isLoaded ? 'text-emerald-600' : 'text-slate-400'
                        }`}
                      />
                      <span className="font-medium truncate">{filename}</span>
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {isLoaded ? (
                        <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 bg-white px-2 py-0.5 rounded-md border border-emerald-200 text-[11px]">
                          <CheckCircle2 className="w-3 h-3" /> 연결됨
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-slate-400 bg-white px-2 py-0.5 rounded-md border border-slate-200 text-[11px]">
                          대기중
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            브라우저 로컬 저장소(IndexedDB)에 안전하게 보관됩니다.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors shadow-sm"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
