import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Printer, Download, Plus, Trash2, Save, Undo2, MapPin, Clock, Calendar, CheckCircle2, Type, Palette } from 'lucide-react';
import html2canvas from 'html2canvas';
import { cn } from '../utils/cn';

interface MeetingRow {
  id: string;
  schedule: string;
  time: string;
  location: string;
  colors?: {
    schedule?: string;
    time?: string;
    location?: string;
  };
}

interface DistrictGroup {
  id: string;
  districtName: string;
  districtNameColor?: string;
  rows: MeetingRow[];
}

const DEFAULT_TITLE = "여성부총회 계수지부 제목회 일정 안내";

const DEFAULT_DATA: DistrictGroup[] = [
  { 
    id: 'd-jibu', districtName: '계수지부', 
    rows: [{ id: 'r-jibu-1', schedule: '월, 수, 금', time: '오전 9시 30분~10시 30분', location: '온라인 창제회' }] 
  },
  { 
    id: 'd1', districtName: '1지구', 
    rows: [
      { id: 'r1-1', schedule: '4/21 (화)', time: '오후 7시30분~8시30분', location: '온라인 창제회' },
      { id: 'r1-2', schedule: '4/28 (화)', time: '오후 7시30분~8시30분', location: '이정수회원님댁' },
      { id: 'r1-3', schedule: '4/29 (수)', time: '오전 11시~12시', location: '온라인 창제회' }
    ] 
  }
];

const DEFAULT_MEMO = "행복가득한 여성부총회~계수지부 화이팅!!";

// html2canvas가 지원하지 않는 oklch 컬러를 대체하기 위한 표준 HEX 컬러맵
const COLOR_MAP = {
  black: '#1e293b', // slate-800
  red: '#e11d48',   // rose-600
  blue: '#2563eb',  // blue-600
  border: '#e2e8f0', // slate-200
  bg_header: '#f8fafc', // slate-50
  bg_jibu: '#fffbeb', // amber-50
  white: '#ffffff',
  slate_400: '#94a3b8'
};

