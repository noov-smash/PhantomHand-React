export interface UnloadedProjectProps {
  isLoaded: false;
  id?: undefined;
  name?: undefined;
  imageUrl?: undefined;
  publicData?: undefined;
  privateData?: undefined;
}
export interface LoadedProjectProps {
  isLoaded: true;
  id: string;
  name: string;
  imageUrl?: string;
  publicData: ProjectDataProps[];
  privateData: ProjectDataProps[];
}

export interface FirebaseProjectProps {
  id: string;
  name: string;
  imageUrl?: string;
  publicData?: ProjectDataProps[];
  privateData?: ProjectDataProps[];
}

export interface ProjectDataProps {
  id: string;
  index: MenuProps;
  items?: MenuProps[];
  folders?: MenuProps[];
}
export interface MenuProps {
  [key: string]: any;
  title: string;
  items?: MenuProps[];
  imageUrl?: string;
}
