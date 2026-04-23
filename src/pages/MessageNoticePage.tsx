import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Printer, 
  Download, 
  Plus, 
  Trash2, 
  Save, 
  ArrowLeft,
  CheckCircle2,
  Palette,
  AlignLeft,
  AlignCenter,
  Type,
  Image as ImageIcon,
  Heart,
  Star,
  Sun,
  Shield,
  Smile,
  Zap,
  Quote
} from 'lucide-react';
import html2canvas from 'html2canvas';
import { useParams, useNavigate } from 'react-router-dom';
import { cn } from '../utils/cn';
import type { NoticeDocument, MessageData, MessageItem } from '../types/index';

const ICON_LIST = [
  { name: 'Heart', component: Heart },
  { name: 'Star', component: Star },
  { name: 'Sun', component: Sun },
  { name: 'Shield', component: Shield },
  { name: 'Smile', component: Smile },
  { name: 'Zap', component: Zap },
  { name: 'Quote', component: Quote },
];

const DEFAULT_MESSAGE_DATA: MessageData = {
  header: {
    title: "여성부총회 승리 기원문",
    subtitle: "계수지부",
    titleColor: "blue"
  },
  items: [
    { id: '1', text: '모든 부원이 승리의 체험을 갖게 하소서', icon: 'Heart', isHighlight: true },
    { id: '2', text: '행사의 절대 안전과 성공을 기원합니다', icon: 'Shield', isHighlight: false },
    { id: '3', text: '이체동심의 마음으로 광포의 문을 엽니다', icon: 'Sun', isHighlight: false }
  ],
  style: {
    textAlign: 'center',
    backgroundType: 'gradient',
    backgroundValue: 'linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)',
    overlayOpacity: 0.1,
    theme: 'light',
    fontSize: 'md'
  }
};

const MessageNoticePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [docData, setDocData] = useState<MessageData>(DEFAULT_MESSAGE_DATA);
  const [saveStatus, setSaveStatus] = useState('');
  const imageCaptureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!id) return;
    const savedDocs = localStorage.getItem('ksgi-notices');
    if (savedDocs) {
      const docs: NoticeDocument[] = JSON.parse(savedDocs);
      const current = docs.find(d => d.id === id);
      if (current && current.data && Object.keys(current.data).length > 0) {
        setDocData(current.data);
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
            title: docData.header.title,
            data: docData,
            updatedAt: new Date().toISOString()
          };
        }
        return d;
      });
      localStorage.setItem('ksgi-notices', JSON.stringify(updatedDocs));
      setSaveStatus('기원문이 저장되었습니다!');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  const handleDownloadImage = async () => {
    try {
      setSaveStatus('이미지 생성 중...');
      const element = imageCaptureRef.current;
      if (!element) return;
      await new Promise(resolve => setTimeout(resolve, 500));
      const canvas = await html2canvas(element, { 
        scale: 3.5, // 카톡 전송 시 깨짐 방지를 위해 더 높은 배율 적용
        backgroundColor: '#ffffff', 
        useCORS: true,
        logging: false,
        windowWidth: 1080,
        windowHeight: element.scrollHeight
      });
      const link = document.createElement('a');
      link.download = `${docData.header.title}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      setSaveStatus('이미지 저장 완료');
    } catch (error) {
      alert('이미지 생성에 실패했습니다.');
    } finally {
      setTimeout(() => setSaveStatus(''), 2000);
    }
  };

  const updateItem = (itemId: string, updates: Partial<MessageItem>) => {
    setDocData({
      ...docData,
      items: docData.items.map(item => item.id === itemId ? { ...item, ...updates } : item)
    });
  };

  const addItem = () => {
    const newItem: MessageItem = { id: `item-${Date.now()}`, text: '', icon: 'Heart', isHighlight: false };
    setDocData({ ...docData, items: [...docData.items, newItem] });
  };

  const deleteItem = (itemId: string) => {
    setDocData({ ...docData, items: docData.items.filter(item => item.id !== itemId) });
  };

  const IconRenderer = ({ name, className }: { name?: string, className?: string }) => {
    const iconObj = ICON_LIST.find(i => i.name === name);
    if (!iconObj) return <Heart className={className} />;
    const IconComponent = iconObj.component;
    return <IconComponent className={className} />;
  };

  const MessageTemplate = ({ isCapture = false }: { isCapture?: boolean }) => {
    const style = docData.style;
    const isDark = style.theme === 'dark';
    
    return (
      <div 
        style={{ 
          background: style.backgroundValue,
          minHeight: isCapture ? '1200px' : 'auto',
          width: isCapture ? '1080px' : '100%',
          padding: isCapture ? '80px' : '40px 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxSizing: 'border-box',
          position: 'relative',
          borderRadius: isCapture ? '0' : '32px',
          overflow: 'hidden'
        }}
        className={cn(isCapture ? "" : "shadow-premium border border-slate-100")}
      >
        {/* Overlay */}
        <div style={{ 
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: isDark ? 'black' : 'white',
          opacity: style.overlayOpacity,
          zIndex: 1
        }} />

        <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: '800px' }}>
          {/* Header */}
          <div style={{ marginBottom: '80px', textAlign: 'center' }}>
            <p style={{ 
              fontSize: '20px', fontWeight: '800', color: isDark ? '#cbd5e1' : '#475569',
              marginBottom: '20px', letterSpacing: '0.3em', textTransform: 'uppercase'
            }}>{docData.header.subtitle || 'KSGI'}</p>
            <h1 style={{ 
              fontSize: '52px', fontWeight: '900', 
              color: docData.header.titleColor === 'blue' ? '#1d4ed8' : docData.header.titleColor === 'red' ? '#be123c' : (isDark ? 'white' : '#0f172a'),
              lineHeight: '1.2',
              letterSpacing: '-0.03em',
              wordBreak: 'keep-all'
            }}>{docData.header.title}</h1>
          </div>

          {/* Lines */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
            {docData.items.map((item) => (
              <div 
                key={item.id}
                style={{
                  backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.95)',
                  padding: '32px 40px',
                  borderRadius: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '24px',
                  border: item.isHighlight ? `3px solid ${isDark ? '#3b82f6' : '#2563eb'}` : `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`,
                  boxShadow: item.isHighlight ? '0 10px 25px rgba(37,99,235,0.15)' : '0 4px 12px rgba(0,0,0,0.03)',
                  backdropFilter: 'blur(12px)',
                  justifyContent: style.textAlign === 'center' ? 'center' : 'flex-start',
                  transform: item.isHighlight ? 'scale(1.02)' : 'scale(1)',
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <IconRenderer name={item.icon} className={cn("w-8 h-8", item.isHighlight ? "text-blue-600" : (isDark ? "text-slate-400" : "text-slate-300"))} />
                </div>
                <span style={{ 
                  fontSize: style.fontSize === 'lg' ? '26px' : style.fontSize === 'md' ? '22px' : '19px',
                  fontWeight: item.isHighlight ? '900' : '700',
                  color: isDark ? 'white' : '#1e293b',
                  lineHeight: '1.4',
                  textAlign: style.textAlign,
                  wordBreak: 'keep-all'
                }}>{item.text || "내용을 입력하세요"}</span>
              </div>
            ))}
          </div>

          {/* Footer Decoration */}
          <div style={{ marginTop: '80px', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '60px', height: '4px', backgroundColor: '#e2e8f0', borderRadius: '2px' }} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 pb-32">
      {/* Control Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 no-print mb-12 bg-slate-900 text-white p-8 rounded-[32px] shadow-2xl">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/reports')} className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-black">기원문 편집</h1>
            <p className="text-xs text-slate-400 font-bold mt-0.5">카카오톡 공유 최적화 템플릿</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button onClick={saveDocument} className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl text-sm font-black hover:bg-blue-700 transition-all active:scale-95">
            <Save className="w-4 h-4" /> 저장하기
          </button>
          <button onClick={handleDownloadImage} className="flex items-center gap-2 px-6 py-3 bg-rose-600 text-white rounded-2xl text-sm font-black hover:bg-rose-700 transition-all active:scale-95">
            <Download className="w-4 h-4" /> 이미지 저장
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Editor Side */}
        <div className="space-y-8">
          {/* Header Edit */}
          <section className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <Type className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-black text-slate-800">제목 및 기본 설정</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">대제목</label>
                <input 
                  value={docData.header.title} 
                  onChange={(e) => setDocData({...docData, header: {...docData.header, title: e.target.value}})}
                  className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">소제목 (지부/지구)</label>
                <input 
                  value={docData.header.subtitle} 
                  onChange={(e) => setDocData({...docData, header: {...docData.header, subtitle: e.target.value}})}
                  className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1 space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">제목 색상</label>
                <div className="flex gap-2">
                  {['black', 'blue', 'red'].map(c => (
                    <button 
                      key={c}
                      onClick={() => setDocData({...docData, header: {...docData.header, titleColor: c}})}
                      className={cn(
                        "w-8 h-8 rounded-full border-4 transition-all",
                        docData.header.titleColor === c ? "border-blue-200 scale-110" : "border-transparent opacity-50",
                        c === 'black' ? "bg-slate-800" : c === 'blue' ? "bg-blue-600" : "bg-rose-600"
                      )}
                    />
                  ))}
                </div>
              </div>
              <div className="flex-1 space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">정렬</label>
                <div className="flex gap-2">
                  <button onClick={() => setDocData({...docData, style: {...docData.style, textAlign: 'left'}})} className={cn("p-2 rounded-xl transition-all", docData.style.textAlign === 'left' ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400")}><AlignLeft className="w-5 h-5" /></button>
                  <button onClick={() => setDocData({...docData, style: {...docData.style, textAlign: 'center'}})} className={cn("p-2 rounded-xl transition-all", docData.style.textAlign === 'center' ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400")}><AlignCenter className="w-5 h-5" /></button>
                </div>
              </div>
            </div>
          </section>

          {/* Items Edit */}
          <section className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Quote className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-black text-slate-800">문구 목록</h3>
              </div>
              <button onClick={addItem} className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-black hover:bg-slate-800 transition-all">
                <Plus className="w-4 h-4" /> 문장 추가
              </button>
            </div>

            <div className="space-y-4">
              {docData.items.map((item) => (
                <div key={item.id} className="group p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-blue-100 transition-all space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <button className="p-2 bg-white rounded-xl shadow-sm hover:bg-blue-50 transition-colors">
                        <IconRenderer name={item.icon} className="w-4 h-4 text-blue-600" />
                      </button>
                    </div>
                    <textarea 
                      value={item.text}
                      onChange={(e) => updateItem(item.id, { text: e.target.value })}
                      placeholder="기원할 문구를 입력하세요..."
                      className="flex-1 bg-transparent border-none outline-none text-sm font-bold resize-none min-h-[40px] focus:ring-0"
                    />
                    <button onClick={() => deleteItem(item.id)} className="p-2 text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center gap-4 pt-2 border-t border-slate-100">
                    <button 
                      onClick={() => updateItem(item.id, { isHighlight: !item.isHighlight })}
                      className={cn(
                        "text-[10px] font-black px-2.5 py-1 rounded-lg transition-all",
                        item.isHighlight ? "bg-blue-600 text-white" : "bg-white text-slate-400"
                      )}
                    >
                      중요 강조
                    </button>
                    <div className="flex gap-1">
                      {ICON_LIST.map(ico => (
                        <button 
                          key={ico.name}
                          onClick={() => updateItem(item.id, { icon: ico.name })}
                          className={cn(
                            "p-1 rounded-md transition-all",
                            item.icon === ico.name ? "bg-blue-100 text-blue-600 scale-110" : "text-slate-300"
                          )}
                        >
                          <ico.component className="w-3.5 h-3.5" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Style Edit */}
          <section className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <Palette className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-black text-slate-800">배경 및 스타일</h3>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">테마</label>
                <div className="flex bg-slate-100 p-1 rounded-2xl">
                  <button onClick={() => setDocData({...docData, style: {...docData.style, theme: 'light'}})} className={cn("flex-1 py-2 text-xs font-black rounded-xl transition-all", docData.style.theme === 'light' ? "bg-white shadow-sm" : "text-slate-400")}>밝게</button>
                  <button onClick={() => setDocData({...docData, style: {...docData.style, theme: 'dark'}})} className={cn("flex-1 py-2 text-xs font-black rounded-xl transition-all", docData.style.theme === 'dark' ? "bg-white shadow-sm" : "text-slate-400")}>어둡게</button>
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">배경 불투명도</label>
                <input 
                  type="range" min="0" max="0.8" step="0.1" 
                  value={docData.style.overlayOpacity}
                  onChange={(e) => setDocData({...docData, style: {...docData.style, overlayOpacity: parseFloat(e.target.value)}})}
                  className="w-full"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">추천 배경</label>
              <div className="grid grid-cols-4 gap-3">
                {[
                  'linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)',
                  'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
                  'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)',
                  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  '#ffffff',
                  '#1e293b',
                  '#f8fafc',
                  '#0f172a'
                ].map((bg, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setDocData({...docData, style: {...docData.style, backgroundValue: bg, theme: bg.includes('#0f') || bg.includes('#1e') || bg.includes('667') ? 'dark' : 'light'}})}
                    style={{ background: bg }}
                    className={cn(
                      "h-12 rounded-xl border-2 transition-all",
                      docData.style.backgroundValue === bg ? "border-blue-500 scale-105" : "border-transparent"
                    )}
                  />
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Preview Side */}
        <div className="sticky top-12 space-y-6">
          <div className="flex items-center justify-between px-4">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <ImageIcon className="w-4 h-4" /> 실시간 미리보기
            </span>
            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">이미지 저장 품질: 고화질</span>
          </div>
          <div className="overflow-hidden rounded-[40px] shadow-2xl border border-slate-100">
            <MessageTemplate />
          </div>
        </div>
      </div>

      {/* Capture Hidden Area */}
      <div ref={imageCaptureRef} style={{ position: 'absolute', top: '-10000px', left: '0', width: '1080px' }}>
        <MessageTemplate isCapture={true} />
      </div>

      {/* Toast */}
      {saveStatus && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-8 py-4 rounded-3xl text-sm font-black shadow-2xl z-[100] animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            {saveStatus}
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageNoticePage;
