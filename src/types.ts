export type Skill = {
  name: string;
  about: string;
};

export type Character = {
  "имя": string;
  "позиция": string;
  "роль": string;
  "сила": string;
  "изображение": string;
  "active":boolean,
  "способности": Skill[];
}


export type Element = {
  "position": string;
  "characters": Character[];
}
