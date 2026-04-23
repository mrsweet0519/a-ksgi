import { useState } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  MoreVertical, 
  CheckCircle2, 
  Calendar,
  Download,
  UserPlus,
  AlertCircle,
  MapPin,
  ChevronRight,
  Filter,
  Check,
  X
} from 'lucide-react';
import { cn } from '../utils/cn';
import { mockZadankais } from '../data/mockData';
import type { Zadankai } from '../types';

const JwadamPage = () => {
  const [activeTab, setActiveTab] = useState('전체');
  const [selectedZadankaiId, setSelectedZadankaiId] = useState<string>(mockZadankais[0].id);
  const [searchTerm, setSearchTerm] = useState('');

  const selectedZadankai = mockZadankais.find(z => z.id === selectedZadankaiId) || mockZadankais[0];

  const filteredZadankais = mockZadankais.filter(z => {
    if (activeTab === '전체') return true;
    if (activeTab === '진행 완료') return z.status === 'completed';
    if (activeTab === '예정') return z.status === 'scheduled';
    if (activeTab === '미진행') return z.status === 'pending';
    return true;
  });

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 pb-12">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900">좌담회 관리</h2>
          <p className="text-sm font-medium text-slate-400 mt-1">월별 좌담회 일정 및 참석 현황을 상세하게 관리하고 분석합니다.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2">
            <Download className="w-4 h-4" /> 분석표 다운로드
          </button>
          <button className="btn-primary flex items-center gap-2 shadow-lg shadow-blue-200">
            <Plus className="w-5 h-5" /> 새 좌담회 등록
          </button>
        </div>
      </section>

      {/* Tabs & Search */}
      <section className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex bg-slate-100 p-1 rounded-xl w-full lg:w-auto overflow-x-auto">
          {['전체', '진행 완료', '예정', '미진행'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-5 py-2 text-sm font-black rounded-lg transition-all whitespace-nowrap",
                activeTab === tab 
                  ? "bg-white text-blue-600 shadow-sm" 
                  : "text-slate-500 hover:text-slate-800"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="좌담회명 또는 장소 검색..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm font-medium focus:ring-2 focus:ring-blue-100 outline-none transition-all"
          />
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Meeting List Cards */}
        <div className="lg:col-span-1 space-y-4 max-h-[800px] overflow-y-auto pr-2 scrollbar-hide">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest px-1">좌담회 목록</h3>
          {filteredZadankais.map((meeting) => (
            <div 
              key={meeting.id} 
              onClick={() => setSelectedZadankaiId(meeting.id)}
              className={cn(
                "card cursor-pointer transition-all duration-300 border-2",
                selectedZadankaiId === meeting.id 
                  ? "border-blue-500 shadow-blue-100 shadow-lg scale-[1.02] bg-blue-50/10" 
                  : "border-transparent hover:border-slate-200"
              )}
            >
              <div className="flex justify-between items-start mb-3">
                <div className={cn(
                  "px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider",
                  meeting.status === 'completed' ? "bg-emerald-50 text-emerald-600" : 
                  meeting.status === 'pending' ? "bg-amber-50 text-amber-600" : "bg-slate-100 text-slate-500"
                )}>
                  {meeting.status === 'completed' ? '완료' : meeting.status === 'pending' ? '정리 중' : '예정'}
                </div>
                {selectedZadankaiId === meeting.id && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                )}
              </div>
              
              <h4 className="text-lg font-black text-slate-800 mb-2">{meeting.sessionNumber}</h4>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-bold">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {meeting.date}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-bold">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {meeting.place}
                </div>
              </div>
              
              <div className="flex items-center justify-between text-[10px] font-black">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Users className="w-3.5 h-3.5" />
                  참석: <span className="text-slate-700">{meeting.attendees.filter(a => a.attended).length} / {meeting.targetCount}명</span>
                </div>
                <div className="flex items-center gap-1.5 text-blue-600">
                  <UserPlus className="w-3.5 h-3.5" />
                  신규: {meeting.attendees.filter(a => a.type === '신규' && a.attended).length}명
                </div>
              </div>
            </div>
          ))}
          
          <button className="w-full border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-slate-400 hover:border-blue-300 hover:text-blue-500 hover:bg-blue-50/10 transition-all group">
            <Plus className="w-6 h-6 mb-1" />
            <span className="text-sm font-bold">새 일정 추가</span>
          </button>
        </div>

        {/* Right: Attendee List Table */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card h-full min-h-[600px] flex flex-col">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
              <div>
                <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                  {selectedZadankai.sessionNumber} 
                  <span className="text-sm font-bold text-slate-400">참석자 명단</span>
                </h3>
                <p className="text-sm font-bold text-slate-400 mt-1">
                  {selectedZadankai.date} | {selectedZadankai.place} | {selectedZadankai.targetGroup}
                </p>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-black flex items-center gap-2 hover:bg-blue-700 transition-all">
                  <UserPlus className="w-3.5 h-3.5" /> 인원 추가
                </button>
              </div>
            </div>

            {selectedZadankai.attendees.length > 0 ? (
              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left border-separate border-spacing-y-2">
                  <thead>
                    <tr className="text-slate-400">
                      <th className="pb-2 pl-4 text-[10px] font-black uppercase tracking-widest w-16">No.</th>
                      <th className="pb-2 text-[10px] font-black uppercase tracking-widest">이름</th>
                      <th className="pb-2 text-[10px] font-black uppercase tracking-widest">구분</th>
                      <th className="pb-2 text-[10px] font-black uppercase tracking-widest">참석여부</th>
                      <th className="pb-2 text-[10px] font-black uppercase tracking-widest">특이사항</th>
                      <th className="pb-2 text-[10px] font-black uppercase tracking-widest text-center">후속연락</th>
                      <th className="pb-2 pr-4 text-[10px] font-black uppercase tracking-widest text-right">관리</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedZadankai.attendees.map((attendee, index) => (
                      <tr key={attendee.id} className="group hover:bg-slate-50 transition-colors">
                        <td className="py-4 pl-4 bg-slate-50 group-hover:bg-transparent rounded-l-2xl text-sm font-bold text-slate-400">{index + 1}</td>
                        <td className="py-4 bg-slate-50 group-hover:bg-transparent text-sm font-black text-slate-800">{attendee.name}</td>
                        <td className="py-4 bg-slate-50 group-hover:bg-transparent">
                          <span className={cn(
                            "px-2 py-0.5 rounded-md text-[10px] font-black",
                            attendee.type === '신규' ? "bg-indigo-100 text-indigo-600" : "bg-slate-200 text-slate-500"
                          )}>
                            {attendee.type}
                          </span>
                        </td>
                        <td className="py-4 bg-slate-50 group-hover:bg-transparent">
                          <div className="flex items-center gap-2">
                            {attendee.attended ? (
                              <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                              </div>
                            ) : (
                              <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
                                <X className="w-3.5 h-3.5 text-slate-300" />
                              </div>
                            )}
                            <span className={cn(
                              "text-xs font-bold",
                              attendee.attended ? "text-emerald-600" : "text-slate-400"
                            )}>
                              {attendee.attended ? '참석' : '불참'}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 bg-slate-50 group-hover:bg-transparent max-w-[150px]">
                          <p className="text-xs font-medium text-slate-500 truncate" title={attendee.note}>
                            {attendee.note || '-'}
                          </p>
                        </td>
                        <td className="py-4 bg-slate-50 group-hover:bg-transparent text-center">
                          {attendee.needsFollowUp && (
                            <div className="inline-flex items-center gap-1 text-[10px] font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                              <AlertCircle className="w-3 h-3" /> 필요
                            </div>
                          )}
                        </td>
                        <td className="py-4 pr-4 bg-slate-50 group-hover:bg-transparent rounded-r-2xl text-right">
                          <button className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-400 transition-all">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-300 py-20">
                <Users className="w-16 h-16 mb-4 opacity-20" />
                <p className="font-bold">등록된 참석자가 없습니다.</p>
                <p className="text-sm mt-1">인원 추가 버튼을 눌러 명단을 등록하세요.</p>
              </div>
            )}

            {/* Summary Footer */}
            <div className="mt-auto pt-6 border-t border-slate-100 flex flex-wrap gap-6 items-center justify-between">
              <div className="flex gap-6">
                <div className="text-center">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">총 참석</p>
                  <p className="text-xl font-black text-slate-800">{selectedZadankai.attendees.filter(a => a.attended).length}명</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">신규 참석</p>
                  <p className="text-xl font-black text-blue-600">{selectedZadankai.attendees.filter(a => a.type === '신규' && a.attended).length}명</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">참석률</p>
                  <p className="text-xl font-black text-slate-800">
                    {Math.round((selectedZadankai.attendees.filter(a => a.attended).length / selectedZadankai.targetCount) * 100)}%
                  </p>
                </div>
              </div>
              <button className="btn-secondary text-xs flex items-center gap-2">
                <Download className="w-3.5 h-3.5" /> 이 명단 인쇄용으로 보기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JwadamPage;
