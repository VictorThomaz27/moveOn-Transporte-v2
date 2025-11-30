# MoveOn Transportes

Sistema de gerenciamento de entregas desenvolvido para controlar viagens, clientes, motoristas e veículos.

## 📋 Sobre o Projeto

Este é um sistema web simples para gerenciar as operações de uma empresa de transporte. O projeto foi desenvolvido utilizando tecnologias básicas da web.

## 🚀 Tecnologias Utilizadas

- **HTML5** - Estrutura das páginas
- **CSS3** - Estilização
- **JavaScript** - Interatividade e requisições Ajax
- **PHP** - Backend e API REST
- **JSON** - Armazenamento de dados

## 📁 Estrutura do Projeto

```
moveOn-Transporte-v2/
│
├── index.html              # Página inicial
├── api/                    # APIs PHP para backend
│   ├── clientes.php
│   ├── motoristas.php
│   ├── veiculos.php
│   └── entregas.php
│
├── data/                   # Armazenamento de dados em JSON
│   ├── clientes.json
│   ├── motoristas.json
│   ├── veiculos.json
│   └── entregas.json
│
└── public/
    ├── components/
    │   └── navbar.html     # Componente de navegação
    ├── css/
    │   └── style.css       # Estilos globais
    ├── js/                 # Scripts JavaScript
    │   ├── clientes.js
    │   ├── motoristas.js
    │   ├── veiculos.js
    │   └── entregas.js
    └── pages/              # Páginas do sistema
        ├── clientes/
        ├── motoristas/
        ├── veiculos/
        └── entregas/
```

## 🔧 Funcionalidades

### 👥 Clientes
- Cadastrar clientes com nome, email e telefone
- Listar todos os clientes
- Editar informações de clientes
- Excluir clientes

### 🚗 Veículos
- Cadastrar veículos com marca, modelo, cor e placa
- Listar todos os veículos
- Editar informações de veículos
- Excluir veículos

### 👨‍✈️ Motoristas
- Cadastrar motoristas com nome, CNH, telefone e veículo
- Listar todos os motoristas
- Editar informações de motoristas
- Excluir motoristas

### 📦 Entregas
- Cadastrar entregas com:
  - Cliente
  - Motorista
  - Endereço de origem (rua, número, cidade, estado, CEP)
  - Endereço de destino (rua, número, cidade, estado, CEP)
  - Preço
- Listar todas as entregas
- Editar informações de entregas
- Excluir entregas

## 💻 Como Executar

1. **Instale o PHP** (versão 7.4 ou superior)

2. **Clone ou baixe o projeto**

3. **Navegue até a pasta do projeto**
   ```bash
   cd moveOn-Transporte-v2
   ```

4. **Inicie o servidor PHP**
   ```bash
   php -S localhost:8000
   ```

5. **Acesse no navegador**
   ```
   http://localhost:8000
   ```

## 📝 Como Usar

1. **Primeiro cadastre os veículos** - necessário para cadastrar motoristas
2. **Cadastre os motoristas** - associe cada motorista a um veículo
3. **Cadastre os clientes** - dados dos clientes
4. **Registre as entregas** - selecione cliente e motorista, preencha os endereços e o preço

## 🔄 API Endpoints

Todos os endpoints suportam operações CRUD:

- **GET** - Listar todos os registros
- **POST** - Criar novo registro
- **PUT** - Atualizar registro existente
- **DELETE** - Excluir registro

### Endpoints disponíveis:
- `/api/clientes.php`
- `/api/motoristas.php`
- `/api/veiculos.php`
- `/api/entregas.php`

## 📦 Armazenamento de Dados

Os dados são armazenados em arquivos JSON na pasta `data/`. Cada módulo possui seu próprio arquivo:

- `clientes.json` - Dados dos clientes
- `motoristas.json` - Dados dos motoristas
- `veiculos.json` - Dados dos veículos
- `entregas.json` - Dados das entregas

## 🎨 Interface

O sistema possui uma interface simples e intuitiva com:
- Navegação por barra de menu
- Tabelas para visualização de dados
- Modais para criar e editar registros
- Mensagens de confirmação para ações
- Design responsivo

## 👨‍💻 Autor

Projeto desenvolvido como trabalho acadêmico - 2º Semestre de Análise e Desenvolvimento de Sistemas

## 📄 Licença

Este projeto é de uso educacional.
