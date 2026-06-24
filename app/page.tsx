import { ProductCatalog } from "@/features/products/components/ProductCatalog";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";

export default function Home() {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <ProductCatalog />
    </Container>
  );
}
