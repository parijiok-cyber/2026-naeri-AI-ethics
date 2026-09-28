import React from 'react';
import { curriculumData, OVERVIEW_IMAGE_NAME } from '../data/curriculumData';
import { ZoomIn, ArrowRight, FileImage, Sparkles, CheckCircle2, Upload } from 'lucide-react';

interface OverviewGridProps {
  overviewImageSrc: string | null;
  onOpenLightbox: () => void;
  onSelectGrade: (gradeId: string) => void;
  onOpenUploadModal: () => void;
}

export const OverviewGrid: React.FC<OverviewGridProps> = ({
  overviewImageSrc,
  onOpenLightbox,
  onSelectGrade,
  onOpenUploadModal,
}) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-blue-950 rounded-3xl p-6 sm:p-8 md:p-10 text-white shadow-xl">
        <span className="bg-indigo-500/30 text-indigo-300 text-xs font-bold px-3 py-1 rounded-full border border-indigo-400/30 mb-3 inline-block">
          연구학교 운영교사 정리본
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3">
          학년별 인공지능 윤리 프로젝트 개요 한눈에
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
          유치원부터 6학년까지 프로젝트의 주제, 핵심 윤리 기준, 대표 활동, 최종 산출물을 전체 개요를 통해 살펴봅니다.
        </p>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800 text-xs">
          <div>
            <span className="text-slate-400 block mb-0.5">대상 학년</span>
            <span className="text-white font-bold text-base sm:text-lg">유치원 ~ 6학년</span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">프로젝트 시수</span>
            <span className="text-white font-bold text-base sm:text-lg">학년별 20차시</span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">기개발 교육자료</span>
            <span className="text-white font-bold text-base sm:text-lg">8종 100% 연계</span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">최종 산출물</span>
            <span className="text-white font-bold text-base sm:text-lg">7종 실천 결과물</span>
          </div>
        </div>
      </div>

      {/* Overview 1: Image Section */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              📊 전체 교육과정 요약 개요도 ({OVERVIEW_IMAGE_NAME})
            </span>
          </div>

          <div className="flex items-center gap-2">
            {overviewImageSrc ? (
              <button
                onClick={onOpenLightbox}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span>클릭하여 확대 보기</span>
              </button>
            ) : (
              <button
                onClick={onOpenUploadModal}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>{OVERVIEW_IMAGE_NAME} 등록하기</span>
              </button>
            )}
          </div>
        </div>

        {/* High-res Image or Interactive Fallback */}
        <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-950 shadow-inner flex items-center justify-center min-h-[380px] p-2 relative group">
          {overviewImageSrc ? (
            <div
              onClick={onOpenLightbox}
              className="cursor-zoom-in relative w-full flex items-center justify-center"
            >
              <img
                src={overviewImageSrc}
                alt="유치원부터 6학년까지 인공지능 윤리 프로젝트 개요"
                className="w-full max-h-[750px] object-contain transition-transform duration-300 group-hover:scale-[1.008]"
              />
              <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-slate-950/80 text-white text-xs font-bold px-4 py-2 rounded-xl backdrop-blur-sm border border-slate-700 flex items-center gap-2 shadow-2xl">
                  <ZoomIn className="w-4 h-4 text-indigo-400" />
                  클릭하여 고화질 확대 뷰어로 보기
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center p-8 max-w-md">
              <FileImage className="w-12 h-12 text-slate-500 mx-auto mb-3" />
              <h4 className="font-bold text-white text-base mb-1">
                {OVERVIEW_IMAGE_NAME} 파일 연결 대기 중
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                `{OVERVIEW_IMAGE_NAME}` 원본 파일이 등록되면 원본 인쇄용 인포그래픽을 고해상도로 열람할 수 있습니다.
              </p>
              <button
                onClick={onOpenUploadModal}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md inline-flex items-center gap-2"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>파일 업로드 및 연결</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Grid of 7 Grades Cards */}
      <div>
        <div className="mb-4">
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
            학년별 핵심 요약 카드
          </h3>
          <p className="text-xs text-slate-500">
            각 학년 카드를 클릭하시면 해당 학년의 원본 인포그래픽과 20차시 전체 세부 계획을 확인하실 수 있습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {curriculumData.map(item => (
            <div
              key={item.id}
              onClick={() => onSelectGrade(item.id)}
              className="group bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-xl hover:border-indigo-400 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color.from} ${item.color.to} text-white font-black text-sm flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}
                  >
                    {item.grade}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400">
                    {item.duration}
                  </span>
                </div>

                <span className="text-xs font-bold text-indigo-600 block mb-1">
                  {item.slogan}
                </span>
                <h4 className="font-extrabold text-slate-900 text-base mb-2 group-hover:text-indigo-600 transition-colors line-clamp-1">
                  {item.projectTitle}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                  {item.description}
                </p>

                {/* Core Standards Badges */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {item.coreStandards.map(std => (
                    <span
                      key={std}
                      className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700"
                    >
                      #{std}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium truncate max-w-[170px]">
                  산출물: {item.finalProduct.split('+')[0].trim()}
                </span>
                <span className="text-indigo-600 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  상세보기 <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
