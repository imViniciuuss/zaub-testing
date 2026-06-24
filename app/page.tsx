import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";

export default function Home() {
  return (
    <Container maxWidth="sm">
      <Typography variant="h1" gutterBottom>
        Catálogo
      </Typography>
      <Typography color="text.secondary">
        Em breve: listagem de produtos
      </Typography>
    </Container>
  );
}
