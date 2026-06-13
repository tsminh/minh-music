interface Song {
  id: string;
  title: string;
  artist?: string;
  duration?: number;

  artwork?: string;

  file: File;
}
