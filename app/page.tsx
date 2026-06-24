import { ProductCatalog } from "@/features/products/components/ProductCatalog";
import { pageContainerSx } from "@/lib/layout";
import { Container } from "@mui/material";

export default function Home() {
  return (
    <Container maxWidth="xl" sx={pageContainerSx}>
      <ProductCatalog />
    </Container>
  );
}
