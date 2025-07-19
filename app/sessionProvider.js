"use client";

import { SessionProvider } from "next-auth/react";

// 플랫폼 설정
export const NextAuthProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

// useSession 으로 로그인 유무, 누구인지 접근할수 있게 해주는 훅을 쓰려면
// SessionProvider로 감싸야 작동됨.
