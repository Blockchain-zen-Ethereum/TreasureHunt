import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  styled,
  Button,
  Tabs,
  Tab,
  Typography,
} from "@mui/material";

const TabButtons = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (newValue: React.SetStateAction<number>) => {
    setValue(newValue);
  };

  return (
    <Stack
      direction="row"
      width="100%"
      justifyContent="space-between"
      alignItems="center"
      px="1rem"
      mt="1.75rem"
    >
      <Button
        sx={{
          width: "10.75rem",
          height: "2.625rem",
          bgcolor: value === 0 ? "#fff" : "ffffff40",
          "&:hover": {
            bgcolor: value === 0 ? "#fff" : "ffffff40",
          },
          "&:active": {
            bgcolor: value === 0 ? "#fff" : "ffffff40",
          },
          borderRadius: "2.5rem",
        }}
        onClick={() => handleChange(0)}
      >
        <Typography
          fontSize="1rem"
          fontWeight="700"
          color={value === 0 ? "#535A66" : "#535A6640"}
        >
          Hunting {`(${12})`}
        </Typography>
      </Button>
      <Button
        sx={{
          width: "10.75rem",
          height: "2.625rem",
          bgcolor: value === 1 ? "#fff" : "ffffff40",
          "&:hover": {
            bgcolor: value === 1 ? "#fff" : "ffffff40",
          },
          "&:active": {
            bgcolor: value === 1 ? "#fff" : "ffffff40",
          },
          borderRadius: "2.5rem",
        }}
        onClick={() => handleChange(1)}
      >
        <Typography
          fontSize="1rem"
          fontWeight="700"
          color={value === 1 ? "#535A66" : "#535A6640"}
        >
          History {`(${2})`}
        </Typography>
      </Button>
    </Stack>
  );
};

export default TabButtons;
