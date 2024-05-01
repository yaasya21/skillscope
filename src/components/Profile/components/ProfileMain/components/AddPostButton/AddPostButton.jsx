import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const AddPostButton = ({ idLocal, idUser, role }) => {
  return (
    <>
      {idLocal === idUser && role === "talent" && (
        <Button
          variant="contained"
          component={Link}
          color="success"
          to={`/profile/${idLocal}/post`}
        >
          Add Post
        </Button>
      )}
    </>
  );
};

export { AddPostButton };
