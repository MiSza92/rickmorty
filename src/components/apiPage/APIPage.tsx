import { useEffect, useState } from "react";
import "./APIPageStyle.css";

import Card from "../card/Card";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  EffectCoverflow,
  Scrollbar,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "swiper/css/scrollbar";

import useCreateOutPutArray from "../../hooks/useCreateOutPutArray";
import EpisodeBox from "../EpisodeBox";
import { charData } from "../../customTypes";
import React from "react";

function APIPage() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [speciesValue, setSpeciesValue] = useState<string>("all");
  const [originValue, setOriginValue] = useState<string>("all");
  const [swiperIndex, setSwiperIndex] = useState<number>(0);
  const [episodesArr, setEpisodesArr] = useState<boolean[]>();

  const handleOnChangeSpecies = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSpeciesValue(e.target.value);
  };
  const handleOnChangeLocation = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOriginValue(e.target.value);
  };
  const handleOnChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const { outPutArr, speciesArr, originArr, loading } = useCreateOutPutArray(
    speciesValue,
    originValue,
    searchValue
  );
  const [slides, setSlides] = useState(1 | 3);
  useEffect(() => {
    if (outPutArr.length > 1) {
      setSlides(3);
    } else {
      setSlides(1);
    }
  }, [outPutArr]);

  useEffect(() => {
    if (outPutArr[swiperIndex]) {
      // console.log("object :>> ", outPutArr[swiperIndex]);
      setEpisodesArr(createBoxesArr(outPutArr[swiperIndex]));
      // console.log("episodesArr :>> ", episodesArr);
    }
  }, [swiperIndex, outPutArr]);

  //! bei 1365 umschalten
  // const [width, setWidth] = useState(0);
  // useEffect(() => {
  //   const updateWindowDimensions = () => {
  //     const newWidth = window.innerWidth;
  //     setWidth(newWidth);
  //   };

  //   window.addEventListener("resize", updateWindowDimensions);
  //   // console.log("width :>> ", width);
  //   return () => window.removeEventListener("resize", updateWindowDimensions);
  // }, [width]);

  return (
    <div className="api">
      <div className="optionsContainer">
        {loading ? (
          <p className="loadingText">Sorry, it's loading...</p>
        ) : (
          <div>
            <h1>Apply the filters :</h1>
            <div className="filterBox">
              <div className="searchContainer">
                <label>Search by name:</label>
                <input
                  type="text"
                  id="search"
                  value={searchValue}
                  onChange={handleOnChangeSearch}
                />
              </div>
              <div className="speciesContainer">
                <label>Choose a species:</label>
                <select
                  className="speciesSelect"
                  onChange={handleOnChangeSpecies}
                >
                  <option value="all">all</option>
                  {speciesArr &&
                    speciesArr.map((species, index) => {
                      return (
                        <option value={species} key={index}>
                          {species}
                        </option>
                      );
                    })}
                </select>
              </div>

              <div className="locContainer">
                <label>Choose a current location:</label>
                <select
                  className="locationSelect"
                  onChange={handleOnChangeLocation}
                >
                  <option value="all">all</option>
                  {originArr &&
                    originArr.map((location, index) => {
                      return (
                        <option key={index} value={location?.toString()}>
                          {location?.toString()}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
          </div>
        )}{" "}
      </div>
      <div className="midContainer">
        <div className="swipContainer">
          {loading ? (
            <p className="loadingText">Sorry, it's loading...</p>
          ) : (
            <Swiper
              onActiveIndexChange={(swiperCore) => {
                setSwiperIndex(swiperCore.realIndex);
              }}
              modules={[Navigation, Pagination, EffectCoverflow, Scrollbar]}
              effect={"coverflow"}
              spaceBetween={50}
              slidesPerView={slides}
              navigation={true}
              centeredSlides={true}
              pagination={{
                type: "fraction",
              }}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
              }}
              scrollbar={{ draggable: true }}
            >
              {outPutArr &&
                outPutArr.map((char, index) => {
                  if (outPutArr.length > 1) {
                    return (
                      <SwiperSlide key={index}>
                        <Card
                          name={char.name}
                          image={char.image.toString()}
                          gender={char.gender}
                          location={char.location}
                          origin={char.origin}
                          species={char.species}
                        />
                      </SwiperSlide>
                    );
                  } else {
                    return (
                      <SwiperSlide key={index}>
                        <div className="singleSlide">
                          {char.name}
                          <Card
                            name={char.name}
                            image={char.image.toString()}
                            gender={char.gender}
                            location={char.location}
                            origin={char.origin}
                            species={char.species}
                          />
                        </div>
                      </SwiperSlide>
                    );
                  }
                })}
            </Swiper>
          )}
        </div>
        <div className="episodesContainer">
          <div className="epiText">
            <p>
              Hello my Name is{" "}
              <span style={{ display: "inline", fontSize: 50 }}>
                {outPutArr[swiperIndex]?.name}
              </span>
              <br />I appear in{" "}
              <span style={{ display: "inline", fontSize: 40 }}>Episode:</span>
            </p>
          </div>

          <div className="boxContainer">
            {episodesArr &&
              episodesArr.map((episode, index) => {
                return (
                  <div className="epiBox" key={index}>
                    <EpisodeBox highlight={episode}>{index + 1}</EpisodeBox>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default APIPage;

function createBoxesArr(char: charData) {
  let episodesArr = [] as boolean[];
  for (let i = 0; i < 52; i++) {
    episodesArr.push(false);
  }
  for (let i = 0; i < char.episodes.length; i++) {
    const num: number = Number(char.episodes[i]);
    episodesArr[num] = true;
  }
  episodesArr.shift();

  return episodesArr;
}
