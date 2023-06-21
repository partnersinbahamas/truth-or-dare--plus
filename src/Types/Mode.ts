export interface ModeType {
  id: number,
  type: string,
  title: string,
  description: string,
  imgType: string,
  questions: {
    ru: action[],
    en: action[],
    de: action[],
  },

  dare: {
    ru: action[],
    en: action[],
    de: action[],
  }
}

export interface action {
  id: number,
  action: string,
}

// export interface quastion {
//   id: number,
//   question: string,
// }

// export interface dare {
//   id: number,
//   dare: string,
// }