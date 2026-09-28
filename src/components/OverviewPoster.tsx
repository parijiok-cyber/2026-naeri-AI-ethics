import React from 'react';
import { curriculumData } from '../data/curriculumData';
import { Sparkles, ArrowRight, Layers, FileText, CheckCircle2, ShieldCheck, Heart, Search } from 'lucide-react';

interface OverviewPosterProps {
  onSelectGrade: (gradeId: string) => void;
}

export const OverviewPoster: React.FC<OverviewPosterProps> = ({ onSelectGrade }) => {
  return (
    <div className="bg-white rounded-3xl border-2 border-indigo-100 shadow-xl overflow-hidden p-4 sm:p-6 md:p-8">
      {/* Top Header of the Infographic */}
      <div className="text-center pb-6 border-b border-slate-100 relative">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2 text-xs font-semibold text-slate-500">
          <span className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            🌱 AI와 함께 더 나은 내일을 만드는 우리 교육
          </span>
          <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full font-bold border border-indigo-200">
            연구학교 운영용 교사용 정리본
          </span>
        </div>

        <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight mt-1 mb-2">
          학년별 <span className="text-indigo-600">인공지능 윤리 프로젝트</span> 개요 한눈에
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 font-medium">
          유치원부터 6학년까지 프로젝트의 주제, 핵심 윤리 기준, 대표 활동, 최종 산출물을 한눈에 살펴봅니다.
        </p>
      </div>

      {/* 7 Grades Cards Grid matching the exact layout of the infographic */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 my-6">
        {curriculumData.map((item, idx) => {
          return (
            <div
              key={item.id}
              onClick={() => onSelectGrade(item.id)}
              className="group bg-slate-50/70 hover:bg-white rounded-2xl border border-slate-200/90 hover:border-indigo-400 p-4 shadow-2xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Header ribbon of the grade */}
                <div
                  className={`p-2.5 rounded-xl bg-gradient-to-r ${item.color.from} ${item.color.to} text-white mb-3 shadow-xs flex items-center justify-between`}
                >
                  <span className="font-black text-base tracking-tight">{item.grade}</span>
                  <span className="text-[11px] font-bold text-white/90 bg-black/20 px-2 py-0.5 rounded-md backdrop-blur-xs">
                    {item.slogan}
                  </span>
                </div>

                {/* Project Theme */}
                <div className="mb-2.5">
                  <span className="text-[11px] font-bold text-slate-500 block mb-0.5">
                    📑 프로젝트 주제
                  </span>
                  <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm leading-snug group-hover:text-indigo-600 transition-colors">
                    {item.projectTitle}
                  </h4>
                </div>

                {/* Core Standards */}
                <div className="mb-2.5">
                  <span className="text-[11px] font-bold text-slate-500 block mb-1">
                    🛡️ 핵심 윤리 기준
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {item.coreStandards.map(std => (
                      <span
                        key={std}
                        className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-white text-indigo-700 border border-slate-200"
                      >
                        {std}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Activities */}
                <div className="mb-2.5">
                  <span className="text-[11px] font-bold text-slate-500 block mb-1">
                    ⚙️ 대표 활동
                  </span>
                  <ul className="text-[11px] text-slate-600 space-y-0.5">
                    {item.activities.map((act, aIdx) => (
                      <li key={aIdx} className="flex items-center gap-1.5 truncate">
                        <span className="w-1 h-1 rounded-full bg-slate-400 flex-shrink-0"></span>
                        <span className="truncate">{act.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Final Output */}
              <div className="pt-2.5 border-t border-slate-200/70 mt-2">
                <span className="text-[10px] font-bold text-slate-500 block">
                  🏆 최종 산출물
                </span>
                <p className="text-[11px] font-bold text-indigo-900 truncate">
                  {item.finalProduct}
                </p>
                <div className="mt-2 flex items-center justify-end text-[10px] font-bold text-indigo-600 group-hover:translate-x-0.5 transition-transform">
                  <span>자세히 보기 &rarr;</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Spiral Continuum Flow Ribbon (from the infographic) */}
      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-black text-slate-800 flex items-center gap-1.5">
            📊 학년별 성장 흐름
          </span>
          <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
            AI를 올바르게 배우고, 함께 생각하며, 더 나은 세상을 만들어가는 우리 학교!
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 text-center text-xs">
          <div
            onClick={() => onSelectGrade('유치원')}
            className="p-2 bg-white rounded-xl border border-rose-200 shadow-2xs hover:border-rose-400 cursor-pointer transition-colors"
          >
            <span className="text-[11px] font-extrabold text-rose-600 block">유치원</span>
            <span className="text-[10px] font-medium text-slate-600">AI 윤리 만나기</span>
          </div>

          <div
            onClick={() => onSelectGrade('1학년')}
            className="p-2 bg-white rounded-xl border border-amber-200 shadow-2xs hover:border-amber-400 cursor-pointer transition-colors"
          >
            <span className="text-[11px] font-extrabold text-amber-600 block">1학년</span>
            <span className="text-[10px] font-medium text-slate-600">AI 만나기</span>
          </div>

          <div
            onClick={() => onSelectGrade('2학년')}
            className="p-2 bg-white rounded-xl border border-emerald-200 shadow-2xs hover:border-emerald-400 cursor-pointer transition-colors"
          >
            <span className="text-[11px] font-extrabold text-emerald-600 block">2학년</span>
            <span className="text-[10px] font-medium text-slate-600">바르게 사용하기</span>
          </div>

          <div
            onClick={() => onSelectGrade('3학년')}
            className="p-2 bg-white rounded-xl border border-rose-200 shadow-2xs hover:border-rose-400 cursor-pointer transition-colors"
          >
            <span className="text-[11px] font-extrabold text-rose-600 block">3학년</span>
            <span className="text-[10px] font-medium text-slate-600">따뜻한 AI 만들기</span>
          </div>

          <div
            onClick={() => onSelectGrade('4학년')}
            className="p-2 bg-white rounded-xl border border-blue-200 shadow-2xs hover:border-blue-400 cursor-pointer transition-colors"
          >
            <span className="text-[11px] font-extrabold text-blue-600 block">4학년</span>
            <span className="text-[10px] font-medium text-slate-600">윤리 판단과 시민 약속</span>
          </div>

          <div
            onClick={() => onSelectGrade('5학년')}
            className="p-2 bg-white rounded-xl border border-purple-200 shadow-2xs hover:border-purple-400 cursor-pointer transition-colors"
          >
            <span className="text-[11px] font-extrabold text-purple-600 block">5학년</span>
            <span className="text-[10px] font-medium text-slate-600">인권 수호 AI 설계</span>
          </div>

          <div
            onClick={() => onSelectGrade('6학년')}
            className="p-2 bg-white rounded-xl border border-teal-200 shadow-2xs hover:border-teal-400 cursor-pointer transition-colors"
          >
            <span className="text-[11px] font-extrabold text-teal-600 block">6학년</span>
            <span className="text-[10px] font-medium text-slate-600">신뢰할 수 있는 AI 검증</span>
          </div>
        </div>

        <div className="mt-3 text-center text-xs font-bold text-slate-500 pt-2 border-t border-slate-200/60">
          “작은 질문에서 시작해, 더 공정하고 따뜻하며 신뢰할 수 있는 AI를 만들어가는 우리!”
        </div>
      </div>
    </div>
  );
};
