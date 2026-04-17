import { 
  Calendar, 
  MapPin, 
  Users, 
  CheckCircle2, 
  Plus,
  ArrowUpRight
} from 'lucide-react';
import { cn } from '../utils/cn';

const MeetingPage = () => {
  const departments = [
    { name: '여성부', color: 'blue', items: [
      { id: 1, title: '여성부 부원회', date: '2026-04-10', time: '14:00', location: '제1회관', attendees: 18, status: 'done' },
      { id: 2, title: '영등포지역 여성부 회의', date: '2026-04-25', time: '11:00', location: '지역회관', attendees: 0, status: 'upcoming' },
    ]},
    { name: '미래부', color: 'indigo', items: [
      { id: 3, title: '미래부 부원회 (희망회)', date: '2026-04-12', time: '10:30', location: '교육실', attendees: 12, status: 'done' },
    ]},
    { name: '기타 부서', color: 'slate', items: [
      { id: 4, title: '장년부/여성부 연합 회의', date: '2026-04-30', time: '19:00', location: '대강당', attendees: 0, status: 'upcoming' },
    ]},
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <section className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-900">부서별 일정 관리</h2>
          <p className="text-sm font-medium text-slate-400 mt-1">여성부, 미래부 등 각 부서별 부원회 및 공식 일정을 관리합니다.</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" /> 부서 일정 추가
        </button>
      </section>

      <div className="space-y-12">
        {departments.map((dept) => (
          <div key={dept.name} className="space-y-4">
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-black text-slate-800">{dept.name}</h3>
              <div className="h-px flex-1 bg-slate-100"></div>
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{dept.items.length} EVENTS</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dept.items.map((item) => (
                <div key={item.id} className="card card-hover">
                  <div className="flex justify-between items-start mb-4">
                    <div className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                      item.status === 'done' ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"
                    )}>
                      {item.status === 'done' ? '집계 완료' : '진행 예정'}
                    </div>
                    {item.status === 'done' && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                  </div>

                  <h4 className="text-lg font-black text-slate-800 mb-3">{item.title}</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      {item.date} ({item.time})
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      {item.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                      <Users className="w-4 h-4 text-slate-400" />
                      참석: <span className="font-black text-slate-900">{item.attendees}명</span>
                    </div>
                  </div>

                  <button className="w-full mt-6 py-2.5 bg-slate-50 text-slate-600 rounded-xl text-xs font-black hover:bg-blue-50 hover:text-blue-600 transition-all flex items-center justify-center gap-1 group">
                    상세 및 기록 보기 <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              ))}

              <button className="border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-slate-400 hover:border-blue-300 hover:text-blue-500 hover:bg-blue-50/10 transition-all group min-h-[200px]">
                <Plus className="w-6 h-6 mb-2" />
                <span className="font-bold text-sm">일정 추가</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetingPage;
