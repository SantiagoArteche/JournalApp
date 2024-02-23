import {
  DeleteOutline,
  SaveOutlined,
  UploadOutlined,
} from "@mui/icons-material";
import {
  Button,
  Grid,
  Box,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import { ImageGallery } from "../components/ImageGallery";
import { useDispatch, useSelector } from "react-redux";
import { setActiveNote } from "../../store/journal";
import { useFormik } from "formik";
import { useEffect, useMemo, useRef } from "react";
import {
  deleteNotesByID,
  startSavingNote,
  startUploadingFiles,
} from "../../store/journal/thunks";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

export const NoteView = () => {
  const {
    active: note,
    messageSaved,
    isSaving,
  } = useSelector((state) => state.journal);

  const dispatch = useDispatch();

  const { title: noteTitle, body: noteBody, date, imageUrls } = !!note && note;

  const updateNote = (newValues) => dispatch(setActiveNote(newValues));

  const { handleChange, handleSubmit, values, setFormikState, initialValues } =
    useFormik({
      initialValues: { title: noteTitle, body: noteBody },
      validateOnChange: false,
      onSubmit: (data) => {
        updateNote({ ...note, title: data.title, body: data.body });
        dispatch(startSavingNote());
      },
    });

  useEffect(() => {
    setFormikState({
      values: { ["title"]: noteTitle, ["body"]: noteBody },
    });
  }, [initialValues, note]);

  useEffect(() => {
    if (messageSaved.length > 0)
      Swal.fire("Note updated", messageSaved, "success");
  }, [messageSaved]);

  const onFileInputChange = ({ target }) => {
    if (target.files === 0) return;

    dispatch(startUploadingFiles(target.files));
  };

  const fileInputRef = useRef();

  const onDelete = () => {
    dispatch(deleteNotesByID());
  };
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
      component="form"
      onSubmit={handleSubmit}
    >
      <Grid item>
        <Typography fontSize="39px" fontWeight="light" mb={1}>
          {date}
        </Typography>
      </Grid>
      <Grid item mb={1}>
        <Box
          type="file"
          component={"input"}
          multiple
          onChange={onFileInputChange}
          style={{ display: "none" }}
          ref={fileInputRef}
        />
        <IconButton onClick={() => fileInputRef.current.click()}>
          <UploadOutlined />
        </IconButton>
        <Button
          color="primary"
          sx={{ padding: 2 }}
          type="submit"
          disabled={isSaving}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Save
        </Button>
      </Grid>
      <Grid container justifyContent="center" alignItems="center">
        <TextField
          type="text"
          variant="filled"
          fullWidth
          onChange={handleChange}
          placeholder="Insert a title"
          label="Title"
          name="title"
          value={values.title}
          sx={{ border: "none", mb: 1 }}
        />
        <TextField
          type="text"
          variant="filled"
          name="body"
          fullWidth
          label="Body"
          value={values.body}
          onChange={handleChange}
          multiline
          placeholder="What happens today?"
          minRows={5}
          sx={{ mb: 3 }}
        />
      </Grid>
      <Grid container justifyContent="end">
        <Button onClick={onDelete} sx={{ mb: 2 }} color="error">
          <DeleteOutline />
          Borrar
        </Button>
      </Grid>
      <ImageGallery imageUrls={imageUrls} />
    </Grid>
  );
};
