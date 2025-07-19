import { getAuthOptions } from "@/app/lib/auth2";
import NextAuth from "next-auth";

// NextAuth를 사용하는 API Route정의.
// GET, POST 요청 둘다 지원하는 nextjs의 app router전용 인증 핸들러 구성방식

// 클라이언트가 /api/auth/*로 요청하면 여기가 처리하는 함수.
const handler = async (req, res) => {
  const options = await getAuthOptions(req);
  // getAuthOptions nextauth의 설정객체(options)를 반환하는 함수..?
  // 인증관련 설정을 요청(req)에 맞춰 가져옴.
  return NextAuth(options)(req, res);
};

export { handler as GET, handler as POST };
