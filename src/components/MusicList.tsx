import { List, ListItemButton, Avatar } from "@mui/material";

export default function MusicList({ songs, onSelect }: any) {
  return (
    <List>
      {songs.map((song: any) => (
        <ListItemButton key={song.id} onClick={() => onSelect(song)}>
          <Avatar src={song.artwork} />

          {song.title}
        </ListItemButton>
      ))}
    </List>
  );
}
