import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Box } from "@mui/material";

export const ImageGallery = ({ imageUrls }) => {
  return (
    <ImageList
      sx={{
        overflow: "auto",
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
      cols={4}
    >
      {imageUrls.map((image) => (
        <ImageListItem key={image}>
          <Box
            component="img"
            srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`${image}?w=164&h=164&fit=crop&auto=format`}
            alt={image}
            sx={{ width: 500 }}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};
