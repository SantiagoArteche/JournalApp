import { TurnedInNot } from "@mui/icons-material";
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { setActiveNote } from "../../store/journal";
export const SidebarItem = ({ title, body, note }) => {
  const newTitle = useMemo(() => {
    return title.length > 17 ? title.substring(0, 17).trim() + "..." : title;
  }, [title]);

  const dispatch = useDispatch();

  const onClickNote = () => dispatch(setActiveNote(note));
  return (
    <ListItem onClick={onClickNote} disablePadding>
      <ListItemButton>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={newTitle} />
          <ListItemText secondary={body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
