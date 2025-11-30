# Dados de Exemplo para Testes

## Veículos

1. **Veículo 1**
   - Marca: Fiat
   - Modelo: Fiorino
   - Cor: Branca
   - Placa: ABC-1234

2. **Veículo 2**
   - Marca: Ford
   - Modelo: Transit
   - Cor: Prata
   - Placa: XYZ-5678

3. **Veículo 3**
   - Marca: Mercedes-Benz
   - Modelo: Sprinter
   - Cor: Branca
   - Placa: DEF-9012

## Clientes

1. **Cliente 1**
   - Nome: Maria Silva
   - Email: maria.silva@email.com
   - Telefone: (11) 98765-4321

2. **Cliente 2**
   - Nome: João Santos
   - Email: joao.santos@email.com
   - Telefone: (11) 97654-3210

3. **Cliente 3**
   - Nome: Ana Costa
   - Email: ana.costa@email.com
   - Telefone: (11) 96543-2109

## Motoristas

1. **Motorista 1**
   - Nome: Carlos Oliveira
   - CNH: 12345678901
   - Telefone: (11) 95432-1098
   - Veículo: Fiat Fiorino (ABC-1234)

2. **Motorista 2**
   - Nome: Pedro Almeida
   - CNH: 98765432109
   - Telefone: (11) 94321-0987
   - Veículo: Ford Transit (XYZ-5678)

3. **Motorista 3**
   - Nome: Lucas Ferreira
   - CNH: 45678901234
   - Telefone: (11) 93210-9876
   - Veículo: Mercedes Sprinter (DEF-9012)

## Entregas

1. **Entrega 1**
   - Cliente: Maria Silva
   - Motorista: Carlos Oliveira
   - Origem:
     - Rua: Av. Paulista
     - Número: 1000
     - Cidade: São Paulo
     - Estado: SP
     - CEP: 01310-100
   - Destino:
     - Rua: Rua Augusta
     - Número: 500
     - Cidade: São Paulo
     - Estado: SP
     - CEP: 01305-000
   - Preço: R$ 50,00

2. **Entrega 2**
   - Cliente: João Santos
   - Motorista: Pedro Almeida
   - Origem:
     - Rua: Rua da Consolação
     - Número: 2000
     - Cidade: São Paulo
     - Estado: SP
     - CEP: 01301-000
   - Destino:
     - Rua: Av. Brasil
     - Número: 1500
     - Cidade: São Paulo
     - Estado: SP
     - CEP: 01430-000
   - Preço: R$ 75,00

## Dicas para Testes

1. **Cadastre primeiro os veículos** - necessário para vincular aos motoristas
2. **Depois cadastre os motoristas** - selecione um veículo disponível
3. **Cadastre os clientes** - podem ser cadastrados a qualquer momento
4. **Por fim, registre as entregas** - selecione cliente e motorista já cadastrados

## Testando Funcionalidades

- ✅ Criar novo registro
- ✅ Editar registro existente
- ✅ Excluir registro
- ✅ Visualizar lista completa
- ✅ Relacionamento entre entidades
