# Sistema SaaS Moderno

Sistema SaaS completo desenvolvido com Next.js 14, Tailwind CSS, Framer Motion e Supabase.

## ✨ Características

- 🎨 **Design Moderno e Elegante**: Interface fluida com gradientes e efeitos visuais
- 🎭 **Animações Suaves**: Implementado com Framer Motion
- 🔐 **Autenticação Completa**: Sistema de login seguro com JWT
- 📱 **Totalmente Responsivo**: Funciona perfeitamente em todos os dispositivos
- ⚡ **Performance Otimizada**: Construído com Next.js 14 e otimizações de produção
- 🎯 **Dashboard Administrativo**: Interface completa para administradores

## 🚀 Credenciais de Acesso

**Usuário Administrador:**
- **Username:** afsantos
- **Senha:** fidelis123
- **Email:** fidelis.alex@gmail.com
- **Role:** administrator

## 📋 Pré-requisitos

- Node.js 18+ instalado
- Conta no Supabase
- Conta no Vercel (para deploy)

## 🛠️ Instalação Local

1. **Clone ou baixe o projeto**

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure as variáveis de ambiente:**
```bash
cp .env.local.example .env.local
```

Edite o arquivo `.env.local` e adicione suas credenciais:
- Acesse o [Supabase Dashboard](https://app.supabase.com/project/phtqjgfljcjnqokqcrqs/settings/api)
- Copie a **Project URL** para `NEXT_PUBLIC_SUPABASE_URL`
- Copie a **anon/public key** para `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Copie a **service_role key** para `SUPABASE_SERVICE_ROLE_KEY`

4. **Configure o banco de dados Supabase:**

Acesse o [SQL Editor do Supabase](https://app.supabase.com/project/phtqjgfljcjnqokqcrqs/sql/new) e execute:

```sql
-- Criar tabela de usuários
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de sessões
CREATE TABLE IF NOT EXISTS public.sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;

-- Criar políticas de segurança
CREATE POLICY "Users can view own data" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Sessions can be managed by user" ON public.sessions
  FOR ALL USING (auth.uid() = user_id);
```

5. **Inicie o servidor de desenvolvimento:**
```bash
npm run dev
```

6. **Acesse a aplicação:**
Abra [http://localhost:3000](http://localhost:3000) no navegador

## 🌐 Deploy no Vercel

### Opção 1: Deploy via Interface Web

1. Acesse [Vercel](https://vercel.com)
2. Clique em "New Project"
3. Importe o repositório GitHub (ou faça upload do projeto)
4. Configure as variáveis de ambiente:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `JWT_SECRET`
5. Clique em "Deploy"

### Opção 2: Deploy via CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy para produção
vercel --prod
```

## 📁 Estrutura do Projeto

```
moderno-saas-system/
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── login/
│   │           └── route.ts        # API de autenticação
│   ├── dashboard/
│   │   └── page.tsx                # Dashboard protegido
│   ├── login/
│   │   └── page.tsx                # Página de login
│   ├── globals.css                 # Estilos globais
│   ├── layout.tsx                  # Layout principal
│   └── page.tsx                    # Página inicial (redirect)
├── components/                     # Componentes reutilizáveis
├── lib/
│   └── auth.ts                     # Biblioteca de autenticação
├── public/                         # Arquivos estáticos
├── .env.local.example              # Exemplo de variáveis de ambiente
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 🎨 Tecnologias Utilizadas

- **Framework:** Next.js 14 (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS
- **Animações:** Framer Motion
- **Backend:** Supabase (PostgreSQL + Auth)
- **Autenticação:** JWT (jose)
- **Deploy:** Vercel

## 🔒 Segurança

- ✅ Autenticação JWT com expiração de 24h
- ✅ Senhas nunca expostas no frontend
- ✅ Row Level Security no Supabase
- ✅ Validação de dados em todas as rotas
- ✅ HTTPS obrigatório em produção
- ✅ Tokens armazenados de forma segura

## 📚 Links Úteis

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Documentation](https://vercel.com/docs)

## 🔗 Recursos do Projeto

- **Projeto Supabase:** [Dashboard](https://app.supabase.com/project/phtqjgfljcjnqokqcrqs)
- **Project ID:** phtqjgfljcjnqokqcrqs
- **Região:** us-east-1
- **Status:** ACTIVE_HEALTHY

## 🤝 Suporte

Para questões e suporte:
- Email: fidelis.alex@gmail.com
- [Documentação do Supabase](https://supabase.com/docs)
- [Documentação do Next.js](https://nextjs.org/docs)

## 📝 Notas Importantes

⚠️ **Segurança em Produção:**
- Altere a senha do administrador após o primeiro login
- Use senhas fortes e hash bcrypt para novos usuários
- Mantenha as chaves secretas seguras e nunca as exponha no código
- Habilite 2FA quando disponível
- Monitore logs de acesso regularmente

⚠️ **Antes do Deploy:**
- Certifique-se de que todas as variáveis de ambiente estão configuradas
- Execute `npm run build` localmente para verificar erros
- Teste a autenticação em ambiente de desenvolvimento
- Revise as políticas de segurança do Supabase

## 🎉 Próximos Passos

1. ✅ Faça login com as credenciais fornecidas
2. 🔐 Altere a senha do administrador
3. 👥 Implemente registro de novos usuários (se necessário)
4. 📊 Customize o dashboard com seus dados reais
5. 🎨 Ajuste cores e branding conforme sua necessidade
6. 🚀 Faça deploy no Vercel

---

**Desenvolvido com ❤️ usando Next.js, Tailwind CSS e Framer Motion**
