// Satu tempat untuk semua identitas kantor. Nama, alamat, dan nomor telepon
// muncul di header, footer, halaman kontak, metadata, dan structured data —
// menyebarkannya ke banyak berkas berarti satu perubahan alamat akan
// meninggalkan alamat lama di suatu tempat yang baru ketahuan berbulan-bulan
// kemudian.
export const site = {
  // Situs ini tayang sebagai contoh kerja, bukan sebagai kantor hukum yang
  // menerima klien. Selama nilainya true, banner demo tampil, halaman ditolak
  // dari pengindeksan, dan form konsultasi menyatakan tidak ada yang membacanya.
  // Kalau kontennya suatu saat diganti jadi kantor sungguhan, ubah ke false —
  // dan periksa ulang seluruh daftar di README bagian "sebelum dipakai kantor
  // sungguhan" sebelum melakukannya.
  isDemo: true,

  name: 'Arkana & Rekan',
  legalName: 'Kantor Hukum Arkana & Rekan',
  tagline: 'Advokat & Konsultan Hukum',
  established: 2016,
  url: 'https://www.arkanarekan.id',

  address: {
    street: 'Menara Sentosa Lantai 12, Jl. Jenderal Sudirman Kav. 45',
    city: 'Jakarta Selatan',
    postalCode: '12930',
    country: 'Indonesia',
  },

  phone: '+62 21 5555 8100',
  whatsapp: '+6281100002200',
  email: 'halo@arkanarekan.id',
  officeHours: 'Senin–Jumat, 09.00–18.00 WIB',

  // Ditampilkan apa adanya di footer. Konsultasi awal yang digratiskan tanpa
  // batas waktu yang jelas berakhir jadi sumber salah paham, jadi batasnya
  // disebut di muka.
  consultationNote: 'Konsultasi awal 30 menit tanpa biaya.',

  // Ditampilkan di banner atas dan di footer saat isDemo true.
  demoNotice:
    'Situs ini contoh hasil kerja (portfolio), bukan kantor hukum sungguhan. ' +
    'Nama advokat, alamat, dan seluruh isinya fiktif.',
};
