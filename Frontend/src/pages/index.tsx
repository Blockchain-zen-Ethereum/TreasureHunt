import React, { useState, useEffect } from "react";
import { Box, Stack, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [innerHeight, setInnerHeight] = useState<number>(0);

  const handleLaunchApp = () => {
    router.push("/treasure-board");
  };

  useEffect(() => {
    setInnerHeight(window.innerHeight);
  }, []);

  return (
    <>
      <Box
        width="100%"
        height={innerHeight ? `${innerHeight}px` : "100%"}
        sx={{
          backgroundImage: `url("/images/home.jpeg")`,
          backgroundSize: "cover",
        }}
      >
        <Stack
          width="100%"
          height="100%"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Button
            sx={{
              width: "20.375rem",
              height: "3rem",
              bgcolor: "#fff",
              "&:hover": {
                bgcolor: "#F6F6F6",
              },
              "&:active": {
                bgcolor: "#EBEBEB",
              },
              borderRadius: "2.5rem",
              marginBottom: "5rem",
            }}
            onClick={handleLaunchApp}
          >
            <Typography fontSize="1.375rem" fontWeight="700" color="#1B4BF1">
              Launch APP
            </Typography>
          </Button>
        </Stack>
      </Box>
    </>
  );
}
