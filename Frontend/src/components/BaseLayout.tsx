import { useEffect, useState } from "react";
import { Container, Box } from "@mui/material";

export default function BaseLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [innerHeight, setInnerHeight] = useState<number>(0);

  useEffect(() => {
    setInnerHeight(window.innerHeight);
  }, []);

  return (
    <main>
      <Container sx={{ width: "100vw", height: "100vh" }}>{children}</Container>
    </main>
  );
}
