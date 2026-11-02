import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-3xl font-bold">页面不存在</h1>
      <Link to="/" className="text-brand underline">
        回到首页
      </Link>
    </main>
  );
}
