import React from 'react';
import { GradeCurriculum } from '../types/curriculum';
import { Sparkles, CheckCircle2, HelpCircle, Layers, ArrowRight, BookOpen, ShieldCheck } from 'lucide-react';

interface InteractiveVectorDiagramProps {
  curriculum: GradeCurriculum;
  onOpenLightbox: () => void;
  hasUploadedImage: boolean;
}

export const InteractiveVectorDiagram: React.FC<InteractiveVectorDiagramProps> = ({
  curriculum,
  onOpenLightbox,
  hasUploadedImage,
}) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6 sm:p-8">
      {/* Header section of infographic */}
      <div className="border-b border-slate-100 pb-6 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
              {curriculum.ageGroup}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
              {curriculum.duration}
            </span>
          </div>
          <span className="text-xs font-semibold text-slate-400">
            대주제: {curriculum.theme}
          </span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {curriculum.grade} 인공지능 윤리교육 프로젝트 흐름도
        </h3>
        <p className="text-sm text-slate-600 mt-1">
          {curriculum.description}
        </p>

        {/* Legend for 20 Lessons if applicable */}
        {curriculum.lessons && (
          <div className="flex flex-wrap items-center gap-3 mt-4 pt-3 border-t border-slate-100 text-xs font-medium text-slate-600">
            <span className="font-bold text-slate-800">차시 구분 범례:</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
              <span>기개발 자료 활용</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span>신규 개발 차시</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span>프로젝트 차시에 흡수</span>
            </div>
          </div>
        )}
      </div>

      {/* 4 Steps Flow Architecture */}
      <div className="mb-8">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-indigo-600" />
          <span>4단계 성장 여정 (Build ➔ Analyse ➔ Solve ➔ Execute)</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {curriculum.activities.map((act, idx) => (
            <div
              key={idx}
              className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200/80 hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-extrabold text-indigo-700 bg-indigo-100/70 px-2.5 py-0.5 rounded-md">
                    {act.step}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400">
                    Step {idx + 1}
                  </span>
                </div>
                <h5 className="font-extrabold text-slate-900 text-sm mb-1.5 leading-snug">
                  {act.stageName}
                </h5>
                <p className="font-bold text-xs text-indigo-900 mb-2">
                  {act.title}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {act.desc}
                </p>
              </div>

              {act.output && (
                <div className="mt-4 pt-3 border-t border-slate-200/60">
                  <span className="text-[11px] font-bold text-slate-500 block mb-0.5">
                    📌 대표 산출물
                  </span>
                  <p className="text-xs font-semibold text-indigo-800">
                    {act.output}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 20 Lessons Detail Matrix (For Grades 1~6) */}
      {curriculum.lessons && curriculum.lessons.length > 0 && (
        <div className="mb-8 bg-slate-50 rounded-2xl p-5 border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
              <span>20차시 세부 활동 매트릭스 (1차시 ~ 20차시)</span>
            </h4>
            <span className="text-xs text-slate-500">
              총 {curriculum.lessons.length}개 차시 블록
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2">
            {curriculum.lessons.map((lesson, idx) => {
              const typeColor =
                lesson.type === '기개발'
                  ? 'border-blue-200 bg-blue-50/70 text-blue-900'
                  : lesson.type === '신규'
                  ? 'border-emerald-200 bg-emerald-50/70 text-emerald-900'
                  : 'border-amber-200 bg-amber-50/70 text-amber-900';

              const badgeColor =
                lesson.type === '기개발'
                  ? 'bg-blue-600 text-white'
                  : lesson.type === '신규'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-amber-600 text-white';

              return (
                <div
                  key={idx}
                  className={`p-2.5 rounded-xl border flex flex-col justify-between text-xs transition-shadow hover:shadow-xs ${typeColor}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-black text-slate-900 text-xs">
                      {lesson.period}차시
                    </span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${badgeColor}`}>
                      {lesson.type}
                    </span>
                  </div>
                  <p className="font-semibold line-clamp-2 leading-snug">
                    {lesson.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Predeveloped Materials Section */}
      {curriculum.predevelopedMaterials && (
        <div className="mb-8">
          <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
            <span>연계 활용 기개발 교육 자료 ({curriculum.predevelopedMaterials.length}종)</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
            {curriculum.predevelopedMaterials.map((mat, idx) => (
              <div
                key={idx}
                className="p-3 bg-indigo-50/40 rounded-xl border border-indigo-100/80 text-xs text-indigo-950 font-medium flex items-start gap-2"
              >
                <span className="w-4 h-4 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{mat}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Core Principles & Questions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-slate-100">
        <div className="p-4 bg-amber-50/80 border border-amber-200/80 rounded-2xl">
          <span className="text-xs font-bold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-md inline-block mb-2">
            💡 핵심 탐구 질문
          </span>
          <p className="text-slate-900 font-bold text-sm leading-relaxed">
            {curriculum.coreQuestion}
          </p>
        </div>

        <div className="p-4 bg-emerald-50/80 border border-emerald-200/80 rounded-2xl">
          <span className="text-xs font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md inline-block mb-2">
            🏆 최종 산출물
          </span>
          <p className="text-slate-900 font-bold text-sm leading-relaxed">
            {curriculum.finalProduct}
          </p>
        </div>
      </div>
    </div>
  );
};
