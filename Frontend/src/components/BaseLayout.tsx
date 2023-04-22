import { useEffect, useState } from "react";
import { Container, Box } from "@mui/material";

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
      style={{ width: "100vw", height: "100vh", backgroundColor: "#000000" }}
    >
      <Container maxWidth="xs" sx={{ height: `${innerHeight ?? "100vh"}` }}>
        {children}
      </Container>
    </main>
  );
}
