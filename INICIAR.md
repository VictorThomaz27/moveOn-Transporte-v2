# Guia Rápido de Inicialização - MoveOn Transportes

## 🚀 Executando o Projeto

### Opção 1: Usando PHP Built-in Server (Recomendado para desenvolvimento)

1. Abra o PowerShell ou terminal na pasta do projeto
2. Execute o comando:
   ```bash
   php -S localhost:8000
   ```
3. Acesse no navegador: http://localhost:8000

### Opção 2: Usando XAMPP

1. Instale o XAMPP (https://www.apachefriends.org/)
2. Copie a pasta do projeto para `C:\xampp\htdocs\`
3. Inicie o Apache no painel do XAMPP
4. Acesse no navegador: http://localhost/moveOn-Transporte-v2

### Opção 3: Usando WAMP

1. Instale o WAMP (https://www.wampserver.com/)
2. Copie a pasta do projeto para `C:\wamp64\www\`
3. Inicie o WAMP
4. Acesse no navegador: http://localhost/moveOn-Transporte-v2

## 📋 Ordem de Uso Recomendada

1. **Primeiro**: Cadastre os veículos
   - Acesse: Veículos > + Novo Veículo
   - Preencha: Marca, Modelo, Cor e Placa

2. **Segundo**: Cadastre os motoristas
   - Acesse: Motoristas > + Novo Motorista
   - Preencha os dados e selecione um veículo

3. **Terceiro**: Cadastre os clientes
   - Acesse: Clientes > + Novo Cliente
   - Preencha: Nome, Email e Telefone

4. **Quarto**: Registre as entregas
   - Acesse: Entregas > + Nova Entrega
   - Selecione cliente e motorista
   - Preencha os endereços de origem e destino
   - Informe o preço

## 🔧 Verificando se o PHP está instalado

Execute no terminal:
```bash
php --version
```

Se não estiver instalado, baixe em: https://www.php.net/downloads

## ❗ Possíveis Problemas

### Erro: "php não é reconhecido como comando"
**Solução**: Adicione o PHP ao PATH do Windows ou use XAMPP/WAMP

### Erro ao salvar dados
**Solução**: Verifique se a pasta `data/` tem permissões de escrita

### Páginas não carregam corretamente
**Solução**: Certifique-se de estar acessando via http://localhost (não file://)

## 📱 Testando o Sistema

1. Cadastre pelo menos 1 veículo
2. Cadastre pelo menos 1 motorista (vinculado ao veículo)
3. Cadastre pelo menos 1 cliente
4. Crie uma entrega completa
5. Teste editar e excluir registros

## 🎯 Funcionalidades Disponíveis

✅ CRUD completo de Clientes
✅ CRUD completo de Veículos
✅ CRUD completo de Motoristas
✅ CRUD completo de Entregas
✅ Validação de formulários
✅ Mensagens de sucesso/erro
✅ Interface responsiva
✅ Relacionamento entre entidades

## 💡 Dicas

- Use dados reais mas simples para testar
- Teste todas as operações (criar, editar, excluir)
- Verifique se os arquivos JSON estão sendo atualizados em `data/`
- Use o console do navegador (F12) para ver possíveis erros

## 📞 Suporte

Em caso de dúvidas ou problemas:
1. Verifique se o servidor está rodando
2. Verifique o console do navegador (F12)
3. Verifique se os arquivos JSON existem em `data/`
4. Certifique-se de que o PHP está funcionando corretamente

---
**Versão**: 1.0
**Data**: Novembro 2025
