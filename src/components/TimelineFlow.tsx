import React from 'react';
import { curriculumData } from '../data/curriculumData';
import { ArrowRight, Layers, Sparkles, CheckCircle2 } from 'lucide-react';

interface TimelineFlowProps {
  onSelectGrade: (gradeId: string) => void;
}

export const TimelineFlow: React.FC<TimelineFlowProps> = ({ onSelectGrade }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Banner */}
      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-blue-950 rounded-3xl p-6 sm:p-8 md:p-10 text-white shadow-xl">
        <span className="bg-indigo-500/30 text-indigo-300 text-xs font-bold px-3 py-1 rounded-full border border-indigo-400/30 mb-3 inline-block">
          유치원 ~ 초등 6학년 나선형 성장 흐름도
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3">
          AI 윤리교육 나선형 타임라인 플로우
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
          유치원의 기초 윤리 인식에서 출발하여 학년이 올라갈수록 사회적 관계(3~4학년)와 미래 기술의 심화 딜레마 및 알고리즘 검증(5~6학년)으로 확장되는 교육과정 흐름입니다.
        </p>

        {/* Growth Continuum Bar */}
        <div className="mt-8 pt-6 border-t border-slate-800">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block mb-3">
            단계별 교육과정 심화 단계
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/80">
              <span className="text-xs font-extrabold text-pink-400 block mb-1">
                1단계 : 일상과 기초 습관 (유치원 ~ 2학년)
              </span>
              <p className="text-xs text-slate-300">
                인공지능과 우리생활 · 책임성, 공공성, 다양성 존중, 프라이버시 보호의 첫걸음
              </p>
            </div>
            <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/80">
              <span className="text-xs font-extrabold text-blue-400 block mb-1">
                2단계 : 사회적 관계와 연대 (3 ~ 4학년)
              </span>
              <p className="text-xs text-slate-300">
                인공지능과 사회생활 · 인권 보장, 사회적 연대성, 딥페이크 및 침해금지 원칙
              </p>
            </div>
            <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/80">
              <span className="text-xs font-extrabold text-teal-400 block mb-1">
                3단계 : 미래 기술과 알고리즘 검증 (5 ~ 6학년)
              </span>
              <p className="text-xs text-slate-300">
                인공지능과 미래생활 · 안전성, 데이터 편향 관리, 설명 가능한 투명성 확보
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Vertical Interactive Spiral Cards */}
      <div className="space-y-4 sm:space-y-6">
        {curriculumData.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => onSelectGrade(item.id)}
            className="group relative flex flex-col md:flex-row items-center md:items-start cursor-pointer bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs hover:shadow-xl hover:border-indigo-400 transition-all"
          >
            {/* Grade Node Badge */}
            <div className="flex items-center md:flex-col md:w-24 flex-shrink-0 mb-4 md:mb-0 mr-0 md:mr-6">
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color.from} ${item.color.to} text-white font-black text-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
              >
                {item.grade}
              </div>
              {idx < curriculumData.length - 1 && (
                <div className="hidden md:block w-0.5 h-16 bg-slate-200 my-2 group-hover:bg-indigo-300 transition-colors"></div>
              )}
            </div>

            {/* Content Area */}
            <div className="flex-grow w-full">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-extrabold ${item.color.badge}`}>
                    {item.theme}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    {item.ageGroup}
                  </span>
                </div>
                <span className="text-xs font-bold text-slate-400 font-mono">
                  {item.duration}
                </span>
              </div>

              <span className="text-xs font-bold text-indigo-600 block mb-1">
                {item.slogan}
              </span>
              <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl mb-2 group-hover:text-indigo-600 transition-colors">
                {item.projectTitle}
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm mb-4 leading-relaxed">
                {item.description}
              </p>

              {/* 4-Step Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                {item.activities.map((act, aIdx) => (
                  <div
                    key={aIdx}
                    className="p-2 rounded-xl bg-slate-50 border border-slate-200/70 text-center"
                  >
                    <span className="text-[10px] font-extrabold text-indigo-600 block">
                      {act.step}
                    </span>
                    <span className="text-xs font-bold text-slate-800 truncate block mt-0.5">
                      {act.stageName}
                    </span>
                  </div>
                ))}
              </div>

              {/* Card Bottom: Core Standards & CTA */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                <div className="flex flex-wrap gap-1.5">
                  {item.coreStandards.map(std => (
                    <span
                      key={std}
                      className="px-2 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-700"
                    >
                      #{std}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-1 text-xs font-extrabold text-indigo-600 group-hover:translate-x-1 transition-transform">
                  <span>프로젝트 전체 보기</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
