"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect } from "react";

const KakaoLogin = () => {
  const router = useRouter();
  const session = useSession();

  console.log("쎄션", session);

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
      "http://43.201.36.186/_api/v1/auth/sns/login",
      {
        snsId: session.data.user.id,
        type: "KAKAO",
      }
    );
    // response.data가 있으면 로그인 성공 -> 홈으로 리다이렉션.
    // 없으면 회원가입으로 이동.
    if (response.data) {
      router.push("/");
    } else {
      snsSignUp();
    }
  };

  const snsSignUp = async () => {
    const response = await axios.post(
      "http://43.201.36.186/_api/v1/auth/SignUp",
      {
        // session.data.. 이걸 어디서 확인??
        snsId: session.data.user.id,
        type: "KAKAO",
        // 어디서 확인하는지 다시 보기.
        name: session.data.user.name,
      }
    );

    if (response.data) {
      router.push("/");
    } else {
      snsLogin();
    }
  };

  // 세션이 있으면 로그인 ? 로그인 성공했을시에만 백엔드 서버에 요청을 보내는것.
  // 그럼 세션이 바뀔때마다 실행이 된다는뜻은? 로그인 전 : session === null
  // 로그인 성공직후 {user :{id:...}. expires:..} 바뀌는것. 로그인 유무 보려고.

  // 화면은 어떻게 처리되지 ??? 생각해보기
  useEffect(() => {
    if (session) {
      snsLogin();
    }
  }, [session]);
  return <div>로그인처리중</div>;
};

export default KakaoLogin;
