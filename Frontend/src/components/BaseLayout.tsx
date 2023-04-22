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
      <Container
        maxWidth="xs"
        sx={{ height: `${innerHeight ?? "100vh"}`, bgcolor: "#000" }}
      >
        <Box width="100%" height="100%" bgcolor="#F5F5F5">
          {children}
        </Box>
      </Container>
    </main>
  );
}
