import { useEffect, useState } from "react";
import { Container, Box, IconButton, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function BaseLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [innerHeight, setInnerHeight] = useState<string>("0px");

  useEffect(() => {
    setInnerHeight(window.innerHeight.toString() + "px");
  }, []);

  return (
    <main
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#000000",
      }}
    >
      <Container maxWidth="xs" sx={{ height: `${innerHeight ?? "100vh"}` }}>
        <Box
          sx={{
            width: "100%",
            // height: "2.5rem",
            paddingX: "1rem",
            paddingY: "0.375rem",
          }}
        >
          <IconButton
            aria-label="menu"
            // disabled
            sx={{
              color: "#7B869A",
              width: "2rem",
              height: "2rem",
              padding: 0,
              margin: 0,
            }}
          >
            <MenuIcon sx={{ fontSize: "2rem" }} />
          </IconButton>
        </Box>
        {children}
      </Container>
    </main>
  );
}
