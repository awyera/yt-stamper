export interface Timestamp {
  id: string;
  time: string;
  text: string;
};

export interface SkipSeconds {
  longBackward: number;
  shortBackward: number;
  shortFoward: number;
  longFoward: number;
}
