import React, { useState, useMemo } from 'react';
import { GraduationCap, Users, Search, Plus, Filter, Download, UserPlus, CheckCircle2, AlertCircle, Heart } from 'lucide-react';
import { mockYouthSchool } from '../data/mockData';
import { cn } from '../utils/cn';

const YouthSchoolPage = () => {
  const [filterMode, setFilterMode] = useState<'all' | 'substantial' | 'connection' | 'unmatched'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = useMemo(() => {
    return mockYouthSchool.filter(record => {
      const matchesSearch = record.name.includes(searchTerm) || record.contact.includes(searchTerm);
      if (!matchesSearch) return false;

      if (filterMode === 'substantial') {
        return (record.interestLevel === 'high' || record.interestLevel === 'medium') && record.needsFollowUp;
      }
      if (filterMode === 'connection') {
        return record.hasConnection;
      }
      if (filterMode === 'unmatched') {
        return record.matchingStatus === 'unmatched';
      }
      return true;
    });
  }, [filterMode, searchTerm]);

  const stats = {
    total: mockYouthSchool.length,
    substantial: mockYouthSchool.filter(r => (r.interestLevel === 'high' || r.interestLevel === 'medium') && r.needsFollowUp).length,
    followUp: mockYouthSchool.filter(r => r.needsFollowUp).length,
    unmatched: mockYouthSchool.filter(r => r.matchingStatus === 'unmatched').length
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 pb-12">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900">창가청년스쿨 관리</h2>
          <p className="text-sm font-medium text-slate-400 mt-1">실질 명단 확정 및 멘토링 매칭 상태를 집중 관리합니다.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2" onClick={() => window.print()}>
            <Download className="w-4 h-4" /> 실질 명단 인쇄
          </button>
          <button className="btn-primary flex items-center gap-2 shadow-lg shadow-blue-200">
            <Plus className="w-5 h-5" /> 새 참석자 등록
          </button>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-5 border-l-4 border-l-blue-500 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">전체 참석</p>
            <p className="text-2xl font-black text-slate-800">{stats.total}명</p>
          </div>
          <Users className="w-8 h-8 text-slate-100" />
        </div>
        <div className="card p-5 border-l-4 border-l-amber-500 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">실질 대상자</p>
            <p className="text-2xl font-black text-amber-600">{stats.substantial}명</p>
          </div>
          <CheckCircle2 className="w-8 h-8 text-amber-50" />
        </div>
        <div className="card p-5 border-l-4 border-l-rose-500 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">후속관리 필요</p>
            <p className="text-2xl font-black text-rose-600">{stats.followUp}명</p>
          </div>
          <AlertCircle className="w-8 h-8 text-rose-50" />
        </div>
        <div className="card p-5 border-l-4 border-l-indigo-500 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">멘토 미매칭</p>
            <p className="text-2xl font-black text-indigo-600">{stats.unmatched}명</p>
          </div>
          <UserPlus className="w-8 h-8 text-indigo-50" />
        </div>
      </section>

      {/* Filters & Search */}
      <section className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-sm no-print">
        <div className="flex bg-slate-100 p-1 rounded-xl w-full lg:w-auto overflow-x-auto">
          {[
            { id: 'all', label: '전체 명단' },
            { id: 'substantial', label: '실질 대상자' },
            { id: 'connection', label: '연고자 있음' },
            { id: 'unmatched', label: '멘토 미매칭' },
          ].map((mode) => (
            <button 
              key={mode.id}
              onClick={() => setFilterMode(mode.id as any)}
              className={cn(
                "px-5 py-2 text-xs font-black rounded-lg transition-all whitespace-nowrap",
                filterMode === mode.id 
                  ? "bg-white text-blue-600 shadow-sm" 
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
            placeholder="이름 또는 연락처 검색..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm font-medium outline-none"
          />
        </div>
      </section>

      {/* Main Table */}
      <section className="card p-0 overflow-hidden shadow-premium">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">성함 / 연락처</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">참석일</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">현장 반응</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">관심도</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">후속관리</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">연고자</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">멘토 매칭</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="text-sm font-black text-slate-800">{record.name}</p>
                    <p className="text-[11px] font-medium text-slate-400">{record.contact}</p>
                  </td>
                  <td className="px-6 py-4 text-xs font-bold text-slate-600">{record.attendedDate}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2 py-1 rounded text-[10px] font-black",
                      record.reaction === 'good' ? "bg-emerald-50 text-emerald-600" :
                      record.reaction === 'neutral' ? "bg-slate-100 text-slate-500" : "bg-rose-50 text-rose-600"
                    )}>
                      {record.reaction === 'good' ? '좋음' : record.reaction === 'neutral' ? '보통' : '미흡'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1">
                      {[...Array(3)].map((_, i) => (
                        <div 
                          key={i} 
                          className={cn(
                            "w-2.5 h-1 rounded-full",
                            i === 0 && (record.interestLevel === 'high' || record.interestLevel === 'medium' || record.interestLevel === 'low') ? "bg-amber-400" :
                            i === 1 && (record.interestLevel === 'high' || record.interestLevel === 'medium') ? "bg-amber-400" :
                            i === 2 && (record.interestLevel === 'high') ? "bg-amber-400" : "bg-slate-200"
                          )}
                        />
                      ))}
                    </div>
                    <span className="text-[9px] font-black text-slate-400 mt-1 block">
                      {record.interestLevel === 'high' ? '상' : record.interestLevel === 'medium' ? '중' : '하'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {record.needsFollowUp ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                        필요
                      </span>
                    ) : <span className="text-slate-300">-</span>}
                  </td>
                  <td className="px-6 py-4">
                    {record.hasConnection ? (
                      <div>
                        <p className="text-xs font-bold text-slate-700">{record.connectionName}</p>
                        <p className="text-[9px] font-black text-blue-500">연고자 있음</p>
                      </div>
                    ) : <span className="text-slate-300">-</span>}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black",
                      record.matchingStatus === 'matched' ? "bg-emerald-50 text-emerald-600" :
                      record.matchingStatus === 'matching' ? "bg-blue-50 text-blue-600" : "bg-slate-100 text-slate-400"
                    )}>
                      {record.matchingStatus === 'matched' ? '매칭 완료' : 
                       record.matchingStatus === 'matching' ? '매칭 중' : '미매칭'}
                      {record.matchingStatus === 'unmatched' && <Plus className="w-3 h-3" />}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-20 text-center text-slate-400 font-bold">
                    검색 결과가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Link Info */}
      <section className="bg-slate-50 rounded-2xl p-6 border border-slate-100 border-dashed no-print">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white rounded-xl shadow-sm">
            <GraduationCap className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h4 className="text-sm font-black text-slate-800 mb-1">데이터 흐름 안내</h4>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              좌담회 관리 페이지에서 '신규'로 체크된 인원은 청년스쿨 관리 명단으로 자동 연동을 제안합니다.<br />
              여기서 '실질 대상자'로 확정된 청년은 멘토링 관리 페이지에서 멘토를 매칭할 수 있습니다.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default YouthSchoolPage;