const ChantingSchedulePage = () => {
  const [title, setTitle] = useState(() => localStorage.getItem('chanting-title') || DEFAULT_TITLE);
  const [titleColor, setTitleColor] = useState(() => localStorage.getItem('chanting-title-color') || 'black');
  const [data, setData] = useState<DistrictGroup[]>(() => {
    const saved = localStorage.getItem('chanting-data');
    return saved ? JSON.parse(saved) : DEFAULT_DATA;
  });
  const [footer, setFooter] = useState(() => localStorage.getItem('chanting-footer') || "감사합니다.");
  const [footerColor, setFooterColor] = useState(() => localStorage.getItem('chanting-footer-color') || 'black');
  const [memo, setMemo] = useState(() => localStorage.getItem('chanting-memo') || DEFAULT_MEMO);
  const [memoColor, setMemoColor] = useState(() => localStorage.getItem('chanting-memo-color') || 'black');
  const [saveStatus, setSaveStatus] = useState('');
  const [lastSaved, setLastSaved] = useState(() => localStorage.getItem('chanting-last-saved') || '');
  
  const imageCaptureRef = useRef<HTMLDivElement>(null);

  const updateLastSaved = () => {
    const now = new Date();
    const timeStr = `${now.getHours()}시 ${now.getMinutes()}분 ${now.getSeconds()}초`;
    localStorage.setItem('chanting-last-saved', timeStr);
    setLastSaved(timeStr);
  };

  useEffect(() => {
    localStorage.setItem('chanting-title', title);
    localStorage.setItem('chanting-title-color', titleColor);
    updateLastSaved();
  }, [title, titleColor]);

  useEffect(() => {
    localStorage.setItem('chanting-footer', footer);
    localStorage.setItem('chanting-footer-color', footerColor);
    updateLastSaved();
  }, [footer, footerColor]);

  useEffect(() => {
    localStorage.setItem('chanting-memo', memo);
    localStorage.setItem('chanting-memo-color', memoColor);
    updateLastSaved();
  }, [memo, memoColor]);

  useEffect(() => {
    localStorage.setItem('chanting-data', JSON.stringify(data));
    updateLastSaved();
  }, [data]);

  const toggleColor = (current: string) => {
    if (current === 'black') return 'red';
    if (current === 'red') return 'blue';
    return 'black';
  };

  const toggleCellColor = (groupId: string, rowId: string, field: 'schedule' | 'time' | 'location') => {
    setData(data.map(g => {
      if (g.id === groupId) {
        return { ...g, rows: g.rows.map(r => {
            if (r.id === rowId) {
              const currentColors = r.colors || {};
              const currentColor = currentColors[field] || 'black';
              return { ...r, colors: { ...currentColors, [field]: toggleColor(currentColor) } };
            }
            return r;
          }) 
        };
      }
      return g;
    }));
  };

  const toggleDistrictColor = (groupId: string) => {
    setData(data.map(g => {
      if (g.id === groupId) {
        return { ...g, districtNameColor: toggleColor(g.districtNameColor || 'black') };
      }
      return g;
    }));
  };

  const handleManualSave = () => {
    updateLastSaved();
    setSaveStatus(`방금 전 ${lastSaved.split(' ')[2] || ''} 안전하게 저장되었습니다!`);
    setTimeout(() => setSaveStatus(''), 3000);
  };

  // 이미지 저장 실행 함수
  const handleDownloadImage = async () => {
    try {
      console.log('이미지 저장 시작');
      setSaveStatus('이미지 생성 중...');

      const element = imageCaptureRef.current;
      if (!element) {
        console.error('imageCaptureRef.current가 없습니다. 캡처 영역이 렌더링되지 않았습니다.');
        alert('이미지 캡처 영역을 찾을 수 없습니다.');
        return;
      }

      // 디버깅 로그 출력
      console.log('capture element:', element);
      console.log('scrollWidth:', element.scrollWidth);
      console.log('scrollHeight:', element.scrollHeight);
      console.log('rect:', element.getBoundingClientRect());

      // 1. 캡처 전 렌더링 대기 강화 (요청 사항: rAF 2회 + 500ms)
      await new Promise(resolve => requestAnimationFrame(() => {
        requestAnimationFrame(resolve);
      }));
      await new Promise(resolve => setTimeout(resolve, 500));

      console.log('html2canvas 실행 직전');

      // 2. html2canvas 옵션 안정화 (요청 사항 준수)
      const canvas = await html2canvas(element, {
        scale: 2.2, // 선명도를 위해 2.2배 스케일
        backgroundColor: '#ffffff',
        useCORS: true,
        allowTaint: true,
        logging: true,
        scrollX: 0,
        scrollY: 0,
        width: element.scrollWidth,
        height: element.scrollHeight,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
      });

      console.log('canvas 생성 성공:', canvas.width, canvas.height);

      const dataUrl = canvas.toDataURL('image/png');
      if (!dataUrl || dataUrl === 'data:,') {
        console.error('canvas.toDataURL 결과가 비어 있습니다.');
        alert('이미지 데이터 생성에 실패했습니다.');
        return;
      }

      // 3. 다운로드 실행
      const link = document.createElement('a');
      link.download = 'chanting-schedule.png';
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setSaveStatus('이미지 저장 완료');
      console.log('이미지 저장 완료');
    } catch (error) {
      console.error('이미지 저장 실패:', error);
      alert('이미지 생성에 실패했습니다. 콘솔 로그를 확인해주세요.');
    } finally {
      setTimeout(() => setSaveStatus(''), 2000);
    }
  };

  const getColorHex = (color?: string) => {
    if (color === 'red') return COLOR_MAP.red;
    if (color === 'blue') return COLOR_MAP.blue;
    return COLOR_MAP.black;
  };

  const PaletteToggle = ({ onToggle }: { onToggle: () => void }) => (
    <button 
      onClick={onToggle} 
      className="absolute top-0 right-0 p-1 text-slate-300 hover:text-blue-500 opacity-0 group-hover/editable:opacity-100 transition-all no-print edit-tool z-20"
      title="색상 변경"
    >
      <Palette className="w-2.5 h-2.5" />
    </button>
  );

  // 캡처 전용 템플릿: 모든 Tailwind 클래스를 제거하고 인라인 스타일(HEX)만 사용
  const ScheduleTemplate = ({ isCapture = false }: { isCapture?: boolean }) => {
    if (isCapture) {
      // 캡처 모드: 아이콘, 버튼 완전 제거 및 모든 스타일 HEX 처리
      return (
        <div style={{ backgroundColor: '#ffffff', padding: '60px 80px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '1000px', boxSizing: 'border-box' }}>
          {/* 제목 영역 */}
          <div style={{ marginBottom: '40px', textAlign: 'center', width: '100%' }}>
            <div style={{ color: getColorHex(titleColor), fontSize: '32px', fontWeight: '900', textAlign: 'center' }}>
              {title || "제목 없음"}
            </div>
            <p style={{ color: COLOR_MAP.slate_400, fontSize: '14px', fontWeight: 'bold', marginTop: '10px' }}>
              ※ 일정은 지구 상황에 따라 변동될 수 있습니다.
            </p>
          </div>

          {/* 테이블 영역 */}
          <div style={{ border: `1px solid ${COLOR_MAP.border}`, borderRadius: '12px', overflow: 'hidden', width: '100%', backgroundColor: '#ffffff' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: COLOR_MAP.bg_header, borderBottom: `1px solid ${COLOR_MAP.border}` }}>
                  <th style={{ padding: '20px 10px', color: COLOR_MAP.black, fontSize: '16px', fontWeight: '900', textAlign: 'center', borderRight: `1px solid ${COLOR_MAP.border}`, width: '15%' }}>구분</th>
                  <th style={{ padding: '20px 10px', color: COLOR_MAP.black, fontSize: '16px', fontWeight: '900', textAlign: 'center', borderRight: `1px solid ${COLOR_MAP.border}`, width: '23%' }}>일정</th>
                  <th style={{ padding: '20px 10px', color: COLOR_MAP.black, fontSize: '16px', fontWeight: '900', textAlign: 'center', borderRight: `1px solid ${COLOR_MAP.border}` }}>시간</th>
                  <th style={{ padding: '20px 10px', color: COLOR_MAP.black, fontSize: '16px', fontWeight: '900', textAlign: 'center' }}>장소</th>
                </tr>
              </thead>
              <tbody>
                {data.map((group) => (
                  <React.Fragment key={group.id}>
                    {group.rows.map((row, rowIdx) => (
                      <tr key={row.id} style={{ borderBottom: `1px solid #f1f5f9`, backgroundColor: group.districtName.includes('지부') ? COLOR_MAP.bg_jibu : 'transparent' }}>
                        {rowIdx === 0 && (
                          <td rowSpan={group.rows.length} style={{ padding: '20px 10px', textAlign: 'center', verticalAlign: 'middle', borderRight: `1px solid ${COLOR_MAP.border}` }}>
                            <div style={{ color: getColorHex(group.districtNameColor), fontSize: '18px', fontWeight: '900', whiteSpace: 'nowrap' }}>
                              {group.districtName}
                            </div>
                          </td>
                        )}
                        <td style={{ padding: '20px 10px', borderRight: `1px solid #f1f5f9`, textAlign: 'center' }}>
                          <div style={{ color: getColorHex(row.colors?.schedule), fontSize: '16px', fontWeight: 'bold' }}>{row.schedule}</div>
                        </td>
                        <td style={{ padding: '20px 10px', borderRight: `1px solid #f1f5f9`, textAlign: 'center' }}>
                          <div style={{ color: getColorHex(row.colors?.time), fontSize: '16px', fontWeight: '900' }}>{row.time}</div>
                        </td>
                        <td style={{ padding: '20px 10px', textAlign: 'center' }}>
                          <div style={{ color: getColorHex(row.colors?.location), fontSize: '16px', fontWeight: 'bold' }}>{row.location}</div>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* 하단 메모 영역 */}
          <div style={{ marginTop: '50px', borderTop: `1px solid ${COLOR_MAP.border}`, paddingTop: '40px', width: '100%', textAlign: 'center' }}>
            <div style={{ color: getColorHex(memoColor), fontSize: '22px', fontWeight: 'bold', lineHeight: '1.6', whiteSpace: 'pre-wrap', textAlign: 'center' }}>
              {memo}
            </div>
          </div>
          
          {/* 하단 감사 문구 */}
          <div style={{ marginTop: '30px', textAlign: 'center', width: '100%' }}>
            <div style={{ color: getColorHex(footerColor), fontSize: '18px', fontWeight: '900', textAlign: 'center' }}>{footer}</div>
          </div>
        </div>
      );
    }

    // 화면용 템플릿 (기존 Tailwind 그대로 유지)
    return (
      <div className="bg-white flex flex-col items-center w-full p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-xl border-t-8 border-t-amber-100">
        <div className="mb-6 text-center w-full relative group/editable">
          <input 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className={cn("text-2xl font-black text-center bg-transparent border-none focus:ring-0 focus:outline-none px-2 py-1 transition-all w-full", (titleColor === 'red' ? 'text-rose-600' : titleColor === 'blue' ? 'text-blue-600' : 'text-slate-900'))}
            placeholder="일정 제목" 
          />
          <PaletteToggle onToggle={() => setTitleColor(toggleColor(titleColor))} />
          <p className="text-slate-400 text-xs font-bold mt-1">※ 일정은 지구 상황에 따라 변동될 수 있습니다.</p>
        </div>

        <div className="border border-slate-200 rounded-xl overflow-hidden w-full bg-white">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-800 text-sm">
                <th className="py-4 px-3 font-black text-center border-r border-slate-100 w-[15%]">구분</th>
                <th className="py-4 px-3 font-black text-center border-r border-slate-100 w-[23%]">일정</th>
                <th className="py-4 px-3 font-black text-center border-r border-slate-100">시간</th>
                <th className="py-4 px-3 font-black text-center">장소</th>
                <th className="w-10 no-print"></th>
              </tr>
            </thead>
            <tbody>
              {data.map((group) => (
                <React.Fragment key={group.id}>
                  {group.rows.map((row, rowIdx) => (
                    <tr key={row.id} className={cn("border-b border-slate-50 group/editable relative", group.districtName.includes('지부') ? "bg-amber-50/20" : "")}>
                      {rowIdx === 0 && (
                        <td rowSpan={group.rows.length} className="py-4 px-3 text-center align-middle border-r border-slate-100 relative bg-slate-50/10">
                          <input 
                            value={group.districtName} 
                            onChange={(e) => handleUpdateGroupName(group.id, e.target.value)} 
                            className={cn("w-full text-center font-black text-base bg-transparent border-none focus:ring-0 focus:outline-none whitespace-nowrap", (group.districtNameColor === 'red' ? 'text-rose-600' : group.districtNameColor === 'blue' ? 'text-blue-600' : 'text-slate-900'))}
                          />
                          <PaletteToggle onToggle={() => toggleDistrictColor(group.id)} />
                          <button onClick={() => confirm(`지구 전체를 삭제할까요?`) && setData(data.filter(g => g.id !== group.id))} className="absolute -top-2 -left-2 p-1 bg-rose-500 text-white rounded-full opacity-0 group-hover/editable:opacity-100 transition-opacity no-print edit-tool z-30 shadow-md"><Trash2 className="w-3 h-3" /></button>
                        </td>
                      )}
                      <td className="py-4 px-2 border-r border-slate-50 relative">
                        <input value={row.schedule} onChange={(e) => setData(data.map(g => g.id === group.id ? {...g, rows: g.rows.map(r => r.id === row.id ? {...r, schedule: e.target.value} : r)} : g))} className={cn("w-full bg-transparent border-none focus:ring-0 focus:outline-none text-[15px] font-bold text-center", (row.colors?.schedule === 'red' ? 'text-rose-600' : row.colors?.schedule === 'blue' ? 'text-blue-600' : 'text-slate-800'))} />
                        <PaletteToggle onToggle={() => toggleCellColor(group.id, row.id, 'schedule')} />
                      </td>
                      <td className="py-4 px-2 border-r border-slate-50 relative">
                        <input value={row.time} onChange={(e) => setData(data.map(g => g.id === group.id ? {...g, rows: g.rows.map(r => r.id === row.id ? {...r, time: e.target.value} : r)} : g))} className={cn("w-full bg-transparent border-none focus:ring-0 focus:outline-none text-[15px] font-black text-center", (row.colors?.time === 'red' ? 'text-rose-600' : row.colors?.time === 'blue' ? 'text-blue-600' : 'text-slate-800'))} />
                        <PaletteToggle onToggle={() => toggleCellColor(group.id, row.id, 'time')} />
                      </td>
                      <td className="py-4 px-2 border-r border-slate-50 relative">
                        <input value={row.location} onChange={(e) => setData(data.map(g => g.id === group.id ? {...g, rows: g.rows.map(r => r.id === row.id ? {...r, location: e.target.value} : r)} : g))} className={cn("w-full bg-transparent border-none focus:ring-0 focus:outline-none text-[15px] font-bold text-center", (row.colors?.location === 'red' ? 'text-rose-600' : row.colors?.location === 'blue' ? 'text-blue-600' : 'text-slate-800'))} />
                        <PaletteToggle onToggle={() => toggleCellColor(group.id, row.id, 'location')} />
                      </td>
                      <td className="w-10 px-1 no-print edit-tool">
                        <div className="flex flex-col items-center gap-2 opacity-0 group-hover/editable:opacity-100 transition-opacity">
                          <button onClick={() => { const g = data.find(dg => dg.id === group.id); if (g && g.rows.length <= 1) { if (confirm(`지구 전체를 삭제할까요?`)) setData(data.filter(dg => dg.id !== group.id)); } else { setData(data.map(dg => dg.id === group.id ? {...dg, rows: dg.rows.filter(r => r.id !== row.id)} : dg)); } }} className="p-1.5 text-slate-300 hover:text-rose-500"><Trash2 className="w-4 h-4" /></button>
                          {rowIdx === group.rows.length - 1 && <button onClick={() => setData(data.map(dg => dg.id === group.id ? {...dg, rows: [...dg.rows, { id: `r-${Date.now()}`, schedule: '', time: '', location: '' }]} : dg))} className="p-1.5 text-slate-300 hover:text-blue-500"><Plus className="w-4 h-4" /></button>}
                        </div>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
          <button onClick={() => setData([...data, { id: `d-${Date.now()}`, districtName: '신규 지구', rows: [{ id: `r-${Date.now()}`, schedule: '', time: '', location: '' }] }])} className="w-full py-3 bg-slate-50 text-slate-400 text-xs font-black hover:bg-slate-100 no-print edit-tool">+ 새로운 구분 추가</button>
        </div>

        <div className="mt-8 border-t border-slate-100 pt-8 group/editable relative w-full flex justify-center">
          <textarea value={memo} onChange={(e) => setMemo(e.target.value)} className={cn("w-full bg-transparent border-none focus:ring-0 focus:outline-none text-xl font-bold min-h-[100px] text-center resize-none leading-relaxed", (memoColor === 'red' ? 'text-rose-600' : memoColor === 'blue' ? 'text-blue-600' : 'text-slate-800'))} placeholder="자유 기원문" onInput={(e) => { const t = e.target as HTMLTextAreaElement; t.style.height = 'auto'; t.style.height = t.scrollHeight + 'px'; }} />
          <PaletteToggle onToggle={() => setMemoColor(toggleColor(memoColor))} />
        </div>
        
        <div className="mt-4 text-center group/editable relative w-full flex justify-center">
          <input value={footer} onChange={(e) => setFooter(e.target.value)} className={cn("text-base font-black text-center bg-transparent border-none focus:outline-none w-full", (footerColor === 'red' ? 'text-rose-600' : footerColor === 'blue' ? 'text-blue-600' : 'text-slate-800'))} />
          <PaletteToggle onToggle={() => setFooterColor(toggleColor(footerColor))} />
        </div>
      </div>
    );
  };

  const handleUpdateGroupName = (groupId: string, name: string) => {
    setData(data.map(g => g.id === groupId ? { ...g, districtName: name } : g));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 relative">
      <style>{`
        @media print {
          @page { size: A4; margin: 10mm; }
          body { background: white !important; }
          .no-print { display: none !important; }
          .print-area { width: 100% !important; margin: 0 !important; visibility: visible !important; }
          table { width: 100% !important; table-layout: auto !important; }
        }
      `}</style>

      {/* UI 상단 컨트롤 바 */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 no-print mb-10 bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-100 rounded-2xl">
              <Sparkles className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-800 tracking-tight">제목회 일정 관리</h1>
              <div className="flex items-center gap-2 mt-1">
                {lastSaved && (
                  <span className="text-blue-600 text-[11px] font-bold bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 마지막 저장: {lastSaved}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <button onClick={handleManualSave} className="flex items-center gap-2 px-6 py-3 bg-rose-600 text-white rounded-2xl text-sm font-black shadow-lg shadow-rose-100 hover:bg-rose-700 transition-all active:scale-95">
            <Save className="w-4 h-4" /> 저장
          </button>
          <button onClick={() => window.print()} className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl text-sm font-bold hover:bg-slate-50 shadow-sm transition-all">
            <Printer className="w-4 h-4" /> 인쇄
          </button>
          <button onClick={handleDownloadImage} className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl text-sm font-black shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95">
            <Download className="w-4 h-4" /> 이미지 저장
          </button>
        </div>
      </div>

      {/* 메인 편집 영역 */}
      <div className="print-area">
        <ScheduleTemplate />
      </div>

      {/* 이미지 캡처 전용 히든 영역 (요청에 따라 transform으로 숨김) */}
      <div 
        ref={imageCaptureRef}
        id="chanting-image-capture"
        style={{ 
          position: 'absolute',
          top: '0',
          left: '0',
          transform: 'translateY(-4000px)', // 완전히 화면 밖으로
          width: '1000px',
          background: '#ffffff',
          zIndex: -1,
          pointerEvents: 'none',
          boxSizing: 'border-box'
        }}
      >
        <ScheduleTemplate isCapture={true} />
      </div>

      {/* 알림 피드백 */}
      {saveStatus && (
        <div className="fixed bottom-10 right-10 bg-slate-900/95 text-white px-8 py-4 rounded-3xl text-sm font-bold shadow-2xl z-[100] border border-slate-700 backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            {saveStatus}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChantingSchedulePage;
