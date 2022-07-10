<div align="center" name="inicio">
  <a href="*"><img title="SemParar" src="Logo.svg" style="width: 300px;" /></a>
</div>

###### Keywords: Projeto Integrado - Equipe Servy - Sistemas e Mídias Digitais - Universidade Federal do Ceará

<h4>
  Sumário: 
 <a href="#sobre">Sobre</a> • 
 <a href="#equipe">Equipe</a> • 
 <a href="#license">Licença</a> • 
 <a href="#como-rodar">Como rodar</a> •
 <a href="#requisitos">Requisitos funcionais</a> •
 <a href="#documento">Relatório e Apresentação</a> •
</h4>

<a name="sobre"></a>

## :computer: :iphone: Sobre

O código econtrado neste repositório é de uma aplicação desenvolvida para o Projeto Sem Parar e foi desenvolvido durante a disciplina de Projeto Integrado I. Criado em 09 de junho de 2018, o Projeto se propõe a preparar meninas, do ensino fundamental e médio, para olimpíadas científicas, com foco em astronomia, biologia, física, informática, química e matemática. Seu lema é “Meninas ensinando meninas” e visa, principalmente, estimular e aumentar a presença feminina nas competições. Nossa solução visa principalmente ajudar o Projeto na organização de dados e distribuição de informações e materiais para as alunas.

<div align="center">
  <img src="mockup.png" style="width: 800px;" />
</div>

<a name="equipe"></a>

## :busts_in_silhouette: Equipe Servy

|  NOME                           |  FUNÇÃO                    |  MATRÍCULA  |
|  ----------------------------   |  --------------------------|  ---------  |
|  Luiz Eduardo Gomes Xavier      |  Codificação               |  509510     |
|  Roldão Ferreira Gomes Neto     |  Design                    |  507824     |
|  Samiris Sampaio De Albuquerque |  Design                    |  509735     |
|  Victor Mota Dos Santos         |  Codificação               |  509223     |
|  Yanna Torres Gonçalves         |  Líder e Design            |  507773     |

<a name="license"></a>

## :memo: Licença
Este código está sobre a licença GNU GPL 3.0. Para mais informações, veja o [LICENSE](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/b08aef3957dea73682f38ad95597223cbdb51267/LICENSE).

<a name="como-rodar"></a>

## :grey_question: Como rodar

### Clonando o repositório

