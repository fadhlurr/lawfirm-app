const VALUES = [
  {
    num: 'I',
    title: 'Penilaian di muka',
    body: 'Peluang, biaya, dan lama proses disampaikan sebelum perikatan, bukan setelah perkara berjalan.',
  },
  {
    num: 'II',
    title: 'Satu penanggung jawab',
    body: 'Advokat yang Anda temui pertama kali adalah yang menangani perkaranya sampai selesai.',
  },
  {
    num: 'III',
    title: 'Biaya yang disepakati',
    body: 'Lingkup dan besaran biaya tertulis di awal. Pekerjaan di luar lingkup dibicarakan dulu.',
  },
  {
    num: 'IV',
    title: 'Kabar tanpa diminta',
    body: 'Perkembangan perkara dilaporkan berkala, termasuk ketika perkembangannya tidak menggembirakan.',
  },
];

export default function Values() {
  return (
    <section id="nilai">
      <div className="wrap">
        <p className="eyebrow">Cara Kami Bekerja</p>
        <h2 className="sec-title">Empat hal yang bisa Anda tagih dari kami</h2>
        <p className="sec-desc">
          Bukan slogan. Kalau salah satu tidak kami penuhi, Anda berhak menegur —
          dan itu memang yang kami harapkan.
        </p>

        <div className="value-grid">
          {VALUES.map((v) => (
            <div className="value-card" key={v.num}>
              <div className="value-num">{v.num}</div>
              <h3 className="serif">{v.title}</h3>
              <p>{v.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
