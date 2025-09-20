'use client';

import { usePrivy } from '@privy-io/react-auth';

export default function LoginButton() {
  const { ready, authenticated, login, logout } = usePrivy();

  if (!ready) {
    return null;
  }

  return (
    <button
      onClick={authenticated ? logout : login}
      className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
    >
      {authenticated ? 'Log Out' : 'Log In'}
    </button>
  );
}
