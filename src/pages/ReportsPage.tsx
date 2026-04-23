import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  FileText, 
  Copy, 
  Trash2, 
  Search, 
  Clock, 
  Printer, 
  Image as ImageIcon,
  ChevronRight,
  Sparkles,
  Layout
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../utils/cn';
import type { NoticeDocument, TemplateType } from '../types/index';

const ReportsPage = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<NoticeDocument[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // 데이터 로드 및 마이그레이션
  useEffect(() => {
    const savedDocs = localStorage.getItem('ksgi-notices');
    if (savedDocs) {
      setDocuments(JSON.parse(savedDocs));
    } else {
      // 기존 단일 제목회 데이터가 있다면 마이그레이션 시도
      const legacyTitle = localStorage.getItem('chanting-title');
      if (legacyTitle) {
        const legacyDoc: NoticeDocument = {
          id: 'legacy-1',
          templateType: 'chanting',
          title: legacyTitle,
          data: {
            title: legacyTitle,
            titleColor: localStorage.getItem('chanting-title-color') || 'black',
            data: JSON.parse(localStorage.getItem('chanting-data') || '[]'),
            footer: localStorage.getItem('chanting-footer') || '계수지부 화이팅!!',
            footerColor: localStorage.getItem('chanting-footer-color') || 'black',
            memo: localStorage.getItem('chanting-memo') || '',
            memoColor: localStorage.getItem('chanting-memo-color') || 'black',
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        const newList = [legacyDoc];
        setDocuments(newList);
        localStorage.setItem('ksgi-notices', JSON.stringify(newList));
      }
    }
  }, []);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('이 문서를 삭제하시겠습니까?')) {
      const updated = documents.filter(doc => doc.id !== id);
      setDocuments(updated);
      localStorage.setItem('ksgi-notices', JSON.stringify(updated));
    }
  };

  const handleDuplicate = (doc: NoticeDocument, e: React.MouseEvent) => {
    e.stopPropagation();
    const newDoc: NoticeDocument = {
      ...doc,
      id: `copy-${Date.now()}`,
      title: `${doc.title} (복사본)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const updated = [newDoc, ...documents];
    setDocuments(updated);
    localStorage.setItem('ksgi-notices', JSON.stringify(updated));
  };

  const createNew = (type: TemplateType) => {
    const newId = `doc-${Date.now()}`;
    const newDoc: NoticeDocument = {
      id: newId,
      templateType: type,
      title: type === 'chanting' ? '새 제목회 일정표' : type === 'notice' ? '여성부총회 승리 기원문' : '새 안내문',
      data: {}, // 실제 데이터는 에디터에서 초기화
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const updated = [newDoc, ...documents];
    setDocuments(updated);
    localStorage.setItem('ksgi-notices', JSON.stringify(updated));
    navigate(`/reports/edit/${newId}`);
  };

  const filteredDocs = documents.filter(doc => 
    doc.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-amber-600 font-bold mb-1">
            <Printer className="w-4 h-4" />
            <span>출력 센터 / 공지물 관리</span>
          </div>
          <h2 className="text-4xl font-black text-slate-900 leading-tight">문서 보관함</h2>
          <p className="text-sm font-medium text-slate-400 mt-1">작성하신 일정표와 안내문을 관리하고 출력합니다.</p>
        </div>
        
        <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm gap-2">
          <button 
            onClick={() => createNew('chanting')}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-black hover:bg-slate-800 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" /> 새 제목회 만들기
          </button>
          <button 
            onClick={() => createNew('notice')}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-black hover:bg-blue-700 transition-all active:scale-95"
          >
            <Sparkles className="w-4 h-4" /> 새 기원문 만들기
          </button>
        </div>
      </section>

      {/* Stats & Search */}
      <section className="flex flex-col md:flex-row gap-4 items-center justify-between no-print">
        <div className="flex gap-4">
          <div className="px-4 py-2 bg-white rounded-2xl border border-slate-100 flex items-center gap-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">전체 문서</span>
            <span className="text-lg font-black text-slate-800">{documents.length}</span>
          </div>
          <div className="px-4 py-2 bg-white rounded-2xl border border-slate-100 flex items-center gap-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">이번 달</span>
            <span className="text-lg font-black text-blue-600">{documents.filter(d => d.updatedAt.includes('2026-04')).length}</span>
          </div>
        </div>
        
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="문서 제목 검색..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-2xl py-3 pl-12 pr-4 text-sm font-medium outline-none focus:border-blue-400 transition-colors shadow-sm"
          />
        </div>
      </section>

      {/* Templates Grid (Empty State or New Template selection) */}
      {documents.length === 0 && searchTerm === '' && (
        <section className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-[40px] border-4 border-dashed border-slate-200">
          <div className="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center mb-6">
            <Layout className="w-10 h-10 text-slate-300" />
          </div>
          <h3 className="text-xl font-black text-slate-800 mb-2">아직 작성된 문서가 없습니다.</h3>
          <p className="text-sm text-slate-400 font-medium mb-8">새로운 제목회 일정표를 만들어보세요!</p>
          <button 
            onClick={() => createNew('chanting')}
            className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5" /> 첫 일정표 만들기
          </button>
        </section>
      )}

      {/* Document Gallery */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocs.map((doc) => (
          <div 
            key={doc.id}
            onClick={() => navigate(`/reports/edit/${doc.id}`)}
            className="group bg-white rounded-[32px] border border-slate-100 p-6 hover:shadow-premium hover:-translate-y-1 transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 group-hover:bg-blue-50 transition-colors" />
            
            <div className="relative">
              <div className="flex items-start justify-between mb-6">
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm",
                  doc.templateType === 'chanting' ? "bg-amber-100 text-amber-600" : "bg-blue-100 text-blue-600"
                )}>
                  <FileText className="w-6 h-6" />
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={(e) => handleDuplicate(doc, e)}
                    className="p-2 bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                    title="복제하기"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={(e) => handleDelete(doc.id, e)}
                    className="p-2 bg-slate-50 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                    title="삭제하기"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h4 className="text-lg font-black text-slate-800 mb-2 group-hover:text-blue-600 transition-colors leading-tight">
                {doc.title}
              </h4>
              
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  최종 수정: {new Date(doc.updatedAt).toLocaleDateString()}
                </div>
                <div className="flex gap-2 mt-2">
                  <span className={cn(
                    "text-[10px] font-black px-2.5 py-1 rounded-lg transition-colors shadow-sm",
                    doc.templateType === 'chanting' 
                      ? "bg-amber-100 text-amber-700 border border-amber-200" 
                      : "bg-blue-100 text-blue-700 border border-blue-200"
                  )}>
                    {doc.templateType === 'chanting' ? '📅 제목회 일정표' : '✨ 기원문/메시지'}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-50">
              <span className="text-[11px] font-black text-blue-600 flex items-center gap-1">
                편집하기 <ChevronRight className="w-3 h-3" />
              </span>
              <div className="flex gap-2">
                <ImageIcon className="w-4 h-4 text-slate-200" />
                <Printer className="w-4 h-4 text-slate-200" />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Pro Tip */}
      {documents.length > 0 && (
        <section className="bg-slate-50 rounded-3xl p-6 border border-slate-100 border-dashed">
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
              <Sparkles className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-black text-slate-800">팁: 복제 기능을 활용하세요!</p>
              <p className="text-xs text-slate-400 font-medium mt-1 leading-relaxed">
                지난달 일정표 카드의 상단에 있는 복제 버튼(<Copy className="inline w-3 h-3" />)을 누르면 모든 내용이 복사됩니다.<br />
                날짜만 바꿔서 저장하면 훨씬 빠르게 공지물을 만들 수 있습니다.
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ReportsPage;
