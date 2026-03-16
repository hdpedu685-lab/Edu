export interface LiveClassroom {
  id: string
  title: string
  teacher: string
  subject: string
  schedule: string
  isLive: boolean
}

export const liveClassrooms: LiveClassroom[] = [
  {
    id: 'hdpedu-live',
    title: 'Lop giao tiep truc tuyen',
    teacher: 'Teacher Hoang',
    subject: 'Tieng Han giao tiep',
    schedule: 'Dang streaming',
    isLive: true,
  },
  {
    id: 'topik-writing-a2',
    title: 'Topik Writing A2',
    teacher: 'Teacher Hana',
    subject: 'Luyen viet Topik',
    schedule: 'Dang streaming',
    isLive: true,
  },
  {
    id: 'business-korean-b1',
    title: 'Business Korean B1',
    teacher: 'Teacher Minh',
    subject: 'Tieng Han cong so',
    schedule: 'Tam dung',
    isLive: false,
  },
]
