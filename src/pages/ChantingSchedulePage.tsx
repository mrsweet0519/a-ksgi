import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Printer, 
  Download, 
  Plus, 
  Trash2, 
  Save, 
  Undo2, 
  MapPin, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Type, 
  Palette,
  ArrowLeft,
  Settings
} from 'lucide-react';
import html2canvas from 'html2canvas';
import { useParams, useNavigate } from 'react-router-dom';
import { cn } from '../utils/cn';
import type { NoticeDocument } from '../types/index';

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

const DEFAULT_TITLE = "여성부총회 계수지부 제목회";
const DEFAULT_MEMO = "행복가득한 여성부총회~계수지부 화이팅!!";
const DEFAULT_FOOTER = "계수지부 화이팅!!";

const DEFAULT_DATA: DistrictGroup[] = [
  { 
    id: 'd-jibu', districtName: '계수지부', 
    rows: [{ id: 'r-jibu-1', schedule: '월. 수. 금', time: '오전 9시 30분~10시 30분', location: '온라인 창제회' }] 
  },
  { 
    id: 'd1', districtName: '1지구', 
    rows: [
      { id: 'r1-1', schedule: '4/21 (화)', time: '오후 7시30분~8시30분', location: '온라인 창제회' },
      { id: 'r1-2', schedule: '4/28 (화)', time: '오후 7시30분~8시30분', location: '이정수회원님댁' },
      { id: 'r1-3', schedule: '4/29 (수)', time: '오전 11시~12시', location: '온라인 창제회' }
    ] 
  },
  {
    id: 'd2', districtName: '2지구',
    rows: [
      { id: 'r2-1', schedule: '4/23 (목)', time: '오전 11시~12시', location: '소사회관' },
      { id: 'r2-2', schedule: '추후 일정 공지', time: '모임 시간', location: '상세 장소' }
    ]
  },
  {
    id: 'd3', districtName: '3지구',
    rows: [
      { id: 'r3-1', schedule: '4/22 (수)', time: '오후 4시30분~5시30분', location: '소사회관' },
      { id: 'r3-2', schedule: '매주 월,수,금', time: '오후 8시~9시', location: '온라인 창제회' }
    ]
  },
  {
    id: 'd4', districtName: '4지구',
    rows: [
      { id: 'r4-1', schedule: '매주 화,목', time: '오후 8시~9시', location: '온라인 창제회' },
      { id: 'r4-2', schedule: '매주 토요일', time: '오전 9시~10시', location: '온라인 창제회' }
    ]
  },
  {
    id: 'd5', districtName: '5지구',
    rows: [
      { id: 'r5-1', schedule: '매주 평일', time: '오후 8시~9시', location: '동맹창제' },
      { id: 'r5-2', schedule: '매주 토요일', time: '오후 1시~5시', location: '소사회관' }
    ]
  },
  {
    id: 'd6', districtName: '6지구',
    rows: [
      { id: 'r6-1', schedule: '매주 월,수,금', time: '오후 2시~3시', location: '이순금회원님 댁' },
      { id: 'r6-2', schedule: '매주 월,수', time: '오후 8시10분~9시', location: '온라인 창제회' }
    ]
  }
];

const COLOR_MAP = {
  black: '#1e293b',
  red: '#e11d48',
  blue: '#2563eb',
  border: '#e2e8f0',
  bg_header: '#f8fafc',
  bg_jibu: '#fffbeb',
  white: '#ffffff',
  slate_400: '#94a3b8'
};

const ChantingSchedulePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState(DEFAULT_TITLE);
  const [titleColor, setTitleColor] = useState('black');
  const [data, setData] = useState<DistrictGroup[]>(DEFAULT_DATA);
  const [footer, setFooter] = useState(DEFAULT_FOOTER);
  const [footerColor, setFooterColor] = useState('black');
  const [memo, setMemo] = useState(DEFAULT_MEMO);
  const [memoColor, setMemoColor] = useState('black');
  const [saveStatus, setSaveStatus] = useState('');
  
  const imageCaptureRef = useRef<HTMLDivElement>(null);

  // 데이터 로드
  useEffect(() => {
    if (!id) return;
    const savedDocs = localStorage.getItem('ksgi-notices');
    if (savedDocs) {
      const docs: NoticeDocument[] = JSON.parse(savedDocs);
      const current = docs.find(d => d.id === id);
      if (current && current.data && Object.keys(current.data).length > 0) {
        setTitle(current.data.title || DEFAULT_TITLE);
        setTitleColor(current.data.titleColor || 'black');
        setData(current.data.data || DEFAULT_DATA);
        setFooter(current.data.footer || "계수지부 화이팅!!");
        setFooterColor(current.data.footerColor || 'black');
        setMemo(current.data.memo || DEFAULT_MEMO);
        setMemoColor(current.data.memoColor || 'black');
      }
    }
  }, [id]);

  const saveDocument = () => {
    const savedDocs = localStorage.getItem('ksgi-notices');
    if (savedDocs && id) {
      const docs: NoticeDocument[] = JSON.parse(savedDocs);
      const updatedDocs = docs.map(d => {
        if (d.id === id) {
          return {
            ...d,
            title: title, // 문서 목록 제목 업데이트
            data: { title, titleColor, data, footer, footerColor, memo, memoColor },
            updatedAt: new Date().toISOString()
          };
        }
        return d;
      });
      localStorage.setItem('ksgi-notices', JSON.stringify(updatedDocs));
      setSaveStatus('안전하게 저장되었습니다!');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  const handleDownloadImage = async () => {
    try {
      setSaveStatus('이미지 생성 중...');
      const element = imageCaptureRef.current;
      if (!element) return;

      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      await new Promise(resolve => setTimeout(resolve, 500));

      const canvas = await html2canvas(element, {
        scale: 2.5,
        backgroundColor: '#ffffff',
        useCORS: true,
        allowTaint: true,
        width: element.scrollWidth,
        height: element.scrollHeight,
      });

      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `${title}.png`;
      link.href = dataUrl;
      link.click();

      setSaveStatus('이미지 저장 완료');
    } catch (error) {
      console.error('이미지 저장 실패:', error);
      alert('이미지 생성에 실패했습니다.');
    } finally {
      setTimeout(() => setSaveStatus(''), 2000);
    }
  };

  const toggleColor = (current: string) => {
    if (current === 'black') return 'red';
    if (current === 'red') return 'blue';
    return 'black';
  };

  const toggleCellColor = (groupId: string, rowId: string, field: 'schedule' | 'time' | 'location') => {
    setData(data.map(g => g.id === groupId ? { ...g, rows: g.rows.map(r => r.id === rowId ? { ...r, colors: { ...r.colors, [field]: toggleColor(r.colors?.[field] || 'black') } } : r) } : g));
  };

  const ScheduleTemplate = ({ isCapture = false }: { isCapture?: boolean }) => {
    const getColorHex = (color?: string) => {
      if (color === 'red') return COLOR_MAP.red;
      if (color === 'blue') return COLOR_MAP.blue;
      return COLOR_MAP.black;
    };

    if (isCapture) {
      return (
        <div style={{ backgroundColor: '#ffffff', padding: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '1000px', boxSizing: 'border-box' }}>
          <div style={{ marginBottom: '50px', textAlign: 'center', width: '100%' }}>
            <div style={{ color: getColorHex(titleColor), fontSize: '36px', fontWeight: '900' }}>{title}</div>
            <p style={{ color: COLOR_MAP.slate_400, fontSize: '15px', fontWeight: 'bold', marginTop: '15px' }}>※ 일정은 지구 상황에 따라 변동될 수 있습니다.</p>
          </div>
          <div style={{ border: `1px solid ${COLOR_MAP.border}`, borderRadius: '16px', overflow: 'hidden', width: '100%' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: COLOR_MAP.bg_header, borderBottom: `1px solid ${COLOR_MAP.border}` }}>
                  <th style={{ padding: '25px', color: COLOR_MAP.black, fontSize: '18px', fontWeight: '900', borderRight: `1px solid ${COLOR_MAP.border}`, width: '15%' }}>구분</th>
                  <th style={{ padding: '25px', color: COLOR_MAP.black, fontSize: '18px', fontWeight: '900', borderRight: `1px solid ${COLOR_MAP.border}`, width: '23%' }}>일정</th>
                  <th style={{ padding: '25px', color: COLOR_MAP.black, fontSize: '18px', fontWeight: '900', borderRight: `1px solid ${COLOR_MAP.border}` }}>시간</th>
                  <th style={{ padding: '25px', color: COLOR_MAP.black, fontSize: '18px', fontWeight: '900' }}>장소</th>
                </tr>
              </thead>
              <tbody>
                {data.map((group) => (
                  <React.Fragment key={group.id}>
                    {group.rows.map((row, rowIdx) => (
                      <tr key={row.id} style={{ borderBottom: `1px solid #f1f5f9`, backgroundColor: group.districtName.includes('지부') ? COLOR_MAP.bg_jibu : 'transparent' }}>
                        {rowIdx === 0 && (
                          <td rowSpan={group.rows.length} style={{ padding: '25px', textAlign: 'center', verticalAlign: 'middle', borderRight: `1px solid ${COLOR_MAP.border}`, color: getColorHex(group.districtNameColor), fontSize: '20px', fontWeight: '900' }}>
                            {group.districtName}
                          </td>
                        )}
                        <td style={{ padding: '25px', borderRight: `1px solid #f1f5f9`, textAlign: 'center', color: getColorHex(row.colors?.schedule), fontSize: '18px', fontWeight: 'bold' }}>{row.schedule}</td>
                        <td style={{ padding: '25px', borderRight: `1px solid #f1f5f9`, textAlign: 'center', color: getColorHex(row.colors?.time), fontSize: '18px', fontWeight: '900' }}>{row.time}</td>
                        <td style={{ padding: '25px', textAlign: 'center', color: getColorHex(row.colors?.location), fontSize: '18px', fontWeight: 'bold' }}>{row.location}</td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: '60px', borderTop: `1px solid ${COLOR_MAP.border}`, paddingTop: '40px', width: '100%', textAlign: 'center' }}>
            <div style={{ color: getColorHex(memoColor), fontSize: '24px', fontWeight: 'bold', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>{memo}</div>
          </div>
          <div style={{ marginTop: '40px', textAlign: 'center', width: '100%', color: getColorHex(footerColor), fontSize: '20px', fontWeight: '900' }}>{footer}</div>
        </div>
      );
    }

    return (
      <div className="bg-white flex flex-col items-center w-full p-8 sm:p-12 rounded-[40px] border border-slate-100 shadow-premium border-t-[12px] border-t-amber-100">
        <div className="mb-10 text-center w-full relative group/editable">
          <input 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className={cn("text-3xl font-black text-center bg-transparent border-none focus:ring-0 focus:outline-none w-full", (titleColor === 'red' ? 'text-rose-600' : titleColor === 'blue' ? 'text-blue-600' : 'text-slate-900'))}
          />
          <button onClick={() => setTitleColor(toggleColor(titleColor))} className="absolute top-0 right-0 p-2 text-slate-300 hover:text-blue-500 opacity-0 group-hover/editable:opacity-100 transition-all no-print"><Palette className="w-4 h-4" /></button>
          <p className="text-slate-400 text-sm font-bold mt-2">※ 일정은 지구 상황에 따라 변동될 수 있습니다.</p>
        </div>

        <div className="border border-slate-200 rounded-2xl overflow-hidden w-full bg-white shadow-sm">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-800">
                <th className="py-5 px-4 font-black text-center border-r border-slate-100 w-[15%]">구분</th>
                <th className="py-5 px-4 font-black text-center border-r border-slate-100 w-[23%]">일정</th>
                <th className="py-5 px-4 font-black text-center border-r border-slate-100">시간</th>
                <th className="py-5 px-4 font-black text-center">장소</th>
                <th className="w-12 no-print"></th>
              </tr>
            </thead>
            <tbody>
              {data.map((group) => (
                <React.Fragment key={group.id}>
                  {group.rows.map((row, rowIdx) => (
                    <tr key={row.id} className={cn("border-b border-slate-50 group/editable relative", group.districtName.includes('지부') ? "bg-amber-50/20" : "")}>
                      {rowIdx === 0 && (
                        <td rowSpan={group.rows.length} className="py-5 px-4 text-center align-middle border-r border-slate-100 relative bg-slate-50/10">
                          <input 
                            value={group.districtName} 
                            onChange={(e) => setData(data.map(g => g.id === group.id ? {...g, districtName: e.target.value} : g))} 
                            className={cn("w-full text-center font-black text-lg bg-transparent border-none focus:ring-0 focus:outline-none", (group.districtNameColor === 'red' ? 'text-rose-600' : group.districtNameColor === 'blue' ? 'text-blue-600' : 'text-slate-900'))}
                          />
                          <button onClick={() => setData(data.map(g => g.id === group.id ? {...g, districtNameColor: toggleColor(g.districtNameColor || 'black')} : g))} className="absolute top-0 right-0 p-1 text-slate-300 hover:text-blue-500 opacity-0 group-hover/editable:opacity-100 no-print"><Palette className="w-3 h-3" /></button>
                        </td>
                      )}
                      <td className="py-5 px-4 border-r border-slate-50 relative">
                        <input value={row.schedule} onChange={(e) => setData(data.map(g => g.id === group.id ? {...g, rows: g.rows.map(r => r.id === row.id ? {...r, schedule: e.target.value} : r)} : g))} className={cn("w-full bg-transparent border-none focus:ring-0 text-center font-bold", (row.colors?.schedule === 'red' ? 'text-rose-600' : row.colors?.schedule === 'blue' ? 'text-blue-600' : 'text-slate-800'))} />
                        <button onClick={() => toggleCellColor(group.id, row.id, 'schedule')} className="absolute top-0 right-0 p-1 text-slate-300 hover:text-blue-500 opacity-0 group-hover/editable:opacity-100 no-print"><Palette className="w-3 h-3" /></button>
                      </td>
                      <td className="py-5 px-4 border-r border-slate-50 relative">
                        <input value={row.time} onChange={(e) => setData(data.map(g => g.id === group.id ? {...g, rows: g.rows.map(r => r.id === row.id ? {...r, time: e.target.value} : r)} : g))} className={cn("w-full bg-transparent border-none focus:ring-0 text-center font-black", (row.colors?.time === 'red' ? 'text-rose-600' : row.colors?.time === 'blue' ? 'text-blue-600' : 'text-slate-800'))} />
                        <button onClick={() => toggleCellColor(group.id, row.id, 'time')} className="absolute top-0 right-0 p-1 text-slate-300 hover:text-blue-500 opacity-0 group-hover/editable:opacity-100 no-print"><Palette className="w-3 h-3" /></button>
                      </td>
                      <td className="py-5 px-4 border-r border-slate-50 relative">
                        <input value={row.location} onChange={(e) => setData(data.map(g => g.id === group.id ? {...g, rows: g.rows.map(r => r.id === row.id ? {...r, location: e.target.value} : r)} : g))} className={cn("w-full bg-transparent border-none focus:ring-0 text-center font-bold", (row.colors?.location === 'red' ? 'text-rose-600' : row.colors?.location === 'blue' ? 'text-blue-600' : 'text-slate-800'))} />
                        <button onClick={() => toggleCellColor(group.id, row.id, 'location')} className="absolute top-0 right-0 p-1 text-slate-300 hover:text-blue-500 opacity-0 group-hover/editable:opacity-100 no-print"><Palette className="w-3 h-3" /></button>
                      </td>
                      <td className="w-12 px-2 no-print">
                        <div className="flex flex-col items-center gap-2 opacity-0 group-hover/editable:opacity-100">
                          <button onClick={() => setData(data.map(dg => dg.id === group.id ? {...dg, rows: dg.rows.filter(r => r.id !== row.id)} : dg))} className="text-slate-300 hover:text-rose-500"><Trash2 className="w-4 h-4" /></button>
                          {rowIdx === group.rows.length - 1 && <button onClick={() => setData(data.map(dg => dg.id === group.id ? {...dg, rows: [...dg.rows, { id: `r-${Date.now()}`, schedule: '', time: '', location: '' }]} : dg))} className="text-slate-300 hover:text-blue-500"><Plus className="w-4 h-4" /></button>}
                        </div>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
          <button onClick={() => setData([...data, { id: `d-${Date.now()}`, districtName: '신규 지구', rows: [{ id: `r-${Date.now()}`, schedule: '', time: '', location: '' }] }])} className="w-full py-4 bg-slate-50 text-slate-400 text-xs font-black hover:bg-slate-100 no-print">+ 새로운 그룹 추가</button>
        </div>

        <div className="mt-12 border-t border-slate-100 pt-10 group/editable relative w-full flex justify-center">
          <textarea value={memo} onChange={(e) => setMemo(e.target.value)} className={cn("w-full bg-transparent border-none focus:ring-0 text-2xl font-bold min-h-[120px] text-center resize-none leading-relaxed", (memoColor === 'red' ? 'text-rose-600' : memoColor === 'blue' ? 'text-blue-600' : 'text-slate-800'))} />
          <button onClick={() => setMemoColor(toggleColor(memoColor))} className="absolute top-0 right-0 p-2 text-slate-300 hover:text-blue-500 opacity-0 group-hover/editable:opacity-100 no-print"><Palette className="w-4 h-4" /></button>
        </div>
        
        <div className="mt-6 group/editable relative w-full flex justify-center">
          <input value={footer} onChange={(e) => setFooter(e.target.value)} className={cn("text-lg font-black text-center bg-transparent border-none focus:outline-none w-full", (footerColor === 'red' ? 'text-rose-600' : footerColor === 'blue' ? 'text-blue-600' : 'text-slate-800'))} />
          <button onClick={() => setFooterColor(toggleColor(footerColor))} className="absolute top-0 right-0 p-2 text-slate-300 hover:text-blue-500 opacity-0 group-hover/editable:opacity-100 no-print"><Palette className="w-4 h-4" /></button>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 relative animate-in fade-in duration-500">
      {/* Control Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 no-print mb-12 bg-slate-900 text-white p-8 rounded-[32px] shadow-2xl">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/reports')} className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-black">공지물 편집 중</h1>
            <p className="text-xs text-slate-400 font-bold mt-0.5">{title}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button onClick={saveDocument} className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl text-sm font-black hover:bg-blue-700 transition-all active:scale-95">
            <Save className="w-4 h-4" /> 저장하기
          </button>
          <button onClick={() => window.print()} className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white border border-white/20 rounded-2xl text-sm font-bold hover:bg-white/20 transition-all">
            <Printer className="w-4 h-4" /> 인쇄
          </button>
          <button onClick={handleDownloadImage} className="flex items-center gap-2 px-6 py-3 bg-rose-600 text-white rounded-2xl text-sm font-black hover:bg-rose-700 transition-all active:scale-95">
            <Download className="w-4 h-4" /> 이미지 저장
          </button>
        </div>
      </div>

      {/* Main Preview Area */}
      <div className="print-area">
        <ScheduleTemplate />
      </div>

      {/* Capture Hidden Area */}
      <div ref={imageCaptureRef} style={{ position: 'absolute', top: '-10000px', left: '0', width: '1000px', background: '#ffffff' }}>
        <ScheduleTemplate isCapture={true} />
      </div>

      {/* Status Toast */}
      {saveStatus && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-8 py-4 rounded-3xl text-sm font-black shadow-2xl z-[100] animate-in fade-in slide-in-from-bottom-4 duration-300">
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
