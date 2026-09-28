import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2, FileText, Layers, ZoomIn } from 'lucide-react';
import { curriculumData, OVERVIEW_IMAGE_NAME } from '../data/curriculumData';

interface PresentationModeProps {
  isOpen: boolean;
  onClose: () => void;
  loadedImages: Record<string, string>;
  onOpenLightbox: (src: string, alt: string, filename: string) => void;
}

export const PresentationMode: React.FC<PresentationModeProps> = ({
  isOpen,
  onClose,
  loadedImages,
  onOpenLightbox,
}) => {
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const [showNotes, setShowNotes] = useState<boolean>(true);

  // Slides structure:
  // 0: Title & Intro
  // 1: Overview 1 (Image)
  // 2: Overview 2 (Spiral Flow)
  // 3~9: Grade 0~6
  // 10: Research Timeline
  const totalSlides = 11;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        setSlideIndex(prev => Math.min(prev + 1, totalSlides - 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        setSlideIndex(prev => Math.max(prev - 1, 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const currentGrade = slideIndex >= 3 && slideIndex <= 9 ? curriculumData[slideIndex - 3] : null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="연구학교 보고회 발표 모드"
      className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col overflow-hidden animate-in fade-in duration-150"
    >
      {/* Top Slide Control Bar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="font-extrabold text-sm text-indigo-400">
            내리숲초등학교 AI 윤리교육 연구학교 발표 슬라이드
          </span>
          <span className="text-xs text-slate-400 bg-slate-800 px-2.5 py-0.5 rounded-full font-mono tabular-nums">
            {slideIndex + 1} / {totalSlides}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNotes(prev => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
              showNotes
                ? 'bg-indigo-950 text-indigo-300 border-indigo-700'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>발표자 메모</span>
          </button>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors ml-2"
            title="발표 모드 종료 (ESC)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Slide Presentation Stage */}
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 p-6 md:p-10 flex items-center justify-center overflow-y-auto">
          {/* Slide 0: Cover */}
          {slideIndex === 0 && (
            <div className="text-center max-w-3xl space-y-6">
              <span className="inline-block bg-indigo-500/20 text-indigo-300 text-sm font-bold px-4 py-1.5 rounded-full border border-indigo-400/30">
                2026 내리숲초등학교 인공지능윤리교육 연구학교
              </span>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">
                학년별 <span className="text-indigo-400">인공지능 윤리교육</span> 프로젝트
              </h1>
              <p className="text-lg md:text-xl text-slate-300 font-medium">
                작은 질문에서 시작해, 더 공정하고 따뜻하며 신뢰할 수 있는 AI를 만들어가는 우리!
              </p>
              <div className="pt-8">
                <button
                  onClick={() => setSlideIndex(1)}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg inline-flex items-center gap-2"
                >
                  <span>발표 시작하기</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Slide 1: Overview 1 (Image) */}
          {slideIndex === 1 && (
            <div className="w-full max-w-5xl space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl md:text-3xl font-black">
                  01. 학년별 인공지능 윤리 프로젝트 개요 한눈에
                </h2>
                <span className="text-xs text-slate-400 font-mono">
                  {OVERVIEW_IMAGE_NAME}
                </span>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-center min-h-[500px]">
                {loadedImages[OVERVIEW_IMAGE_NAME] ? (
                  <img
                    src={loadedImages[OVERVIEW_IMAGE_NAME]}
                    alt="개요 한눈에"
                    className="max-h-[65vh] object-contain rounded-lg shadow-xl cursor-zoom-in"
                    onClick={() =>
                      onOpenLightbox(
                        loadedImages[OVERVIEW_IMAGE_NAME],
                        '전체 교육과정 개요도',
                        OVERVIEW_IMAGE_NAME
                      )
                    }
                  />
                ) : (
                  <div className="text-center p-8">
                    <p className="font-bold text-lg mb-2">
                      {OVERVIEW_IMAGE_NAME} 연결 안내
                    </p>
                    <p className="text-sm text-slate-400">
                      상단 '원본 PNG' 메뉴에서 해당 파일을 등록하시면 슬라이드에 즉시 고화질로 반영됩니다.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Slide 2: Overview 2 (Spiral Flow) */}
          {slideIndex === 2 && (
            <div className="w-full max-w-5xl space-y-6">
              <h2 className="text-2xl md:text-3xl font-black">
                02. 유치원 ~ 초등 6학년 나선형 성장 흐름도
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                  <span className="text-pink-400 text-xs font-bold block mb-1">
                    유치원 ~ 2학년군
                  </span>
                  <h3 className="font-black text-lg mb-2">인공지능과 우리생활</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    놀이와 경험 중심으로 일상 속 인공지능의 진위를 구별하고, 개인정보 보호 및 공공성의 기초 약속을 다집니다.
                  </p>
                </div>
                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                  <span className="text-blue-400 text-xs font-bold block mb-1">
                    3 ~ 4학년군
                  </span>
                  <h3 className="font-black text-lg mb-2">인공지능과 사회생활</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    인권 보장과 사회적 연대를 학습하고, 딥페이크 등 침해금지 기준과 따뜻한 AI 로봇 및 캠페인을 제작합니다.
                  </p>
                </div>
                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                  <span className="text-teal-400 text-xs font-bold block mb-1">
                    5 ~ 6학년군
                  </span>
                  <h3 className="font-black text-lg mb-2">인공지능과 미래생활</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    안전성, 데이터 편향, 투명성과 추천 알고리즘을 분석하고 신뢰할 수 있는 AI 판단 가이드를 직접 세웁니다.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Slide 3~9: Grade Details */}
          {currentGrade && (
            <div className="w-full max-w-5xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-indigo-400 block mb-1">
                    {currentGrade.ageGroup} · {currentGrade.duration}
                  </span>
                  <h2 className="text-2xl md:text-4xl font-black">
                    [{currentGrade.grade}] {currentGrade.projectTitle}
                  </h2>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  {currentGrade.imageFileName}
                </span>
              </div>

              {/* Image viewer inside slide */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-center min-h-[480px]">
                {loadedImages[currentGrade.imageFileName] ? (
                  <img
                    src={loadedImages[currentGrade.imageFileName]}
                    alt={currentGrade.grade}
                    className="max-h-[62vh] object-contain rounded-lg shadow-xl cursor-zoom-in"
                    onClick={() =>
                      onOpenLightbox(
                        loadedImages[currentGrade.imageFileName],
                        `${currentGrade.grade} 인포그래픽`,
                        currentGrade.imageFileName
                      )
                    }
                  />
                ) : (
                  <div className="text-center p-8 max-w-md">
                    <p className="font-bold text-base mb-1">
                      {currentGrade.imageFileName} 이미지
                    </p>
                    <p className="text-xs text-slate-400 mb-4">
                      {currentGrade.description}
                    </p>
                    <div className="p-3 bg-slate-800/80 rounded-xl text-xs text-indigo-300 font-semibold text-left">
                      💡 핵심 질문: {currentGrade.coreQuestion}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Slide 10: Research Finalization Timeline */}
          {slideIndex === 10 && (
            <div className="w-full max-w-5xl space-y-6">
              <h2 className="text-2xl md:text-3xl font-black">
                연구학교 마무리 타임라인 & 공동 작업 로드맵
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-900 p-6 rounded-2xl border border-amber-500/50">
                  <span className="bg-amber-500 text-slate-950 font-black text-xs px-2.5 py-1 rounded-md mb-3 inline-block">
                    1단계 : 추석 전까지
                  </span>
                  <h3 className="text-lg font-bold mb-2">모으고, 만들고, 초안을 잡는 시기</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    보고서 초안, 교재 초안, 캔바 발표 자료, 수업 촬영 원본 영상, 인터뷰 초안, 캐릭터 시제품, 설문·피드백 데이터베이스 수합
                  </p>
                </div>
                <div className="bg-slate-900 p-6 rounded-2xl border border-emerald-500/50">
                  <span className="bg-emerald-500 text-slate-950 font-black text-xs px-2.5 py-1 rounded-md mb-3 inline-block">
                    2단계 : 추석 후
                  </span>
                  <h3 className="text-lg font-bold mb-2">다듬고, 편집하고, 최종 완성하는 시기</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    수업 영상 차시별 최종본, 인터뷰 영상 마스터본, 포토존 및 굿즈 완성, 설문 분석 반영한 보고서·교재·캔바 최종 정리
                  </p>
                </div>
              </div>
              <div className="p-4 bg-indigo-950/60 border border-indigo-800/60 rounded-xl text-center text-xs text-indigo-200">
                “추석 전까지 재료를 모두 모으고, 추석 이후에는 그 재료를 하나의 연구학교 성과로 완성합니다.”
              </div>
            </div>
          )}
        </div>

        {/* Presenter Notes Sidebar */}
        {showNotes && (
          <div className="w-80 border-l border-slate-800 bg-slate-900/95 p-6 flex flex-col justify-between hidden lg:flex">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                발표자 가이드 & 핵심 발문
              </span>
              {slideIndex === 0 && (
                <div className="text-xs text-slate-300 space-y-2">
                  <p>• 내리숲초 연구학교의 핵심 철학 안내</p>
                  <p>• 유치원부터 6학년까지 연계된 체계적 윤리교육 흐름 소개</p>
                </div>
              )}
              {slideIndex === 1 && (
                <div className="text-xs text-slate-300 space-y-2">
                  <p>• 7개 학년별 핵심 주제 및 8종 기개발 자료 100% 활용 구조 강조</p>
                  <p>• 학년별 20차시 프로젝트 산출물 종합 개요</p>
                </div>
              )}
              {slideIndex === 2 && (
                <div className="text-xs text-slate-300 space-y-2">
                  <p>• 3개 학교급 성장 구간의 점진적 심화 구조 설명</p>
                  <p>• 놀이 ➔ 사회적 공감 ➔ 기술 검증으로 이어지는 나선형 교육과정</p>
                </div>
              )}
              {currentGrade && (
                <div className="text-xs text-slate-300 space-y-3">
                  <div>
                    <span className="font-bold text-indigo-400 block mb-1">핵심 질문:</span>
                    <p className="italic">{currentGrade.coreQuestion}</p>
                  </div>
                  <div>
                    <span className="font-bold text-indigo-400 block mb-1">최종 산출물:</span>
                    <p>{currentGrade.finalProduct}</p>
                  </div>
                  <div>
                    <span className="font-bold text-indigo-400 block mb-1">핵심 윤리 기준:</span>
                    <p>{currentGrade.coreStandards.join(', ')}</p>
                  </div>
                </div>
              )}
              {slideIndex === 10 && (
                <div className="text-xs text-slate-300 space-y-2">
                  <p>• 교직원 협업 로드맵 공유</p>
                  <p>• 각 영역의 재료가 보고회 발표 및 보고서에 유기적으로 연결되는 점 강조</p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500">
              방향키(← / →) 또는 스페이스바로 슬라이드를 전환할 수 있습니다.
            </div>
          </div>
        )}
      </div>

      {/* Bottom Slide Navigation Bar */}
      <div className="px-6 py-3 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between">
        <button
          onClick={() => setSlideIndex(prev => Math.max(prev - 1, 0))}
          disabled={slideIndex === 0}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none rounded-xl transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>이전</span>
        </button>

        {/* Slide Indicators */}
        <div className="flex items-center gap-1.5 overflow-x-auto px-2">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => setSlideIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                slideIndex === i
                  ? 'bg-indigo-500 scale-125'
                  : 'bg-slate-700 hover:bg-slate-600'
              }`}
              title={`슬라이드 ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => setSlideIndex(prev => Math.min(prev + 1, totalSlides - 1))}
          disabled={slideIndex === totalSlides - 1}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 disabled:pointer-events-none text-white rounded-xl transition-colors"
        >
          <span>다음</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
