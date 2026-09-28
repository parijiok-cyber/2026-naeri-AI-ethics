export type GradeId = '유치원' | '1학년' | '2학년' | '3학년' | '4학년' | '5학년' | '6학년';

export type LessonType = '기개발' | '신규' | '흡수';

export interface LessonItem {
  period: string; // e.g. "1", "2~3", "11~15"
  title: string;
  type: LessonType;
  categoryName?: string; // e.g. "공공성①", "프라이버시 보호"
}

export interface ActivityStep {
  step: string; // e.g. "1단계 Build"
  stageName: string; // e.g. "생각하고 판단해요"
  title: string;
  desc: string;
  output?: string;
  details?: string[];
}

export interface GradeCurriculum {
  id: GradeId;
  grade: string;
  ageGroup: string;
  theme: string;
  duration: string;
  slogan: string;
  coreStandards: string[];
  relatedStandards?: string[];
  projectTitle: string;
  description: string;
  imageFileName: string;
  color: {
    from: string;
    to: string;
    badge: string;
    border: string;
    text: string;
    lightBg: string;
  };
  coreQuestion: string;
  finalProduct: string;
  activities: ActivityStep[];
  lessons?: LessonItem[];
  predevelopedMaterials?: string[];
  designPrinciples?: string[];
  keyActions?: string[];
}

export interface TimelineTask {
  id: string;
  phase: 'pre-chuseok' | 'post-chuseok';
  category: string;
  taskTitle: string;
  assignee: string;
  description: string;
  completed: boolean;
}
