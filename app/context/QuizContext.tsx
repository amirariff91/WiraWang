import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface QuizCategory {
  id: string;
  title: string;
  questions: Question[];
}

const quizData: QuizCategory[] = [
  {
    id: '1',
    title: 'Konsep Aset dan Liabiliti',
    questions: [
      {
        question: 'Manakah berikut yang merupakan contoh aset?',
        options: ['Pinjaman kereta', 'Wang tunai', 'Kad kredit', 'Bil utiliti'],
        correctAnswer: 1,
      },
      {
        question: 'Apakah maksud liabiliti dalam kewangan?',
        options: ['Wang yang kita simpan', 'Barang yang kita miliki', 'Hutang atau tanggungan kewangan', 'Pendapatan bulanan'],
        correctAnswer: 2,
      },
      {
        question: 'Mengapa rumah yang dimiliki dianggap sebagai aset?',
        options: ['Kerana ia mendatangkan pendapatan secara tetap', 'Kerana ia bernilai dan boleh dijual', 'Kerana ia dianggap sebagai hutang', 'Kerana ia memerlukan insurans'],
        correctAnswer: 1,
      },
      {
        question: 'Antara berikut, yang manakah dianggap sebagai liabiliti?',
        options: ['Simpanan bank', 'Barang kemas', 'Pinjaman perumahan', 'Rumah yang sudah dibayar penuh'],
        correctAnswer: 2,
      },
      {
        question: 'Bagaimanakah liabiliti boleh memberi kesan kepada kewangan seseorang?',
        options: ['Mengurangkan beban hutang', 'Menambah nilai aset', 'Meningkatkan hutang yang perlu dibayar', 'Meningkatkan jumlah simpanan'],
        correctAnswer: 2,
      },
      {
        question: 'Apakah yang berlaku jika liabiliti tidak dibayar?',
        options: ['Hutang akan berkurangan', 'Jumlah hutang akan bertambah', 'Nilai aset akan meningkat', 'Tidak memberi sebarang kesan'],
        correctAnswer: 1,
      },
      {
        question: 'Kereta yang dibeli secara tunai adalah contoh:',
        options: ['Liabiliti', 'Aset', 'Insurans', 'Pelaburan'],
        correctAnswer: 1,
      },
      {
        question: 'Simpanan dalam bank adalah contoh:',
        options: ['Aset', 'Liabiliti', 'Hutang', 'Tanggungan'],
        correctAnswer: 0,
      },
    ],
  },
  {
    id: '2',
    title: 'Konsep Insurans dan Takaful',
    questions: [
      {
        question: 'Apakah fungsi utama insurans?',
        options: ['Melindungi seseorang daripada risiko kewangan', 'Menambah pendapatan bulanan', 'Menghapuskan liabiliti', 'Mengurangkan nilai aset'],
        correctAnswer: 0,
      },
      {
        question: 'Apakah perbezaan utama antara insurans dan takaful?',
        options: ['Insurans hanya melibatkan syarikat besar', 'Takaful berasaskan konsep sumbangan kumpulan dan patuh syariah', 'Takaful hanya untuk individu Islam', 'Insurans tidak melibatkan risiko'],
        correctAnswer: 1,
      },
      {
        question: 'Siapakah yang menanggung risiko dalam sistem takaful?',
        options: ['Syarikat takaful', 'Setiap peserta secara bersama', 'Kerajaan', 'Bank'],
        correctAnswer: 1,
      },
      {
        question: 'Mengapa takaful perlu mematuhi syariah?',
        options: ['Untuk memastikan keuntungan yang lebih besar', 'Kerana ia berkaitan dengan sumbangan dana dan urusan kewangan yang mematuhi prinsip Islam', 'Untuk menarik lebih ramai peserta', 'Kerana ia dikehendaki oleh undang-undang biasa'],
        correctAnswer: 1,
      },
      {
        question: 'Apakah yang dilindungi oleh insurans perjalanan?',
        options: ['Kos rawatan perubatan', 'Kerugian atau kehilangan harta semasa perjalanan', 'Pinjaman pendidikan', 'Pembelian barang kemas'],
        correctAnswer: 1,
      },
      {
        question: 'Mengapakah penting untuk mempunyai insurans perubatan?',
        options: ['Untuk membeli ubat dengan harga diskaun', 'Untuk menampung kos rawatan yang tidak dijangka', 'Untuk meningkatkan nilai simpanan', 'Untuk mengurangkan liabiliti peribadi'],
        correctAnswer: 1,
      },
      {
        question: 'Apakah pampasan yang boleh diperoleh melalui insurans kebakaran?',
        options: ['Pampasan untuk kerosakan rumah', 'Pampasan untuk kehilangan pekerjaan', 'Pampasan untuk kemalangan kereta', 'Pampasan untuk percutian'],
        correctAnswer: 0,
      },
      {
        question: 'Dalam situasi kemalangan kereta, insurans membantu:',
        options: ['Mengganti kereta baru', 'Membayar kos pembaikan kereta yang rosak', 'Menghapuskan pinjaman kereta', 'Meningkatkan nilai kereta'],
        correctAnswer: 1,
      },
      {
        question: 'Apakah yang berlaku jika seseorang tidak mempunyai insurans atau takaful?',
        options: ['Mereka akan mendapat lebih banyak aset', 'Mereka mungkin perlu menanggung semua kos sendiri jika berlaku musibah', 'Mereka tidak perlu membayar premium', 'Mereka akan lebih dilindungi secara kewangan'],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: '3',
    title: 'Pengurusan Aset dan Liabiliti',
    questions: [
      {
        question: 'Bagaimanakah insurans dan takaful membantu seseorang dalam menguruskan kewangan?',
        options: ['Dengan menambah beban kewangan', 'Dengan memberikan perlindungan terhadap risiko kewangan', 'Dengan mengurangkan pendapatan bulanan', 'Dengan menambah hutang yang perlu dibayar'],
        correctAnswer: 1,
      },
      {
        question: 'Pinjaman kereta adalah contoh liabiliti kerana:',
        options: ['Ia merupakan tanggungan yang perlu dibayar balik', 'Kereta itu dimiliki oleh bank', 'Nilainya bertambah setiap tahun', 'Ia tidak melibatkan sebarang kos tambahan'],
        correctAnswer: 0,
      },
      {
        question: 'Apakah tujuan takaful dalam konteks kewangan?',
        options: ['Untuk menjana keuntungan bagi syarikat', 'Untuk menyediakan perlindungan kewangan berdasarkan konsep sumbangan kumpulan', 'Untuk menggantikan insurans tradisional', 'Untuk menambah hutang kepada peserta'],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: '4',
    title: 'Aplikasi Pengetahuan dalam Kehidupan Seharian',
    questions: [
      {
        question: 'Anda baru sahaja menerima gaji bulanan anda. Anda mempunyai pilihan untuk:',
        options: ['Menghabiskan semuanya untuk membeli barang baru', 'Menyimpan sebahagian untuk simpanan dan menggunakan selebihnya untuk keperluan harian', 'Menggunakan semua untuk pergi bercuti', 'Memberi semua kepada kawan-kawan'],
        correctAnswer: 1,
      },
      {
        question: 'Kawan anda memberitahu bahawa dia telah membeli insurans perubatan. Anda ingin membuat keputusan yang sama. Apa yang anda patut lakukan?',
        options: ['Meneliti pelbagai jenis insurans dan membandingkan pelan', 'Membeli insurans yang sama tanpa membaca syaratnya', 'Tidak mengambil insurans kerana tidak tahu', 'Meminta kawan anda untuk membayar insurans bagi pihak anda'],
        correctAnswer: 0,
      },
      {
        question: 'Anda terpaksa membuat pilihan antara membeli kereta baru atau menggunakan pengangkutan awam. Apa keputusan anda?',
        options: ['Membeli kereta baru walaupun mempunyai pinjaman', 'Menggunakan pengangkutan awam dan menyimpan wang untuk masa hadapan', 'Membeli kereta terpakai tanpa merancang kewangan', 'Meminjam wang dari kawan untuk membeli kereta baru'],
        correctAnswer: 1,
      },
      {
        question: 'Anda baru sahaja menerima bonus daripada kerja. Anda mempunyai pilihan untuk:',
        options: ['Melaburkan sebahagian untuk masa depan dan menyimpan selebihnya', 'Menghabiskan semua untuk membeli pakaian baru', 'Memberi semua kepada ahli keluarga', 'Menggunakan semua untuk bercuti'],
        correctAnswer: 0,
      },
      {
        question: 'Sewaktu berjalan di pusat beli-belah, anda terjumpa barang kemas yang anda inginkan. Namun, anda tidak mempunyai wang tunai yang cukup. Apa yang akan anda lakukan?',
        options: ['Menggunakan kad kredit dan menambah hutang', 'Meminjam wang dari kawan', 'Menyimpan wang terlebih dahulu sebelum membuat pembelian', 'Menghabiskan semua simpanan anda untuk membeli barang itu'],
        correctAnswer: 2,
      },
      {
        question: 'Anda merancang untuk membeli rumah pada masa hadapan. Apa langkah pertama yang patut anda ambil?',
        options: ['Mula menabung setiap bulan untuk membayar deposit rumah', 'Membeli rumah tanpa sebarang simpanan', 'Mengambil pinjaman tanpa mengira kemampuan membayar', 'Meminta bantuan kewangan daripada rakan-rakan'],
        correctAnswer: 0,
      },
      {
        question: 'Anda mengalami kemalangan kecil semasa memandu kereta. Kereta anda memerlukan pembaikan kecil. Apakah langkah terbaik?',
        options: ['Tidak melakukan apa-apa dan terus memandu kereta tanpa pembaikan', 'Menggunakan insurans kereta anda untuk menuntut ganti rugi bagi pembaikan', 'Meminjam wang untuk membaiki kereta', 'Menjual kereta tanpa membaikinya'],
        correctAnswer: 1,
      },
      {
        question: 'Anda mempunyai pilihan untuk membayar penuh harga telefon pintar baru atau memilih bayaran ansuran. Apa keputusan anda?',
        options: ['Membeli telefon pintar dengan kad kredit tanpa mengira kos tambahan faedah', 'Membeli secara tunai jika mampu atau membuat pelan pembayaran yang anda boleh uruskan tanpa hutang berlebihan', 'Meminjam dari keluarga untuk membeli secara tunai', 'Tidak membayar apa-apa dan mengambil telefon secara hutang tanpa perancangan'],
        correctAnswer: 1,
      },
      {
        question: 'Anda ingin melanjutkan pelajaran ke universiti, tetapi kosnya tinggi. Apa tindakan yang paling bijak?',
        options: ['Berhenti belajar kerana kosnya terlalu tinggi', 'Mengambil pinjaman pendidikan sambil menyimpan sebahagian wang untuk menampung perbelanjaan lain', 'Meminjam wang dari rakan', 'Menjual aset peribadi untuk membayar yuran universiti'],
        correctAnswer: 1,
      },
      {
        question: 'Anda baru sahaja mendapat tahu bahawa ada perjanjian insurans yang memerlukan bayaran premium bulanan. Apa tindakan yang wajar jika ingin mengambil insurans tersebut?',
        options: ['Memastikan bahawa anda mempunyai bajet untuk premium tersebut sebelum membuat komitmen', 'Mengambil insurans tanpa memikirkan kos', 'Membayar premium menggunakan kad kredit dan membiarkan hutang terkumpul', 'Tidak membayar premium pada masa yang ditetapkan'],
        correctAnswer: 0,
      },
    ],
  },
];

interface QuizContextType {
  quizData: QuizCategory[];
  currentScore: number;
  setCurrentScore: (score: number) => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [currentScore, setCurrentScore] = useState(0);

  return (
    <QuizContext.Provider value={{ quizData, currentScore, setCurrentScore }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}