import React from "react";
import Search from "../Components/Search";
import Image from "next/image";

async function SearchBooks({ searchParams }) {
  const params = await searchParams;
  // 검색어 불러오기기
  // 왜 저번에는 await를썼지 파람 불러올때때 왜 비동기..? 여기서는 왜 객체
  // const searchKeyword =  searchParams ?.searchKeyword ?? "";

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  let aladinApi = `http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${apiKey}&Query=${
    params?.searchKeyword ?? ""
  }&QueryType=Title&MaxResults=10&start=1&SearchTarget=Book&Sort=PublishTime&Cover=Small&output=js&Version=20131101`;

  const response = await fetch(aladinApi);
  const finalData = await response.json();
  // console.log("finaldata", finalData);

  return (
    <>
      {/* 상단 검색바 */}
      <div className="mx-10 mt-16 ">
        <div className="flex flex-row mb-5">
          <div className="flex flex-1">독서기록</div>
          <Search />
        </div>
        {/* 독서서 리스트 */}
        <div className="flex flex-row flex-wrap gap-5">
          {finalData.item?.map((content) => (
            <div key={content.isbn}>
              <div className="flex flex-col justify-center bg-white shadow-md rounded-md px-4 py-6 w-[340px] h-[300px] cursor-pointer ">
                <Image
                  src={content.cover}
                  alt={content.title}
                  width={80}
                  height={80}
                />
                <div className="font-medium mt-2 line-clamp-2">
                  {content.title}
                </div>
                <div className="text-[13px] text-gray-600 mt-2 mb-1 line-clamp-1">
                  {content.author}
                </div>
                <div className="text-gray-600 text-[13px] line-clamp-3">
                  {content.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default SearchBooks;
