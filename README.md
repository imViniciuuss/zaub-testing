# 🚀 Teste tecnico - Zaub

---

## 🔗 Links

| Recurso | URL |
|---|---|
| 🌐 Aplicacao em Producao | _Em breve_ |
| 📦 Repositorio GitHub | [zaub-testing](https://github.com/imViniciuuss/zaub-testing) |

---

## ✨ Funcionalidades

- Catalogo de produtos consumindo a DummyJSON API
- Busca por nome e descricao dos produtos
- Filtro por categoria
- Paginacao server-side (`limit` / `skip`)
- Carrinho global com Redux Toolkit (estado normalizado):
  - adicionar item
  - incrementar / decrementar quantidade
  - remover item
  - limpar carrinho
- Drawer do carrinho no header com total de itens e valor total
- Checkout com validacao de formulario (React Hook Form + Zod)
- Historico de pedidos com snapshot de preco/titulo/thumbnail
- Pagina de detalhe do pedido (`/orders/[orderId]`)
- Persistencia de carrinho e pedidos no `localStorage`
- Dark mode (light / dark / system)
- Snackbar de feedback (adicionar ao carrinho, pedido finalizado)
- Estados de loading (skeleton), erro (retry) e vazio (CTA)
- Layout responsivo para mobile
- Acessibilidade: skip link, labels ARIA, navegacao por teclado
- Testes unitarios para slices, selectors, schema e helpers

---

## 🛠️ Stack Tecnologica

| Camada | Tecnologia |
|---|---|
| **Frontend** | Next.js 16 + React 19 + TypeScript (strict) |
| **UI** | MUI v9 (`sx` / `styled`) |
| **Estado** | Redux Toolkit (slices, selectors memoizados, listener middleware) |
| **Dados** | RTK Query + DummyJSON API (`https://dummyjson.com`) |
| **Formularios** | React Hook Form + Zod |
| **Testes** | Vitest + Testing Library |
| **Deploy** | Vercel _(planejado)_ |

---

## ⚙️ Como Rodar Localmente

### Pre-requisitos

- Node.js >= 18.18 _(recomendado: 20+)_
- npm (ou yarn/pnpm/bun)

### 1. Clone o repositorio

```bash
git clone https://github.com/imViniciuuss/zaub-testing.git
cd zaub-testing
```

### 2. Instale as dependencias

```bash
npm install
```

### 3. Rode o projeto em desenvolvimento

```bash
npm run dev
```

Acesse em: `http://localhost:3000`

---

## 🧪 Scripts Disponiveis

```bash
npm run dev        # ambiente de desenvolvimento
npm run build      # build de producao
npm run start      # sobe build de producao
npm run lint       # analise estatica do codigo
npm run test       # executa testes unitarios
npm run test:watch # executa testes em modo watch
```

---

## 🧱 Estrutura de Pastas

```bash
app/              # rotas finas (App Router)
features/
  products/       # productsApi, ProductCard, ProductCatalog, useProductCatalog
  cart/           # cartSlice, cartSelectors, CartItemRow, __tests__
  orders/         # ordersSlice, ordersSelectors, CheckoutForm, __tests__
store/            # configureStore, hooks tipados, listenerMiddleware, persist
components/       # Header, CartSheet, LoadingState, ErrorState, EmptyState...
providers/        # ReduxProvider, ThemeRegistry, SnackbarProvider
theme/            # tema MUI centralizado (color schemes + dark mode)
types/            # ApiProduct, CartItem, Order
lib/              # formatCurrency, catalog, cart, storage, constants
hooks/            # useCart, useStoreHydration
```

### Rotas

| Rota | Descricao |
|---|---|
| `/` | Catalogo de produtos |
| `/cart` | Carrinho |
| `/checkout` | Finalizacao do pedido |
| `/orders` | Historico de pedidos |
| `/orders/[orderId]` | Detalhe do pedido |

---

## 🧠 Decisoes Tecnicas

### Redux normalizado no carrinho

O carrinho usa `{ ids: number[]; entities: Record<number, CartItem> }` para facilitar busca e atualizacao por `productId`. Cada `CartItem` guarda um **snapshot** de `title`, `price` e `thumbnail`, garantindo que pedidos antigos nao mudem se a API atualizar os produtos.

### RTK Query para o catalogo

A camada de produtos usa RTK Query (`productsApi`) com cache automatico, estados `isLoading` / `isError` e endpoints separados para listagem, busca e filtro por categoria. O hook `useProductCatalog` orquestra qual query usar conforme busca/categoria ativas.

### Persistencia com listener middleware

Em vez de salvar manualmente em cada componente, o `listenerMiddleware` escuta acoes do carrinho e de `placeOrder`, delegando a escrita ao `persistedState` e ao `storage` (wrapper SSR-safe com `try/catch`). Na inicializacao, o `ReduxProvider` hidrata cart e orders do `localStorage`.

### Separacao slice / selectors

- **Slice** — altera o estado (`addItem`, `increment`, `placeOrder`...)
- **Selectors** — le e deriva dados (`selectCartTotal`, `selectCartItems`...) com `createSelector` para evitar recalculos desnecessarios

### MUI + dark mode

Tema centralizado em `theme/theme.ts` com `colorSchemes` (light/dark) e CSS variables. Tokens customizados como `background.muted` sao tipados em `types/mui.d.ts`. O `InitColorSchemeScript` evita flash de tema errado na primeira renderizacao.

### Checkout

Validacao com Zod (`checkoutSchema`) integrada ao React Hook Form via `@hookform/resolvers`. Ao confirmar, `placeOrder` cria o pedido, persiste e `clearCart` esvazia o carrinho.

---

## 🎁 Bonus Implementados

- Detalhe do pedido (`/orders/[orderId]`)
- Persistencia em `localStorage` (carrinho + pedidos)
- RTK Query
- Paginacao server-side
- Dark mode
- Responsividade mobile
- Acessibilidade (skip link, ARIA, foco)
- Testes unitarios (Vitest)

---

## 🔒 Observacao

Em relação a UI/UX, fiz da forma mais simples possível, seguindo o que foi pedido.

---

## ✅ Entrega

- Repositorio Git: codigo-fonte disponivel no GitHub
- README com instrucoes para instalacao, execucao e testes locais
- Fluxo completo: catalogo → carrinho → checkout → historico de pedidos
