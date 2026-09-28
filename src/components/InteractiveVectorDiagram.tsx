import React from 'react';
import { GradeCurriculum } from '../types/curriculum';
import {
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Layers,
  ArrowRight,
  BookOpen,
  ShieldCheck,
  Award,
  HeartHandshake,
  Lightbulb,
  CheckSquare,
} from 'lucide-react';

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
  const isKindergarten = curriculum.id === '유치원';

  return (
    <div className="bg-white rounded-3xl border-2 border-indigo-100 shadow-xl overflow-hidden p-4 sm:p-6 md:p-8 space-y-8">
      {/* 1. Infographic Poster Top Header */}
      <div className="text-center pb-6 border-b border-slate-100 relative">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            🌱 {curriculum.slogan}
          </span>
          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            {curriculum.duration} · 대주제: {curriculum.theme}
          </span>
        </div>

        <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight mt-1 mb-2">
          {curriculum.grade} <span className="text-indigo-600">인공지능 윤리교육 프로젝트</span> 흐름도
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-3xl mx-auto">
          {curriculum.description}
        </p>

        {curriculum.lessons && (
          <div className="flex flex-wrap items-center justify-center gap-4 mt-4 pt-3 border-t border-slate-100 text-xs font-bold">
            <span className="text-slate-600">차시 구분 범례:</span>
            <div className="flex items-center gap-1.5 text-blue-700">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
              <span>기개발 자료 활용</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-700">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span>신규 개발 차시</span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-700">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span>프로젝트 차시 흡수</span>
            </div>
          </div>
        )}
      </div>

      {/* 2. 4-Stage Architectural Flow Columns */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-xs sm:text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-600" />
            <span>
              {isKindergarten
                ? '4단계 놀이 활동 흐름 (Think ➔ Share ➔ Respect ➔ Protect)'
                : '4단계 성장 여정 (Build ➔ Analyse ➔ Solve ➔ Execute)'}
            </span>
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {curriculum.activities.map((act, idx) => {
            const stepColors = [
              { border: 'border-amber-300', bg: 'bg-amber-50/80', badge: 'bg-amber-500 text-white', text: 'text-amber-800' },
              { border: 'border-blue-300', bg: 'bg-blue-50/80', badge: 'bg-blue-600 text-white', text: 'text-blue-800' },
              { border: 'border-emerald-300', bg: 'bg-emerald-50/80', badge: 'bg-emerald-600 text-white', text: 'text-emerald-800' },
              { border: 'border-pink-300', bg: 'bg-pink-50/80', badge: 'bg-pink-600 text-white', text: 'text-pink-800' },
            ][idx % 4];

            return (
              <div
                key={idx}
                className={`rounded-2xl border-2 ${stepColors.border} ${stepColors.bg} p-4 sm:p-5 flex flex-col justify-between shadow-2xs`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-black px-2.5 py-0.5 rounded-md ${stepColors.badge}`}>
                      {act.step}
                    </span>
                    <span className="text-[11px] font-bold text-slate-500">
                      Step {idx + 1}
                    </span>
                  </div>

                  <h5 className="font-black text-slate-900 text-sm mb-1.5">
                    {act.stageName}
                  </h5>

                  <p className={`font-bold text-xs ${stepColors.text} mb-2 leading-snug`}>
                    {act.title}
                  </p>

                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    {act.desc}
                  </p>

                  {act.details && (
                    <div className="space-y-1 my-2 pt-2 border-t border-slate-200/60 text-[11px] text-slate-600">
                      {act.details.map((d, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-1">
                          <span className="font-bold text-slate-400">•</span>
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {act.output && (
                  <div className="mt-3 pt-3 border-t border-slate-200/80 bg-white/70 -mx-2 -mb-2 p-2.5 rounded-xl">
                    <span className="text-[10px] font-bold text-slate-500 block">
                      📌 산출물
                    </span>
                    <p className="text-xs font-bold text-indigo-950">
                      {act.output}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Kindergarten Specials (성장 흐름 & 운영 핵심) */}
      {isKindergarten && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Kindergarten Flow */}
          <div className="bg-emerald-50/60 rounded-2xl p-5 border border-emerald-200">
            <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md mb-3 inline-block">
              🌱 유치원 성장 흐름
            </span>
            <div className="grid grid-cols-2 gap-2 mt-2 text-xs text-slate-700">
              <div className="p-2.5 bg-white rounded-xl border border-emerald-200">
                <strong className="block text-emerald-700">1. 판단하기</strong>
                <span>생각하고 살펴보고</span>
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-blue-200">
                <strong className="block text-blue-700">2. 모두를 위해 사용하기</strong>
                <span>함께하는 마음으로</span>
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-teal-200">
                <strong className="block text-teal-700">3. 다름 존중하기</strong>
                <span>함께 살아가는 우리</span>
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-pink-200">
                <strong className="block text-pink-700">4. 정보 지키기</strong>
                <span>나와 친구를 위해</span>
              </div>
            </div>
          </div>

          {/* Kindergarten Core */}
          <div className="bg-amber-50/60 rounded-2xl p-5 border border-amber-200">
            <span className="text-xs font-black text-amber-800 bg-amber-100 px-2.5 py-1 rounded-md mb-3 inline-block">
              ⭐ 유치원 운영 핵심
            </span>
            <ul className="space-y-2 mt-2 text-xs font-semibold text-slate-800">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>기개발 자료 4종을 100% 그대로 활용</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>놀이 중심으로 AI 윤리의 자연스러운 기초 형성</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>생각하고 · 함께하고 · 존중하고 · 지키는 AI 생활 실천</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* 4. 20 Lessons Detail Matrix (For Grades 1~6) */}
      {curriculum.lessons && curriculum.lessons.length > 0 && (
        <div className="bg-slate-50/80 rounded-2xl p-4 sm:p-5 border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>20차시 프로젝트 세부 차시 구성표</span>
            </h4>
            <span className="text-xs font-semibold text-slate-500">
              총 {curriculum.lessons.length}개 차시
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2">
            {curriculum.lessons.map((lesson, idx) => {
              const typeColor =
                lesson.type === '기개발'
                  ? 'border-blue-200 bg-white text-blue-900'
                  : lesson.type === '신규'
                  ? 'border-emerald-200 bg-white text-emerald-900'
                  : 'border-amber-200 bg-white text-amber-900';

              const badgeColor =
                lesson.type === '기개발'
                  ? 'bg-blue-600 text-white'
                  : lesson.type === '신규'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-amber-600 text-white';

              return (
                <div
                  key={idx}
                  className={`p-2.5 rounded-xl border shadow-2xs flex flex-col justify-between text-xs ${typeColor}`}
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

      {/* 5. Predeveloped Materials 8-Pack (연계 활용 기개발 자료) */}
      {curriculum.predevelopedMaterials && (
        <div>
          <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            <span>활용하는 기개발 교육 자료 ({curriculum.predevelopedMaterials.length}종)</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
            {curriculum.predevelopedMaterials.map((mat, idx) => (
              <div
                key={idx}
                className="p-3 bg-white rounded-xl border border-indigo-100 shadow-2xs text-xs text-indigo-950 font-medium flex items-start gap-2.5"
              >
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-black flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-snug">{mat}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. Core Question, Final Product & Checklists */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
        <div className="p-4 sm:p-5 bg-amber-50/80 border border-amber-200 rounded-2xl flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-md inline-block mb-2">
              💡 프로젝트 핵심 질문
            </span>
            <p className="text-slate-900 font-bold text-sm sm:text-base leading-relaxed mt-1">
              {curriculum.coreQuestion}
            </p>
          </div>
          <span className="text-[11px] text-amber-700 font-medium mt-4 block">
            ⭐ 생각한 것을 약속으로, 약속한 것을 실천으로!
          </span>
        </div>

        <div className="p-4 sm:p-5 bg-indigo-50/80 border border-indigo-200 rounded-2xl flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-indigo-800 bg-indigo-100 px-2.5 py-1 rounded-md inline-block mb-2">
              🏆 프로젝트 최종 산출물
            </span>
            <p className="text-slate-900 font-bold text-sm sm:text-base leading-relaxed mt-1">
              {curriculum.finalProduct}
            </p>
          </div>
          <span className="text-[11px] text-indigo-700 font-medium mt-4 block">
            ⭐ 학년별 성취 목표가 반영된 실천 결과물
          </span>
        </div>
      </div>
    </div>
  );
};
