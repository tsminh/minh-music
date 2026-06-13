import {
  Avatar,
  Box,
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";

import { clearLibrary, deleteSong, getStorageStats } from "../services/storage";

import { dbPromise } from "../services/db";

export default function StoragePage() {
  const [songs, setSongs] = useState<any[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  const [stats, setStats] = useState<any>();

  async function load() {
    const db = await dbPromise;

    const all = await db.getAll("songs");

    all.sort((a, b) => (b.audioBlob?.size || 0) - (a.audioBlob?.size || 0));

    setSongs(all);

    setStats(await getStorageStats());
  }

  useEffect(() => {
    load();
  }, []);

  const removeSelected = async () => {
    for (const id of selected) {
      await deleteSong(id);
    }

    setSelected([]);

    load();
  };

  return (
    <Box p={2}>
      <Typography variant="h5" gutterBottom>
        Storage
      </Typography>

      <Stack spacing={1} mb={3}>
        <Typography>Songs: {stats?.totalSongs ?? 0}</Typography>

        <Typography>Used: {formatBytes(stats?.usedBytes || 0)}</Typography>

        <Typography>
          Available:{" "}
          {formatBytes((stats?.quotaBytes || 0) - (stats?.usedBytes || 0))}
        </Typography>
      </Stack>

      <Stack direction="row" spacing={1} mb={2}>
        <Button
          variant="outlined"
          color="error"
          disabled={selected.length === 0}
          onClick={removeSelected}
        >
          Delete Selected
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={async () => {
            if (confirm("Delete all music?")) {
              await clearLibrary();
              load();
            }
          }}
        >
          Clear All
        </Button>
      </Stack>

      <List>
        {songs.map((song) => (
          <ListItem
            key={song.id}
            secondaryAction={
              <Button
                color="error"
                onClick={async () => {
                  await deleteSong(song.id);

                  load();
                }}
              >
                Delete
              </Button>
            }
          >
            <Checkbox
              checked={selected.includes(song.id)}
              onChange={() => {
                setSelected(
                  selected.includes(song.id)
                    ? selected.filter((x) => x !== song.id)
                    : [...selected, song.id],
                );
              }}
            />

            <ListItemAvatar>
              <Avatar src={song.artwork} />
            </ListItemAvatar>

            <ListItemText
              primary={song.title}
              secondary={`${formatBytes(song.audioBlob?.size || 0)}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

function formatBytes(bytes: number) {
  if (!bytes) return "0 B";

  const units = ["B", "KB", "MB", "GB"];

  let i = 0;

  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024;
    i++;
  }

  return `${bytes.toFixed(1)} ${units[i]}`;
}
