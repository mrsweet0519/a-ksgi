import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Printer, Search, MapPin, Edit3, Save, Download } from 'lucide-react';
import { domToPng } from 'modern-screenshot';
import { assemblyData } from '../data/assemblyData';
import type { AssemblySchedule } from '../data/assemblyData';
import { cn } from '../utils/cn';

const AssemblySchedulePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const captureRef = React.useRef<HTMLDivElement>(null);
  const [scheduleList, setScheduleList] = useState<AssemblySchedule[]>(() => {
    const saved = localStorage.getItem('assembly-schedule-data');
    return saved ? JSON.parse(saved) : assemblyData;
  });

  // Save to local storage whenever list changes
  useEffect(() => {
    localStorage.setItem('assembly-schedule-data', JSON.stringify(scheduleList));
  }, [scheduleList]);

  const handleEdit = (id: number, field: keyof AssemblySchedule, value: string) => {
    setScheduleList(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleDownloadImage = async () => {
    if (!captureRef.current) return;
    
    try {
      // modern-screenshot을 사용한 고화질 이미지 생성
      const dataUrl = await domToPng(captureRef.current, {
        scale: 2.5, // 고화질 배율
        quality: 1,
        backgroundColor: '#ffffff',
        onCloneNode: (node) => {
          // 인쇄용 헤더를 이미지에도 포함시키기 위해 강제 노출
          const header = (node as HTMLElement).querySelector('.print-header') as HTMLElement;
          if (header) {
            header.style.display = 'block';
            header.style.marginBottom = '15px';
          }
          // 이미지 생성 시 불필요한 그림자나 둥근 모서리 정리
          const container = (node as HTMLElement).querySelector('.print-compact') as HTMLElement;
          if (container) {
            container.style.boxShadow = 'none';
          }
        },
      });
      
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `여성부_행복총회_일정_${new Date().toISOString().slice(5, 10).replace('-', '')}.png`;
      link.click();
    } catch (err) {
      console.error('이미지 생성 실패:', err);
      // fallback: oklch 에러 등이 발생할 경우 대비
      alert('이미지 생성 중 오류가 발생했습니다. 브라우저를 새로고침(F5) 후 다시 시도해 주세요.');
    }
  };

  const filteredData = scheduleList.filter(item => 
    item.branch.includes(searchTerm) || 
    item.date.includes(searchTerm) ||
    item.executive.includes(searchTerm) ||
    item.address.includes(searchTerm) ||
    item.hostName?.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      {/* 인쇄 및 이미지 생성용 통합 스타일 */}
      <style>{`
        @media print {
          @page { margin: 3mm; size: A4 portrait; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; background-color: white !important; font-family: sans-serif; }
          main { margin: 0 !important; padding: 0 !important; }
          .max-w-7xl { max-width: none !important; padding: 0 !important; margin: 0 !important; }
          .no-print { display: none !important; }
          .print-compact { zoom: 0.82; border: none !important; box-shadow: none !important; }
          table { width: 100% !important; border-collapse: collapse !important; table-layout: fixed; }
          th, td { border: 0.5pt solid #cbd5e1 !important; padding: 2px 3px !important; line-height: 1.0 !important; word-break: break-all !important; }
          th { background-color: #f1f5f9 !important; font-size: 10px !important; }
          td { font-size: 10px !important; }
          th:nth-child(1), td:nth-child(1) { width: 65px; }
          th:nth-child(2), td:nth-child(2) { width: 55px; }
          th:nth-child(3), td:nth-child(3) { width: 80px; }
          .badge { border: 0.5pt solid #60a5fa !important; font-size: 8px !important; padding: 0 2px !important; }
          .print-header { margin-bottom: 5px !important; }
          .print-header h1 { font-size: 16px !important; margin: 0 !important; }
          .print-header p { font-size: 8px !important; margin: 0 !important; }
        }
      `}</style>

      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 no-print">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <CalendarIcon className="w-7 h-7 text-rose-500" />
            소사권 5월 여성부 행복총회 일정
          </h1>
          <p className="text-slate-500 mt-1">총 31건의 일정이 등록되어 있습니다. (내용 클릭 시 바로 수정 저장)</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
          <div className="relative flex-1 md:w-56">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              placeholder="검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all font-medium"
            />
          </div>
          
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 border rounded-xl text-sm font-bold transition-all",
              isEditing 
                ? "bg-rose-50 text-rose-600 border-rose-200 hover:bg-rose-100" 
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
            )}
          >
            {isEditing ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
            <span className="hidden sm:inline">{isEditing ? "수정 완료 (자동저장)" : "직접 수정하기"}</span>
          </button>

          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">출력하기</span>
          </button>

          <button 
            onClick={handleDownloadImage}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 border border-blue-600 text-white rounded-xl text-sm font-bold shadow-sm shadow-blue-200 hover:bg-blue-700 transition-all"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">이미지로 저장 (카톡용)</span>
          </button>
        </div>
      </div>

      <div ref={captureRef} className="bg-white p-2 sm:p-4 rounded-3xl border border-slate-100 shadow-sm print:border-none print:shadow-none print:p-0">
        {/* 인쇄 및 이미지 캡처용 헤더 */}
        <div className="hidden print:block print-header mb-2 relative">
          <h1 className="text-xl font-black text-center mb-1 underline underline-offset-4 decoration-2">소사권 5월 여성부 행복총회 일정</h1>
          <p className="text-center text-[10px] text-slate-500 mb-0">※ 일정은 상황에 따라 변동될 수 있습니다.</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm print-compact">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
                  <th className="py-2.5 px-3 font-bold text-center whitespace-nowrap">날짜/시간</th>
                  <th className="py-2.5 px-3 font-bold text-center whitespace-nowrap">지부/지구</th>
                  <th className="py-2.5 px-3 font-bold whitespace-nowrap w-[15%]">참석간부</th>
                  <th className="py-2.5 px-3 font-bold w-[45%]">진행 장소 (주소)</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {filteredData.map((item, idx) => (
                  <tr 
                    key={item.id} 
                    className={cn(
                      "border-b border-slate-100 hover:bg-slate-50/80 transition-colors",
                      idx % 2 === 0 ? "bg-white" : "bg-slate-50/30"
                    )}
                  >
                    <td className="py-2 px-3 text-center align-middle whitespace-nowrap">
                      {isEditing ? (
                        <div className="flex flex-col gap-1 items-center">
                          <input type="text" value={item.date} onChange={e => handleEdit(item.id, 'date', e.target.value)} className="w-16 border rounded px-1 py-0.5 text-center font-bold text-slate-800" />
                          <input type="text" value={item.dayOfWeek} onChange={e => handleEdit(item.id, 'dayOfWeek', e.target.value)} className="w-10 border rounded px-1 py-0.5 text-center text-xs" />
                          <input type="text" value={item.time} onChange={e => handleEdit(item.id, 'time', e.target.value)} className="w-16 border rounded px-1 py-0.5 text-center text-rose-600 font-bold text-xs" />
                        </div>
                      ) : (
                        <>
                          <div className="font-bold text-slate-800">{item.date} ({item.dayOfWeek})</div>
                          <div className="text-rose-600 font-bold text-xs mt-0.5">{item.time}</div>
                        </>
                      )}
                    </td>
                    <td className="py-2 px-3 text-center align-middle whitespace-nowrap">
                      {isEditing ? (
                        <div className="flex flex-col gap-1 items-center">
                          <input type="text" value={item.branch} onChange={e => handleEdit(item.id, 'branch', e.target.value)} className="w-16 border rounded px-1 py-0.5 text-center font-bold text-blue-700 bg-blue-50" />
                          <input type="text" value={item.district} onChange={e => handleEdit(item.id, 'district', e.target.value)} className="w-12 border rounded px-1 py-0.5 text-center text-slate-500 text-xs" />
                        </div>
                      ) : (
                        <>
                          <span className="badge inline-flex items-center justify-center px-1.5 py-0.5 rounded-md bg-blue-50 text-blue-700 font-bold text-xs ring-1 ring-inset ring-blue-600/20 mb-0.5">
                            {item.branch}지부
                          </span>
                          <div className="text-slate-500 font-semibold text-xs">
                            {item.district !== '-' ? `${item.district}지구` : '-'}
                          </div>
                        </>
                      )}
                    </td>
                    <td className="py-2 px-3 font-bold text-slate-700 align-middle">
                      {isEditing ? (
                        <input type="text" value={item.executive} onChange={e => handleEdit(item.id, 'executive', e.target.value)} className="w-full border rounded px-1.5 py-1 text-sm font-bold text-slate-700 bg-slate-50" />
                      ) : (
                        item.executive
                      )}
                    </td>
                    <td className="py-2 px-3 align-middle">
                      {isEditing ? (
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            <input type="text" value={item.hostName} placeholder="장소명/이름" onChange={e => handleEdit(item.id, 'hostName', e.target.value)} className="w-full border rounded px-1.5 py-0.5 font-bold text-slate-800 bg-slate-50" />
                          </div>
                          <input type="text" value={item.address} placeholder="상세주소" onChange={e => handleEdit(item.id, 'address', e.target.value)} className="w-full border rounded px-1.5 py-0.5 text-xs text-slate-500 bg-slate-50" />
                        </div>
                      ) : (
                        <div className="flex flex-col gap-0.5">
                          {item.hostName && (
                            <div className="font-bold text-slate-800 flex items-center gap-1.5 text-[13px]">
                              <MapPin className="w-3.5 h-3.5 text-slate-400" />
                              {item.hostName}
                            </div>
                          )}
                          <div className="text-slate-500 font-medium text-[12px] leading-tight break-keep">
                            {item.address}
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
                {filteredData.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-slate-400 font-bold">
                      검색 결과 또는 저장된 일정이 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssemblySchedulePage;
