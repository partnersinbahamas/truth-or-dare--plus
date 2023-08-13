export interface ModeDesctiption {
  de: string,
  en: string,
  ru: string,
  ua: string,
}

export interface ModeType {
  id: number,
  type: string,
  title: string,
  description: ModeDesctiption,
  imgType: string,
  questions?: {
    ru: action[],
    en: action[],
    de: action[],
    ua: action[],
  },

  dare: {
    ru: action[],
    en: action[],
    de: action[],
    ua: action[],
  }
}

export interface action {
  id: number,
  action: string,
}
