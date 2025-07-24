"use client";

import React, { useEffect } from "react";
// import Image from "next/image";
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";
import axios from "axios";
import { getCookie } from "cookies-next/client";
import { useRouter } from "next/navigation";


function Home() {
  const router = useRouter();
  async function onClickKakaoLogin() {
    console.log("onClickKakaoLogin");
    await signIn("kakao", {
      redirect: false,
      callbackUrl: "/login/kakao",
    });
  }

  async function getMe() {
    // 쿠키에서 값을 읽어오는 cookie-next 라이브러리 함수
    // axios로 토큰을 가져옴.
    const token = getCookie("token");
    const response = await axios.get(
      "https://api.rich-log.com/_api/v1/auth/me",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // dispatch(actionCreator액션생성함수(바꿀값));공식형태.
    // dispatch(authAction.setMe({ id: 1, name: "jane" }));
    if (response.status === 200) {
      if (response.data.data) {
        console.log("reponse!!", response);

        dispatch(authAction.setMe(response.data.data));
      }
    }
  }


  function clickDetail(){
    router.push("/BookDetail");
  }

  useEffect(() => {
    getMe();
  }, []);

  return (
    <>
      <div className="bg-gray-100">
        <div className="mx-10">
          {/* 상단 */}
          <div className="flex flex-row mt-20 ">
            <div className="flex flex-1">내 서재</div>
            {/* <Link
              className="flex text-[13px] bg-blue-500 w-[130px] h-[30px] justify-center items-center rounded-md text-white text-center cursor-pointer"
              href={"/SearchBooks"}
            >
              책 찾으러 가기
            </Link> */}
          </div>
          {/* 책 카드 리스트 */}
          <div className="flex flex-row">
            <div className="bg-white w-[200px] rounded-md shadow-md p-3">
              <div className="flex items-center justify-center text-[10px] text-white bg-blue-500 w-[40px] rounded-3xl">
                진행중
              </div>
              <div>image</div>
              <div className="flex flex-col">
                <span className="text-[13px] font-semibold text-[#4d4d4d]">
                  제목
                </span>
                <span className="text-[10px] text-[#898989]">
                  2025년 7월 10일 시작
                </span>
              </div>
              <div
                onClick={clickDetail}
                className="flex justify-center items-center border-gray-400 border-1 rounded-md text-[11px] h-[25px] mt-3 cursor-pointer"
              >
                상세보기
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
          <button
            className="flex items-center justify-center px-4 py-2 bg-[#FEE500] text-[#191600] font-semibold rounded-md shadow hover:brightness-90 transition"
            onClick={onClickKakaoLogin}
          >
            <Image
              src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png"
              alt="Kakao Icon"
              width={50}
              height={50}
              className="w-5 h-5 mr-2 cursor-pointer"
            />
            카카오로 로그인
          </button>
          <Link href="/join">
            <button className="bg-blue-300 rounded-md px-14 py-2 shadow-md mt-4 cursor-pointer">
              회원가입
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
