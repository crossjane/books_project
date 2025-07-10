import React from "react";

function BookDetail() {
  return (
    <>
      <div className="flex flex-row bg-white shadow-md rounded-md mx-10 my-20 p-10">
        <div className="mr-3">이미지</div>
        <div className="flex flex-col">
          <div className="font-semibold text-[16px] text-[#424242]">제목</div>
          <div className="text-[12px] text-gray-600">지은이</div>
          <div className="text-[12px] text-gray-600">출간일</div>
          <div className="text-[12px] text-gray-600">ISBN</div>
          <div className="text-[12px] text-gray-600">페이지 수</div>
          <div className="text-[12px] text-gray-600">설명</div>
          <div className="flex items-center justify-center bg-blue-500 rounded-md h-[30px] text-[14px] w-[130px] text-white mt-5 cursor-pointer">
            책 읽기 시작하기
          </div>
        </div>
      </div>
    </>
  );
}
export default BookDetail;
