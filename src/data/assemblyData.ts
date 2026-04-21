export interface AssemblySchedule {
  id: number;
  date: string;
  branch: string;
  district: string;
  dayOfWeek: string;
  time: string;
  executive: string;
  address: string;
  hostName: string;
}

export const assemblyData: AssemblySchedule[] = [
  { id: 1, date: '5/9', branch: '소사', district: '2', dayOfWeek: '토', time: '14시', executive: '김홍순 권부', address: '양우아파트 103동203호', hostName: '임영자님 댁' },
  { id: 2, date: '5/9', branch: '성주', district: '1', dayOfWeek: '토', time: '13시', executive: '조난희 방면부', address: '대창스페이스빌 202호', hostName: '강미영님 댁' },
  { id: 3, date: '5/9', branch: '중동', district: '1', dayOfWeek: '토', time: '11시', executive: '이상희 방면부', address: '심중로 114번지 가길 31.1층', hostName: '정희숙님 댁' },
  { id: 4, date: '5/10', branch: '계수', district: '5', dayOfWeek: '일', time: '15시', executive: '조난희 방면부', address: '소사구 경인로 377 소사회관', hostName: '' },
  { id: 5, date: '5/10', branch: '역곡', district: '4', dayOfWeek: '일', time: '미정', executive: '최선혜 지역부', address: '역곡1동 동부센트레빌 3차 302동 505호', hostName: '유영애님 댁' },
  { id: 6, date: '5/10', branch: '미리내', district: '1', dayOfWeek: '일', time: '15시30분', executive: '박계옥 권총합', address: '팰리스카운티 114동1504호', hostName: '김복예님 댁' },
  { id: 7, date: '5/11', branch: '역곡', district: '3', dayOfWeek: '월', time: '19시30분', executive: '이나미 방면', address: '소사로 276번길 175 보람아파트 101동 902호', hostName: '유재방님 댁' },
  { id: 8, date: '5/11', branch: '중동', district: '3', dayOfWeek: '월', time: '20시', executive: '이미영 방면총합부', address: '태승훼미리1차 102동 803호', hostName: '안경숙님 댁' },
  { id: 9, date: '5/13', branch: '계수', district: '2', dayOfWeek: '수', time: '13시', executive: '석명화 전국부', address: '소사구 안곡로 86번길 37 가동 201호 (현대하이츠빌)', hostName: '주복희님 댁' },
  { id: 10, date: '5/13', branch: '계수', district: '3', dayOfWeek: '수', time: '20시', executive: '이희선 권부', address: '소사구 범박동 현대홈타운 507동 1602호', hostName: '조영자님 댁' },
  { id: 11, date: '5/13', branch: '도원', district: '1', dayOfWeek: '수', time: '11시', executive: '김명례 방면부', address: '소사구 경인로 377 소사회관', hostName: '' },
  { id: 12, date: '5/13', branch: '송내', district: '1', dayOfWeek: '수', time: '20시', executive: '김영숙 권부', address: '소사구 경인로 377 소사회관', hostName: '' },
  { id: 13, date: '5/13', branch: '상동', district: '3', dayOfWeek: '수', time: '14시', executive: '강명옥 방면부', address: '반달마을 건영 1804동706호', hostName: '현승희님 댁' },
  { id: 14, date: '5/14', branch: '계수', district: '6', dayOfWeek: '목', time: '20시', executive: '이희주 방면총합', address: '옥길로80 612동 2102호 (LH 옥길브리즈힐)', hostName: '손두이님 댁' },
  { id: 15, date: '5/14', branch: '상동', district: '2', dayOfWeek: '목', time: '20시', executive: '김소영 지역', address: '반달마을 건영 1804동 703호', hostName: '이춘옥님 댁' },
  { id: 16, date: '5/15', branch: '성주', district: '2', dayOfWeek: '금', time: '14시', executive: '서성순 권', address: '라온1동 202호', hostName: '여희자님 댁' },
  { id: 17, date: '5/16', branch: '계수', district: '1', dayOfWeek: '토', time: '11시', executive: '서성순 권', address: '소사구 안곡로 149번길 21 2층', hostName: '이정수님 댁' },
  { id: 18, date: '5/16', branch: '소사', district: '1', dayOfWeek: '토', time: '13시', executive: '조난희 방면부', address: '소사구 경인로 377 소사회관', hostName: '' },
  { id: 19, date: '5/16', branch: '역곡', district: '1', dayOfWeek: '토', time: '13시', executive: '이희선 권부', address: '역곡로46번길 41 (세방빌리지)', hostName: '양복례님 댁' },
  { id: 20, date: '5/16', branch: '역곡', district: '2', dayOfWeek: '토', time: '14시30분', executive: '김영숙 권부', address: '역곡동 97번지 뉴월드아파트405호', hostName: '강정순님 댁' },
  { id: 21, date: '5/16', branch: '도원', district: '3', dayOfWeek: '토', time: '14시', executive: '백효원 지역', address: '소사구 경인로 377 소사회관', hostName: '' },
  { id: 22, date: '5/16', branch: '성주', district: '3', dayOfWeek: '토', time: '14시', executive: '강명옥 방면부', address: '대창스페이스 빌502호', hostName: '권기용님 댁' },
  { id: 23, date: '5/16', branch: '송내', district: '2', dayOfWeek: '토', time: '14시', executive: '김명례 방면부', address: '송내동368번지 뉴월드아파트 105동204호', hostName: '이기곤님 댁' },
  { id: 24, date: '5/16', branch: '중동', district: '2', dayOfWeek: '토', time: '15시', executive: '김홍순 권부', address: '팰리스카운티 123동202호', hostName: '박순옥님 댁' },
  { id: 25, date: '5/16', branch: '상동', district: '1', dayOfWeek: '토', time: '14시', executive: '서성순 권', address: '백송마을 풍림아이원 2723동401호', hostName: '김주복님 댁' },
  { id: 26, date: '5/16', branch: '미리내', district: '2', dayOfWeek: '토', time: '14시', executive: '이미영 방면총합부', address: '무지개마을 동신 1204동601호', hostName: '김홍순님 댁' },
  { id: 27, date: '5/17', branch: '계수', district: '4', dayOfWeek: '일', time: '14시', executive: '이미영 방면총합부', address: '소사구 경인로 377 소사회관', hostName: '' },
  { id: 28, date: '5/17', branch: '소사', district: '3', dayOfWeek: '일', time: '11시', executive: '이상희 방면부', address: '소사구 경인로 377 소사회관', hostName: '' },
  { id: 29, date: '5/17', branch: '미리내', district: '3', dayOfWeek: '일', time: '14시', executive: '이나미 방면', address: '미리내마을 롯데 940동803호', hostName: '박연옥님 댁' },
  { id: 30, date: '5/21', branch: '도원', district: '2', dayOfWeek: '목', time: '14시', executive: '천삼분 전국총합부', address: '심곡본동747-3 양지타운 203호', hostName: '안병숙님 댁' },
  { id: 31, date: '5/22', branch: '중동지역', district: '-', dayOfWeek: '금', time: '15시', executive: '석명화 전국부', address: '미리내마을 동성934동1703호', hostName: '윤희자님 댁' },
];
