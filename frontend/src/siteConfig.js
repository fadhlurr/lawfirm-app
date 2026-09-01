// Satu tempat untuk semua identitas kantor. Nama, alamat, dan nomor telepon
// muncul di header, footer, halaman kontak, metadata, dan structured data —
// menyebarkannya ke banyak berkas berarti satu perubahan alamat akan
// meninggalkan alamat lama di suatu tempat yang baru ketahuan berbulan-bulan
// kemudian.
export const site = {
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
};
