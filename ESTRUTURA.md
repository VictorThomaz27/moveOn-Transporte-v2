# 📦 MoveOn Transportes - Estrutura Completa do Projeto

```
moveOn-Transporte-v2/
│
├── 📄 index.html                    # Página inicial com cards de acesso
├── 📄 README.md                     # Documentação completa do projeto
├── 📄 INICIAR.md                    # Guia de inicialização
├── 📄 DADOS_EXEMPLO.md              # Dados para testes
├── 📄 config.json                   # Configurações e estrutura de dados
├── 📄 iniciar.bat                   # Script para iniciar servidor (Windows)
├── 📄 .htaccess                     # Configurações Apache
│
├── 📁 api/                          # APIs REST em PHP
│   ├── 📄 clientes.php             # CRUD de clientes
│   ├── 📄 motoristas.php           # CRUD de motoristas
│   ├── 📄 veiculos.php             # CRUD de veículos
│   └── 📄 entregas.php             # CRUD de entregas
│
├── 📁 data/                         # Armazenamento JSON
│   ├── 📄 clientes.json            # Dados dos clientes
│   ├── 📄 motoristas.json          # Dados dos motoristas
│   ├── 📄 veiculos.json            # Dados dos veículos
│   └── 📄 entregas.json            # Dados das entregas
│
└── 📁 public/                       # Arquivos públicos
    │
    ├── 📁 components/               # Componentes reutilizáveis
    │   └── 📄 navbar.html          # Barra de navegação
    │
    ├── 📁 css/                      # Estilos
    │   └── 📄 style.css            # CSS global do projeto
    │
    ├── 📁 images/                   # Imagens
    │   └── 📄 logo.jpeg            # Logo da empresa
    │
    ├── 📁 js/                       # Scripts JavaScript
    │   ├── 📄 clientes.js          # Lógica de clientes
    │   ├── 📄 motoristas.js        # Lógica de motoristas
    │   ├── 📄 veiculos.js          # Lógica de veículos
    │   └── 📄 entregas.js          # Lógica de entregas
    │
    └── 📁 pages/                    # Páginas do sistema
        │
        ├── 📁 clientes/
        │   ├── 📄 clientes.html    # Página de gerenciamento
        │   └── 📄 criar.html       # (Reservado para futuro)
        │
        ├── 📁 motoristas/
        │   ├── 📄 motoristas.html  # Página de gerenciamento
        │   └── 📄 criar.html       # (Reservado para futuro)
        │
        ├── 📁 veiculos/
        │   ├── 📄 veiculos.html    # Página de gerenciamento
        │   └── 📄 criar.html       # (Reservado para futuro)
        │
        └── 📁 entregas/
            ├── 📄 entregas.html    # Página de gerenciamento
            └── 📄 criar.html       # (Reservado para futuro)
```

## 🎯 Fluxo de Dados

```
┌─────────────┐
│   USUÁRIO   │
└──────┬──────┘
       │
       ↓
┌─────────────────┐
│  HTML (View)    │  ← Páginas de interface
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│ JavaScript      │  ← Requisições Ajax
│ (Controller)    │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  PHP API        │  ← Processa requisições
│  (Backend)      │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  JSON Files     │  ← Armazena dados
│  (Data)         │
└─────────────────┘
```

## 🔄 Relacionamentos

```
┌──────────┐
│ VEÍCULOS │
└────┬─────┘
     │
     │ 1:1
     ↓
┌─────────────┐        ┌──────────┐
│ MOTORISTAS  │───────→│ ENTREGAS │
└─────────────┘   N:1  └────┬─────┘
                            │
                       N:1  │
                            ↓
                       ┌──────────┐
                       │ CLIENTES │
                       └──────────┘
```

## 📊 Módulos do Sistema

### 1. 🏠 Home (index.html)
- Página inicial com boas-vindas
- Cards de acesso rápido aos módulos
- Design responsivo e intuitivo

### 2. 👥 Clientes
- **HTML**: `public/pages/clientes/clientes.html`
- **JS**: `public/js/clientes.js`
- **API**: `api/clientes.php`
- **Data**: `data/clientes.json`
- **Campos**: ID, Nome, Email, Telefone

### 3. 🚗 Veículos
- **HTML**: `public/pages/veiculos/veiculos.html`
- **JS**: `public/js/veiculos.js`
- **API**: `api/veiculos.php`
- **Data**: `data/veiculos.json`
- **Campos**: ID, Marca, Modelo, Cor, Placa

### 4. 👨‍✈️ Motoristas
- **HTML**: `public/pages/motoristas/motoristas.html`
- **JS**: `public/js/motoristas.js`
- **API**: `api/motoristas.php`
- **Data**: `data/motoristas.json`
- **Campos**: ID, Nome, CNH, Telefone, Veículo ID
- **Dependência**: Requer veículos cadastrados

### 5. 📦 Entregas
- **HTML**: `public/pages/entregas/entregas.html`
- **JS**: `public/js/entregas.js`
- **API**: `api/entregas.php`
- **Data**: `data/entregas.json`
- **Campos**: ID, Cliente ID, Motorista ID, Endereços, Preço
- **Dependência**: Requer clientes e motoristas cadastrados

## 🛠️ Tecnologias por Camada

### Frontend
- **HTML5**: Estrutura semântica
- **CSS3**: Estilização moderna e responsiva
- **JavaScript**: Interatividade e Ajax

### Backend
- **PHP 7.4+**: Processamento server-side
- **REST API**: Endpoints para CRUD

### Dados
- **JSON**: Persistência simples de dados
- **Estrutura de arquivos**: Sistema de armazenamento

## ✨ Funcionalidades Implementadas

✅ CRUD completo (Create, Read, Update, Delete)
✅ Validação de formulários
✅ Mensagens de feedback
✅ Interface responsiva
✅ Componentes reutilizáveis
✅ Relacionamento entre entidades
✅ API REST padronizada
✅ Armazenamento persistente

## 🚀 Próximas Melhorias (Sugestões)

- 🔐 Sistema de autenticação
- 📊 Dashboard com estatísticas
- 🔍 Busca e filtros avançados
- 📱 Aplicativo mobile
- 📧 Notificações por email
- 📄 Geração de relatórios em PDF
- 🗺️ Integração com mapas
- 💰 Sistema de pagamentos

---

**Versão**: 1.0
**Desenvolvido em**: Novembro 2025
**Finalidade**: Projeto Acadêmico - 2º Semestre ADS
