export interface CommandProps {
  id: string;
  title: string;
  signals: SignalProps[];
  path: string;
  blob?: Blob;
  videoUrl?: string;
}

export interface SignalProps {
  t: number;
  s: Uint8Array;
}
