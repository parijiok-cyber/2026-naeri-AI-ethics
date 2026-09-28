import React, { useState, useEffect } from 'react';
import { initialTimelineTasks } from '../data/curriculumData';
import { TimelineTask } from '../types/curriculum';
import {
  Calendar,
  CheckCircle2,
  Clock,
  User,
  Sparkles,
  Filter,
  RotateCcw,
  CheckSquare,
  Square,
  Printer,
} from 'lucide-react';

const STORAGE_KEY = 'naerisoop_timeline_tasks_v1';

export const ResearchTimeline: React.FC = () => {
  const [tasks, setTasks] = useState<TimelineTask[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return initialTimelineTasks;
  });

  const [selectedAssignee, setSelectedAssignee] = useState<string>('all');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {}
  }, [tasks]);

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const resetTasks = () => {
    if (window.confirm('모든 체크리스트 상태를 초기값으로 되돌리시겠습니까?')) {
      setTasks(initialTimelineTasks);
    }
  };

  const preChuseokTasks = tasks.filter(t => t.phase === 'pre-chuseok');
  const postChuseokTasks = tasks.filter(t => t.phase === 'post-chuseok');

  const preCompletedCount = preChuseokTasks.filter(t => t.completed).length;
  const preProgress = Math.round((preCompletedCount / preChuseokTasks.length) * 100);

  const postCompletedCount = postChuseokTasks.filter(t => t.completed).length;
  const postProgress = Math.round((postCompletedCount / postChuseokTasks.length) * 100);

  const allAssignees = Array.from(
    new Set(tasks.flatMap(t => t.assignee.split(',').map(a => a.trim())))
  ).sort();

  const filterByAssignee = (taskList: TimelineTask[]) => {
    if (selectedAssignee === 'all') return taskList;
    return taskList.filter(t => t.assignee.includes(selectedAssignee));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Banner */}
      <div className="bg-gradient-to-br from-emerald-900 via-slate-900 to-teal-950 rounded-3xl p-6 sm:p-8 md:p-10 text-white shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <span className="bg-emerald-500/30 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-400/30">
            2026 내리숲초등학교 인공지능윤리교육 연구학교
          </span>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-800/80 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl border border-emerald-600 transition-colors shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>타임라인 인쇄 / PDF</span>
          </button>
        </div>

        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3">
          연구학교 마무리 타임라인 & 공동 작업 로드맵
        </h2>
        <p className="text-emerald-100 text-sm sm:text-base leading-relaxed max-w-3xl">
          추석 전까지는 각 영역의 '재료'를 모두 모으고, 추석 이후에는 그 재료를 하나의 연구학교 성과로 완성하는 시간입니다. 분석 결과가 보고서·교재·영상·캔바에 유기적으로 반영되는 협업 구조입니다.
        </p>

        {/* Progress Bars Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-emerald-800/80 text-xs">
          <div className="bg-emerald-950/60 p-4 rounded-2xl border border-emerald-800/50">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-amber-300">1단계 : 추석 전 (재료 모으기)</span>
              <span className="font-mono font-bold text-white tabular-nums">
                {preCompletedCount}/{preChuseokTasks.length} ({preProgress}%)
              </span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-amber-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${preProgress}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-emerald-950/60 p-4 rounded-2xl border border-emerald-800/50">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-teal-300">2단계 : 추석 후 (완성하기)</span>
              <span className="font-mono font-bold text-white tabular-nums">
                {postCompletedCount}/{postChuseokTasks.length} ({postProgress}%)
              </span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-emerald-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${postProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Reset Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          <span className="text-xs font-bold text-slate-500 flex items-center gap-1 pl-2">
            <Filter className="w-3.5 h-3.5" /> 담당자:
          </span>
          <button
            onClick={() => setSelectedAssignee('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedAssignee === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            전체 보기
          </button>
          {allAssignees.map(person => (
            <button
              key={person}
              onClick={() => setSelectedAssignee(person)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedAssignee === person
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {person}
            </button>
          ))}
        </div>

        <button
          onClick={resetTasks}
          className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
          title="초기 체크리스트로 복원"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>체크리스트 리셋</span>
        </button>
      </div>

      {/* Phase 1 & Phase 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Phase 1 Box */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between border-t-8 border-t-amber-500">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="bg-amber-100 text-amber-900 text-xs font-extrabold px-3 py-1 rounded-full">
                1단계 : 추석 전까지
              </span>
              <span className="text-xs font-bold text-slate-500">
                재료 모으기 및 초안 작성
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">
              “모으고, 만들고, 초안을 잡는 시기”
            </h3>
            <p className="text-xs font-bold text-indigo-700 bg-indigo-50 p-3 rounded-2xl mb-6 leading-relaxed">
              &rarr; 보고서 초안 / 교재 / 캔바 / 수업 원본 영상 / 인터뷰 초안 / 캐릭터 시제품 / 설문·피드백 수합
            </p>

            {/* Tasks list */}
            <div className="space-y-3">
              {filterByAssignee(preChuseokTasks).map(task => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                    task.completed
                      ? 'bg-slate-50/80 border-slate-200 opacity-70'
                      : 'bg-white border-amber-200 shadow-xs hover:border-amber-400'
                  }`}
                >
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      toggleTask(task.id);
                    }}
                    className="mt-0.5 text-amber-600 focus:outline-none flex-shrink-0"
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-300 hover:text-amber-500" />
                    )}
                  </button>

                  <div className="flex-grow">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                          {task.category}
                        </span>
                        <h4
                          className={`text-sm font-bold ${
                            task.completed ? 'line-through text-slate-400' : 'text-slate-900'
                          }`}
                        >
                          {task.taskTitle}
                        </h4>
                      </div>
                      <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full whitespace-nowrap">
                        {task.assignee}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {task.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-slate-500 text-center">
            핵심 산출물 초안 및 기초 데이터베이스 확보 완료 목표
          </div>
        </div>

        {/* Phase 2 Box */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between border-t-8 border-t-emerald-500">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="bg-emerald-100 text-emerald-900 text-xs font-extrabold px-3 py-1 rounded-full">
                2단계 : 추석 후
              </span>
              <span className="text-xs font-bold text-slate-500">
                다듬고 완성하기
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">
              “다듬고, 편집하고, 최종 완성하는 시기”
            </h3>
            <p className="text-xs font-bold text-emerald-800 bg-emerald-50 p-3 rounded-2xl mb-6 leading-relaxed">
              &rarr; 수업 영상 최종본 / 인터뷰 최종본 / 캐릭터·포토존·굿즈 최종 / 보고서·교재·캔바 최종 반영
            </p>

            {/* Tasks list */}
            <div className="space-y-3">
              {filterByAssignee(postChuseokTasks).map(task => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                    task.completed
                      ? 'bg-slate-50/80 border-slate-200 opacity-70'
                      : 'bg-white border-emerald-200 shadow-xs hover:border-emerald-400'
                  }`}
                >
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      toggleTask(task.id);
                    }}
                    className="mt-0.5 text-emerald-600 focus:outline-none flex-shrink-0"
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-300 hover:text-emerald-500" />
                    )}
                  </button>

                  <div className="flex-grow">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          {task.category}
                        </span>
                        <h4
                          className={`text-sm font-bold ${
                            task.completed ? 'line-through text-slate-400' : 'text-slate-900'
                          }`}
                        >
                          {task.taskTitle}
                        </h4>
                      </div>
                      <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full whitespace-nowrap">
                        {task.assignee}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {task.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-slate-500 text-center">
            최종 편집·완성 및 연구학교 성과 보고회 자료 확정
          </div>
        </div>
      </div>

      {/* Collaborative Message Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-6 sm:p-8 md:p-10 text-white shadow-xl text-center">
        <span className="bg-white/20 text-white text-xs font-extrabold px-3 py-1 rounded-full mb-3 inline-block">
          ✨ 연구학교 운영 공동 메시지
        </span>
        <p className="text-lg sm:text-2xl font-black leading-relaxed max-w-3xl mx-auto mb-3">
          “추석 전까지는 각 영역의 ‘재료’를 모두 모으고,<br className="hidden sm:inline" />
          추석 이후에는 그 재료를 하나의 연구학교 성과로 완성하는 시간입니다.”
        </p>
        <p className="text-amber-100 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
          이 일정은 분석 결과가 보고서·교재·영상·캔바에 다시 반영되는 구조입니다. 각자 따로 만드는 일이 아니라 마지막에 하나로 합쳐지는 공동 작업이라는 메시지를 기억해 주세요!
        </p>
      </div>
    </div>
  );
};
