import KakaoProvider from "next-auth/providers/kakao";
// NextAuth 의 전체 옵션을 설정하는곳?
// 어떤 provider를 쓸지
// 세션 콜백은 어떤 로직으로 처리할지
// 시크릿 키는 무엇인지?

export async function getAuthOptions() {
  const kakaoClientId = process.env.KAKAO_CLIENT_ID;
  const kakaoClientSecret = process.env.KAKAO_CLIENT_SECRET;

  return {
    providers: [
      KakaoProvider({
        clientId: kakaoClientId,
        clientSecret: kakaoClientSecret,
      }),
    ],
    callbacks: {
      async redirect({ url, baseUrl }) {
        console.log("url!!", url);
        console.log("baseurl!!", baseUrl);
        return url;
      },

      async jwt({ token, user }) {
        console.log("token !:", token, "user! :", user);
        return token;
      },
      async session({ session, token }) {
        console.log("session!!", session);
        console.log("token!!", token);
        session.user.id = token.sub;
        return session;
      },
    },
    pages: {
      error: "/error",
    },
    secret: "Sdfsadfsdafsafsdafsdafadsfs",
  };
}
