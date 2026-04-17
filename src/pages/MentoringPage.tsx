import { 
  UserPlus, 
  Map, 
  Search, 
  User, 
  Link as LinkIcon, 
  Calendar, 
  MessageCircle, 
  ChevronRight
} from 'lucide-react';

const MentoringPage = () => {
  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <section className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-900">멘토링 관리</h2>
          <p className="text-sm font-medium text-slate-400 mt-1">멘토-멘티 매칭 및 1:1 활동 기록을 관리합니다.</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <UserPlus className="w-5 h-5" /> 새 매칭 등록
        </button>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Search & Stats */}
        <div className="lg:col-span-1 space-y-6">
          <div className="card bg-blue-600 text-white border-none shadow-xl shadow-blue-200 p-8">
            <h3 className="text-lg font-black mb-1">매칭 현황</h3>
            <div className="text-4xl font-black mb-4">92%</div>
            <div className="w-full bg-blue-400 h-2 rounded-full overflow-hidden mb-4">
              <div className="bg-white h-full rounded-full" style={{ width: '92%' }}></div>
            </div>
            <p className="text-xs font-bold text-blue-100">총 40명 중 37명 매칭 완료</p>
          </div>

          <div className="card space-y-4">
            <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest">미매칭 인원 (3)</h4>
            {['김미소', '최하늘', '박지은'].map((name) => (
              <div key={name} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                    <User className="w-4 h-4 text-slate-500" />
                  </div>
                  <span className="text-sm font-black text-slate-700">{name}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500" />
              </div>
            ))}
          </div>
        </div>

        {/* Main Content: Matching Board */}
        <div className="lg:col-span-3 space-y-6">
          <div className="card">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
                <Map className="w-5 h-5 text-blue-600" /> 멘토-멘티 매칭 보드
              </h3>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="text" placeholder="검색..." className="w-full bg-slate-50 border-none rounded-lg py-2 pl-9 pr-4 text-xs font-bold" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { mentor: '이영희 (부장)', mentee: '박소담 (청년)', date: '2026-03-01', status: 'active' },
                { mentor: '정춘자 (반장)', mentee: '이지은 (미래)', date: '2026-02-15', status: 'active' },
                { mentor: '선우지현', mentee: '최다빈', date: '2026-04-10', status: 'new' },
                { mentor: '김부녀', mentee: '홍길순', date: '2026-01-20', status: 'active' },
              ].map((match, i) => (
                <div key={i} className="bg-slate-50/50 border border-slate-100 rounded-2xl p-5 hover:border-blue-200 hover:bg-white hover:shadow-premium transition-all group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-center">
                        <p className="text-[10px] font-black text-slate-400 mb-1">MENTOR</p>
                        <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-700 font-black">
                          {match.mentor[0]}
                        </div>
                      </div>
                      <LinkIcon className="w-4 h-4 text-slate-300 mt-4" />
                      <div className="text-center">
                        <p className="text-[10px] font-black text-slate-400 mb-1">MENTEE</p>
                        <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-700 font-black">
                          {match.mentee[0]}
                        </div>
                      </div>
                    </div>
                    {match.status === 'new' && (
                      <span className="bg-blue-600 text-white text-[9px] font-black px-2 py-1 rounded-full">NEW</span>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-sm font-black text-slate-800">{match.mentor} ↔ {match.mentee}</p>
                      <p className="text-[11px] font-bold text-slate-400 mt-1">매칭일: {match.date}</p>
                    </div>
                    <button className="text-xs font-black text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-all">
                      기록 보기
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-500" /> 최근 활동 (1:1 근행회 등)
            </h3>
            <div className="space-y-4">
              {[
                { type: '1:1 근행회', name: '이영희 ↔ 박소담', detail: '가정 방문 근행회 진행, 청년 고민 청취', date: '어제' },
                { type: '전화 상담', name: '정춘자 ↔ 이지은', detail: '새 학기 적응 관련 격려 대화', date: '2일 전' },
              ].map((log, i) => (
                <div key={i} className="flex gap-4 p-4 border-l-4 border-blue-500 bg-slate-50 rounded-r-xl">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-black text-blue-600 uppercase">{log.type}</span>
                      <span className="text-[10px] text-slate-400 font-bold">• {log.date}</span>
                    </div>
                    <p className="text-sm font-black text-slate-800 mb-1">{log.name}</p>
                    <p className="text-sm text-slate-500 font-medium">{log.detail}</p>
                  </div>
                  <MessageCircle className="w-5 h-5 text-slate-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentoringPage;
