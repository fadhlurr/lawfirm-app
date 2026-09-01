import { useEffect, useState } from 'react';

// Empat bagian halaman depan dan tiga halaman detail memuat data dengan pola
// yang persis sama: loading -> ready | error. Satu hook menjaga ketiga keadaan
// itu ditangani seragam — bagian yang paling mudah terlewat kalau pola ini
// disalin berulang adalah keadaan error, dan yang terlihat pengunjung ketika
// terlewat adalah bagian kosong tanpa penjelasan.
//
// `deps` menentukan kapan pemuatan diulang; untuk halaman detail isinya slug.
export function useResource(loader, deps = []) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('loading'); // loading | ready | error

  useEffect(() => {
    // Kalau slug berganti sebelum request pertama selesai, respon yang datang
    // belakangan bisa menimpa data yang benar. Flag ini membuang respon dari
    // request yang sudah tidak relevan.
    let active = true;
    setStatus('loading');

    loader()
      .then((result) => {
        if (!active) return;
        setData(result);
        setStatus('ready');
      })
      .catch(() => {
        if (active) setStatus('error');
      });

    return () => { active = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, status };
}
