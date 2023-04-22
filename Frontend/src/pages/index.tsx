import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { Container, Box } from "@mui/material";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [innerHeight, setInnerHeight] = useState<number>(0);
  const [scrollHeight, setScrollHeight] = useState<number>(0);

  useEffect(() => {
    setInnerHeight(window.innerHeight);
  }, []);

  return (
    <>
      <Box color="#000000">Test</Box>
    </>
  );
}
