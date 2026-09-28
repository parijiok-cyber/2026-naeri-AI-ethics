import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { OverviewGrid } from './components/OverviewGrid';
import { TimelineFlow } from './components/TimelineFlow';
import { GradeDetail } from './components/GradeDetail';
import { ResearchTimeline } from './components/ResearchTimeline';
import { ImageLightboxModal } from './components/ImageLightboxModal';
import { FileUploadModal } from './components/FileUploadModal';
import { PresentationMode } from './components/PresentationMode';
import { curriculumData, OVERVIEW_IMAGE_NAME, ALL_IMAGE_NAMES } from './data/curriculumData';
import { getImageFromDB, saveImageToDB, getAllStoredImageNames, clearAllStoredImages } from './utils/imageStore';
import { Search, Sparkles, Filter, ChevronRight, BookOpen } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('overview-1');
  const [loadedImages, setLoadedImages] = useState<Record<string, string>>({});
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [isPresentationOpen, setIsPresentationOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    imageSrc: string | null;
    imageAlt: string;
    filename: string;
    gradeId?: string;
  }>({
    isOpen: false,
    imageSrc: null,
    imageAlt: '',
    filename: '',
  });

  // Load stored images from IndexedDB and check public directory on startup
  useEffect(() => {
    async function loadImages() {
      const keys = await getAllStoredImageNames();
      const loaded: Record<string, string> = {};

      for (const name of ALL_IMAGE_NAMES) {
        if (keys.includes(name)) {
          const blob = await getImageFromDB(name);
          if (blob) {
            loaded[name] = URL.createObjectURL(blob);
            continue;
          }
        }

        // Try checking if real file exists in /public (must be 200 OK and an image)
        try {
          const res = await fetch(`/${encodeURIComponent(name)}`, { method: 'HEAD' });
          if (res.ok && res.status === 200 && res.headers.get('content-type')?.includes('image')) {
            loaded[name] = `/${encodeURIComponent(name)}`;
          }
        } catch {}
      }
      setLoadedImages(loaded);
    }
    loadImages();
  }, []);

  const handleImagesUpdated = async (newImages: Record<string, string>) => {
    // Save to IndexedDB
    for (const [name, url] of Object.entries(newImages)) {
      try {
        const res = await fetch(url);
        const blob = await res.blob();
        await saveImageToDB(name, blob);
      } catch (err) {
        console.error('Failed to save image to IndexedDB:', name, err);
      }
    }
    setLoadedImages(prev => ({ ...prev, ...newImages }));
  };

  const handleClearImages = async () => {
    if (window.confirm('저장된 모든 인포그래픽 이미지 연결을 해제하시겠습니까?')) {
      await clearAllStoredImages();
      setLoadedImages({});
    }
  };

  const handleOpenLightbox = (src: string | null, alt: string, filename: string, gradeId?: string) => {
    setLightboxState({
      isOpen: true,
      imageSrc: src,
      imageAlt: alt,
      filename,
      gradeId,
    });
  };

  const currentGradeData = curriculumData.find(c => c.id === currentTab);

  // Search Results filtering
  const matchingGrades = searchQuery.trim()
    ? curriculumData.filter(item => {
        const query = searchQuery.toLowerCase();
        return (
          item.grade.toLowerCase().includes(query) ||
          item.projectTitle.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.coreStandards.some(s => s.toLowerCase().includes(query)) ||
          item.activities.some(
            a => a.title.toLowerCase().includes(query) || a.desc.toLowerCase().includes(query)
          ) ||
          item.lessons?.some(l => l.title.toLowerCase().includes(query))
        );
      })
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/60 via-slate-50 to-emerald-50/40 text-slate-800 flex flex-col font-sans">
      {/* Top Bar Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        loadedImages={loadedImages}
        onOpenUploadModal={() => setIsUploadModalOpen(true)}
        onOpenPresentation={() => setIsPresentationOpen(true)}
      />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full flex-1 py-8">
        {/* Sub Navigation Bar & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Grade & Mode Tabs */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 p-1.5 bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-200/90 shadow-xs w-full md:w-auto">
            <button
              onClick={() => setCurrentTab('overview-1')}
              className={`px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap ${
                currentTab === 'overview-1'
                  ? 'bg-indigo-600 text-white shadow-md scale-102 ring-2 ring-indigo-300'
                  : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/70'
              }`}
            >
              🗺️ 전체 개요 (1)
            </button>

            <button
              onClick={() => setCurrentTab('overview-2')}
              className={`px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap ${
                currentTab === 'overview-2'
                  ? 'bg-indigo-600 text-white shadow-md scale-102 ring-2 ring-indigo-300'
                  : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/70'
              }`}
            >
              🔄 나선형 플로우 (2)
            </button>

            <div className="h-5 w-px bg-slate-200 mx-1 hidden sm:block"></div>

            {curriculumData.map(item => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`px-3 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-md scale-102 ring-2 ring-indigo-400'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {item.grade}
                </button>
              );
            })}

            <div className="h-5 w-px bg-slate-200 mx-1 hidden sm:block"></div>

            <button
              onClick={() => setCurrentTab('timeline')}
              className={`px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap ${
                currentTab === 'timeline'
                  ? 'bg-emerald-600 text-white shadow-md scale-102 ring-2 ring-emerald-300'
                  : 'text-emerald-700 hover:bg-emerald-50/70'
              }`}
            >
              📅 마무리 로드맵
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72 flex-shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="주제, 차시, 윤리기준 검색..."
              className="w-full pl-10 pr-4 py-2 bg-white/90 border border-slate-200 rounded-xl text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-2xs transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                지우기
              </button>
            )}
          </div>
        </div>

        {/* Search Results View */}
        {matchingGrades && matchingGrades.length > 0 && (
          <div className="mb-8 p-5 bg-white rounded-3xl border border-indigo-200 shadow-sm animate-in fade-in">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-indigo-700">
                '{searchQuery}' 검색 결과 ({matchingGrades.length}건)
              </span>
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-slate-500 hover:text-slate-800"
              >
                검색 닫기
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {matchingGrades.map(m => (
                <div
                  key={m.id}
                  onClick={() => {
                    setCurrentTab(m.id);
                    setSearchQuery('');
                  }}
                  className="p-3.5 rounded-2xl bg-slate-50 hover:bg-indigo-50/60 border border-slate-200 hover:border-indigo-300 transition-all cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold text-indigo-600 block">
                      {m.grade} · {m.theme}
                    </span>
                    <h5 className="font-bold text-slate-900 text-sm">{m.projectTitle}</h5>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 1: Overview (1) - Image & Cards */}
        {currentTab === 'overview-1' && (
          <OverviewGrid
            overviewImageSrc={loadedImages[OVERVIEW_IMAGE_NAME] || null}
            onOpenLightbox={() =>
              handleOpenLightbox(
                loadedImages[OVERVIEW_IMAGE_NAME] || null,
                '전체 교육과정 요약 개요도',
                OVERVIEW_IMAGE_NAME
              )
            }
            onSelectGrade={gradeId => setCurrentTab(gradeId)}
            onOpenUploadModal={() => setIsUploadModalOpen(true)}
          />
        )}

        {/* Tab 2: Overview (2) - Spiral Flow */}
        {currentTab === 'overview-2' && (
          <TimelineFlow onSelectGrade={gradeId => setCurrentTab(gradeId)} />
        )}

        {/* Tab 3~9: Grade Details */}
        {currentGradeData && (
          <GradeDetail
            curriculum={currentGradeData}
            loadedImageSrc={loadedImages[currentGradeData.imageFileName] || null}
            onOpenLightbox={() =>
              handleOpenLightbox(
                loadedImages[currentGradeData.imageFileName] || null,
                `${currentGradeData.grade} 인포그래픽 원본`,
                currentGradeData.imageFileName,
                currentGradeData.id
              )
            }
            onOpenUploadModal={() => setIsUploadModalOpen(true)}
          />
        )}

        {/* Tab 10: Research School Timeline */}
        {currentTab === 'timeline' && <ResearchTimeline />}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 px-4 text-center text-xs text-slate-500 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 내리숲초등학교 인공지능윤리교육 내용체계표 및 프로젝트 흐름도</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>연구학교 마무리 여정</span>
            <span aria-hidden="true">·</span>
            <span>초등 인공지능 윤리교육과정</span>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="text-indigo-600 font-semibold hover:underline"
            >
              인포그래픽 파일 관리
            </button>
          </div>
        </div>
      </footer>

      {/* Lightbox Modal */}
      <ImageLightboxModal
        isOpen={lightboxState.isOpen}
        onClose={() => setLightboxState(prev => ({ ...prev, isOpen: false }))}
        imageSrc={lightboxState.imageSrc}
        imageAlt={lightboxState.imageAlt}
        imageFileName={lightboxState.filename}
        currentGradeId={lightboxState.gradeId}
        onSelectGrade={gradeId => {
          const target = curriculumData.find(c => c.id === gradeId);
          if (target) {
            handleOpenLightbox(
              loadedImages[target.imageFileName] || null,
              `${target.grade} 인포그래픽 원본`,
              target.imageFileName,
              target.id
            );
          }
        }}
      />

      {/* File Upload / Sync Modal */}
      <FileUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        loadedImages={loadedImages}
        onImagesUpdated={handleImagesUpdated}
        onClearImages={handleClearImages}
      />

      {/* Presentation Fullscreen Mode */}
      <PresentationMode
        isOpen={isPresentationOpen}
        onClose={() => setIsPresentationOpen(false)}
        loadedImages={loadedImages}
        onOpenLightbox={(src, alt, filename) => handleOpenLightbox(src, alt, filename)}
      />
    </div>
  );
}
