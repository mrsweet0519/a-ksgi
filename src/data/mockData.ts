import type { 
  Zadankai, 
  YouthSchoolRecord, 
  MentoringMatch, 
  DepartmentMeeting, 
  OperationsMeeting,
  DashboardStats
} from '../types';

// --- 좌담회 더미 데이터 ---
export const mockZadankais: Zadankai[] = [
  {
    id: 'z1',
    date: '2026-04-15',
    sessionNumber: '4월 정기 좌담회',
    place: '제1회관',
    targetGroup: '여성부 전체',
    targetCount: 40,
    status: 'completed',
    attendees: [
      { id: 'a1', name: '김미소', type: '기존', attended: true, note: '활동 적극적', needsFollowUp: false },
      { id: 'a2', name: '이하늘', type: '신규', attended: true, note: '첫 참석, 관심 높음', needsFollowUp: true },
      { id: 'a3', name: '박지민', type: '기존', attended: true, needsFollowUp: false },
      { id: 'a4', name: '최유진', type: '신규', attended: false, note: '업무로 불참, 다음 주 연락 필요', needsFollowUp: true },
      { id: 'a5', name: '정다은', type: '기존', attended: true, needsFollowUp: false },
    ]
  },
  {
    id: 'z2',
    date: '2026-04-18',
    sessionNumber: '4월 지역 좌담회 (A지역)',
    place: '박영희님 댁',
    targetGroup: 'A지역',
    targetCount: 15,
    status: 'completed',
    attendees: [
      { id: 'a6', name: '박영희', type: '기존', attended: true, needsFollowUp: false },
      { id: 'a7', name: '이지은', type: '기존', attended: true, needsFollowUp: false },
      { id: 'a8', name: '최명숙', type: '신규', attended: true, note: '지인 소개로 참석', needsFollowUp: true },
    ]
  },
  {
    id: 'z3',
    date: '2026-04-20',
    sessionNumber: '4월 지역 좌담회 (B지역)',
    place: '이순자님 댁',
    targetGroup: 'B지역',
    targetCount: 12,
    status: 'scheduled',
    attendees: []
  }
];

// --- 창가청년스쿨 더미 데이터 ---
export const mockYouthSchool: YouthSchoolRecord[] = [
  {
    id: 'y1',
    name: '김청년',
    contact: '010-1234-5678',
    attendedDate: '2026-04-05',
    reaction: 'good',
    interestLevel: 'high',
    needsFollowUp: true,
    hasConnection: true,
    connectionName: '이영희',
    matchingStatus: 'matched',
    sourceZadankaiId: 'z1'
  },
  {
    id: 'y2',
    name: '박희망',
    contact: '010-9876-5432',
    attendedDate: '2026-04-05',
    reaction: 'neutral',
    interestLevel: 'medium',
    needsFollowUp: true,
    hasConnection: false,
    matchingStatus: 'matching',
    sourceZadankaiId: 'z1'
  },
  {
    id: 'y3',
    name: '이하늘',
    contact: '010-1111-2222',
    attendedDate: '2026-04-15',
    reaction: 'good',
    interestLevel: 'high',
    needsFollowUp: true,
    hasConnection: true,
    connectionName: '김미소',
    matchingStatus: 'unmatched',
    sourceZadankaiId: 'z1'
  },
  {
    id: 'y4',
    name: '최명숙',
    contact: '010-3333-4444',
    attendedDate: '2026-04-18',
    reaction: 'neutral',
    interestLevel: 'low',
    needsFollowUp: false,
    hasConnection: true,
    connectionName: '박영희',
    matchingStatus: 'unmatched',
    sourceZadankaiId: 'z2'
  }
];

// --- 멘토링 더미 데이터 ---
export const mockMentoring: MentoringMatch[] = [
  {
    id: 'm1',
    menteeName: '박소담',
    mentorName: '이영희',
    matchingType: '부녀일체',
    connectedDate: '2026-03-01',
    oneOnOneSchedule: '2026-04-25',
    status: 'active',
    memo: '매주 전화 연락 중'
  },
  {
    id: 'm2',
    menteeName: '이지은',
    mentorName: '정춘자',
    matchingType: '장남일체',
    connectedDate: '2026-02-15',
    status: 'active',
    memo: '미래부에서 여성부로 전환 시기'
  },
  {
    id: 'm3',
    menteeName: '김청년',
    mentorName: '선우지현',
    matchingType: '장남일체',
    connectedDate: '2026-04-10',
    status: 'active',
    memo: '청년스쿨 이후 매칭됨',
    sourceYouthSchoolId: 'y1'
  }
];

// --- 부원회 더미 데이터 ---
export const mockDepartmentMeetings: DepartmentMeeting[] = [
  {
    id: 'd1',
    departmentName: '여성부',
    date: '2026-04-10',
    attendeeCount: 18,
    agendaSummary: '4월 좌담회 준비 및 신규 관리 방안',
    owner: '이영희',
    status: 'completed'
  },
  {
    id: 'd2',
    departmentName: '미래부',
    date: '2026-04-12',
    attendeeCount: 12,
    agendaSummary: '희망회 일정 공유',
    owner: '박지민',
    status: 'completed'
  }
];

// --- 운영회의 더미 데이터 ---
export const mockOperationsMeetings: OperationsMeeting[] = [
  {
    id: 'o1',
    meetingDate: '2026-04-28',
    agendaTitle: '5월 지부 운영 방향 설정',
    detail: '좌담회 참석 확대 및 청년 멘토링 점검',
    owner: '지부장',
    status: 'pending'
  }
];

// --- 대시보드 통계 ---
export const mockDashboardStats: DashboardStats = {
  zadankaiCount: 3,
  totalAttendees: 124,
  newAttendees: 15,
  returningAttendees: 85,
  followUpNeededCount: 12,
  mentoringMatchingRate: 92,
  departmentMeetingCount: 8,
  youthSchoolTargetCount: 8,
  youthFollowUpCount: 5,
  mentoringCompletedCount: 12,
  mentoringUnmatchedCount: 3
};
