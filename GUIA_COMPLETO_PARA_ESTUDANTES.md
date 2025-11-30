# 📚 Guia Completo do Sistema MoveOn Transportes

## Para Estudantes de Análise e Desenvolvimento de Sistemas

Este documento explica **passo a passo** como funciona o sistema MoveOn Transportes, desde as tecnologias utilizadas até a implementação completa. Ideal para você que está aprendendo a desenvolver sistemas web.

---

## 📋 Índice

1. [Visão Geral do Sistema](#visão-geral-do-sistema)
2. [Tecnologias Utilizadas](#tecnologias-utilizadas)
3. [Arquitetura do Sistema](#arquitetura-do-sistema)
4. [Estrutura de Pastas](#estrutura-de-pastas)
5. [Como Funciona Cada Camada](#como-funciona-cada-camada)
6. [Fluxo de Dados Completo](#fluxo-de-dados-completo)
7. [Implementação Passo a Passo](#implementação-passo-a-passo)
8. [Funcionalidades Detalhadas](#funcionalidades-detalhadas)
9. [Conceitos Importantes](#conceitos-importantes)
10. [Exercícios Práticos](#exercícios-práticos)

---

## 🎯 Visão Geral do Sistema

### O que é o MoveOn Transportes?

É um **sistema web para gerenciar entregas** de uma empresa de transporte. Permite controlar:
- 👥 **Clientes** que solicitam entregas
- 🚗 **Veículos** da frota
- 👨‍✈️ **Motoristas** que fazem as entregas
- 📦 **Entregas** realizadas

### Por que este sistema é bom para aprender?

✅ Usa tecnologias básicas (HTML, CSS, JavaScript, PHP)
✅ Implementa CRUD completo (Create, Read, Update, Delete)
✅ Mostra relacionamento entre tabelas
✅ Usa conceitos de API REST
✅ É um projeto real e funcional

---

## 🛠️ Tecnologias Utilizadas

### Frontend (O que o usuário vê)

#### 1. **HTML5** 📄
- **O que é**: Linguagem de marcação que estrutura as páginas
- **Como usamos**: Criamos formulários, tabelas, modais
- **Exemplo**:
```html
<div class="card">
    <h1>Clientes</h1>
    <button onclick="abrirModal()">Novo Cliente</button>
</div>
```

#### 2. **CSS3** 🎨
- **O que é**: Linguagem de estilização que deixa bonito
- **Como usamos**: Cores, espaçamentos, layouts responsivos
- **Exemplo**:
```css
.btn-primary {
    background-color: #3498db;
    color: white;
    padding: 0.5rem 1rem;
}
```

#### 3. **JavaScript** ⚡
- **O que é**: Linguagem que torna a página interativa
- **Como usamos**: Requisições Ajax, validações, manipulação do DOM
- **Exemplo**:
```javascript
function carregarClientes() {
    fetch('/api/clientes.php')
        .then(response => response.json())
        .then(data => mostrarNaTabela(data));
}
```

### Backend (O que o usuário não vê)

#### 4. **PHP** 🐘
- **O que é**: Linguagem de programação do servidor
- **Como usamos**: Processar dados, ler/salvar arquivos JSON
- **Exemplo**:
```php
$clientes = json_decode(file_get_contents('clientes.json'), true);
echo json_encode($clientes);
```

### Armazenamento de Dados

#### 5. **JSON** 📦
- **O que é**: Formato de arquivo para guardar dados
- **Como usamos**: Substitui um banco de dados (para simplificar)
- **Exemplo**:
```json
[
    {
        "id": 1,
        "nome": "João Silva",
        "email": "joao@email.com"
    }
]
```

---

## 🏗️ Arquitetura do Sistema

### Modelo MVC Simplificado

O sistema segue uma arquitetura **parecida com MVC** (Model-View-Controller):

```
┌─────────────────────────────────────────┐
│           USUÁRIO (Navegador)           │
└────────────────┬────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────┐
│     VIEW (HTML + CSS)                   │
│  - Página de Clientes                   │
│  - Formulários                          │
│  - Tabelas                              │
└────────────────┬────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────┐
│     CONTROLLER (JavaScript)             │
│  - clientes.js                          │
│  - Captura eventos                      │
│  - Faz requisições Ajax                 │
└────────────────┬────────────────────────┘
                 │
                 ↓ HTTP Request (Ajax)
┌─────────────────────────────────────────┐
│     API (PHP)                           │
│  - clientes.php                         │
│  - Processa GET, POST, PUT, DELETE      │
└────────────────┬────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────┐
│     MODEL (JSON Files)                  │
│  - clientes.json                        │
│  - Armazena os dados                    │
└─────────────────────────────────────────┘
```

### Por que esta arquitetura?

- **Separação de responsabilidades**: Cada parte tem sua função
- **Fácil manutenção**: Se precisa mudar algo, sabe onde está
- **Reutilização**: O mesmo HTML pode usar diferentes APIs

---

## 📁 Estrutura de Pastas

```
moveOn-Transporte-v2/
│
├── index.html              ← Página inicial
│
├── api/                    ← Backend (PHP)
│   ├── clientes.php       ← API de clientes
│   ├── veiculos.php       ← API de veículos
│   ├── motoristas.php     ← API de motoristas
│   └── entregas.php       ← API de entregas
│
├── data/                   ← Banco de dados (JSON)
│   ├── clientes.json
│   ├── veiculos.json
│   ├── motoristas.json
│   └── entregas.json
│
└── public/                 ← Arquivos públicos
    │
    ├── components/         ← Componentes reutilizáveis
    │   └── navbar.html    ← Menu de navegação
    │
    ├── css/               ← Estilos
    │   └── style.css
    │
    ├── js/                ← Lógica JavaScript
    │   ├── clientes.js
    │   ├── veiculos.js
    │   ├── motoristas.js
    │   └── entregas.js
    │
    └── pages/             ← Páginas HTML
        ├── clientes/
        │   └── clientes.html
        ├── veiculos/
        │   └── veiculos.html
        ├── motoristas/
        │   └── motoristas.html
        └── entregas/
            └── entregas.html
```

### Por que organizar assim?

✅ **api/**: Tudo relacionado ao backend fica junto
✅ **data/**: Dados separados do código
✅ **public/**: Tudo que o navegador acessa
✅ **Separação por funcionalidade**: Cada módulo tem seus arquivos

---

## 🔄 Como Funciona Cada Camada

### 1️⃣ CAMADA DE APRESENTAÇÃO (HTML)

**Arquivo**: `public/pages/clientes/clientes.html`

**Responsabilidade**: Mostrar a interface para o usuário

**O que tem**:
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <title>Clientes - MoveOn</title>
    <link rel="stylesheet" href="../../css/style.css">
</head>
<body>
    <!-- Navegação -->
    <div id="navbar-container"></div>
    
    <!-- Conteúdo Principal -->
    <div class="container">
        <div class="card">
            <h1>Gerenciar Clientes</h1>
            <button onclick="abrirModal()">+ Novo Cliente</button>
            
            <!-- Tabela para listar clientes -->
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody id="tabelaClientes">
                    <!-- JavaScript preenche aqui -->
                </tbody>
            </table>
        </div>
    </div>
    
    <!-- Modal (janela flutuante) para formulário -->
    <div id="modalCliente" class="modal">
        <div class="modal-content">
            <h2>Novo Cliente</h2>
            <form id="formCliente" onsubmit="salvarCliente(event)">
                <input type="text" id="nome" required>
                <input type="email" id="email" required>
                <input type="text" id="telefone" required>
                <button type="submit">Salvar</button>
            </form>
        </div>
    </div>
    
    <script src="../../js/clientes.js"></script>
</body>
</html>
```

**Conceitos importantes**:
- `id=""`: Identificador único para JavaScript encontrar o elemento
- `onclick=""`: Chama uma função JavaScript ao clicar
- `onsubmit=""`: Chama uma função ao enviar o formulário
- `<tbody id="tabelaClientes">`: JavaScript vai preencher dinamicamente

---

### 2️⃣ CAMADA DE ESTILIZAÇÃO (CSS)

**Arquivo**: `public/css/style.css`

**Responsabilidade**: Deixar bonito e organizado

**Principais conceitos**:

```css
/* Reset básico */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Container centralizado */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

/* Card (caixa branca) */
.card {
    background: white;
    border-radius: 8px;
    padding: 2rem;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

/* Botão primário */
.btn-primary {
    background-color: #3498db;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

/* Efeito hover (quando passa o mouse) */
.btn-primary:hover {
    background-color: #2980b9;
}

/* Modal (janela flutuante) */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    display: none; /* Escondido por padrão */
}

/* Conteúdo do modal */
.modal-content {
    background: white;
    margin: 2rem auto;
    padding: 2rem;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto; /* Scroll se necessário */
}
```

**Por que cada propriedade**:
- `max-width`: Limita largura em telas grandes
- `margin: 0 auto`: Centraliza horizontalmente
- `padding`: Espaçamento interno
- `border-radius`: Bordas arredondadas
- `box-shadow`: Sombra para dar profundidade
- `position: fixed`: Fica fixo na tela (modal)
- `overflow-y: auto`: Scroll vertical se necessário

---

### 3️⃣ CAMADA DE LÓGICA (JavaScript)

**Arquivo**: `public/js/clientes.js`

**Responsabilidade**: Interação, validação, requisições Ajax

**Estrutura completa explicada**:

```javascript
// ============================================
// 1. CONFIGURAÇÃO INICIAL
// ============================================
const API_URL = '/api/clientes.php';

// Quando a página carregar, executa esta função
document.addEventListener('DOMContentLoaded', carregarClientes);

// ============================================
// 2. FUNÇÃO PARA CARREGAR DADOS (READ)
// ============================================
function carregarClientes() {
    // Faz requisição GET para API
    fetch(API_URL)
        .then(response => response.json()) // Converte resposta para JSON
        .then(data => {
            // Pega o elemento tbody da tabela
            const tbody = document.getElementById('tabelaClientes');
            
            // Se não tem clientes, mostra mensagem
            if (data.length === 0) {
                tbody.innerHTML = '<tr><td colspan="5">Nenhum cliente cadastrado</td></tr>';
                return;
            }
            
            // Limpa a tabela
            tbody.innerHTML = '';
            
            // Para cada cliente, cria uma linha
            data.forEach(cliente => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${cliente.id}</td>
                    <td>${cliente.nome}</td>
                    <td>${cliente.email}</td>
                    <td>${cliente.telefone}</td>
                    <td>
                        <button onclick="editarCliente(${cliente.id})">Editar</button>
                        <button onclick="deletarCliente(${cliente.id})">Excluir</button>
                    </td>
                `;
                tbody.appendChild(tr); // Adiciona linha na tabela
            });
        })
        .catch(error => {
            console.error('Erro:', error);
            mostrarMensagem('Erro ao carregar clientes', 'error');
        });
}

// ============================================
// 3. FUNÇÃO PARA ABRIR MODAL
// ============================================
function abrirModal(clienteId = null) {
    const modal = document.getElementById('modalCliente');
    const form = document.getElementById('formCliente');
    
    form.reset(); // Limpa o formulário
    
    if (clienteId) {
        // Modo edição: busca dados do cliente
        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                const cliente = data.find(c => c.id === clienteId);
                if (cliente) {
                    // Preenche os campos com dados atuais
                    document.getElementById('clienteId').value = cliente.id;
                    document.getElementById('nome').value = cliente.nome;
                    document.getElementById('email').value = cliente.email;
                    document.getElementById('telefone').value = cliente.telefone;
                }
            });
    }
    
    modal.style.display = 'block'; // Mostra o modal
}

// ============================================
// 4. FUNÇÃO PARA FECHAR MODAL
// ============================================
function fecharModal() {
    const modal = document.getElementById('modalCliente');
    modal.style.display = 'none'; // Esconde o modal
}

// ============================================
// 5. FUNÇÃO PARA SALVAR (CREATE / UPDATE)
// ============================================
function salvarCliente(event) {
    event.preventDefault(); // Previne comportamento padrão do form
    
    const clienteId = document.getElementById('clienteId').value;
    
    // Pega valores dos campos
    const cliente = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value
    };
    
    // Se tem ID, é edição (PUT), senão é criação (POST)
    if (clienteId) {
        cliente.id = parseInt(clienteId);
    }
    
    const method = clienteId ? 'PUT' : 'POST';
    
    // Envia para API
    fetch(API_URL, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cliente) // Converte para JSON
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            mostrarMensagem('Cliente salvo com sucesso!', 'success');
            fecharModal();
            carregarClientes(); // Recarrega lista
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        mostrarMensagem('Erro ao salvar cliente', 'error');
    });
}

// ============================================
// 6. FUNÇÃO PARA EDITAR
// ============================================
function editarCliente(id) {
    abrirModal(id); // Abre modal passando o ID
}

// ============================================
// 7. FUNÇÃO PARA DELETAR (DELETE)
// ============================================
function deletarCliente(id) {
    // Pede confirmação
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
        fetch(API_URL, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                mostrarMensagem('Cliente excluído com sucesso!', 'success');
                carregarClientes(); // Recarrega lista
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            mostrarMensagem('Erro ao excluir cliente', 'error');
        });
    }
}

// ============================================
// 8. FUNÇÃO PARA MOSTRAR MENSAGENS
// ============================================
function mostrarMensagem(texto, tipo) {
    const mensagem = document.getElementById('mensagem');
    mensagem.className = tipo === 'success' ? 'alert alert-success' : 'alert alert-error';
    mensagem.textContent = texto;
    mensagem.style.display = 'block';
    
    // Remove mensagem após 3 segundos
    setTimeout(() => {
        mensagem.style.display = 'none';
    }, 3000);
}

// ============================================
// 9. FECHAR MODAL AO CLICAR FORA
// ============================================
window.onclick = function(event) {
    const modal = document.getElementById('modalCliente');
    if (event.target === modal) {
        fecharModal();
    }
}
```

**Conceitos JavaScript importantes**:

1. **fetch()**: Faz requisições HTTP (substitui XMLHttpRequest)
2. **Promises (.then())**: Trabalha com operações assíncronas
3. **JSON.stringify()**: Converte objeto JavaScript em texto JSON
4. **JSON.parse()**: Converte texto JSON em objeto JavaScript
5. **document.getElementById()**: Busca elemento HTML pelo ID
6. **createElement()**: Cria novo elemento HTML
7. **appendChild()**: Adiciona elemento filho
8. **addEventListener()**: Escuta eventos (click, submit, etc)

---

### 4️⃣ CAMADA DE API (PHP)

**Arquivo**: `api/clientes.php`

**Responsabilidade**: Processar requisições e manipular dados

**Código completo explicado**:

```php
<?php
// ============================================
// 1. HEADERS (Cabeçalhos HTTP)
// ============================================
header('Content-Type: application/json'); // Resposta será JSON
header('Access-Control-Allow-Origin: *'); // Permite requisições de qualquer origem
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE'); // Métodos permitidos
header('Access-Control-Allow-Headers: Content-Type'); // Headers permitidos

// ============================================
// 2. CONFIGURAÇÃO DO ARQUIVO DE DADOS
// ============================================
// __DIR__ retorna o diretório do arquivo atual
$dataDir = dirname(__DIR__) . '/data'; // Vai para pasta pai e entra em /data
$dataFile = $dataDir . '/clientes.json'; // Caminho completo do arquivo

// Cria diretório se não existir
if (!is_dir($dataDir)) {
    mkdir($dataDir, 0777, true); // 0777 = permissões totais, true = recursivo
}

// ============================================
// 3. FUNÇÕES AUXILIARES
// ============================================

// Função para ler dados do arquivo
function readData() {
    global $dataFile; // Acessa variável global
    
    // Se arquivo não existe, cria vazio
    if (!file_exists($dataFile)) {
        file_put_contents($dataFile, '[]'); // Array vazio em JSON
    }
    
    // Lê arquivo e converte JSON para array PHP
    $json = file_get_contents($dataFile);
    return json_decode($json, true); // true = retorna array associativo
}

// Função para salvar dados no arquivo
function saveData($data) {
    global $dataFile;
    
    // Converte array PHP para JSON e salva
    // JSON_PRETTY_PRINT deixa formatado (bonito)
    file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT));
}

// ============================================
// 4. ROTEAMENTO (Qual método HTTP?)
// ============================================
$method = $_SERVER['REQUEST_METHOD']; // GET, POST, PUT ou DELETE

switch ($method) {
    
    // ========================================
    // GET - LISTAR TODOS OS CLIENTES
    // ========================================
    case 'GET':
        $clientes = readData();
        echo json_encode($clientes); // Retorna JSON
        break;
    
    // ========================================
    // POST - CRIAR NOVO CLIENTE
    // ========================================
    case 'POST':
        // Lê dados enviados no corpo da requisição
        $input = json_decode(file_get_contents('php://input'), true);
        
        // Carrega clientes existentes
        $clientes = readData();
        
        // Cria novo cliente com ID automático
        $novoCliente = [
            // Se tem clientes, pega maior ID + 1, senão usa 1
            'id' => count($clientes) > 0 ? max(array_column($clientes, 'id')) + 1 : 1,
            'nome' => $input['nome'],
            'email' => $input['email'],
            'telefone' => $input['telefone']
        ];
        
        // Adiciona ao array
        $clientes[] = $novoCliente;
        
        // Salva no arquivo
        saveData($clientes);
        
        // Retorna sucesso e dados criados
        echo json_encode(['success' => true, 'data' => $novoCliente]);
        break;
    
    // ========================================
    // PUT - ATUALIZAR CLIENTE EXISTENTE
    // ========================================
    case 'PUT':
        $input = json_decode(file_get_contents('php://input'), true);
        $clientes = readData();
        
        // Procura cliente pelo ID e atualiza
        foreach ($clientes as $key => $cliente) {
            if ($cliente['id'] == $input['id']) {
                $clientes[$key] = [
                    'id' => $input['id'],
                    'nome' => $input['nome'],
                    'email' => $input['email'],
                    'telefone' => $input['telefone']
                ];
                break;
            }
        }
        
        saveData($clientes);
        echo json_encode(['success' => true]);
        break;
    
    // ========================================
    // DELETE - EXCLUIR CLIENTE
    // ========================================
    case 'DELETE':
        $input = json_decode(file_get_contents('php://input'), true);
        $clientes = readData();
        
        // Filtra removendo cliente com ID especificado
        $clientes = array_filter($clientes, function($cliente) use ($input) {
            return $cliente['id'] != $input['id'];
        });
        
        // array_values reindexaarray (remove gaps nos índices)
        saveData(array_values($clientes));
        echo json_encode(['success' => true]);
        break;
}
?>
```

**Conceitos PHP importantes**:

1. **$_SERVER['REQUEST_METHOD']**: Descobre qual método HTTP (GET, POST, PUT, DELETE)
2. **file_get_contents('php://input')**: Lê corpo da requisição
3. **json_decode($json, true)**: Converte JSON para array PHP
4. **json_encode($array)**: Converte array PHP para JSON
5. **array_column()**: Extrai coluna de array multidimensional
6. **max()**: Retorna maior valor
7. **array_filter()**: Filtra array baseado em função
8. **file_put_contents()**: Salva conteúdo em arquivo
9. **dirname(__DIR__)**: Retorna diretório pai

---

### 5️⃣ CAMADA DE DADOS (JSON)

**Arquivo**: `data/clientes.json`

**Responsabilidade**: Armazenar dados persistentes

**Estrutura**:

```json
[
    {
        "id": 1,
        "nome": "Maria Silva",
        "email": "maria@email.com",
        "telefone": "(11) 98765-4321"
    },
    {
        "id": 2,
        "nome": "João Santos",
        "email": "joao@email.com",
        "telefone": "(11) 97654-3210"
    }
]
```

**Por que JSON e não banco de dados?**

✅ Mais simples para aprender
✅ Não precisa instalar MySQL/PostgreSQL
✅ Fácil de visualizar e editar
✅ Bom para projetos pequenos

**Desvantagens do JSON**:
❌ Não é adequado para muitos dados
❌ Não tem transações (segurança)
❌ Problemas com acessos simultâneos
❌ Sem consultas complexas

**Para projetos reais**: Use MySQL, PostgreSQL, MongoDB, etc.

---

## 🔄 Fluxo de Dados Completo

### Exemplo: Cadastrar um novo cliente

**Passo a passo detalhado**:

```
1. USUÁRIO PREENCHE FORMULÁRIO
   ↓
   Nome: João Silva
   Email: joao@email.com
   Telefone: (11) 99999-9999
   [Clica em "Salvar"]

2. JAVASCRIPT CAPTURA O EVENTO
   ↓
   function salvarCliente(event) {
       event.preventDefault(); // Para envio padrão
       
       const cliente = {
           nome: "João Silva",
           email: "joao@email.com",
           telefone: "(11) 99999-9999"
       };

3. JAVASCRIPT FAZ REQUISIÇÃO AJAX
   ↓
   fetch('/api/clientes.php', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(cliente)
   })

4. REQUISIÇÃO CHEGA NO PHP
   ↓
   POST /api/clientes.php HTTP/1.1
   Content-Type: application/json
   
   {"nome":"João Silva","email":"joao@email.com","telefone":"(11) 99999-9999"}

5. PHP PROCESSA
   ↓
   $method = 'POST'; // Identifica método
   $input = json_decode(...); // Decodifica JSON
   $clientes = readData(); // Lê arquivo JSON
   
   $novoCliente = [
       'id' => 3,
       'nome' => 'João Silva',
       'email' => 'joao@email.com',
       'telefone' => '(11) 99999-9999'
   ];
   
   $clientes[] = $novoCliente; // Adiciona no array
   saveData($clientes); // Salva no arquivo

6. ARQUIVO JSON É ATUALIZADO
   ↓
   data/clientes.json agora tem:
   [
       {"id": 1, "nome": "Maria", ...},
       {"id": 2, "nome": "Pedro", ...},
       {"id": 3, "nome": "João Silva", ...}  ← NOVO
   ]

7. PHP RETORNA RESPOSTA
   ↓
   HTTP/1.1 200 OK
   Content-Type: application/json
   
   {"success": true, "data": {"id": 3, "nome": "João Silva", ...}}

8. JAVASCRIPT RECEBE RESPOSTA
   ↓
   .then(response => response.json())
   .then(data => {
       if (data.success) {
           mostrarMensagem('Cliente salvo!', 'success');
           fecharModal();
           carregarClientes(); // Recarrega tabela
       }
   })

9. TABELA É ATUALIZADA
   ↓
   Nova requisição GET carrega todos os clientes
   Tabela é reconstruída com novo cliente incluído

10. USUÁRIO VÊ O RESULTADO
    ↓
    ✅ Mensagem "Cliente salvo com sucesso!"
    ✅ Modal fecha
    ✅ Tabela atualizada com novo cliente
```

---

## 📝 Implementação Passo a Passo

### Como criar um sistema similar do zero

#### **PASSO 1: Estrutura de Pastas**

```bash
# Crie as pastas
mkdir meu-sistema
cd meu-sistema
mkdir api data public
mkdir public/css public/js public/pages public/components
mkdir public/pages/clientes
```

#### **PASSO 2: Criar o CSS Global**

Crie `public/css/style.css`:

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
}

.container {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 20px;
}

.card {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.btn {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.btn-primary {
    background-color: #3498db;
    color: white;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
}

th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

.modal {
    display: none;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
}

.modal-content {
    background-color: white;
    margin: 2rem auto;
    padding: 2rem;
    max-width: 600px;
    border-radius: 8px;
}

.form-group {
    margin-bottom: 1rem;
}

.form-control {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
}
```

#### **PASSO 3: Criar Arquivo JSON**

Crie `data/clientes.json`:

```json
[]
```

#### **PASSO 4: Criar API PHP**

Crie `api/clientes.php`:

```php
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

$dataDir = dirname(__DIR__) . '/data';
$dataFile = $dataDir . '/clientes.json';

if (!is_dir($dataDir)) {
    mkdir($dataDir, 0777, true);
}

function readData() {
    global $dataFile;
    if (!file_exists($dataFile)) {
        file_put_contents($dataFile, '[]');
    }
    return json_decode(file_get_contents($dataFile), true);
}

function saveData($data) {
    global $dataFile;
    file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT));
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        echo json_encode(readData());
        break;
    
    case 'POST':
        $input = json_decode(file_get_contents('php://input'), true);
        $clientes = readData();
        $novoCliente = [
            'id' => count($clientes) > 0 ? max(array_column($clientes, 'id')) + 1 : 1,
            'nome' => $input['nome'],
            'email' => $input['email']
        ];
        $clientes[] = $novoCliente;
        saveData($clientes);
        echo json_encode(['success' => true, 'data' => $novoCliente]);
        break;
    
    case 'PUT':
        $input = json_decode(file_get_contents('php://input'), true);
        $clientes = readData();
        foreach ($clientes as $key => $cliente) {
            if ($cliente['id'] == $input['id']) {
                $clientes[$key] = $input;
                break;
            }
        }
        saveData($clientes);
        echo json_encode(['success' => true]);
        break;
    
    case 'DELETE':
        $input = json_decode(file_get_contents('php://input'), true);
        $clientes = readData();
        $clientes = array_filter($clientes, function($c) use ($input) {
            return $c['id'] != $input['id'];
        });
        saveData(array_values($clientes));
        echo json_encode(['success' => true]);
        break;
}
?>
```

#### **PASSO 5: Criar HTML**

Crie `public/pages/clientes/clientes.html`:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Clientes</title>
    <link rel="stylesheet" href="../../css/style.css">
</head>
<body>
    <div class="container">
        <div class="card">
            <h1>Clientes</h1>
            <button class="btn btn-primary" onclick="abrirModal()">Novo Cliente</button>
            
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody id="tabelaClientes"></tbody>
            </table>
        </div>
    </div>
    
    <div id="modalCliente" class="modal">
        <div class="modal-content">
            <h2>Novo Cliente</h2>
            <form id="formCliente" onsubmit="salvarCliente(event)">
                <input type="hidden" id="clienteId">
                <div class="form-group">
                    <input type="text" id="nome" class="form-control" placeholder="Nome" required>
                </div>
                <div class="form-group">
                    <input type="email" id="email" class="form-control" placeholder="Email" required>
                </div>
                <button type="submit" class="btn btn-primary">Salvar</button>
                <button type="button" class="btn" onclick="fecharModal()">Cancelar</button>
            </form>
        </div>
    </div>
    
    <script src="../../js/clientes.js"></script>
</body>
</html>
```

#### **PASSO 6: Criar JavaScript**

Crie `public/js/clientes.js`:

```javascript
const API_URL = '/api/clientes.php';

document.addEventListener('DOMContentLoaded', carregarClientes);

function carregarClientes() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById('tabelaClientes');
            tbody.innerHTML = '';
            data.forEach(cliente => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${cliente.id}</td>
                    <td>${cliente.nome}</td>
                    <td>${cliente.email}</td>
                    <td>
                        <button onclick="editarCliente(${cliente.id})">Editar</button>
                        <button onclick="deletarCliente(${cliente.id})">Excluir</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        });
}

function abrirModal(clienteId = null) {
    const modal = document.getElementById('modalCliente');
    const form = document.getElementById('formCliente');
    form.reset();
    
    if (clienteId) {
        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                const cliente = data.find(c => c.id === clienteId);
                if (cliente) {
                    document.getElementById('clienteId').value = cliente.id;
                    document.getElementById('nome').value = cliente.nome;
                    document.getElementById('email').value = cliente.email;
                }
            });
    }
    
    modal.style.display = 'block';
}

function fecharModal() {
    document.getElementById('modalCliente').style.display = 'none';
}

function salvarCliente(event) {
    event.preventDefault();
    
    const clienteId = document.getElementById('clienteId').value;
    const cliente = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value
    };
    
    if (clienteId) {
        cliente.id = parseInt(clienteId);
    }
    
    const method = clienteId ? 'PUT' : 'POST';
    
    fetch(API_URL, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Cliente salvo!');
            fecharModal();
            carregarClientes();
        }
    });
}

function editarCliente(id) {
    abrirModal(id);
}

function deletarCliente(id) {
    if (confirm('Excluir cliente?')) {
        fetch(API_URL, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Cliente excluído!');
                carregarClientes();
            }
        });
    }
}
```

#### **PASSO 7: Iniciar o Servidor**

```bash
php -S localhost:8000
```

Acesse: `http://localhost:8000/public/pages/clientes/clientes.html`

---

## 🎯 Funcionalidades Detalhadas

### 1. **CRUD de Clientes**

**Create (Criar)**:
- Clica em "Novo Cliente"
- Preenche formulário
- JavaScript envia POST para API
- PHP adiciona no JSON
- Tabela é atualizada

**Read (Ler)**:
- Página carrega
- JavaScript faz GET na API
- PHP retorna dados do JSON
- JavaScript preenche tabela

**Update (Atualizar)**:
- Clica em "Editar"
- Modal abre com dados atuais
- Altera valores
- JavaScript envia PUT para API
- PHP atualiza no JSON

**Delete (Deletar)**:
- Clica em "Excluir"
- Confirma ação
- JavaScript envia DELETE para API
- PHP remove do JSON

### 2. **CRUD de Veículos**

Mesma lógica dos clientes, mas com campos:
- Marca
- Modelo
- Cor
- Placa

### 3. **CRUD de Motoristas**

Adiciona **relacionamento** com veículos:
- Motorista TEM UM veículo
- Select box carrega veículos disponíveis
- Salva `veiculoId` no motorista

**Como funciona**:
```javascript
// Carregar veículos para o select
fetch('/api/veiculos.php')
    .then(response => response.json())
    .then(veiculos => {
        const select = document.getElementById('veiculoId');
        veiculos.forEach(veiculo => {
            const option = document.createElement('option');
            option.value = veiculo.id;
            option.textContent = `${veiculo.marca} ${veiculo.modelo}`;
            select.appendChild(option);
        });
    });
```

### 4. **CRUD de Entregas**

Relacionamentos **complexos**:
- Entrega TEM UM cliente
- Entrega TEM UM motorista
- Entrega TEM endereço de origem (5 campos)
- Entrega TEM endereço de destino (5 campos)
- Entrega TEM preço

**Estrutura no JSON**:
```json
{
    "id": 1,
    "clienteId": 2,
    "motoristaId": 1,
    "enderecoOrigem": {
        "rua": "Av. Paulista",
        "numero": "1000",
        "cidade": "São Paulo",
        "estado": "SP",
        "cep": "01310-100"
    },
    "enderecoDestino": {
        "rua": "Rua Augusta",
        "numero": "500",
        "cidade": "São Paulo",
        "estado": "SP",
        "cep": "01305-000"
    },
    "preco": "50.00"
}
```

---

## 💡 Conceitos Importantes

### 1. **API REST**

**O que é**: Arquitetura para comunicação entre sistemas

**Princípios**:
- Usa métodos HTTP (GET, POST, PUT, DELETE)
- Recursos identificados por URLs (`/api/clientes`)
- Stateless (sem estado entre requisições)
- Retorna JSON

**Exemplo**:
```
GET    /api/clientes     → Lista todos
POST   /api/clientes     → Cria novo
PUT    /api/clientes     → Atualiza existente
DELETE /api/clientes     → Remove
```

### 2. **AJAX (Asynchronous JavaScript and XML)**

**O que é**: Técnica para fazer requisições sem recarregar a página

**Como funciona**:
```javascript
// Tradicional: Recarrega página
<form action="/salvar.php" method="POST">

// AJAX: Não recarrega
fetch('/api/clientes.php', {
    method: 'POST',
    body: JSON.stringify(dados)
})
```

**Vantagens**:
- Mais rápido (não recarrega tudo)
- Melhor experiência do usuário
- Pode fazer várias operações sem sair da página

### 3. **JSON (JavaScript Object Notation)**

**O que é**: Formato de texto para troca de dados

**Exemplo**:
```json
{
    "nome": "João",
    "idade": 25,
    "emails": ["joao@email.com", "j@gmail.com"],
    "ativo": true
}
```

**JavaScript ↔ JSON**:
```javascript
// Objeto para JSON
const obj = { nome: "João" };
const json = JSON.stringify(obj); // '{"nome":"João"}'

// JSON para objeto
const texto = '{"nome":"João"}';
const obj2 = JSON.parse(texto); // { nome: "João" }
```

**PHP ↔ JSON**:
```php
// Array para JSON
$array = ['nome' => 'João'];
$json = json_encode($array); // {"nome":"João"}

// JSON para array
$texto = '{"nome":"João"}';
$array2 = json_decode($texto, true); // ['nome' => 'João']
```

### 4. **DOM (Document Object Model)**

**O que é**: Representação da página HTML que JavaScript pode manipular

**Operações comuns**:
```javascript
// Buscar elemento
const el = document.getElementById('nome');
const el2 = document.querySelector('.botao');

// Criar elemento
const div = document.createElement('div');
div.textContent = 'Olá';
div.className = 'card';

// Adicionar elemento
document.body.appendChild(div);

// Modificar conteúdo
el.innerHTML = '<strong>Novo</strong>';
el.textContent = 'Texto simples';

// Modificar estilo
el.style.color = 'red';
el.style.display = 'none';

// Escutar eventos
el.addEventListener('click', function() {
    alert('Clicou!');
});
```

### 5. **Promises e Async/Await**

**Promises**:
```javascript
fetch('/api/clientes.php')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
```

**Async/Await** (mais moderno):
```javascript
async function carregarClientes() {
    try {
        const response = await fetch('/api/clientes.php');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}
```

### 6. **Event Handling (Tratamento de Eventos)**

**Tipos de eventos**:
- `click`: Clique do mouse
- `submit`: Envio de formulário
- `change`: Mudança em input
- `keyup`: Tecla solta
- `DOMContentLoaded`: Página carregou

**Formas de usar**:
```javascript
// Inline HTML
<button onclick="minhaFuncao()">Clique</button>

// JavaScript
document.getElementById('btn').onclick = function() { ... };

// addEventListener (melhor)
document.getElementById('btn').addEventListener('click', function() {
    console.log('Clicou!');
});
```

---

## 🎓 Exercícios Práticos

### **Exercício 1: Adicionar Campo Telefone**

Adicione campo "telefone" no módulo de clientes:

1. Adicione no HTML:
```html
<input type="text" id="telefone" placeholder="Telefone" required>
```

2. Adicione no JavaScript:
```javascript
const cliente = {
    nome: document.getElementById('nome').value,
    email: document.getElementById('email').value,
    telefone: document.getElementById('telefone').value // NOVO
};
```

3. Adicione na coluna da tabela:
```javascript
tr.innerHTML = `
    <td>${cliente.telefone}</td>
`;
```

### **Exercício 2: Validação de Email**

Adicione validação customizada:

```javascript
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function salvarCliente(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    
    if (!validarEmail(email)) {
        alert('Email inválido!');
        return;
    }
    
    // Continua salvamento...
}
```

### **Exercício 3: Busca/Filtro**

Adicione campo de busca:

```html
<input type="text" id="busca" placeholder="Buscar cliente...">
```

```javascript
document.getElementById('busca').addEventListener('keyup', function() {
    const termo = this.value.toLowerCase();
    
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const filtrados = data.filter(cliente => 
                cliente.nome.toLowerCase().includes(termo) ||
                cliente.email.toLowerCase().includes(termo)
            );
            mostrarNaTabela(filtrados);
        });
});
```

### **Exercício 4: Paginação**

Implemente paginação (10 itens por página):

```javascript
let paginaAtual = 1;
const itensPorPagina = 10;

function carregarClientes(pagina = 1) {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const inicio = (pagina - 1) * itensPorPagina;
            const fim = inicio + itensPorPagina;
            const itensPagina = data.slice(inicio, fim);
            
            mostrarNaTabela(itensPagina);
            criarBotoesPaginacao(data.length);
        });
}

function criarBotoesPaginacao(totalItens) {
    const totalPaginas = Math.ceil(totalItens / itensPorPagina);
    const div = document.getElementById('paginacao');
    div.innerHTML = '';
    
    for (let i = 1; i <= totalPaginas; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.onclick = () => carregarClientes(i);
        div.appendChild(btn);
    }
}
```

### **Exercício 5: Ordenação**

Adicione ordenação por coluna:

```javascript
let ordenacao = { campo: 'id', direcao: 'asc' };

function ordenarPor(campo) {
    if (ordenacao.campo === campo) {
        ordenacao.direcao = ordenacao.direcao === 'asc' ? 'desc' : 'asc';
    } else {
        ordenacao.campo = campo;
        ordenacao.direcao = 'asc';
    }
    
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            data.sort((a, b) => {
                if (ordenacao.direcao === 'asc') {
                    return a[campo] > b[campo] ? 1 : -1;
                } else {
                    return a[campo] < b[campo] ? 1 : -1;
                }
            });
            mostrarNaTabela(data);
        });
}

// No HTML
<th onclick="ordenarPor('nome')">Nome ↕</th>
```

---

## 🚀 Melhorias Possíveis

### Para praticar mais:

1. **Autenticação**:
   - Login/Logout
   - Sessões PHP
   - Proteção de rotas

2. **Validações Backend**:
   - Validar dados no PHP
   - Retornar erros específicos

3. **Upload de Imagens**:
   - Foto do cliente
   - Logo da empresa

4. **Relatórios**:
   - Exportar para PDF
   - Gerar Excel
   - Gráficos

5. **Dashboard**:
   - Total de clientes
   - Entregas do mês
   - Gráficos

6. **Notificações**:
   - Toasts em vez de alerts
   - Notificações push

7. **Responsivo Avançado**:
   - Menu hambúrguer mobile
   - Tabelas adaptáveis

8. **Integração com APIs**:
   - ViaCEP para buscar endereço
   - Google Maps para rotas

---

## 📚 Recursos para Estudar Mais

### Documentação Oficial:
- **HTML**: https://developer.mozilla.org/pt-BR/docs/Web/HTML
- **CSS**: https://developer.mozilla.org/pt-BR/docs/Web/CSS
- **JavaScript**: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript
- **PHP**: https://www.php.net/manual/pt_BR/

### Cursos Recomendados:
- freeCodeCamp (gratuito)
- Curso em Vídeo (gratuito)
- Udemy (pagos mas com promoções)
- YouTube (vários canais brasileiros)

### Pratique:
- Recrie este projeto do zero
- Adicione novas funcionalidades
- Faça projetos similares (biblioteca, loja, etc)

---

## ✅ Checklist de Aprendizado

Você entendeu tudo se conseguir:

- [ ] Explicar o que é HTML, CSS, JavaScript e PHP
- [ ] Criar uma página HTML com formulário
- [ ] Estilizar com CSS usando classes
- [ ] Fazer requisição fetch() em JavaScript
- [ ] Entender o que é JSON
- [ ] Criar uma API REST simples em PHP
- [ ] Ler e escrever em arquivos JSON
- [ ] Implementar CRUD completo
- [ ] Entender relacionamento entre entidades
- [ ] Manipular DOM com JavaScript
- [ ] Usar modal para formulários
- [ ] Validar dados no frontend
- [ ] Tratar erros com try/catch
- [ ] Usar headers HTTP corretos
- [ ] Debugar com console.log() e var_dump()

---

## 🎯 Conclusão

Este sistema é **ideal para aprender** porque:

✅ Usa tecnologias fundamentais
✅ Ensina conceitos importantes
✅ É um projeto completo e funcional
✅ Pode ser expandido infinitamente
✅ Serve como portfólio

**Próximos passos**:
1. Estude cada arquivo linha por linha
2. Recrie do zero seguindo este guia
3. Faça as modificações sugeridas
4. Crie projetos similares
5. Evolua para usar banco de dados real

**Lembre-se**: A melhor forma de aprender é **praticando**! 💪

---

**Desenvolvido para fins educacionais**
**2º Semestre - Análise e Desenvolvimento de Sistemas**
**Novembro de 2025**
