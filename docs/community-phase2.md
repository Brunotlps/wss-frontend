# Fase 2 — Comunidade: Planejamento Completo

> Documento de referência para o desenvolvimento da área de Comunidade.
> Criado em: 2026-05-29

---

## Visão Geral

Área social da plataforma WSS onde alunos poderão interagir em torno de milhas e viagens.

**Fase 2a (atual):** página placeholder visual — sem backend, sem funcionalidades reais. Foco em UX e arquitetura de componentes escalável.
**Fase 2b/2c (futuro):** funcionalidades sociais reais com integração ao backend Django.

---

## Conceito UX — "Preview Bloqueado"

Em vez de uma página genérica de "em breve", o usuário vê uma prévia realista da comunidade com um overlay de glassmorphism bloqueando a interação. Cria antecipação, educa sobre a feature e mantém o padrão premium da plataforma.

```
/community
  └─ CommunityHero        — header com badge "Em breve"
  └─ PostComposerLocked   — composer visual, bloqueado
  └─ PostCardPreview ×3   — posts estáticos mockados
       └─ ReactionBarPreview — curtidas/comentários visuais
  └─ ComingSoonOverlay    — glassmorphism central com CTA
```

---

## Arquitetura de Componentes

### Fase 2a — criar agora

| Componente | Caminho | Responsabilidade |
|---|---|---|
| `CommunityView` | `views/community/CommunityView.vue` | View principal, orquestra layout e overlay |
| `CommunityHero` | `components/community/CommunityHero.vue` | Header da área: título, descrição, badge "Em breve" |
| `PostComposerLocked` | `components/community/PostComposerLocked.vue` | Caixa de criação visual, bloqueada, sem lógica |
| `PostCardPreview` | `components/community/PostCardPreview.vue` | Card de post estático com dados mock |
| `ReactionBarPreview` | `components/community/ReactionBarPreview.vue` | Barra de reações visual sem ação |
| `ComingSoonOverlay` | `components/community/ComingSoonOverlay.vue` | Overlay glassmorphism com mensagem e CTA |

### Fase 2b/2c — planejar agora, implementar depois

| Componente | Fase | Responsabilidade futura |
|---|---|---|
| `PostCard.vue` | 2b | Card real com dados da API |
| `PostComposer.vue` | 2b | Criação de post com VeeValidate + Yup |
| `PostFeed.vue` | 2b | Feed paginado com scroll infinito (IntersectionObserver) |
| `CommentList.vue` | 2c | Lista de comentários aninhada |
| `CommentComposer.vue` | 2c | Composição de comentário inline |
| `ReactionBar.vue` | 2c | Reações reais com estado otimista |
| `PostDetailModal.vue` | 2c | Modal de post aberto com comentários |

---

## Estrutura de Arquivos

### Criar agora (Fase 2a)

```
src/
├── views/community/
│   └── CommunityView.vue
├── components/community/
│   ├── CommunityHero.vue
│   ├── PostComposerLocked.vue
│   ├── PostCardPreview.vue
│   ├── ReactionBarPreview.vue
│   └── ComingSoonOverlay.vue
├── router/index.js           ← adicionar rota /community
└── components/layout/
    ├── AppHeader.vue         ← link "Comunidade" na nav
    └── AppFooter.vue         ← link "Comunidade" na seção Plataforma
```

### Reservado para fases futuras (não criar agora)

```
src/
├── services/communityService.js     ← fase 2b
├── stores/community.js              ← fase 2b
└── composables/useCommunityFeed.js  ← fase 2b
```

---

## Dados Mock (Fase 2a)

Array local estático. A estrutura já espelha o contrato esperado da API futura:

```js
[
  {
    id: 1,
    author: { name: 'Ana Costa', initials: 'AC', color: '#C8A96E' },
    content: 'Finalmente consegui emitir dois voos executivos para Lisboa com pontos Livelo!...',
    likes: 47,
    comments: 12,
    createdAt: 'há 2 horas',
    tags: ['Livelo', 'TAP', 'Executiva'],
  },
  // ...
]
```

---

## Direção de Design

### Padrões Apple/iOS a aplicar

