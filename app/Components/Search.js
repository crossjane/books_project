"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function Search() {
  const searchParams = useSearchParams();
  const [searchKeywordInput, setSearchKeywordInput] = useState("");
  const router = useRouter();
  function changeKeyword(e) {
    setSearchKeywordInput(e.target.value);
  }

  function onsubmitSearch() {
    router.push(`?searchKeyword=${searchKeywordInput}`);
  }

  //   해줄필요가 없나?
  useEffect(() => {
    if (searchParams && searchParams.get("searchKeyword")) {
      setSearchKeywordInput(searchParams.get("searchKeyword"));
    }
  }, [searchParams]);

  return (
    <div className="flex flex-row">
      <div className="border-2 border-gray-500 rounded-md">
        <input
          placeholder="검색어를 입력해주세요"
          className="rounded-md"
          onChange={changeKeyword}
          value={searchKeywordInput}
        />
      </div>
      <div
        className="cursor-pointer ml-3 text-center bg-slate-400 w-20 rounded-md text-white"
        onClick={onsubmitSearch}
      >
        검색
      </div>
    </div>
  );
}

export default Search;
