# Front-end – Connect Digital

Interface web para avaliação técnica de criação e acompanhamento de pedidos, integração com o fluxo de pagamento (Pix / AbacatePay) e exibição do status do pedido em tempo real.

> ℹ️ Este README é específico do **front-end**.  
> Para detalhes da API e integrações externas, consulte também o [README do back-end](https://github.com/pedro-v-bezerra/connect-digital-backend).

---

## 🚀 Tecnologias principais

- **Next.js 16** – Framework React para aplicações modernas em produção, com SSR, rotas otimizadas e performance aprimorada.
- **React 19** – Biblioteca para interface declarativa e componentização reutilizável.
- **Tailwind CSS** – Estilização utilitária e rápida com design consistente.
- **React Hook Form + Zod** – Gerenciamento de formulários com validação tipada e schema-based.
- **Radix UI + Lucide Icons** – Componentes acessíveis e ícones otimizados para UI moderna.
- **QRCode.react** – Renderização de QR Codes para o fluxo de pagamento Pix.

---

### 🛠️ Ferramentas de desenvolvimento

- **TypeScript** – Tipagem estática e maior segurança.
- **ESLint + Prettier + Husky + lint-staged** – Padronização de código, formatação automática e qualidade contínua em commits.
- **Tailwind + prettier-plugin-tailwindcss** – Ordenação automática de classes e clean code.

---

## 📎 Requisitos

Certifique-se de ter as seguintes ferramentas instaladas no ambiente:

| Ferramenta      | Versão recomendada    |
| --------------- | --------------------- |
| **Node.js**     | >= 22.x               |
| **npm ou yarn** | Última versão estável |

> O projeto foi testado utilizando Node 22.11.0 + Next.js 16.

---

## 🔐 Variáveis de ambiente

O front-end não armazena informações sensíveis.  
Todas as integrações e chaves privadas ficam encapsuladas no back-end.

Para configurar a URL da API, crie um arquivo **`.env.local`** na pasta `frontend`:

```env
NEST_API_URL=http://localhost:3001

```

Essa variável é utilizada pelo front-end para consumir os endpoints do back-end.

⚠️ Importante: o arquivo .env.local não deve ser commitado no repositório.

#### Observações

- Nenhuma API Key ou token sensível deve existir no front-end.
- Apenas valores públicos e variáveis de configuração devem ser definidos aqui.
- O consumo da API fica centralizado em `process.env.NEST_API_URL`.

---

## ▶️ Instruções para execução

Antes de iniciar o front-end, é necessário que o back-end esteja rodando.

1. **Concluir o setup do back-end**

   Siga as instruções do [README do back-end](https://github.com/pedro-v-bezerra/connect-digital-backend) e deixe a API rodando (por exemplo, em `http://localhost:3001`).

2. **Configurar as variáveis de ambiente**

   Na raiz do projeto, crie o arquivo `.env.local` (se ainda não existir):

   ```env
   NEST_API_URL=http://localhost:3001
   ```

   Certifique-se de que a URL e a porta correspondem à configuração do back-end.

3. **Instalar as dependências do front-end**

Na raiz do projeto:

```bash
npm install
```

4. **Subir o servidor de desenvolvimento**
   Ainda na raiz do projeto:

```bash
npm run dev
```

5. **Acessar a aplicação**

No navegador acesse:

```text
http://localhost:3000
```

A partir daí, o front-end irá consumir o back-end usando a URL definida em NEST_API_URL.

## 💡 Possíveis melhorias e próximos passos

- Adicionar testes unitários e de integração.
- Adicionar tela de feedback pós pagamento com UI mais rica.
- Implementar loading states e tratamento de erros mais detalhado.
- Separar lógica de requests em um client dedicado.
- Cache de requisições (React Query / SWR).

---

#### Desenvolvido por Pedro Victor Lima
