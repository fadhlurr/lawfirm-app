import { Link } from 'react-router-dom';

export default function NotFound({ message = 'Halaman yang Anda cari tidak ada.' }) {
  return (
    <div className="wrap notfound">
      <h1 className="serif">404</h1>
      <p>{message}</p>
      <Link to="/" className="btn-primary">Kembali ke beranda</Link>
    </div>
  );
}
