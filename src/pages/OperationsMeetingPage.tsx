import React from 'react';
import { Target, FileText, ClipboardList, CheckCircle2, Clock, Plus, Printer, ArrowRight } from 'lucide-react';
import { mockOperationsMeetings, mockDashboardStats } from '../data/mockData';
import { cn } from '../utils/cn';

const OperationsMeetingPage = () => {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 pb-12">
      <section className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-900">운영회의 자료 준비</h2>
          <p className="text-sm font-medium text-slate-400 mt-1">월간 지부 운영회의 안건 및 데이터를 정리하여 보고서를 생성합니다.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2" onClick={() => window.print()}>
            <Printer className="w-4 h-4" /> 출력하기
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Plus className="w-5 h-5" /> 새 안건 추가
          </button>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Auto Summary for Meeting */}
        <div className="lg:col-span-1 space-y-6">
          <div className="card bg-blue-600 text-white border-none shadow-xl shadow-blue-100 p-8">
            <h3 className="text-lg font-black mb-6">이번 달 데이터 자동 요약</h3>
            <div className="space-y-6">
              <div className="flex justify-between items-end border-b border-white/20 pb-4">
                <span className="text-sm font-bold text-blue-100">좌담회 참석 총원</span>
                <span className="text-2xl font-black">{mockDashboardStats.totalAttendees}명</span>
              </div>
              <div className="flex justify-between items-end border-b border-white/20 pb-4">
                <span className="text-sm font-bold text-blue-100">신규 참석 인원</span>
                <span className="text-2xl font-black">{mockDashboardStats.newAttendees}명</span>
              </div>
              <div className="flex justify-between items-end border-b border-white/20 pb-4">
                <span className="text-sm font-bold text-blue-100">멘토링 매칭률</span>
                <span className="text-2xl font-black">{mockDashboardStats.mentoringMatchingRate}%</span>
              </div>
              <div className="flex justify-between items-end border-b border-white/20 pb-4">
                <span className="text-sm font-bold text-blue-100">부원회 진행</span>
                <span className="text-2xl font-black">{mockDashboardStats.departmentMeetingCount}회</span>
              </div>
            </div>
            <p className="text-xs font-bold text-blue-200 mt-6 italic">* 위 데이터는 '좌담회/멘토링/부원회' 관리 페이지에서 자동 집계된 내용입니다.</p>
          </div>

          <div className="card space-y-4">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">주요 안건 예시</h3>
            {[
              '좌담회 참석 분석 및 확대 추진 방향',
              '청년스쿨 현장 반응 피드백 공유',
              '실질 명단 정리 및 연고자 매칭 점검',
              '청년 멘토 지정 및 1:1 근행회 계획'
            ].map((agenda, i) => (
              <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-sm font-bold text-slate-700 hover:bg-blue-50 hover:border-blue-100 transition-all cursor-pointer">
                {agenda}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Meeting Agenda Board */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-blue-600" /> 운영회의 안건 보드
              </h3>
            </div>

            <div className="space-y-6">
              {mockOperationsMeetings.map((meeting) => (
                <div key={meeting.id} className="border border-slate-100 rounded-2xl overflow-hidden hover:shadow-premium transition-all group">
                  <div className="p-6 bg-slate-50 group-hover:bg-white transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <div className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                        meeting.status === 'completed' ? "bg-emerald-50 text-emerald-600" : 
                        meeting.status === 'in-progress' ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600"
                      )}>
                        {meeting.status === 'completed' ? '완료' : meeting.status === 'in-progress' ? '진행 중' : '대기'}
                      </div>
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                        <Clock className="w-3.5 h-3.5" /> {meeting.meetingDate}
                      </div>
                    </div>
                    <h4 className="text-xl font-black text-slate-800 mb-2">{meeting.agendaTitle}</h4>
                    <p className="text-sm text-slate-500 font-medium mb-6 leading-relaxed">{meeting.detail}</p>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-black text-slate-500">
                          {meeting.owner[0]}
                        </div>
                        <span className="text-sm font-bold text-slate-700">{meeting.owner}</span>
                      </div>
                      <button className="text-sm font-black text-blue-600 flex items-center gap-1 hover:underline">
                        자세히 보기 <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-12 flex flex-col items-center justify-center text-slate-400 hover:bg-white hover:border-blue-200 hover:text-blue-500 transition-all cursor-pointer group">
                <Plus className="w-10 h-10 mb-4 opacity-50 group-hover:scale-110 transition-transform" />
                <p className="text-lg font-black">새로운 회의 안건 등록</p>
                <p className="text-sm font-bold mt-1 opacity-60">좌담회 결과나 멘토링 특이사항을 안건으로 추가하세요.</p>
              </div>
            </div>
          </div>

          <div className="card bg-slate-900 text-white border-none p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-black">회의자료 미리보기</h3>
                <p className="text-sm text-slate-400 mt-1">인쇄될 레이아웃을 확인하고 출력할 수 있습니다.</p>
              </div>
              <button className="bg-white text-slate-900 px-5 py-2.5 rounded-xl text-sm font-black shadow-lg hover:bg-slate-100 transition-all">
                프리뷰 모드
              </button>
            </div>
            <div className="bg-white/5 rounded-2xl aspect-[16/9] border border-white/10 flex items-center justify-center border-dashed">
              <FileText className="w-12 h-12 text-white/20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperationsMeetingPage;
