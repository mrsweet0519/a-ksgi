import Dexie, { type Table } from 'dexie';

export interface Member {
  id?: number;
  name: string;
  division: '여성부' | '미래부' | '기타';
  position: string;
  isYouth: boolean;
  mentorId?: number;
  isMentor: boolean;
  phone?: string;
  note?: string;
  createdAt: Date;
}

export interface Meeting {
  id?: number;
  type: '좌담회' | '부원회' | '청년스쿨' | '운영회의';
  title: string;
  date: string;
  content?: string;
  attendees: number[]; // Member IDs
  absentees?: number[]; // Member IDs for tracking
  newAttendees?: string[]; // Names of people not in database yet
  feedback?: string;
  minutes?: string; // Meeting minutes
  tasks?: { task: string; PIC?: string; status: 'done' | 'pending' }[];
  createdAt: Date;
}

export interface MentoringLog {
  id?: number;
  mentorId: number;
  menteeId: number;
  date: string;
  type: '1:1 근행회' | '상담' | '활동';
  note: string;
  createdAt: Date;
}

export class KSGIDatabase extends Dexie {
  members!: Table<Member>;
  meetings!: Table<Meeting>;
  mentoringLogs!: Table<MentoringLog>;

  constructor() {
    super('KSGIDatabase');
    this.version(1).stores({
      members: '++id, name, division, mentorId, isMentor',
      meetings: '++id, type, date',
      mentoringLogs: '++id, mentorId, menteeId, date'
    });
  }
}

export const db = new KSGIDatabase();
