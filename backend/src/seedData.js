// Konten contoh untuk kantor hukum fiktif "Arkana & Rekan".
//
// Dipisahkan dari seed.js supaya isinya bisa dibaca dan diganti tanpa menyentuh
// logika penyimpanan — dan supaya bisa dipakai ulang, misalnya oleh stub API
// saat mengembangkan tampilan tanpa menyalakan database.
//
// SEMUA ISI DI SINI KARANGAN: nama advokat, nomor induk PERADI, dan alamat.
// Ganti seluruhnya sebelum situs dipakai kantor sungguhan.

const practiceAreas = [
  {
    slug: 'litigasi',
    name: 'Litigasi & Penyelesaian Sengketa',
    icon: 'scale',
    order: 1,
    featured: true,
    summary:
      'Mewakili klien di pengadilan negeri, pengadilan niaga, dan arbitrase — dari somasi awal sampai eksekusi putusan.',
    services: [
      'Gugatan dan pembelaan wanprestasi',
      'Perbuatan melawan hukum',
      'Sengketa kontrak komersial',
      'Arbitrase BANI',
      'Permohonan dan pembelaan PKPU',
      'Eksekusi putusan dan sita jaminan',
    ],
    content:
      'Sebagian besar sengketa yang sampai ke meja kami sebenarnya bisa selesai lebih murah setahun sebelumnya. Karena itu langkah pertama kami selalu sama: menghitung nilai perkara, memperkirakan biaya dan lama proses, lalu membandingkannya dengan hasil realistis dari perundingan. Kalau angkanya tidak masuk, kami katakan sejak awal.\n\nKalau perkara memang harus dibawa ke pengadilan, kesiapan bukti menentukan hasilnya jauh lebih besar daripada kepiawaian beracara. Kami mulai dengan menyusun kronologi dan mengumpulkan dokumen sebelum menyusun gugatan, bukan sesudahnya — karena bukti yang baru dicari setelah gugatan didaftarkan sering kali sudah terlambat.\n\nKami menangani perkara di Pengadilan Negeri di seluruh Jabodetabek, Pengadilan Niaga Jakarta Pusat untuk perkara kepailitan dan PKPU, serta arbitrase di BANI.',
  },
  {
    slug: 'korporasi',
    name: 'Korporasi & Investasi',
    icon: 'building',
    order: 2,
    featured: true,
    summary:
      'Pendirian badan usaha, perizinan berusaha, perjanjian komersial, dan uji tuntas untuk transaksi penyertaan modal.',
    services: [
      'Pendirian PT, PT PMA, dan yayasan',
      'Perizinan berusaha OSS-RBA',
      'Uji tuntas hukum (legal due diligence)',
      'Perjanjian pemegang saham',
      'Merger, akuisisi, dan restrukturisasi',
      'Perjanjian distribusi dan lisensi',
    ],
    content:
      'Biaya hukum terbesar dalam sebuah usaha jarang muncul dari perkara di pengadilan. Biasanya ia muncul dari akta yang disusun asal-asalan tiga tahun sebelumnya, lalu ketahuan saat uji tuntas menjelang pendanaan — pada saat itu, memperbaikinya butuh persetujuan pihak yang sudah tidak punya alasan untuk membantu.\n\nKami mengerjakan dua hal: menyiapkan struktur yang tahan diperiksa, dan memeriksa struktur yang sudah ada sebelum uang berpindah. Untuk klien yang sedang menggalang pendanaan, kami menyusun daftar temuan beserta bobotnya — mana yang harus beres sebelum penandatanganan, mana yang cukup jadi janji perbaikan.\n\nUntuk penanaman modal asing, pembatasan bidang usaha dan persyaratan modal minimum berubah cukup sering. Kami memeriksa ketentuan yang berlaku pada saat pengajuan, bukan mengandalkan ingatan dari transaksi sebelumnya.',
  },
  {
    slug: 'ketenagakerjaan',
    name: 'Ketenagakerjaan',
    icon: 'users',
    order: 3,
    featured: true,
    summary:
      'Perjanjian kerja, peraturan perusahaan, dan pendampingan perselisihan hubungan industrial sampai tingkat kasasi.',
    services: [
      'Penyusunan perjanjian kerja PKWT dan PKWTT',
      'Peraturan perusahaan dan perjanjian kerja bersama',
      'Pendampingan bipartit dan mediasi Disnaker',
      'Beracara di Pengadilan Hubungan Industrial',
      'Perhitungan pesangon dan kompensasi',
      'Audit kepatuhan ketenagakerjaan',
    ],
    content:
      'Perselisihan hubungan industrial punya urutan yang tidak bisa dilompati: perundingan bipartit, mediasi di dinas ketenagakerjaan, baru gugatan ke Pengadilan Hubungan Industrial. Perusahaan yang melewati tahap awal hampir selalu kalah di soal prosedur sebelum pokok perkaranya sempat dibahas.\n\nBagi pemberi kerja, kami menyiapkan dokumen yang berdiri sendiri sebagai bukti: perjanjian kerja yang sesuai jenis pekerjaannya, peraturan perusahaan yang sudah disahkan, dan catatan pembinaan yang tertulis dan tertanggal. Bagi pekerja, kami menghitung ulang hak yang seharusnya diterima dan mendampingi perundingan.\n\nKami menerima kedua sisi, tetapi tidak dalam perkara yang sama, dan tidak jika pernah menangani lawan dalam persoalan terkait.',
  },
  {
    slug: 'keluarga',
    name: 'Hukum Keluarga & Waris',
    icon: 'home',
    order: 4,
    featured: true,
    summary:
      'Perceraian, hak asuh, harta bersama, dan pembagian warisan di Pengadilan Agama maupun Pengadilan Negeri.',
    services: [
      'Cerai gugat dan cerai talak',
      'Hak asuh anak dan nafkah',
      'Pembagian harta bersama',
      'Perjanjian pranikah dan pascanikah',
      'Penetapan ahli waris',
      'Sengketa pembagian warisan',
    ],
    content:
      'Perkara keluarga dinilai dengan ukuran yang berbeda. Menang telak dalam putusan tidak ada artinya kalau hubungan yang harus tetap berjalan setelahnya — terutama antara orang tua yang masih sama-sama mengasuh anak — hancur dalam prosesnya.\n\nKami mendahulukan kesepakatan yang bisa dijalankan: jadwal pengasuhan yang realistis, besaran nafkah yang sesuai kemampuan sebenarnya, dan pembagian harta yang tidak memaksa salah satu pihak menjual tempat tinggalnya. Kalau jalur itu tertutup, kami beracara dengan persiapan penuh.\n\nUntuk perkara waris, langkah pertama biasanya bukan gugatan, melainkan penetapan ahli waris dan penelusuran aset. Banyak sengketa waris sebenarnya sengketa tentang daftar aset yang tidak pernah disepakati.',
  },
  {
    slug: 'pertanahan',
    name: 'Pertanahan & Properti',
    icon: 'map',
    order: 5,
    summary:
      'Uji tuntas sertifikat, sengketa kepemilikan, dan pendampingan transaksi jual beli maupun sewa properti.',
    services: [
      'Pemeriksaan keabsahan sertifikat di BPN',
      'Sengketa kepemilikan dan batas tanah',
      'Pembatalan sertifikat ganda',
      'Perjanjian pengikatan jual beli',
      'Sengketa perjanjian sewa dan pengosongan',
      'Pendampingan proses balik nama',
    ],
    content:
      'Hampir semua sengketa tanah yang mahal berawal dari pemeriksaan yang dilewati demi menghemat beberapa juta rupiah. Sertifikat yang tampak sah bisa berasal dari alas hak yang cacat, sedang dijaminkan, atau tumpang tindih dengan bidang sebelah.\n\nSebelum uang muka berpindah, kami memeriksa riwayat sertifikat di kantor pertanahan, memastikan tidak ada blokir atau sita, dan mencocokkan gambar situasi dengan kondisi nyata di lapangan. Untuk pembelian dari pengembang, kami membaca perjanjian pengikatan jual beli dengan perhatian khusus pada klausul keterlambatan dan pembatalan.\n\nKalau sengketa sudah terjadi, kami menilai lebih dulu apakah perkaranya masuk ranah perdata di Pengadilan Negeri atau gugatan tata usaha negara terhadap penerbitan sertifikatnya — salah pilih jalur berarti kehilangan waktu satu sampai dua tahun.',
  },
  {
    slug: 'pidana',
    name: 'Pidana & Kepatuhan',
    icon: 'shield',
    order: 6,
    summary:
      'Pendampingan sejak pemeriksaan kepolisian, pembelaan di persidangan, dan pencegahan risiko pidana korporasi.',
    services: [
      'Pendampingan pemeriksaan sebagai saksi dan tersangka',
      'Praperadilan',
      'Pembelaan perkara penipuan dan penggelapan',
      'Perkara tindak pidana ITE',
      'Pelaporan dan pendampingan korban',
      'Program kepatuhan antisuap',
    ],
    content:
      'Waktu paling menentukan dalam perkara pidana adalah pemeriksaan pertama di kepolisian, dan justru di situ orang paling sering datang sendirian. Keterangan yang sudah tertuang dalam berita acara sulit ditarik kembali, bahkan ketika diberikan karena salah paham atau kelelahan.\n\nKami mendampingi sejak panggilan pertama, menyiapkan klien menghadapi pemeriksaan, dan memastikan berita acara memuat apa yang benar-benar dikatakan. Untuk klien korporasi, kami juga mengerjakan sisi pencegahannya: memetakan titik risiko pidana dalam alur kerja perusahaan sebelum ada laporan.\n\nSetiap orang berhak atas pembelaan, apa pun tuduhannya. Yang tidak kami lakukan adalah membantu menyusun keterangan yang kami tahu tidak benar.',
  },
];

