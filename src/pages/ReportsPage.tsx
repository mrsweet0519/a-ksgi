import { 
  FileText, 
  Printer, 
  Download, 
  Plus, 
  History, 
  FileCheck, 
  ChevronRight, 
  Zap
} from 'lucide-react';

const ReportsPage = () => {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <section className="flex items-center justify-between no-print">
        <div>
          <h2 className="text-3xl font-black text-slate-900">운영회의 기록 및 보고서</h2>
          <p className="text-sm font-medium text-slate-400 mt-1">지부 운영회의 안건지와 월간 통합 보고서를 생성하고 출력합니다.</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" /> 새 회의록 작성
        </button>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 no-print">
        {/* Left: Quick Actions */}
        <div className="space-y-6">
          <div className="card bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100 p-8">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200 flex items-center justify-center mb-6">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-black text-slate-800 mb-2">자동 보고서 생성</h3>
            <p className="text-sm text-slate-500 font-medium mb-6 leading-relaxed">
              이번 달 입력된 모든 데이터를 기반으로 <br/>
              A4 규격 회의 자료를 즉시 만듭니다.
            </p>
            <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-black text-sm shadow-lg hover:bg-blue-700 transition-all active:scale-95">
              4월 운영회의 자료 생성
            </button>
          </div>

          <div className="card">
            <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <History className="w-4 h-4" /> 최근 생성된 자료
            </h4>
            <div className="space-y-3">
              {[
                { name: '3월 지부 운영 보고서', date: '2026-03-31' },
                { name: '3월 운영회의 안건지', date: '2026-03-15' },
                { name: '2월 통합 관리표', date: '2026-02-28' },
              ].map((doc, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-slate-400" />
                    <span className="text-sm font-bold text-slate-700">{doc.name}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 transition-transform group-hover:translate-x-1" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center/Right: Report Preview (Scrollable) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card shadow-2xl shadow-slate-200/50 p-0 overflow-hidden border-slate-200">
            <div className="bg-slate-50 px-8 py-4 border-b border-slate-100 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-emerald-500" />
                <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Pre-filled Template</span>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-white rounded-lg transition-colors text-slate-500" title="PDF 저장">
                  <Download className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-white rounded-lg transition-colors text-slate-500" onClick={() => window.print()} title="인쇄">
                  <Printer className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* The Real Report Template (Visible on Screen and Print) */}
            <div className="p-12 bg-white print:p-0">
              <div className="text-center mb-12">
                <h1 className="text-3xl font-black text-slate-900 mb-2">지부 운영회의 안건지</h1>
                <p className="text-slate-500 font-bold tracking-widest">2026년 4월 | 계수지부 여성부</p>
              </div>

              <div className="space-y-10">
                <section>
                  <h4 className="text-lg font-black text-slate-900 border-l-4 border-blue-600 pl-3 mb-4">1. 좌담회 및 확대 현황</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                      <p className="text-xs font-bold text-slate-400 mb-1">참석 총 인원</p>
                      <p className="text-xl font-black text-slate-800">124명 <span className="text-sm text-blue-600">(↑12)</span></p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                      <p className="text-xs font-bold text-slate-400 mb-1">신규 참석자</p>
                      <p className="text-xl font-black text-slate-800">15명</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h4 className="text-lg font-black text-slate-900 border-l-4 border-blue-600 pl-3 mb-4">2. 주요 부서별 일정</h4>
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50">
                        <th className="p-3 text-xs font-black text-slate-500 border border-slate-200">일정명</th>
                        <th className="p-3 text-xs font-black text-slate-500 border border-slate-200">일시</th>
                        <th className="p-3 text-xs font-black text-slate-500 border border-slate-200">참석</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-3 text-sm font-bold border border-slate-200">여성부 부원회</td>
                        <td className="p-3 text-sm text-slate-500 border border-slate-200">04.10 (화)</td>
                        <td className="p-3 text-sm font-black border border-slate-200">18명</td>
                      </tr>
                      <tr>
                        <td className="p-3 text-sm font-bold border border-slate-200">미래부 부원회</td>
                        <td className="p-3 text-sm text-slate-500 border border-slate-200">04.12 (목)</td>
                        <td className="p-3 text-sm font-black border border-slate-200">12명</td>
                      </tr>
                    </tbody>
                  </table>
                </section>

                <section>
                  <h4 className="text-lg font-black text-slate-900 border-l-4 border-blue-600 pl-3 mb-4">3. 공지 및 논의 사항</h4>
                  <div className="min-h-[150px] border border-slate-200 rounded-lg p-4 text-sm text-slate-400 font-medium italic">
                    여기에 추가적인 공지 사항이나 논의할 안건을 입력하세요...
                  </div>
                </section>

                <div className="text-right text-xs text-slate-300 font-bold pt-10">
                  KSGI 지부 운영 자동화 시스템 | 출력일: 2026-04-17
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
