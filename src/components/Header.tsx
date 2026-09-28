import React from 'react';
import { FileImage, Presentation, Layers } from 'lucide-react';
import { ALL_IMAGE_NAMES } from '../data/curriculumData';

interface HeaderProps {
  currentTab: string; // 'overview-1' | 'overview-2' | 'grade' | 'timeline'
  onSelectTab: (tab: string) => void;
  loadedImages: Record<string, string>;
  onOpenUploadModal: () => void;
  onOpenPresentation: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  loadedImages,
  onOpenUploadModal,
  onOpenPresentation,
}) => {
  const connectedCount = ALL_IMAGE_NAMES.filter(name => !!loadedImages[name]).length;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <button
          onClick={() => onSelectTab('overview-1')}
          className="text-left font-black text-lg sm:text-xl tracking-tight text-slate-900 hover:text-indigo-600 transition-colors whitespace-nowrap"
        >
          내리숲초등학교 <span className="text-indigo-600 font-extrabold">AI 윤리교육</span>
        </button>

        {/* Zone 2: Navigation Links (Clean text navigation) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
          <button
            onClick={() => onSelectTab('overview-1')}
            className={`transition-colors py-1 border-b-2 ${
              currentTab === 'overview-1'
                ? 'text-indigo-600 border-indigo-600'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            개요 한눈에 (1)
          </button>
          <button
            onClick={() => onSelectTab('overview-2')}
            className={`transition-colors py-1 border-b-2 ${
              currentTab === 'overview-2'
                ? 'text-indigo-600 border-indigo-600'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            나선형 성장 플로우 (2)
          </button>
          <button
            onClick={() => onSelectTab('유치원')}
            className={`transition-colors py-1 border-b-2 ${
              currentTab !== 'overview-1' && currentTab !== 'overview-2' && currentTab !== 'timeline'
                ? 'text-indigo-600 border-indigo-600'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            학년별 프로젝트
          </button>
          <button
            onClick={() => onSelectTab('timeline')}
            className={`transition-colors py-1 border-b-2 ${
              currentTab === 'timeline'
                ? 'text-emerald-600 border-emerald-600'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            연구학교 마무리 타임라인
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenUploadModal}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all whitespace-nowrap shadow-2xs ${
              connectedCount === 8
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                : 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100'
            }`}
            title="원본 인포그래픽 파일 연결 관리"
          >
            <FileImage className="w-3.5 h-3.5" />
            <span>원본 이미지</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                connectedCount === 8
                  ? 'bg-emerald-600 text-white'
                  : 'bg-indigo-600 text-white'
              }`}
            >
              {connectedCount === 8 ? '8종 준비완료' : `${connectedCount}/8`}
            </span>
          </button>

          <button
            onClick={onOpenPresentation}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white transition-colors shadow-xs whitespace-nowrap"
            title="전체화면 발표 모드 실행"
          >
            <Presentation className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">발표 모드</span>
          </button>
        </div>
      </div>
    </header>
  );
};
