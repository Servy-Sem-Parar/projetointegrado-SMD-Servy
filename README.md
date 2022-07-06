# Projeto Sem Parar
Keywords: Projeto Integrado - Equipe Servy - Sistemas e Mídias Digitais - Universidade Federal do Ceará

## Sobre

O projeto da aplicação a ser desenvolvida ao longo do semestre terá como cliente o Projeto Sem Parar, criado em 09 de junho de 2018. O Projeto se propõe a preparar meninas, do ensino fundamental e médio, para olimpíadas científicas, com foco em astronomia, biologia, física, informática, química e matemática. Seu lema é “Meninas ensinando meninas” e visa, principalmente, estimular e aumentar a presença feminina nas competições. A escolha desse cliente se deu não apenas por admiração ao projeto, mas também por uma das administradoras ser uma amiga do ensino médio de uma das integrantes do grupo.

## Equipe Servy

|  NOME                           |  FUNÇÃO                    |  MATRÍCULA  |
|  ----------------------------   |  --------------------------|  ---------  |
|  Luiz Eduardo Gomes Xavier      |  Codificação               |  509510     |
|  Roldão Ferreira Gomes Neto     |  Design                    |  507824     |
|  Samiris Sampaio De Albuquerque |  Design                    |  509735     |
|  Victor Mota Dos Santos         |  Codificação               |  509223     |
|  Yanna Torres Gonçalves         |  Líder                     |  507773     |

## Como rodar

### Clonando o repositório

```shell
git clone https://github.com/VictorDKT/projetointegrado-SMD-Servy.git
cd projetointegrado-SMD-Servy
```

### Front-end web
```shell
cd web
npm install
npm build
npm start
```

### Front-end mobile
```shell
cd mobile
npm install
expo start
```

### Back-end
```shell
cd backend
cp .env.example .env
// entre no seu editor de texto e configure as variáveis de ambiente da .env
npm install
npm run build
npm run start
```

## Requisitos funcionais

|  Código                           |  Descrição                    |  Codificação  | Status | 
|  ----------------------------   |  --------------------------|  ---------  | --------- |
|  RFG0001     |  Mostrar tela de dashboard              |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/pages/Home/Home.tsx)     | Feito
|  RFG0002     |  Requisitar listagem de turmas no dashboard               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/pages/Home/Home.tsx)     | Feito
|  RFG0003     |  Requisitar calendário de aulas no dashboard               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/pages/Home/Home.tsx)     | Feito
|  RFA0004     |  Mostrar listagem de professoras               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/pages/Teachers/Teachers.tsx)     | Feito
|  RFG0005     |  Mostrar listagem de turmas               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/pages/Classes/Classes.tsx)     | Feito
|  RFA0006     |  Mostrar listagem de alunas               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/pages/Students/Students.tsx)     | Feito
|  RFA0007     |  Mostrar listagem de pedidos de cadastro                |   [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/pages/ApproveRegisters/ApproveRegisters.tsx)     | Feito
|  RFA0008     |  Mostrar listagem de disciplinas               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/pages/Matters/Matters.tsx)     | Feito
|  RFG0009     |  Mostrar tela informações da aula               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/pages/ClassDetails/ClassDetails.tsx) | Feito
|  RFG0010     |  Mostrar tela com dados pessoais (perfil)               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/components/Layout/MyAccountModal/ModalsProvider.tsx)     | Feito
|  RFA0011     |  Mostrar tela de cadastro de professoras               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/pages/Teachers/ModalsProvider/ModalsProvider.tsx)     | Feito
|  RFA0012     |  Mostrar tela de cadastro de alunas               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/pages/Students/ModalsProvider/ModalsProvider.tsx)     | Feito
|  RFA0013     |  Mostrar tela de cadastro de turma               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/pages/Classes/ModalsProvider/ModalsProvider.tsx)     | Feito
|  RFP0014     |  Mostrar tela de cadastro de aula               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/pages/ClassDetails/ClassDetails.tsx)     | Feito
|  RFA0015     |  Mostrar tela de cadastro de disciplina               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/pages/Matters/ModalsProvider/ModalsProvider.tsx)     | Feito
|  RFA0016     |  Mostrar tela de pedido de cadastro               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/mobile/src/pages/RegisterPage/RegisterPage.tsx)     | Feito
|  RFG0017     |  Validar campos de cadastro por parâmetro               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/components/FormGroup/FormGroup.tsx)     | Feito
|  RFA0018     |  Cadastrar professora               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/pages/Teachers/ModalsProvider/ModalsProvider.tsx)     | Feito
|  RFA0019     |  Cadastrar aluna               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/pages/Students/ModalsProvider/ModalsProvider.tsx)     | Feito
|  RFE0020     |  Solicitar cadastro               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/mobile/src/pages/RegisterPage/RegisterPage.tsx)     | Feito
|  RFA0021     |  Aprovar ou reprovar solicitação de cadastro               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/pages/ApproveRegisters/ApproveRegisters.tsx)     | Feito
|  RFA0022     |  Cadastrar turma               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/pages/Classes/ModalsProvider/ModalsProvider.tsx)     | Feito
|  RFP0023     |  Cadastrar aula               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/pages/ClassDetails/ClassDetails.tsx) | Feito
|  RFA0024     |  Cadastrar nova disciplina               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/pages/Matters/ModalsProvider/ModalsProvider.tsx)     | Feito
|  RFA0025     |  Filtrar listagem de professoras por parâmetro               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/components/ListPage/ListPage.tsx)     | Feito
|  RFA0026     |  Filtrar listagem de alunas por parâmetro               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/components/ListPage/ListPage.tsx)     | Feito
|  RFG0027     |  Filtrar listagem de turmas por parâmetro               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/components/ListPage/ListPage.tsx)     | Feito
|  RFA0028     |  Ordenar listagem de professoras por parâmetro               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/components/ListPage/ListPage.tsx)     | Feito
|  RFA0029     |  Ordenar listagem de alunas por parâmetro               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/components/ListPage/ListPage.tsx)     | Feito
|  RFG0030     |  Ordenar listagem de turmas por parâmetro               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/components/ListPage/ListPage.tsx)     | Feito
|  RFG0031     |  Mostrar tela de detalhes de turma                |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/pages/ClassDetails/ClassDetails.tsx) | Feito
|  RFP0032     |  Mostrar informações da turma na tela de detalhes                |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/pages/ClassDetails/ClassDetails.tsx) | Feito
|  RFG0033     |  Mostrar calendário de aulas na tela de detalhes                |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/pages/ClassDetails/ClassDetails.tsx) | Feito
|  RFE0034     |  Mostrar listagem de materiais de apoio da turma na tela de detalhes               |  X     | A fazer
|  RFA0035     |  Editar cadastro de professora               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/pages/Teachers/ModalsProvider/ModalsProvider.tsx)     | Feito
|  RFP0036     |  Editar informações de uma turma               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/pages/Classes/ModalsProvider/ModalsProvider.tsx)     | Feito
|  RFA0037     |  Editar alunas matriculadas em uma turma               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/pages/Classes/ModalsProvider/ModalsProvider.tsx)     | Feito
|  RFA0038     |  Editar cadastro de aluna               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/pages/Students/ModalsProvider/ModalsProvider.tsx)     | Feito
|  RFG0039     |  Editar informações do seu cadastro                |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/components/Layout/MyAccountModal/ModalsProvider.tsx)     | Feito
|  RFE0040     |  Mostrar notificação de nova aula               |  X     | A fazer
|  RFE0041     |  Mostrar tela de solicitação de cadastro               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/mobile/src/pages/RegisterPage/RegisterPage.tsx)     | Feito
