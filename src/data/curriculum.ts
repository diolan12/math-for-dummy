import type { Chapter } from '@/types/curriculum'
import { tingkat1SubChapters } from './chapters/tingkat1'

export const curriculumChapters: Chapter[] = [
  {
    id: 'tingkat-1',
    level: 1,
    title: 'Tingkat 1: Dasar Aritmatika',
    subtitle: 'Pondasi Menghitung & Operasi Dasar',
    description: 'Kuasai pengenalan angka, nilai tempat, penjumlahan, pengurangan, perkalian, pembagian, KABATAKU, sifat operasi, dan pembulatan.',
    icon: 'mdi-numeric-1-circle',
    color: '#6366f1',
    isUnlocked: true,
    subChapters: tingkat1SubChapters,
  },
  {
    id: 'tingkat-2',
    level: 2,
    title: 'Tingkat 2: Eksplorasi Bilangan',
    subtitle: 'Jenis Bilangan, FPB, KPK, Pecahan & Desimal',
    description: 'Pelajari bilangan prima, komposit, FPB, KPK, pecahan biasa & campuran, desimal, dan persentase.',
    icon: 'mdi-numeric-2-circle',
    color: '#10b981',
    isUnlocked: false,
    subChapters: [],
  },
  {
    id: 'tingkat-3',
    level: 3,
    title: 'Tingkat 3: Pra-Aljabar & Geometri Dasar',
    subtitle: 'Pangkat, Akar, Rasio & Bangun Datar/Ruang',
    description: 'Eksplorasi eksponen dasar, akar kuadrat/kubik, rasio perbandingan, serta sifat keliling dan luas bangun datar/ruang.',
    icon: 'mdi-numeric-3-circle',
    color: '#ec4899',
    isUnlocked: false,
    subChapters: [],
  },
  {
    id: 'tingkat-4',
    level: 4,
    title: 'Tingkat 4: Aljabar Dasar & Menengah',
    subtitle: 'Variabel, PLSV, PtLSV, Nilai Mutlak & SPLDV',
    description: 'Pahami bentuk aljabar, persamaan & pertidaksamaan linear, nilai mutlak, SPLDV, dan pemfaktoran.',
    icon: 'mdi-numeric-4-circle',
    color: '#f59e0b',
    isUnlocked: false,
    subChapters: [],
  },
  {
    id: 'tingkat-5',
    level: 5,
    title: 'Tingkat 5: Aljabar Lanjut & Fungsi',
    subtitle: 'Fungsi, Persamaan Kuadrat, Eksponen & Logaritma',
    description: 'Kuasai fungsi komposisi, invers, kurva parabola, sifat logaritma, polinomial, barisan aritmatika & geometri.',
    icon: 'mdi-numeric-5-circle',
    color: '#8b5cf6',
    isUnlocked: false,
    subChapters: [],
  },
  {
    id: 'tingkat-6',
    level: 6,
    title: 'Tingkat 6: Geometri Lanjut & Trigonometri',
    subtitle: 'Pythagoras, Lingkaran, Transformasi & Trigonometri',
    description: 'Pelajari kesebangunan, trigonometri dasar (sin, cos, tan), aturan sinus/cosinus, dan grafik fungsi.',
    icon: 'mdi-numeric-6-circle',
    color: '#06b6d4',
    isUnlocked: false,
    subChapters: [],
  },
  {
    id: 'tingkat-7',
    level: 7,
    title: 'Tingkat 7: Statistika & Peluang',
    subtitle: 'Penyajian Data, Mean/Median/Modus, Permutasi & Peluang',
    description: 'Kuasai analisis data, ukuran pemusatan & penyebaran, kaidah pencacahan, permutasi, kombinasi, dan probabilitas.',
    icon: 'mdi-numeric-7-circle',
    color: '#14b8a6',
    isUnlocked: false,
    subChapters: [],
  },
  {
    id: 'tingkat-8',
    level: 8,
    title: 'Tingkat 8: Pengantar Kalkulus & Diskrit',
    subtitle: 'Logika, Matriks, Limit, Turunan & Integral',
    description: 'Jelajahi penarikan kesimpulan logika, matriks 2x2, limit fungsi, diferensial turunan, dan kalkulus integral.',
    icon: 'mdi-numeric-8-circle',
    color: '#f43f5e',
    isUnlocked: false,
    subChapters: [],
  },
]

export function getChapterById(id: string): Chapter | undefined {
  return curriculumChapters.find((c) => c.id === id)
}

export function getSubChapterById(chapterId: string, subId: string) {
  const chapter = getChapterById(chapterId)
  return chapter?.subChapters.find((s) => s.id === subId)
}