const lawyers = [
  {
    slug: 'arkana-wijaya',
    name: 'Arkana Wijaya, S.H., M.H.',
    position: 'Managing Partner',
    order: 1,
    barNumber: 'PERADI 09.11234',
    email: 'arkana@arkanarekan.id',
    bio:
      'Mendirikan Arkana & Rekan pada 2016 setelah sembilan tahun menangani sengketa komersial di kantor hukum besar Jakarta. Fokusnya litigasi bernilai besar dan restrukturisasi utang, dengan pengalaman beracara di Pengadilan Niaga dan arbitrase BANI.\n\nKebiasaannya yang paling dikenal klien: menolak perkara yang menurut hitungannya lebih mahal untuk diperkarakan daripada diselesaikan. Menurutnya, nasihat yang paling bernilai justru yang membuat kantor ini kehilangan honorarium beracara.',
    education: [
      'S.H., Fakultas Hukum Universitas Indonesia (2007)',
      'M.H. Hukum Bisnis, Universitas Gadjah Mada (2012)',
      'Pendidikan Khusus Profesi Advokat, PERADI (2008)',
    ],
    practiceAreas: ['litigasi', 'korporasi'],
  },
  {
    slug: 'nadira-halim',
    name: 'Nadira Halim, S.H., LL.M.',
    position: 'Partner',
    order: 2,
    barNumber: 'PERADI 09.14872',
    email: 'nadira@arkanarekan.id',
    bio:
      'Memimpin praktik korporasi dan investasi. Menangani pendirian PT PMA, uji tuntas hukum untuk transaksi penyertaan modal, dan penyusunan perjanjian pemegang saham untuk perusahaan rintisan tahap awal sampai seri B.\n\nSebelum bergabung pada 2019, bekerja di divisi hukum sebuah perusahaan teknologi — pengalaman yang membuatnya menulis perjanjian dengan mempertimbangkan siapa yang nanti harus menjalankannya, bukan hanya siapa yang menandatanganinya.',
    education: [
      'S.H., Fakultas Hukum Universitas Padjadjaran (2012)',
      'LL.M. Corporate Law, National University of Singapore (2016)',
      'Pendidikan Khusus Profesi Advokat, PERADI (2013)',
    ],
    practiceAreas: ['korporasi', 'ketenagakerjaan'],
  },
  {
    slug: 'bimo-prasetyo',
    name: 'Bimo Prasetyo, S.H.',
    position: 'Senior Associate',
    order: 3,
    barNumber: 'PERADI 09.18305',
    email: 'bimo@arkanarekan.id',
    bio:
      'Menangani perselisihan hubungan industrial dan perkara pertanahan. Rutin mendampingi perundingan bipartit dan mediasi di dinas ketenagakerjaan, serta beracara di Pengadilan Hubungan Industrial Jakarta Pusat.\n\nBanyak mengerjakan audit kepatuhan ketenagakerjaan untuk perusahaan menengah — memeriksa perjanjian kerja, peraturan perusahaan, dan catatan lembur sebelum semuanya jadi bukti dalam perkara.',
    education: [
      'S.H., Fakultas Hukum Universitas Diponegoro (2015)',
      'Pendidikan Khusus Profesi Advokat, PERADI (2016)',
    ],
    practiceAreas: ['ketenagakerjaan', 'pertanahan', 'litigasi'],
  },
  {
    slug: 'salsabila-rahman',
    name: 'Salsabila Rahman, S.H.',
    position: 'Associate',
    order: 4,
    barNumber: 'PERADI 09.21649',
    email: 'salsabila@arkanarekan.id',
    bio:
      'Menangani perkara keluarga dan waris di Pengadilan Agama serta Pengadilan Negeri, dan mendampingi klien pada pemeriksaan tahap penyidikan.\n\nMenaruh perhatian besar pada perkara hak asuh, dan biasanya memulai dengan menyusun jadwal pengasuhan yang bisa dijalankan kedua pihak sebelum membahas hal lain — karena kesepakatan yang tidak realistis akan kembali jadi perkara dalam setahun.',
    education: [
      'S.H., Fakultas Hukum Universitas Airlangga (2018)',
      'Pendidikan Khusus Profesi Advokat, PERADI (2019)',
    ],
    practiceAreas: ['keluarga', 'pidana'],
  },
];

