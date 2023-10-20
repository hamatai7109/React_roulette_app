import { memo, useCallback, useEffect, useState } from "react";

const Roulette = memo(() => {
  const [start, setStart] = useState(false);
  const [index, setIndex] = useState(0);

  const rouleteeContents = [
    "山村",
    "友永",
    "立道",
    "橋本",
    "原",
    "数井",
    "山崎",
    "峯",
    "蓑田",
    "笠原",
    "横山",
    "秋葉",
    "亀井",
    "伊藤",
    "濱野",
    "大石",
    "和田",
    "特別ゲスト",
  ];

  // ボタンの文言を変更する処理
  const startRoulette = useCallback(() => {
    setStart(!start);
  }, [start]);

  // ルーレットを回す処理
  useEffect(() => {
    if (start) {
      const interval = setInterval(() => {
        setIndex((oldIndex) => {
          if (oldIndex < rouleteeContents.length - 1) return oldIndex + 1;
          return 0;
        });
      }, 80);
      return () => clearInterval(interval);
    } else if (!start) {
      return () => clearInterval();
    }
  }, [start]);

  // ランダム2人組を配列の中身がなくなるまで続ける処理
  function getRandomPair(arr) {
    const shuffled = arr.slice().sort(() => 0.5 - Math.random());
    const pairs = [];

    for (let i = 0; i < shuffled.length; i += 2) {
      if (i + 1 < shuffled.length) {
        pairs.push([shuffled[i], shuffled[i + 1]]);
      }
    }

    return pairs;
  }

  //ランダムの2人組
  const randomPairs = getRandomPair(rouleteeContents);

  return (
    <div className="p-36 w-screen h-screen bg-blue-200 text-center relative">
      <h2 className="bg-orange-100 p-3 max-w-sm mx-auto text-4xl">
        チームA,B,C,D
      </h2>
      <div className="bg-white max-w-md mx-auto mt-7 p-4 rounded-full">
        <h1 className="text-4xl">1 on 1 組み合わせ抽選会</h1>
      </div>
      <div className="mt-10">
        <ul className="mt-3 flex justify-center flex-wrap gap-3">
          {randomPairs.map((pair) => (
            <li
              className="w-[calc(100%/3-12px)] flex items-center justify-center text-4xl h-28 bg-slate-50"
              key={pair.join("-")}
            >
              {pair.join(" & ")}
            </li>
          ))}
        </ul>
      </div>
      <button
        className="mt-20 bg-orange-100 p-11 text-5xl rounded-full hover:bg-orange-400 duration-300"
        type="button"
        onClick={startRoulette}
      >
        {start ? "STOP" : "START"}
      </button>
    </div>
  );
});

export default Roulette;
