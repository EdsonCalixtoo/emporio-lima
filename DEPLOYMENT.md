# Guia de Deployment - Emporio Lima

Seu projeto agora está configurado para funcionar em **Web** e **Mobile**!

## Para Desenvolvimento Local

### Mobile (Expo Go)
```bash
npm run dev
```
Depois abra o Expo Go no seu celular e escaneie o QR code.

### Web Local
```bash
npm run build:web
npx serve dist
```
Acesse `http://localhost:3000` no navegador.

---

## Para Produção

### Deploy Web no Vercel

**Passo 1:** Envie seu código para GitHub
```bash
git add .
git commit -m "Setup web build configuration"
git push -u origin main
```

**Passo 2:** Conecte seu repositório ao Vercel
1. Acesse [vercel.com](https://vercel.com)
2. Clique em "New Project"
3. Selecione seu repositório GitHub
4. Vercel detectará automaticamente que é um projeto Expo
5. Clique em "Deploy"

**Passo 3:** Configure variáveis de ambiente (se necessário)
- Na página do projeto no Vercel, vá para Settings > Environment Variables
- Adicione as variáveis necessárias

**Resultado:** Seu site estará online em `https://seu-projeto.vercel.app`

---

### Deploy Mobile no Expo

Para publicar seu app mobile, use Expo Application Services (EAS):

```bash
npm install -g eas-cli
eas login
eas build --platform ios  # Para iOS
eas build --platform android  # Para Android
```

---

## Estrutura do Projeto

```
app/
├── _layout.tsx          # Layout raiz
├── (tabs)/              # Rotas com abas (mobile)
│   ├── _layout.tsx      # Configuração das abas
│   ├── index.tsx        # Tela inicial
│   ├── cart.tsx         # Carrinho
│   ├── orders.tsx       # Pedidos
│   └── profile.tsx      # Perfil
├── admin.tsx            # Painel admin
└── +not-found.tsx       # Página 404

dist/                    # Build web (gerado por `npm run build:web`)
```

---

## Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento Expo |
| `npm run build:web` | Compila para web |
| `npm run lint` | Verifica erros de lint |
| `npm run typecheck` | Verifica tipos TypeScript |

---

## Dicas

✅ O mesmo código funciona em web, iOS e Android  
✅ Use componentes React Native que têm suporte web  
✅ Teste no navegador antes de fazer deploy  
✅ Use `expo-router` para roteamento consistente

Qualquer dúvida, consulte a [documentação do Expo](https://docs.expo.dev).
