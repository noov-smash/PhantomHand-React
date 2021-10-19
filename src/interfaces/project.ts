export interface UnloadedProjectProps {
  isLoaded: false;
  id?: undefined;
  name?: undefined;
  imageUrl?: undefined;
  data?: any;
}
export interface LoadedProjectProps {
  isLoaded: true;
  id: string;
  name: string;
  imageUrl?: string;
  data?: {
    id: string;
    index: MenuProps;
    items?: MenuProps[];
    folders?: MenuProps[];
  }[];
}

export interface MenuProps {
  [key: string]: any;
  title: string;
  items?: MenuProps[];
  imageUrl?: string;
}

export interface FirebaseProjectProps {
  id: string;
  name: string;
  imageUrl?: string;
  data?: any;
}
