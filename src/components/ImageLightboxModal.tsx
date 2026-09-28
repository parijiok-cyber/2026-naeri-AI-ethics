import React, { useState, useEffect, useRef } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, Download, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { curriculumData, OVERVIEW_IMAGE_NAME } from '../data/curriculumData';
import { InteractiveVectorDiagram } from './InteractiveVectorDiagram';
import { OverviewPoster } from './OverviewPoster';

interface ImageLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string | null;
  imageAlt: string;
  imageFileName: string;
  currentGradeId?: string;
  onSelectGrade?: (gradeId: string) => void;
}

export const ImageLightboxModal: React.FC<ImageLightboxModalProps> = ({
  isOpen,
  onClose,
  imageSrc,
  imageAlt,
  imageFileName,
  currentGradeId,
  onSelectGrade,
}) => {
  const [scale, setScale] = useState<number>(1);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset zoom on open or image change
  useEffect(() => {
    if (isOpen) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  }, [isOpen, imageSrc, imageFileName]);

  // Handle ESC key and arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && onSelectGrade && currentGradeId) {
        navigateGrade(1);
      } else if (e.key === 'ArrowLeft' && onSelectGrade && currentGradeId) {
        navigateGrade(-1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentGradeId, onSelectGrade]);

  const navigateGrade = (direction: number) => {
    if (!currentGradeId || !onSelectGrade) return;
    const grades = curriculumData.map(c => c.id);
    const currentIndex = grades.indexOf(currentGradeId as any);
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + direction + grades.length) % grades.length;
    onSelectGrade(grades[nextIndex]);
  };

  if (!isOpen) return null;

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.25, 3.5));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.25, 0.5));
  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleDownload = () => {
    if (!imageSrc) return;
    const a = document.createElement('a');
    a.href = imageSrc;
    a.download = imageFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const currentGradeData = currentGradeId
    ? curriculumData.find(c => c.id === currentGradeId)
    : null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="고해상도 인포그래픽 뷰어"
      className="fixed inset-0 z-50 flex flex-col bg-slate-950/95 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
    >
      {/* Top control bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/80 text-white z-10">
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-indigo-400 bg-indigo-950/80 border border-indigo-800/50 px-3 py-1 rounded-lg">
            {imageFileName}
          </span>
          <span className="text-sm text-slate-300 hidden md:inline-block">
            {imageAlt}
          </span>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-2">
          {imageSrc && (
            <div className="flex items-center bg-slate-800 rounded-lg p-1 border border-slate-700">
              <button
                onClick={handleZoomOut}
                className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-700 rounded transition-colors"
                title="축소 (Zoom Out)"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono px-2 text-slate-300 tabular-nums">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-700 rounded transition-colors"
                title="확대 (Zoom In)"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={handleReset}
                className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-700 rounded transition-colors ml-1 border-l border-slate-700 pl-2"
                title="초기화 (100%)"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {imageSrc && (
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors shadow-sm"
              title="이미지 파일 다운로드"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">다운로드</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors ml-2"
            title="닫기 (ESC)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Viewport */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`relative flex-1 overflow-auto flex items-center justify-center p-4 ${
          scale > 1 && imageSrc ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'
        }`}
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={imageAlt}
            draggable={false}
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              transition: isDragging ? 'none' : 'transform 0.15s ease-out',
            }}
            className="max-w-full max-h-[85vh] object-contain select-none rounded-lg shadow-2xl"
          />
        ) : (
          <div className="w-full max-w-5xl my-auto p-4 text-slate-900">
            {imageFileName === OVERVIEW_IMAGE_NAME ? (
              <OverviewPoster onSelectGrade={id => onSelectGrade && onSelectGrade(id)} />
            ) : currentGradeData ? (
              <InteractiveVectorDiagram
                curriculum={currentGradeData}
                onOpenLightbox={() => {}}
                hasUploadedImage={false}
              />
            ) : (
              <div className="text-center p-8 bg-slate-900 border border-slate-800 rounded-2xl max-w-md mx-auto text-white">
                <Maximize2 className="w-12 h-12 text-slate-500 mx-auto mb-3" />
                <p className="font-bold text-lg mb-1">{imageFileName}</p>
                <p className="text-sm text-slate-400 leading-relaxed">
                  인포그래픽 정보가 로드되었습니다.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Previous / Next buttons for grade navigation */}
        {currentGradeId && onSelectGrade && (
          <>
            <button
              onClick={() => navigateGrade(-1)}
              className="fixed left-6 top-1/2 -translate-y-1/2 p-3 bg-slate-900/90 hover:bg-slate-800 text-white rounded-full border border-slate-700 shadow-xl transition-all hover:scale-105 z-20"
              title="이전 학년 (←)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => navigateGrade(1)}
              className="fixed right-6 top-1/2 -translate-y-1/2 p-3 bg-slate-900/90 hover:bg-slate-800 text-white rounded-full border border-slate-700 shadow-xl transition-all hover:scale-105 z-20"
              title="다음 학년 (→)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Bottom Hint */}
      <div className="px-6 py-2.5 bg-slate-900/90 border-t border-slate-800 text-center text-xs text-slate-400">
        <span>키보드 방향키(← / →)로 학년간 이동할 수 있으며, ESC 키로 닫을 수 있습니다.</span>
      </div>
    </div>
  );
};
