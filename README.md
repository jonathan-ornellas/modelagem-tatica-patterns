# Projeto DDD: Modelagem Tática e Patterns

Este projeto é uma implementação de **Domain-Driven Design (DDD)** utilizando Node.js, TypeScript, Sequelize e Jest. Ele tem como objetivo servir como estudo de boas práticas de DDD, modelando entidades como `Customer`, `Address`, `Order`, `OrderItem` e `Product`.

## 📚 Objetivo

O objetivo deste projeto é aplicar conceitos de **Modelagem Tática do DDD** para organizar e estruturar o domínio de um sistema, utilizando práticas recomendadas de arquitetura, como a separação de responsabilidades, implementação de **patterns** e uso de um **ORM** (Sequelize) para lidar com o banco de dados.

## 🛠️ Tecnologias Utilizadas

- **Node.js**: Plataforma de execução de código JavaScript server-side.
- **TypeScript**: Linguagem que adiciona tipagem estática ao JavaScript.
- **Sequelize**: ORM (Object-Relational Mapping) para gerenciar interações com o banco de dados.
- **Jest**: Framework de testes unitários para garantir a qualidade do código.
  
## 🧱 Arquitetura

O projeto é estruturado seguindo os princípios de **Domain-Driven Design (DDD)**, com foco em **modelagem tática**. Ele inclui as seguintes entidades principais:

- **Customer**: Representa o cliente e contém os dados básicos e endereço.
- **Address**: Um valor-objeto que encapsula informações sobre o endereço do cliente.
- **Order**: Representa um pedido realizado por um cliente.
- **OrderItem**: Um item pertencente a um pedido, associado a um produto.
- **Product**: Representa um produto que pode ser incluído em um pedido.

### Camadas do Projeto

- **Domain**: Contém as entidades principais e lógica de negócio.
- **Repository**: Responsável pela persistência de dados utilizando o Sequelize.
- **Application**: Camada de serviços que orquestra a interação entre as entidades de domínio e os repositórios.
- **Infrastructure**: Contém as implementações dos repositórios e detalhes de acesso ao banco de dados.

### Padrões Implementados

- **Aggregate Root**: `Customer`, `Order` são agregados que controlam as mudanças de estado de suas respectivas entidades e objetos de valor.
- **Entities e Value Objects**: `Customer`, `Order`, `Product` são entidades; `Address` é um objeto de valor.
- **Repositories**: Interfaces para abstrair a lógica de persistência, como `CustomerRepository`, `OrderRepository`, `ProductRepository`.

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js (v14 ou superior)
- NPM ou Yarn

### Instalação

1. Clone o repositório:
2. npm install



