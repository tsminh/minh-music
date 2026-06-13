import { Button } from "@mui/material";
import { dbPromise } from "../services/db";
import { extractMetadata } from "../services/artwork";

export default function ImportMusic({ refresh }: { refresh: () => void }) {
  const importFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    const db = await dbPromise;

    for (const file of files) {
      const meta = await extractMetadata(file);

      await db.put("songs", {
        id: crypto.randomUUID(),
        file,
        ...meta,
      });
    }

    refresh();
  };

  return (
    <>
      <Button component="label" variant="contained">
        Import Music
        <input
          hidden
          multiple
          type="file"
          accept="*/*"
          onChange={importFiles}
        />
      </Button>
    </>
  );
}
