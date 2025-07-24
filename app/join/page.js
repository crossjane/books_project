"use client";

import { useRouter } from "next/navigation";
import { Router } from "next/router";
import React, { useState } from "react";

function Join() {
  const router = useRouter();
  const [name, setName] = useState();
  const [id, setId] = useState();
  const [password, setPassword] = useState();

  const submit = async () => {
    try {

      const response = await axios.post(
        "https://api.rich-log.com/_api/v1/auth/signUp",
        {
          snsId: id,
          name: name,
          password: password,
        }
      );
      alert("회원가입에 성공하였습니다");
      router.push("/login");
    } catch (err) {
      alert("회원가입에 실패하였습니다.", err);
    }
  };

  function changeId(e) {
    setId(e.target.value);
  }

  function changeName(e) {
    setName(e.target.value);
  }

  function changePassword(e) {
    setPassword(e.target.value);
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="mt-20 mb-5">회원가입</div>
        <input
          placeholder="아이디"
          value={id}
          onChange={changeId}
          className="border-1 border-gray-400 rounded-md px-2 my-2"
        />
        <input
          placeholder="이름"
          value={name}
          onChange={changeName}
          className="border-1 border-gray-400 rounded-md px-2 my-2"
        />
        <input
          placeholder="비밀번호"
          value={password}
          onChange={changePassword}
          className="border-1 border-gray-400 rounded-md px-2 my-2"
        />
        <button
          onClick={submit}
          className="bg-amber-300 rounded-md px-19 py-2 cursor-pointer mt-5"
        >
          제출하기
        </button>
      </div>
    </>
  );
}

export default Join;
