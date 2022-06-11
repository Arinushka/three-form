import { InternalNamePath } from "antd/lib/form/interface";

export type Skill = {
  name: string;
  about: string;
};

export type Character = {
  "имя": string;
  "позиция": string;
  "роль": string;
  "тип атаки": string;
  "изображение": string;
  "способности": Skill[];
}


export type Element = {
  "position": string;
  "characters": Character[];
}

export type ValidationError = {
  name: InternalNamePath;
  errors: string[];
}
