import Link from 'next/link';
import LoginButton from './LoginButton';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-gray-100">
      <div className="flex items-center space-x-4">
        <Link href="/" className="text-xl font-bold">
          Swift Market
        </Link>
        <Link href="/dashboard" className="hover:underline">
          Dashboard
        </Link>
      </div>
      <LoginButton />
    </nav>
  );
}
