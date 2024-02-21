import { useState, useEffect } from "react";
import { charData } from "../customTypes";

export const useGetAllChars = () => {
  const [charArr, setCharArr] = useState<charData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  let allCharacters: charData[] = [];
  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);

      const controller = new AbortController();

      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/?page=1`,
          { signal: controller.signal }
        );
        const data = await response.json();
        getEpisodeNumbersAndPushToCharArr(data.results, allCharacters);

        for (let i = 2; i < data.info.pages; i++) {
          const response = await fetch(
            `https://rickandmortyapi.com/api/character/?page=${i}`,
            { signal: controller.signal }
          );
          const data = await response.json();
          getEpisodeNumbersAndPushToCharArr(data, allCharacters);
        }
      } catch (error) {
        setError(error as string);
      }

      setCharArr(allCharacters);
      setLoading(false);
      controller.abort();
    };
    fetchAll();
  }, []);

  return { charArr, loading, error };
};
export default useGetAllChars;

function getEpisodeNumbersAndPushToCharArr(
  data: charData[],
  charArr: charData[]
) {
  for (let i = 0; i < data.length; i++) {
    let episodesArr: string[] = [];
    for (let j = 0; j < data[i].episode?.length; j++) {
      let num = data[i].episode[j]?.lastIndexOf("/");
      const episodeNum = data[i].episode[j]?.slice(num + 1);
      episodesArr.push(episodeNum);
    }

    const character: charData = {
      name: data[i].name,
      image: data[i].image,
      gender: data[i].gender,
      location: data[i].location.name,
      origin: data[i].origin.name,
      species: data[i].species,
      episodes: episodesArr as [string],
    };
    charArr.push(character);
  }
  return charArr;
}
