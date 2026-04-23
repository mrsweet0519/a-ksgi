import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { NoticeDocument } from '../types/index';
import ChantingSchedulePage from './ChantingSchedulePage';
import MessageNoticePage from './MessageNoticePage';

const ReportEditPage = () => {
  const { id } = useParams();
  const [templateType, setTemplateType] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const savedDocs = localStorage.getItem('ksgi-notices');
    if (savedDocs) {
      const docs: NoticeDocument[] = JSON.parse(savedDocs);
      const current = docs.find(d => d.id === id);
      if (current) {
        setTemplateType(current.templateType);
      }
    }
  }, [id]);

  if (!templateType) {
    return <div className="p-20 text-center font-black text-slate-400 animate-pulse">문서를 불러오는 중...</div>;
  }

  if (templateType === 'chanting') {
    return <ChantingSchedulePage />;
  }

  return <MessageNoticePage />;
};

export default ReportEditPage;
