# SmartClass

## Objetivo

O objetivo deste projeto é desenvolver um sistema escolar que permita a
administração de uma escola. Entre as principais funcionalidades, está a
geração de escalonamento de horários para professores e turmas, além da gestão
de alunos, professores e disciplinas, visando a otimização do dia a dia
escolar.

## Principais Features

- Geração automática de escalonamento de horários.
- Gestão de turmas, professores e alunos.
- Interface intuitiva para usuários administrativos.
- Integração com banco de dados para armazenamento e consulta de dados.

## Membros da Equipe

- Jalmir de Jesus Ferreira da Silva Junior - Full Stack Developer
- João Victor Taufner Pereira - Backend Developer
- Diogo do Nascimento Rodrigues - Full Stack Developer
- Christian Felippe Vasconcelos de Oliveira - Backend Developer

## Tecnologias Utilizadas

- Linguagem: JavaScript/TypeScript
- Backend Framework: Express.js
- Frontend Framework: Next.js
- Banco de Dados: PostgreSQL

## Backlog do produto

- Funcionalidades Principais
  - Gestão de Usuários
  - Cadastro de alunos
  - Cadastro de professores
  - Cadastro de disciplinas
  - Edição e exclusão de usuários
  - Visualização de lista de alunos, professores e disciplinas
  
- Geração de Horários
  - Módulo para inserção de restrições (disponibilidade dos professores)
  - Algoritmo para geração automática de horários
  - Visualização do horário gerado
  - Opção para reprogramar horários
  
- Gestão de Turmas
  - Criação e edição de turmas
  - Atribuição de alunos a turmas
  - Atribuição de professores a turmas
  
- Relatórios e Estatísticas
  - Geração de relatórios sobre frequência dos alunos
  - Relatórios sobre carga horária dos professores
  - Estatísticas sobre disciplinas (aproveitamento, notas)
  
- Interface do Usuário
  - Design responsivo
  - Navegação intuitiva
  - Sistema de autenticação (login/logout)
  
- Tarefas Técnicas
  - Configuração do ambiente de desenvolvimento
  - Escolha da stack tecnológica (ex.: Frontend, Backend, Banco de Dados)
  - Implementação da API RESTful para comunicação entre frontend e backend 

- Melhorias Futuras
  - Integração com sistemas externos (ex.: plataformas de ensino)
  - Funcionalidade para feedback dos alunos sobre as aulas
  - Módulo para gestão financeira (mensalidades, pagamentos)
 
- Observações
  - As prioridades das tarefas podem ser ajustadas conforme o feedback dos usuários e as necessidades emergentes.

 ## Backlog dos Sprints

- Sprint 1: Levantamento de Requisitos
  - Reuniões com stakeholders para entender necessidades
  - Documentação dos requisitos funcionais
  - Documentação dos requisitos não funcionais
  - Pesquisa sobre soluções existentes
    
- Sprint 2: Prototipagem da Interface
  - Criação de protótipo (Figma) da interface do usuário
  - Validação do protótipo com usuários finais
  - Ajustes no protótipo baseados no feedback
    
- Sprint 3: Desenvolvimento da Gestão de Usuários
  - Implementação do cadastro de alunos
  - Implementação do cadastro de professores
  - Implementação do cadastro de disciplinas
  - Edição e exclusão de usuários
  - Visualização da lista de alunos, professores e disciplinas
  - Teste manuais
 
- Sprint 4: Desenvolvimento do Módulo de Geração de Horários
  - Implementação do módulo para inserção de restrições (disponibilidade dos professores)
  - Desenvolvimento do algoritmo para geração automática de horários
  - Visualização do horário gerado
  - Opção para reprogramar horários
  - Testes manuais
    
- Sprint 5: Integração e Testes Finais
  - Integração dos módulos desenvolvidos (gestão de usuários e geração de horários)
  - Testes funcionais da aplicação completa
  - Testes não funcionais (performance, segurança)
  - Correção de bugs identificados durante os testes
    
- Sprint 6: Documentação e Treinamento
  - Criação da documentação do usuário (guias, tutoriais)
  - Criação da documentação técnica (API, arquitetura)  
    
- Sprint 7: Lançamento e Feedback
  - Lançamento da aplicação em ambiente produtivo
  - Coleta de feedback dos usuários sobre a aplicação
  - Planejamento das melhorias futuras com base no feedback recebido
 
## Backlog para Implementação do Backend

- Estrutura do Projeto
  - Criar diretório do projeto
  - Inicializar o projeto Node.js com npm init -y
  - Instalar dependências:
     - express
     - pg (node-postgres)
     - PM2 (para desenvolvimento e Daemon de execução)
     - dotenv (para variáveis de ambiente)
  - Configuração do Banco de Dados
     - Instalar e configurar PostgreSQL
     - Criar um banco de dados no PostgreSQL
     - Criar tabelas necessárias (ex.: usuários, turmas, disciplinas)
     - Configurar o arquivo .env com a string de conexão do banco de dados
  - Desenvolvimento da API
     - Endpoints CRUD para Usuários
      - Implementar endpoint POST /usuarios para criar um novo usuário
      - Implementar endpoint GET /usuarios para listar todos os usuários
      - Implementar endpoint GET /usuarios/:id para obter um usuário específico
      - Implementar endpoint PUT /usuarios/:id para atualizar um usuário existente
      - Implementar endpoint DELETE /usuarios/:id para deletar um usuário
  - Endpoints CRUD para Disciplinas
      - Implementar endpoint POST /disciplinas para criar uma nova disciplina
      - Implementar endpoint GET /disciplinas para listar todas as disciplinas
      - Implementar endpoint GET /disciplinas/:id para obter uma disciplina específica
      - Implementar endpoint PUT /disciplinas/:id para atualizar uma disciplina existente
      - Implementar endpoint DELETE /disciplinas/:id para deletar uma disciplina
  - Endpoints CRUD para Turmas
      - Implementar endpoint POST /turmas para criar uma nova turma
      - Implementar endpoint GET /turmas para listar todas as turmas
      - Implementar endpoint GET /turmas/:id para obter uma turma específica
      - Implementar endpoint PUT /turmas/:id para atualizar uma turma existente
      - Implementar endpoint DELETE /turmas/:id para deletar uma turma
  - Middleware e Configurações Adicionais
       - Configurar middleware para tratamento de erros
       - Configurar middleware de CORS (Cross-Origin Resource Sharing)
       - Configurar middleware de parsing JSON

  - Documentação da API
       - Criar documentação da API usando Swagger ou Postman
       - Preparação para Produção
       - Otimizar a configuração do banco de dados (ex.: pooling)
       - Configurar variáveis de ambiente adequadas para produção
  - Melhorias Futuras
       - Implementar autenticação (JWT ou OAuth)
       - Adicionar funcionalidades de busca avançada nas APIs
