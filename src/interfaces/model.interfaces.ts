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

  export interface IStructure {
    info: IInfo;
    dballInfo: IDballInfo;
  }