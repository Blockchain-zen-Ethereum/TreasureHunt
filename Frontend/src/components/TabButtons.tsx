import React from "react";
import { Stack, Button, Typography } from "@mui/material";

interface TabButtonsProps {
  value: number;
  handleChange: (newValue: React.SetStateAction<number>) => void;
  huntingCounts: number;
  historyCounts: number;
}

const TabButtons = ({
  value,
  handleChange,
  huntingCounts,
  historyCounts,
}: TabButtonsProps) => {
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
          Hunting {`(${huntingCounts})`}
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
          History {`(${historyCounts})`}
        </Typography>
      </Button>
    </Stack>
  );
};

export default TabButtons;