const insights = [
  {
    slug: 'pkwt-setelah-uu-cipta-kerja',
    title: 'PKWT Setelah UU Cipta Kerja: Tiga Kesalahan yang Masih Sering Terjadi',
    category: 'Ketenagakerjaan',
    author: 'Bimo Prasetyo, S.H.',
    practiceAreaSlug: 'ketenagakerjaan',
    publishedAt: new Date('2026-07-14'),
    excerpt:
      'Batas waktu PKWT berubah, tetapi banyak perusahaan masih memakai template lama. Akibatnya perjanjian berubah demi hukum menjadi PKWTT — dan baru ketahuan saat perselisihan.',
    content:
      'Perubahan aturan perjanjian kerja waktu tertentu sudah berjalan beberapa tahun, tetapi template yang beredar di banyak perusahaan masih mengikuti ketentuan lama. Tiga kekeliruan berikut yang paling sering kami temukan saat audit.\n\nPertama, jangka waktu melebihi batas maksimum. PKWT beserta perpanjangannya tidak boleh melampaui lima tahun secara keseluruhan. Perusahaan yang memperpanjang kontrak dua tahunan tanpa menghitung akumulasinya biasanya menyadari masalah ini saat pekerja menggugat, dan pada saat itu hubungan kerja sudah berubah menjadi waktu tidak tertentu demi hukum.\n\nKedua, jenis pekerjaannya tidak sesuai. PKWT hanya untuk pekerjaan yang selesai dalam waktu tertentu atau bersifat sementara. Menempatkan pekerja pada posisi inti yang berjalan terus-menerus di bawah PKWT tidak berubah sah hanya karena kedua pihak menandatanganinya.\n\nKetiga, kompensasi akhir kontrak tidak dibayarkan. Setiap PKWT yang berakhir menimbulkan hak atas uang kompensasi yang dihitung berdasarkan masa kerja. Kewajiban ini kerap terlewat karena tidak ada dalam praktik lama, dan menjadi tagihan yang menumpuk saat perusahaan melakukan pengakhiran secara massal.\n\nPemeriksaan terhadap ketiga hal ini butuh setengah hari kerja. Perselisihan yang timbul karenanya butuh satu sampai dua tahun.',
  },
  {
    slug: 'due-diligence-sebelum-pendanaan',
    title: 'Apa yang Diperiksa Investor Sebelum Mengirim Uang',
    category: 'Korporasi',
    author: 'Nadira Halim, S.H., LL.M.',
    practiceAreaSlug: 'korporasi',
    publishedAt: new Date('2026-06-02'),
    excerpt:
      'Uji tuntas hukum jarang membatalkan transaksi. Yang lebih sering terjadi: temuan kecil menunda penandatanganan berbulan-bulan dan menggerus nilai perusahaan dalam perundingan.',
    content:
      'Perusahaan rintisan biasanya menyiapkan diri menghadapi uji tuntas dengan membereskan laporan keuangan. Sisi hukumnya baru diurus setelah daftar permintaan dokumen datang — dan di situlah jadwal mulai meleset.\n\nEmpat berkas yang paling sering belum siap: risalah rapat umum pemegang saham untuk setiap perubahan modal, perjanjian kerja dan bukti pengalihan kekayaan intelektual dari kontraktor lepas, dokumen perizinan berusaha yang masih berlaku, serta daftar perjanjian dengan klausul perubahan pengendalian.\n\nYang terakhir ini paling sering terlewat. Perjanjian distribusi atau sewa yang mensyaratkan persetujuan pihak lain apabila kepemilikan perusahaan berubah dapat menahan seluruh transaksi sampai persetujuan itu diperoleh. Meminta persetujuan tersebut saat pihak lain sudah tahu ada uang masuk jelas bukan posisi tawar yang baik.\n\nPengalihan kekayaan intelektual dari kontraktor lepas juga rutin bermasalah. Tanpa perjanjian tertulis yang mengalihkan hak cipta, kode program yang menjadi inti produk secara hukum masih dimiliki penulisnya. Memperbaikinya butuh tanda tangan orang yang mungkin sudah lama tidak berhubungan dengan perusahaan.\n\nSaran kami sederhana: lakukan uji tuntas atas perusahaan sendiri enam bulan sebelum mulai menggalang dana. Temuan yang sama jauh lebih murah diperbaiki ketika belum ada pihak lain yang menunggu.',
  },
  {
    slug: 'memeriksa-sertifikat-sebelum-membeli',
    title: 'Enam Pemeriksaan Sebelum Uang Muka Dibayarkan',
    category: 'Pertanahan',
    author: 'Bimo Prasetyo, S.H.',
    practiceAreaSlug: 'pertanahan',
    publishedAt: new Date('2026-04-21'),
    excerpt:
      'Sertifikat yang tampak sah tidak berarti tanahnya aman dibeli. Enam pemeriksaan ini memakan waktu sekitar dua minggu dan menutup hampir semua risiko yang berujung sengketa.',
    content:
      'Pembeli biasanya memeriksa satu hal: apakah nama di sertifikat sama dengan nama penjual. Itu perlu, tetapi jauh dari cukup. Berikut urutan pemeriksaan yang kami jalankan sebelum menyarankan klien membayar uang muka.\n\nSatu, pengecekan sertifikat di kantor pertanahan setempat. Ini memastikan sertifikat terdaftar, dan memperlihatkan catatan blokir, sita, atau hak tanggungan yang sedang membebani bidang tanah tersebut.\n\nDua, kecocokan gambar situasi dengan keadaan di lapangan. Luas dan batas pada sertifikat tidak selalu sama dengan yang dipagari penjual. Selisih beberapa meter di sisi yang berbatasan dengan tetangga adalah awal sengketa yang khas.\n\nTiga, riwayat peralihan hak. Sertifikat yang berpindah tangan tiga kali dalam dua tahun terakhir layak ditanyakan alasannya.\n\nEmpat, kesesuaian peruntukan ruang. Tanah yang dibeli untuk usaha tetapi berada di zona permukiman tidak akan mendapat izin yang dibutuhkan.\n\nLima, status perkawinan penjual dan persetujuan pasangan. Penjualan harta bersama tanpa persetujuan pasangan dapat dibatalkan, dan pembelinya yang menanggung akibat.\n\nEnam, keberadaan penghuni atau penggarap. Tanah kosong di atas kertas bisa saja dihuni pihak lain, dan pengosongan lewat pengadilan memakan waktu bertahun-tahun.\n\nSeluruh rangkaian ini biasanya selesai dalam dua minggu. Bandingkan dengan lama perkara pembatalan jual beli tanah di pengadilan, yang jarang selesai di bawah dua tahun.',
  },
];

module.exports = { practiceAreas, lawyers, insights };
