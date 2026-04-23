import React, { useState, useMemo } from 'react';
import { 
  UserPlus, 
  Search, 
  Calendar, 
  MessageCircle, 
  Filter, 
  Download, 
  Heart, 
  Link as LinkIcon,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import { mockMentoring, mockYouthSchool } from '../data/mockData';
import { cn } from '../utils/cn';

const MentoringPage = () => {
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'completed' | 'hold'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMatches = useMemo(() => {
    return mockMentoring.filter(match => {
      const matchesSearch = match.menteeName.includes(searchTerm) || match.mentorName.includes(searchTerm);
      if (!matchesSearch) return false;
      if (statusFilter !== 'all' && match.status !== statusFilter) return false;
      return true;
    });
  }, [statusFilter, searchTerm]);

  const stats = {
    total: mockMentoring.length,
    active: mockMentoring.filter(m => m.status === 'active').length,
    unmatchedCount: mockYouthSchool.filter(y => y.matchingStatus === 'unmatched').length,
    completed: mockMentoring.filter(m => m.status === 'completed').length
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 pb-12">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900">멘토링 관리</h2>
          <p className="text-sm font-medium text-slate-400 mt-1">청년 실질 명단과 리더(멘토)를 연결하고 활동을 기록합니다.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2" onClick={() => window.print()}>
            <Download className="w-4 h-4" /> 멘토링 현황 출력
          </button>
          <button className="btn-primary flex items-center gap-2 shadow-lg shadow-rose-200 !bg-rose-600 hover:!bg-rose-700">
            <UserPlus className="w-5 h-5" /> 새 매칭 연결
          </button>
        </div>
      </section>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card bg-white p-6 border-b-4 border-b-rose-500 shadow-premium">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">전체 매칭</p>
          <p className="text-3xl font-black text-slate-800">{stats.total}건</p>
        </div>
        <div className="card bg-white p-6 border-b-4 border-b-blue-500 shadow-premium">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">현재 진행중</p>
          <p className="text-3xl font-black text-blue-600">{stats.active}건</p>
        </div>
        <div className="card bg-white p-6 border-b-4 border-b-amber-500 shadow-premium">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">멘토 미매칭 인원</p>
          <p className="text-3xl font-black text-amber-600">{stats.unmatchedCount}명</p>
          <p className="text-[10px] font-bold text-amber-400 mt-1">* 청년스쿨 실질 대상 기준</p>
        </div>
        <div className="card bg-white p-6 border-b-4 border-b-emerald-500 shadow-premium">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">매칭 완료/졸업</p>
          <p className="text-3xl font-black text-emerald-600">{stats.completed}건</p>
        </div>
      </section>

      {/* Control Bar */}
      <section className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-sm no-print">
        <div className="flex bg-slate-100 p-1 rounded-xl w-full lg:w-auto overflow-x-auto">
          {[
            { id: 'all', label: '전체 보기' },
            { id: 'active', label: '진행중' },
            { id: 'hold', label: '보류' },
            { id: 'completed', label: '완료' },
          ].map((mode) => (
            <button 
              key={mode.id}
              onClick={() => setStatusFilter(mode.id as any)}
              className={cn(
                "px-5 py-2 text-xs font-black rounded-lg transition-all whitespace-nowrap",
                statusFilter === mode.id 
                  ? "bg-white text-rose-600 shadow-sm" 
                  : "text-slate-500 hover:text-slate-800"
              )}
            >
              {mode.label}
            </button>
          ))}
        </div>
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="멘티 또는 멘토 성함 검색..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm font-medium outline-none"
          />
        </div>
      </section>

      {/* Table List */}
      <section className="card p-0 overflow-hidden shadow-premium">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">멘티 ↔ 멘토</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">매칭 유형</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">연결일</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">1:1 근행회 일정</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">상태</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">메모</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMatches.map((match) => (
                <tr key={match.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-xs font-black text-blue-700">
                          {match.mentorName[0]}
                        </div>
                        <div className="w-8 h-8 rounded-full bg-rose-100 border-2 border-white flex items-center justify-center text-xs font-black text-rose-700">
                          {match.menteeName[0]}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-800">{match.menteeName}</p>
                        <p className="text-[10px] font-bold text-slate-400">멘토: {match.mentorName}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2 py-0.5 rounded text-[10px] font-black",
                      match.matchingType === '장남일체' ? "bg-indigo-50 text-indigo-600" :
                      match.matchingType === '부녀일체' ? "bg-rose-50 text-rose-600" : "bg-slate-100 text-slate-500"
                    )}>
                      {match.matchingType}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs font-bold text-slate-500">{match.connectedDate}</td>
                  <td className="px-6 py-4">
                    {match.oneOnOneSchedule ? (
                      <div className="flex items-center gap-1.5 text-xs font-black text-slate-700">
                        <Calendar className="w-3.5 h-3.5 text-blue-500" />
                        {match.oneOnOneSchedule}
                      </div>
                    ) : (
                      <span className="text-slate-300 text-xs italic">일정 미정</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-[10px] font-black",
                      match.status === 'active' ? "bg-blue-50 text-blue-600" :
                      match.status === 'completed' ? "bg-emerald-50 text-emerald-600" : 
                      match.status === 'hold' ? "bg-amber-50 text-amber-600" : "bg-slate-100 text-slate-400"
                    )}>
                      {match.status === 'active' ? '진행중' : match.status === 'completed' ? '완료' : match.status === 'hold' ? '보류' : '종료'}
                    </span>
                  </td>
                  <td className="px-6 py-4 max-w-[200px]">
                    <p className="text-xs text-slate-500 truncate" title={match.memo}>{match.memo || '-'}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[10px] font-black text-slate-400 hover:text-blue-600 transition-colors">
                      기록/수정
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Unmatched Banner */}
      {stats.unmatchedCount > 0 && (
        <section className="card bg-amber-50 border-amber-100 p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-500 rounded-2xl text-white">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-black text-amber-900">멘토 매칭이 필요한 청년이 {stats.unmatchedCount}명 있습니다.</h4>
              <p className="text-xs text-amber-700 mt-1 font-medium">청년스쿨 실질 명단 중 아직 멘토링이 시작되지 않은 분들을 확인해 보세요.</p>
            </div>
          </div>
          <button className="bg-amber-600 text-white px-4 py-2 rounded-xl text-xs font-black shadow-lg shadow-amber-200 hover:bg-amber-700 transition-all">
            미매칭 명단 확인하기
          </button>
        </section>
      )}
    </div>
  );
};

export default MentoringPage;
