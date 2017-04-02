CONTEÚDOS DESTE ARQUIVO
---------------------
   
 * Introdução
 * Requisitos
 * Configuração
 * Resolução de Problemas
 * FAQ
 * Colaboradores
 * Alterações Relevantes
 
 INTRODUÇÃO
------------

O Projeto SuperMercado mostra o menu administrativo de um supermercado, fornecendo aos administradores acesso fácil a clientes, produtos e a informação sobre transações.
Para além disso, apresenta ainda uma área publicitária personalizada.

 * Para enviar relatórios de erros e apresentar sugestões, ou para acompanhar as mudanças ao projeto:
   up201503316@fe.up.pt
   up201504746@fe.up.pt

   
 REQUISITOS
------------

Este programa requer um dos seguintes sistemas operativos:

 * Windows XP/Vista/7/8/10
 

 CONFIGURAÇÃO
-------------

 * Manter os arquivos dos clientes, produtos  e transações no mesmo diretório que o Projeto.

 RESOLUÇÃO DE PROBLEMAS
-------------------------

 * Se o menu não aparecer, verifique o seguinte:

   - As permissões da linhas de comando estão ativadas?

   - O projeto SuperMercado já não se encontra em execução?

 FAQ
-----
 
  Q: Porque é que o ficheiro de clientes não fica ordenado por ordem alfabética?
    
  R: O ficheiro de clientes não é alterado nesse aspeto de forma proposita, a opção de dispor por ordem alfabética apenas abrange a visualizaçao dos clientes aquando da execução do programa. 

 COLABORADORES
----------------

Colaboradores Atuais:
 * Afonso Pinto - https://sigarra.up.pt/feup/pt/fest_geral.cursos_list?pv_num_unico=201503316
 * Tomás Oliveira - https://sigarra.up.pt/feup/pt/fest_geral.cursos_list?pv_num_unico=201504746

 ALTERAÇÕES RELEVANTES
------------------------

Alterações consideráveis ao código parcial:

 * Alteração dos argumentos das classes tendo em vista um código mais explícito;
 * Introdução da possibilidade de escolha de um identificador único por parte do utilizador;
 * Criação de um template de ordenação;
 
 Outros reparos:
 
 * Datas válidas terão de se encontrar dentro da Era Unix (teve início no dia a 1 de janeiro de 1970);
 * A data inicial, nas transações entre datas, é exclusiva; 
 * O produto mais frequente entre os clientes interessantes e menos frequente entre os Bottom10 corresponde ao maior valor da diferença entre os produtos adquiridos pelos Clientes Interessantes e os produtos adquiridos pelo Bottom10.