```shell
git clone https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy.git
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

<a name="requisitos"></a>

## :dart: Requisitos funcionais

|  Código                           |  Descrição                    |  Codificação  | Status | 
|  ----------------------------   |  --------------------------|  ---------  | --------- |
|  RFG0001     |  Mostrar tela de dashboard              |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/pages/Home/Home.tsx)     | &#10003;
|  RFG0002     |  Requisitar listagem de turmas no dashboard               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/pages/Home/Home.tsx)     | &#10003;
|  RFG0003     |  Requisitar calendário de aulas no dashboard               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/pages/Home/Home.tsx)     | &#10003; 
|  RFA0004     |  Mostrar listagem de professoras               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/pages/Teachers/Teachers.tsx)     | &#10003;
|  RFG0005     |  Mostrar listagem de turmas               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/pages/Classes/Classes.tsx)     | &#10003;
|  RFA0006     |  Mostrar listagem de alunas               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/pages/Students/Students.tsx)     | &#10003;
|  RFA0007     |  Mostrar listagem de pedidos de cadastro                |   [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/pages/ApproveRegisters/ApproveRegisters.tsx)     | &#10003;
|  RFA0008     |  Mostrar listagem de disciplinas               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/pages/Matters/Matters.tsx)     | &#10003;
|  RFG0009     |  Mostrar tela informações da aula               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/pages/ClassDetails/ClassDetails.tsx) | &#10003;
|  RFG0010     |  Mostrar tela com dados pessoais (perfil)               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/components/Layout/MyAccountModal/ModalsProvider.tsx)     | &#10003;
|  RFA0011     |  Mostrar tela de cadastro de professoras               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/pages/Teachers/ModalsProvider/ModalsProvider.tsx)     | &#10003;
|  RFA0012     |  Mostrar tela de cadastro de alunas               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/pages/Students/ModalsProvider/ModalsProvider.tsx)     | &#10003;
|  RFA0013     |  Mostrar tela de cadastro de turma               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/pages/Classes/ModalsProvider/ModalsProvider.tsx)     | &#10003;
|  RFP0014     |  Mostrar tela de cadastro de aula               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/pages/ClassDetails/ClassDetails.tsx)     | &#10003;
|  RFA0015     |  Mostrar tela de cadastro de disciplina               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/pages/Matters/ModalsProvider/ModalsProvider.tsx)     | &#10003;
|  RFA0016     |  Mostrar tela de pedido de cadastro               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/mobile/src/pages/RegisterPage/RegisterPage.tsx)     | &#10003;
|  RFG0017     |  Validar campos de cadastro por parâmetro               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/components/FormGroup/FormGroup.tsx)     | &#10003;
|  RFA0018     |  Cadastrar professora               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/pages/Teachers/ModalsProvider/ModalsProvider.tsx)     | &#10003;
|  RFA0019     |  Cadastrar aluna               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/pages/Students/ModalsProvider/ModalsProvider.tsx)     | &#10003;
|  RFE0020     |  Solicitar cadastro               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/mobile/src/pages/RegisterPage/RegisterPage.tsx)     | &#10003;
|  RFA0021     |  Aprovar ou reprovar solicitação de cadastro               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/pages/ApproveRegisters/ApproveRegisters.tsx)     | &#10003;
|  RFA0022     |  Cadastrar turma               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/pages/Classes/ModalsProvider/ModalsProvider.tsx)     | &#10003;
|  RFP0023     |  Cadastrar aula               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/pages/ClassDetails/ClassDetails.tsx) | &#10003;
|  RFA0024     |  Cadastrar nova disciplina               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/pages/Matters/ModalsProvider/ModalsProvider.tsx)     | &#10003;
|  RFA0025     |  Filtrar listagem de professoras por parâmetro               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/components/ListPage/ListPage.tsx)     | &#10003;
|  RFA0026     |  Filtrar listagem de alunas por parâmetro               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/components/ListPage/ListPage.tsx)     | &#10003;
|  RFG0027     |  Filtrar listagem de turmas por parâmetro               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/components/ListPage/ListPage.tsx)     | &#10003;
|  RFA0028     |  Ordenar listagem de professoras por parâmetro               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/components/ListPage/ListPage.tsx)     | &#10003;
|  RFA0029     |  Ordenar listagem de alunas por parâmetro               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/components/ListPage/ListPage.tsx)     | &#10003;
|  RFP0030     |  Ordenar listagem de turmas por parâmetro               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/components/ListPage/ListPage.tsx)     | &#10003;
|  RFG0031     |  Mostrar tela de detalhes de turma                |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/pages/ClassDetails/ClassDetails.tsx) | &#10003;
|  RFP0032     |  Mostrar informações da turma na tela de detalhes                |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/pages/ClassDetails/ClassDetails.tsx) | &#10003;
|  RFG0033     |  Mostrar calendário de aulas na tela de detalhes                |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/pages/ClassDetails/ClassDetails.tsx) | &#10003;
|  RFG0034     |  Mostrar listagem de materiais de apoio da turma na tela de detalhes               |  X     | A fazer
|  RFA0035     |  Editar cadastro de professora               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/pages/Teachers/ModalsProvider/ModalsProvider.tsx)     | &#10003;
|  RFP0036     |  Editar informações de uma turma               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/pages/Classes/ModalsProvider/ModalsProvider.tsx)     | &#10003;
|  RFA0037     |  Editar alunas matriculadas em uma turma               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/pages/Classes/ModalsProvider/ModalsProvider.tsx)     | &#10003;
|  RFA0038     |  Editar cadastro de aluna               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/pages/Students/ModalsProvider/ModalsProvider.tsx)     | &#10003;
|  RFG0039     |  Editar informações do seu cadastro                |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/web/src/components/Layout/MyAccountModal/ModalsProvider.tsx)     | &#10003;
|  RFE0040     |  Mostrar notificação de nova aula               |  X     | A fazer
|  RFE0041     |  Mostrar tela de solicitação de cadastro               |  [código](https://github.com/Servy-Sem-Parar/projetointegrado-SMD-Servy/blob/main/mobile/src/pages/RegisterPage/RegisterPage.tsx)     | &#10003;
|  RFG0042     |  Mostrar tela de Login               |  [código]()     | &#10003;
|  RFG0043     |  Realizar login               |  [código]()     | &#10003;
|  RFA0044     |  Filtrar listagem de disciplinas por parâmetro               |  [código]()     | &#10003;
|  RFA0045     |  Ordenar listagem de disciplinas por parâmetro               |  [código]()     | &#10003;
|  RFA0046     |  Editar cadastro de disciplina               |  [código]()     | &#10003;
|  RFE0047     |  Mostrar pop-up com listagem de aulas do dia               |  [código]()     | &#10003;

<a name="documento"></a>

## :clipboard: Relatório e apresentação do projeto

O relatório completo sobre o processo de desenvolvimento dessa aplicação pode ser encontrado em: link. A apresentação geral do projeto pode ser encontrada em: link.

---
Feito por Servy

<h6>
  <a href="#inicio">Voltar ao início</a>
</h6>
