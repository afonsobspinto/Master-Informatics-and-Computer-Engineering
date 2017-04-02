#pragma once

#include <iostream>
#include <string>
#include <map>
#include <algorithm>
#include <iterator>  


#include "defs.h"
#include "Data.h"
#include "Cliente.h"
#include "Transacao.h"
#include "Produto.h"
#include "utils.h"
#include "QuickSort.h"



using namespace std;

class VendeMaisMais{
 private:

  string nome_loja; // nome da loja
  string fichClientes_c, fichProdutos_c, fichTransacoes_c; // nome de ficheiros de clientes, produtos e transacoes

  bool transacoesAlterdas; // flag que fica a true se for preciso guardar no final as transacoes
  bool clientesAlterados; // flag que fica a true se for preciso guardar no final os clienets

  vector<Cliente> clientes; // vetor que guarda a informacao dos clientes existentes
  vector<Produto> produtos; // vetor que guarda a informacao dos produtos disponiveis
  vector<Transacao> transacoes; // vetor que guarda a informacao das transacoes efetuadas
  vector<Cliente> bottom10; // 10 piores clientes

  map<string, int> clienteIdx;  // map para "traduzir" nome do cliente no indice dele no vetor de clientes
  map<string, int> produtoIdx;  // map para "traduzir" nome do produto no indice dele no vetor de produtos
  multimap<int, int> transacaoIdx; // multimap para "traduzir" o identificador do cliente nos indices das suas transacoes no vetor de  transacoes



 public:
  VendeMaisMais(string loja, string fichClients, string fichProdutos, string fichTransacoes);

  void setTransacoesAlterdas(bool flag);
  void setClientesAlterados(bool flag);
  
  void altera_cliente();
  void remove_cliente();
  void cria_cliente();

  vector<Cliente> getClientes();

  void mostra_todas_transacoes();
  void mostra_trasacoes_entre_datas();
  void mostra_transacoes_individual();
  void mostra_transacoes_individual_dia();
  void mostra_transacoes_individual_entre_dias();
  void cria_transacao();

  void listarClientesOrdemAlfa();
  void listarProdutos();
  void mostraInformacaoCliente(string nome, int pos) const;

  vector<Cliente> le_ficheiro_clientes();
  vector<Produto> le_ficheiro_produtos();
  vector<Transacao> le_ficheiro_transacoes();

  map<string,int> cria_produtoIdx();
  map<string, int> cria_clienteIdx();
  multimap<int, int> cria_transacoesIdx();

 
  void publicidade();
  string publicidade_Normal(string cliente_alvo);
  string publicidade_Bottom();
  vector<Cliente> preenche_bottom10();
  void mostra_bottom10();
  bool is_bottom10(string nome);

  friend ostream& operator<<(ostream& out, const VendeMaisMais & supermercado);

  void saveChanges();
};