| Elemento | Implementação |
|---|---|
| Cards | `rounded-2xl`, `border border-white/8`, `bg-white/3` |
| Overlay | `backdrop-blur-xl`, `bg-white/8`, `border-white/15`, `shadow-2xl` |
| Composer | `rounded-2xl`, borda sutil, placeholder elegante, ícones desabilitados |
| Separadores | `bg-gradient-to-r from-transparent via-dm-gold/20 to-transparent` |
| Badges | `rounded-full`, pulse animation dourado |
| Avatar | Reutilizar `UserAvatar.vue` existente |

### Tokens de cor

| Token | Uso na Comunidade |
|---|---|
| `dm-navy-900` | Fundo geral (dark mode) |
| `dm-gold` | Acentos, badges, ícones de destaque |
| `dm-navy-100/200` | Texto secundário |
| `white/3–10` | Backgrounds e borders glass |

---

## Rota

```
/community  →  CommunityView  →  sem requiresAuth (visitantes veem o "Em breve")
```

Quando funcional (fase 2b), mudar para `meta: { requiresAuth: true }` sem quebrar a estrutura.

---

## Considerações Técnicas para Expansão Futura

### State Management (fase 2b)
`stores/community.js` vai seguir o padrão existente (`courses.js`): `defineStore` com Composition API, normalização de paginação `Array.isArray(data) ? data : (data.results ?? [])`, estados `loading`/`error`.

### Paginação (fase 2b)
Feed com scroll infinito via `IntersectionObserver` encapsulado em `useCommunityFeed.js`. `PostFeed` já vai ser construído para aceitar essa expansão sem refactor.

### Otimistic Updates (fase 2c)
Reações e curtidas incrementam localmente no store e revertem em caso de erro de API — padrão que elimina latência percebida.

### Real-time (fase 2c, opcional)
Se o backend implementar WebSocket ou SSE, `useCommunityFeed` pode adicionar subscription sem alterar os componentes de UI.

---

## Roadmap Detalhado

### Fase 2a — Placeholder (esta iteração)

- [x] Documento de planejamento
- [ ] Rota `/community` no router
- [ ] Link na navbar desktop e mobile (`AppHeader`)
- [ ] Link no rodapé (`AppFooter`)
- [ ] `CommunityView` com layout estrutural
- [ ] `CommunityHero` com badge "Em breve"
- [ ] `PostComposerLocked` visual
- [ ] `PostCardPreview` com dados mock
- [ ] `ReactionBarPreview` visual
- [ ] `ComingSoonOverlay` glassmorphism

---

### Fase 2b — Posts básicos (backend necessário)

**Endpoints a implementar no Django:**
- `GET /api/community/posts/` — lista paginada
- `POST /api/community/posts/` — criar post
- `GET /api/community/posts/:id/` — detalhe

**Frontend:**
- [ ] `communityService.js`
- [ ] `stores/community.js`
- [ ] `PostComposer.vue` real (VeeValidate + Yup)
- [ ] `PostCard.vue` com dados reais
- [ ] `PostFeed.vue` com paginação
- [ ] Remover `ComingSoonOverlay`, ativar interações
- [ ] Rota passa a ser `requiresAuth: true`

---

### Fase 2c — Social completo (backend necessário)

**Endpoints a implementar no Django:**
- `POST /api/community/posts/:id/comments/`
- `POST /api/community/posts/:id/reactions/`
- `DELETE /api/community/posts/:id/reactions/`

**Frontend:**
- [ ] `CommentList.vue` + `CommentComposer.vue`
- [ ] `ReactionBar.vue` com estado otimista
- [ ] `PostDetailModal.vue`
- [ ] Notificações de engajamento (se backend suportar)

---

## Decisões em Aberto (resolver antes da Fase 2b)

| # | Decisão | Impacto |
|---|---|---|
| D1 | Estrutura do JSON de `GET /api/community/posts/` | Define contrato dos componentes |
| D2 | Posts têm categorias/tags fixas ou livres? | Afeta o composer e filtros do feed |
| D3 | Moderação de conteúdo — automática ou manual? | Afeta fluxo de criação de post |
| D4 | Upload de imagens em posts na fase 2b ou 2c? | Afeta `PostComposer` |
