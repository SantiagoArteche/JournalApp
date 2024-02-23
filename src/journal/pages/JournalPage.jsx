import { Box, IconButton } from "@mui/material";
import { JournalLayout } from "../layout/JournalLayout";
import { NoteView, NothingSelectedView } from "../views";
import { AddOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { startNewNote } from "../../store/journal/thunks";

export const JournalPage = () => {
  const dispatch = useDispatch();
  const { active, isSaving } = useSelector((state) => state.journal);

  const onClickNewNote = () => dispatch(startNewNote());
  return (
    <JournalLayout>
      {!!active ? <NoteView /> : <NothingSelectedView />}

      <IconButton
        size="large"
        sx={{
          color: "white",
          backgroundColor: "error.main",
          ":hover": { backgroundColor: "error.main", opacity: 0.7 },
          position: "fixed",
          right: 50,
          bottom: 50,
          display: isSaving ? "none" : "",
        }}
        onClick={onClickNewNote}
        disabled={isSaving}
      >
        <AddOutlined sx={{ fontSize: 35 }} />
      </IconButton>
    </JournalLayout>
  );
};
