import React, { useState } from 'react';
import { GradeCurriculum } from '../types/curriculum';
import { InteractiveVectorDiagram } from './InteractiveVectorDiagram';
import {
  ZoomIn,
  Download,
  Upload,
  Layers,
  Sparkles,
  HelpCircle,
  Award,
  CheckCircle2,
  FileImage,
  ArrowRight,
  Filter,
} from 'lucide-react';

interface GradeDetailProps {
  curriculum: GradeCurriculum;
  loadedImageSrc: string | null;
  onOpenLightbox: () => void;
  onOpenUploadModal: () => void;
}

export const GradeDetail: React.FC<GradeDetailProps> = ({
  curriculum,
  loadedImageSrc,
  onOpenLightbox,
  onOpenUploadModal,
}) => {
  // Default to interactive diagram so content is IMMEDIATELY visible without requiring any file upload!
  const [viewMode, setViewMode] = useState<'image' | 'interactive'>(
    loadedImageSrc ? 'image' : 'interactive'
  );
  const [lessonFilter, setLessonFilter] = useState<'all' | '기개발' | '신규' | '흡수'>('all');

  const filteredLessons = curriculum.lessons?.filter(l => {
    if (lessonFilter === 'all') return true;
    return l.type === lessonFilter;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Grade Hero Banner */}
      <div
        className={`rounded-3xl p-6 sm:p-8 md:p-10 text-white shadow-xl relative overflow-hidden bg-gradient-to-r ${curriculum.color.from} ${curriculum.color.to}`}
      >
        <div className="relative z-10 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-black/25 text-white backdrop-blur-xs">
              {curriculum.ageGroup}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/20 text-white backdrop-blur-xs">
              {curriculum.duration}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white/90">
              대주제: {curriculum.theme}
            </span>
          </div>

          <span className="text-sm font-bold text-white/90 block mb-1">
            ✨ {curriculum.slogan}
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight mb-3">
            [{curriculum.grade}] {curriculum.projectTitle}
          </h2>
          <p className="text-white/90 text-sm sm:text-base leading-relaxed mb-6 max-w-3xl">
            {curriculum.description}
          </p>

          {/* Core Standards */}
          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/20">
            <span className="text-xs font-bold text-white/80 self-center mr-1">
              핵심 윤리기준:
            </span>
            {curriculum.coreStandards.map(std => (
              <span
                key={std}
                className="inline-flex items-center px-3 py-1 rounded-xl text-xs font-bold bg-white/90 text-slate-800 shadow-xs"
              >
                #{std}
              </span>
            ))}
            {curriculum.relatedStandards &&
              curriculum.relatedStandards.map(std => (
                <span
                  key={std}
                  className="inline-flex items-center px-2.5 py-1 rounded-xl text-xs font-medium bg-black/20 text-white/90 border border-white/20"
                >
                  연계: #{std}
                </span>
              ))}
          </div>
        </div>
      </div>

      {/* View Mode Switcher */}
      <div className="flex items-center justify-between flex-wrap gap-3 bg-white p-2.5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setViewMode('interactive')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              viewMode === 'interactive'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>인터랙티브 웹 다이어그램</span>
          </button>
          <button
            onClick={() => setViewMode('image')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              viewMode === 'image'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FileImage className="w-4 h-4" />
            <span>원본 PNG 스캔 뷰어</span>
            {loadedImageSrc && (
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            )}
          </button>
        </div>

        <div className="flex items-center gap-2">
          {loadedImageSrc && (
            <button
              onClick={onOpenLightbox}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-xl transition-colors"
            >
              <ZoomIn className="w-3.5 h-3.5" />
              <span>전체화면 돋보기</span>
            </button>
          )}
          <button
            onClick={onOpenUploadModal}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>파일 관리</span>
          </button>
        </div>
      </div>

      {/* Mode 1: Interactive Vector Diagram View (Default, 100% available without upload) */}
      {viewMode === 'interactive' && (
        <InteractiveVectorDiagram
          curriculum={curriculum}
          onOpenLightbox={onOpenLightbox}
          hasUploadedImage={!!loadedImageSrc}
        />
      )}

      {/* Mode 2: Original Image View */}
      {viewMode === 'image' && (
        <div className="bg-slate-900 rounded-3xl p-4 sm:p-6 shadow-xl border border-slate-800 text-white">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <h3 className="font-bold text-sm sm:text-base">
                {curriculum.grade} 인공지능 윤리교육 흐름도 원본 인포그래픽
              </h3>
              <span className="text-xs text-slate-400 font-mono">
                ({curriculum.imageFileName})
              </span>
            </div>

            <div className="flex items-center gap-2">
              {loadedImageSrc ? (
                <button
                  onClick={onOpenLightbox}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded-xl transition-colors shadow-sm"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>클릭하여 확대 / 전체화면</span>
                </button>
              ) : null}
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center p-2 relative group min-h-[400px]">
            {loadedImageSrc ? (
              <div
                onClick={onOpenLightbox}
                className="cursor-zoom-in relative w-full flex items-center justify-center"
              >
                <img
                  src={loadedImageSrc}
                  alt={`${curriculum.grade} 인포그래픽 원본`}
                  className="w-full max-h-[800px] object-contain transition-transform duration-300 group-hover:scale-[1.008]"
                />
                <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-slate-950/80 text-white text-xs font-bold px-4 py-2 rounded-xl backdrop-blur-sm border border-slate-700 flex items-center gap-2 shadow-2xl">
                    <ZoomIn className="w-4 h-4 text-indigo-400" />
                    클릭하여 고화질 확대 뷰어로 보기
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center p-8 max-w-lg">
                <div className="w-14 h-14 rounded-2xl bg-indigo-900/60 text-indigo-300 flex items-center justify-center mx-auto mb-4 border border-indigo-700/50">
                  <FileImage className="w-7 h-7" />
                </div>
                <h4 className="text-base font-bold text-white mb-2">
                  인터랙티브 웹 다이어그램으로 모든 내용을 보실 수 있습니다
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  웹사이트에 {curriculum.grade}의 4단계 성장 흐름, 20차시 계획, 기개발 자료 8종, 핵심 질문 및 산출물이 이미 완벽하게 탑재되어 있습니다. GitHub의 `public/` 디렉터리에 `{curriculum.imageFileName}` 파일을 넣으시면 이 탭에서 원본 스캔본도 바로 열람하실 수 있습니다.
                </p>
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => setViewMode('interactive')}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md inline-flex items-center gap-2"
                  >
                    <Layers className="w-4 h-4" />
                    <span>웹 다이어그램 보기</span>
                  </button>
                  <button
                    onClick={onOpenUploadModal}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition-colors border border-slate-700"
                  >
                    파일 관리
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4-Step Process Breakdown Cards */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-600" />
              <span>4단계 성장 흐름 (Build ➔ Analyse ➔ Solve ➔ Execute)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              생각하고 경험하는 첫 단계부터 문제를 분석하고, 약속을 만들어 실천하는 완성 단계까지의 흐름입니다.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {curriculum.activities.map((act, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black text-indigo-700 bg-indigo-100/70 px-2.5 py-0.5 rounded-md">
                    {act.step}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    {act.stageName}
                  </span>
                </div>
                <h4 className="font-extrabold text-slate-900 text-base mb-2">
                  {act.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {act.desc}
                </p>

                {act.details && act.details.length > 0 && (
                  <ul className="mt-3 space-y-1 pt-3 border-t border-slate-200/60 text-xs text-slate-600">
                    {act.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {act.output && (
                <div className="mt-4 pt-3 border-t border-slate-200">
                  <span className="text-[11px] font-bold text-slate-500 block mb-0.5">
                    산출물
                  </span>
                  <span className="text-xs font-bold text-indigo-900 bg-indigo-50/70 px-2.5 py-1 rounded-lg inline-block">
                    {act.output}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 20-Lesson Detailed Curriculum Table (For 1~6 Grades) */}
      {curriculum.lessons && curriculum.lessons.length > 0 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                20차시 프로젝트 세부 차시 구성표
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                기개발 8종 자료 활용, 신규 개발 및 프로젝트 차시 흡수 현황을 확인하실 수 있습니다.
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setLessonFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  lessonFilter === 'all'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                전체 ({curriculum.lessons.length})
              </button>
              <button
                onClick={() => setLessonFilter('기개발')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  lessonFilter === '기개발'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-blue-700'
                }`}
              >
                기개발 활용
              </button>
              <button
                onClick={() => setLessonFilter('신규')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  lessonFilter === '신규'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-emerald-700'
                }`}
              >
                신규 개발
              </button>
              <button
                onClick={() => setLessonFilter('흡수')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  lessonFilter === '흡수'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-amber-700'
                }`}
              >
                차시 흡수
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-bold">
                  <th className="pb-3 w-16 text-center">차시</th>
                  <th className="pb-3">활동 주제 및 내용</th>
                  <th className="pb-3 w-28 text-center">자료 구분</th>
                  <th className="pb-3 w-36">연계 카테고리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLessons?.map((lesson, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 text-center font-bold text-slate-700 font-mono">
                      {lesson.period}차시
                    </td>
                    <td className="py-3 font-semibold text-slate-900">
                      {lesson.title}
                    </td>
                    <td className="py-3 text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-md text-[11px] font-bold ${
                          lesson.type === '기개발'
                            ? 'bg-blue-100 text-blue-800'
                            : lesson.type === '신규'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {lesson.type === '기개발'
                          ? '기개발 활용'
                          : lesson.type === '신규'
                          ? '신규 개발'
                          : '차시 흡수'}
                      </span>
                    </td>
                    <td className="py-3 text-slate-500 text-xs">
                      {lesson.categoryName || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Core Question & Final Product Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-amber-50/70 border border-amber-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full mb-3 inline-block">
              💡 프로젝트 핵심 질문
            </span>
            <p className="text-slate-900 font-bold text-base sm:text-lg leading-relaxed mt-2">
              {curriculum.coreQuestion}
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-amber-200/60 text-xs text-amber-800">
            생각한 것을 약속으로, 약속한 것을 실천으로 연결하는 핵심 탐구 질문입니다.
          </div>
        </div>

        <div className="bg-indigo-50/70 border border-indigo-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-indigo-800 bg-indigo-100 px-3 py-1 rounded-full mb-3 inline-block">
              🏆 프로젝트 최종 산출물
            </span>
            <p className="text-slate-900 font-bold text-base sm:text-lg leading-relaxed mt-2">
              {curriculum.finalProduct}
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-indigo-200/60 text-xs text-indigo-800">
            20차시 수업을 통해 학생들이 직접 제작하고 공유하는 구체적 산출물입니다.
          </div>
        </div>
      </div>

      {/* Design Principles / Standards Checklist */}
      {curriculum.designPrinciples && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>배운 기준을 적용하여 AI를 점검해요 (체크리스트)</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {curriculum.designPrinciples.map((principle, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70 text-xs sm:text-sm text-slate-800"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="font-semibold">{principle}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
