"use client";

import axios from "axios";
import { setCookie } from "cookies-next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect } from "react";

const KakaoLogin = () => {
  const router = useRouter();
  const session = useSession();

  // useSession()훅으로 받아오는 클라이언트 측 session 이랑 auth 에서 서버 callback 세션이랑 다르다??
  // 훅으로 받아오는 것 = 클라이언트 측 세션 데이터 ? (브라우저에서 사용하는 유저 정보객체)

  const snsLogin = async () => {
    // 여기에 axios설치 했었나 ? npm install axios?
    // next.js 외부 백엔드 API로 로그인 요청 보내는 동작
    // 고유식별 id를 백엔드로 넘김
    // type  카카오 : 백엔드에서 어떤 sns로그인인지 구분하려고 넘겨줌.
    // post : "전달해서 뭔가를 처리하게"하는 전반적인 동작.로그인 요청, 새 사용자 생성, 주문내역 전송, 댓글내용 전송,  데이터 등록 , 트리거 발동.
    // ..put : 수정.
    // get: 서버에게 '게시글 목록주세요' 요청. 데이터 조회/읽기 목적.

    // 형식을 바꿀 수 있나?

    // axios({
    //   method: 'post',
    //   url: '/user/12345',
    //   data: {
    //     firstName: 'Fred',
    //     lastName: 'Flintstone'
    //   }
    // });

    const response = await axios.post(
      "https://api.rich-log.com/_api/v1/auth/sns/login",
      {
        snsId: session.data.user.id,
        type: "KAKAO",
      }
    );
    // response.data가 있으면 로그인 성공 -> 홈으로 리다이렉션.
    // 없으면 회원가입으로 이동.
    // 근데 카카오 로그인 했는데 -> 성공은 했는데 회원가입이 안되어있으면....?
    // 카카오아이디가 회원가입 그거 에 있는지 비교대조 해야되는것인지?
    if (response.data.data) {
      const token = response.data.data.split(" ")[1];
      console.log("Token :", token);
      setCookie("token", token, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365 * 5,
      });
      router.push("/");
    } else {
      snsSignUp();
    }
  };

  // 로그인 해서 없으면 자동으로 signUp하게 만드는것?  그래서 세션에 담긴 로그인 내용을 ->
  // 회원가입으로 자동으로 하게 해주는것인가 ? 회원가입안되어있으면 로그인 실패인가 ? 자동으로
  // 하는것.. 어떻게 ..? ...........? ?? 그리고 왜 쎼션 안찎히지 찎혔었는데
  // 왜 저번엔 회원가입 업ㄱ이 로그인되지?
  const snsSignUp = async () => {
    const request = {
      snsId: session.data.user.id,
      profileImageUrl: session.data.user.image,
      type: "KAKAO",
      name: session.data.user.name,
    };

    const response = await axios.post(
      "https://api.rich-log.com/_api/v1/auth/signUp",
      request
    );
    if (response.data) {
      router.push("/");
    }
  };

  // 세션이 있으면 로그인 ? 로그인 성공했을시에만 백엔드 서버에 요청을 보내는것.
  // 그럼 세션이 바뀔때마다 실행이 된다는뜻은? 로그인 전 : session === null
  // 로그인 성공직후 {user :{id:...}. expires:..} 바뀌는것. 로그인 유무 보려고.

  // 화면은 어떻게 처리되지 ??? 생각해보기
  useEffect(() => {
    // 왜 data가 없엉
    console.log("쎄션", session);
    if (session.status === "authenticated") {
      snsLogin();
    }
  }, [session.status]);
  return <div>로그인처리중</div>;
};

export default KakaoLogin;
