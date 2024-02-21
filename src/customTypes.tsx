export type charData = {
  name: String;
  image: String;
  gender: String;
  location: String;
  origin: String;
  species: String;
  episodes: [string];
};
export type locationData = {
  name: String;
  type: String;
  dimension: String;
};
export type countedData = {
  value: string;
  count: number;
};

export type rawData = {
  name: String;
  image: String;
  gender: String;
  location: { name: String; url: String };
  origin: { name: String; url: String };
  species: String;
  episode: string[];
};
