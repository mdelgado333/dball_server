export interface userInfo {
    username: string;
    name: string;
    password: string;
}

interface IInfo {
    title: string;
    subtitle: string;
    description: string;
  }
  
interface IDballInfo {
    vertical: 'ACADEMY' | 'VERT';
    typeOfContent: 'SHOOTING' | 'DRIBBLING' | 'FINISHING' | 'ISO' | 'POST' | 'LOWER' | 'UPPER' | 'CARDIO';
  }

interface IRest {
    minutes: number;
    seconds: number;
  }
  
  interface IRRS {
    sets: number;
    reps: number;
    rest: IRest;
  }
export interface IDetails {
  details: IRRS
  }


export interface IBooleanInfo {
    isRecent: boolean,
    isFeatured: boolean
  }

export interface IStructure {
    info: IInfo;
    dballInfo: IDballInfo;
  }