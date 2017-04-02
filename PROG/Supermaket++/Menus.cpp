#include "Menus.h"

/*
Mostra no ecrã o título do projeto e os colaboradores.
*/

void frontpage()
{
	cout << "   _____                                                                              _                         " << endl;
	cout << "  / ____|                                                                            | |            _       _   " << endl;
	cout << " | (___    _   _   ____     ___   ____   _________    ___   ____    ___    ____    __| |   ___    _| |_   _| |_ " << endl;
	cout << "  |___ |  | | | | |  _ |   / _ | |  __| |  _   _  |  / _ | |  __|  / __|  / _  |  / _  |  / _ |  |_   _| |_   _|" << endl;
	cout << "  ____) | | |_| | | |_) | |  __/ | |    | | | | | | |  __/ | |    | (__  | (_| | | (_| | | (_) |   |_|     |_|  " << endl;
	cout << " |_____/  |_____| |  __/  |____| |_|    |_| |_| |_| |____| |_|     |___|  |____|  |____|  |___/                 " << endl;
	cout << "                  | | " << endl;
	cout << "                  |_|  " << endl;
	cout << " " << endl;
	this_thread::sleep_for(chrono::seconds(3));
	clearScreen();
	cout << "                   ___         _          _                            _                          _ " << endl;
	cout << "                  / __|  ___  | |  ____  | |__   ___   ___   ____   __| |  ___   ___   ___   ___ (_)" << endl;
	cout << "                 | (__  / _ | | | / _  | |  _ | / _ | |  _| / _  | / _  | / _ | |  _| / -_) (_ <  _ " << endl;
	cout << "                  |___| |___/ |_| |____| |____/ |___/ |_|   |____| |____| |___/ |_|   |___| |__| (_)" << endl;
	cout << " " << endl;
	this_thread::sleep_for(chrono::seconds(2));
	clearScreen();
	cout << "                          _____    __                            ___   _          _             " << endl;
	cout << "                    ___  |  _  |  / _|  ___   ____   ___  ___   | _ | (_)  ____  | |_   ___     " << endl;
	cout << "                   |___| | |_| | |  _| / _ | |    | (_ < / _ |  |  _| | | |    | |  _| / _ |    " << endl;
	cout << "                         |_| |_| |_|   |___/ |_||_| /__/ |___/  |_|   |_| |_||_| |___| |___/    " << endl;
	cout << "        " << endl;
	cout << "" << endl;
	cout << "                          _____                               ___    _   _               _              " << endl;
	cout << "                    ___  |_   _|  ___   _____   ____   ___   / _ |  | | (_) __ __  ___  (_)  ___   ____ " << endl;
	cout << "                   |___|   | |   / _ | |     | / _  | (_ <  | (_) | | | | | | V / / -_) | | |  _| / _  |" << endl;
	cout << "                           |_|   |___/ |_|_|_| |____| /__/   |___/  |_| |_|  |_/  |___| |_| |_|   |____|" << endl;
	this_thread::sleep_for(chrono::seconds(3));

}

/*
Pede a informação sobre o nome da loja e os três ficheiros com
a informação de clientes, produtos e transações.
@loja
@fichClientes
@fichProdutos
@fichTransacoes
@Valor de Retorno da Função: Retorna verdadeiro caso todos os ficheiros sejam válidos, falso em caso contrário
*/
bool infoInicial(string & loja, string & fichClientes, string & fichProdutos, string & fichTransacoes){


	frontpage();
	clearScreen();


	titulo("Informacao Inicial");
	cout << endl;

	cout << TAB << "Loja: ";
	cin >> loja;
	cout << endl;

	cout << TAB << "Ficheiro Clientes: ";
	cin >> fichClientes;
	cout << endl;
	if (!CheckExistence(fichClientes))
		return false;

	cout << TAB << "Ficheiro Produtos: ";
	cin >> fichProdutos;
	cout << endl;
	if (!CheckExistence(fichProdutos))
		return false;

	cout << TAB << "Ficheiro Transacoes: ";
	cin >> fichTransacoes;
	cout << endl;
	if (!CheckExistence(fichTransacoes))
		return false;

	return true;

}

/******************************************
 * Gestao de Clientes
 ******************************************/

 /*
 Mostra no ecrã o menu da Gestão de Clientes.
 */
unsigned short int menuGestaoClientes(){
  unsigned short int opcao;

  clearScreen();

  titulo("Menu Gestao Clientes");
  cout << endl;
  cout << TAB << "1 - Listar Clientes por Ordem Alfabetica" << endl;
  cout << TAB << "2 - Ver informacao cliente" << endl;
  cout << TAB << "3 - Criar cliente" << endl;
  cout << TAB << "4 - Editar cliente" << endl;
  cout << TAB << "5 - Remover cliente" << endl;
  cout << TAB << "6 - Voltar ao menu inicial" << endl << endl;
  cout << TAB << "Qual a sua opcao: ";
  opcao = leUnsignedShortInt(1, 6);

  if(opcao == 6)
    return 0;

  return opcao;
}

void opcoesGestaoClientes(VendeMaisMais & supermercado){
  unsigned int opcao;
  string nome;

  while((opcao = menuGestaoClientes()))
    switch (opcao){
    case 1: supermercado.listarClientesOrdemAlfa();
      break;
    case 2: 
		cout << endl << SEPARADOR<< endl;
		do { 
			cout << endl << TAB << "Qual o nome do cliente: ";
			getline(cin, nome);
			if (find_name(nome, supermercado.getClientes()) == -1)
				mensagem_erro("Utilizador Nao Encontrado", false);
		} while (find_name(nome, supermercado.getClientes()) == -1);
		supermercado.mostraInformacaoCliente(nome, find_name(nome, supermercado.getClientes()));
      break;
	case 3:supermercado.cria_cliente();
		break;
	case 4: supermercado.altera_cliente();
      break;
	case 5: supermercado.remove_cliente();
      break;
    }
}

/******************************************
 * Gestao de Transacoes
 ******************************************/

 /*
 Mostra no ecrã o menu da Gestão de Transações.
 */

unsigned short int menuGestaoTransacoes(){

	unsigned short int opcao;

	clearScreen();

	titulo("Menu Gestao Transacoes");
	cout << endl;
	cout << TAB << "1 - Listar Transacoes Ordem Cronologica" << endl;
	cout << TAB << "2 - Listar Transacoes Intervalo Tempo" << endl;
	cout << TAB << "3 - Visualizar Transacoes Cliente" << endl;
	cout << TAB << "4 - Visualizar Transacoes Cliente Diaria" << endl;
	cout << TAB << "5 - Visualizar Transacoes Cliente Intervalo Tempo" << endl;
	cout << TAB << "6 - Adicionar Transacao" << endl;
	cout << TAB << "7 - Voltar ao menu inicial" << endl << endl;
	cout << TAB << "Qual a sua opcao: ";
	opcao = leUnsignedShortInt(1, 7);

	if (opcao == 7)
		return 0;

	return opcao;
}

void opcoesGestaoTransacoes(VendeMaisMais & supermercado){
  unsigned int opcao;

  while((opcao = menuGestaoTransacoes()))
    switch (opcao){
	case 1:supermercado.mostra_todas_transacoes();
      break;
	case 2:supermercado.mostra_trasacoes_entre_datas();
      break;
    case 3:supermercado.mostra_transacoes_individual();
      break;
    case 4:supermercado.mostra_transacoes_individual_dia();
      break;
	case 5:supermercado.mostra_transacoes_individual_entre_dias();
		break;
	case 6:supermercado.cria_transacao();
		break;
    }
}

/******************************************
 * Publicidade
 ******************************************/

 /*
 Mostra no ecrã o menu da Publicidade.
 */

unsigned short int menuRecomendacao(){
	
	unsigned short int opcao;

	clearScreen();

	titulo("Menu Publicitario");
	cout << endl;
	cout << TAB << "1 - Publicidade Personalizada" << endl;
	cout << TAB << "2 - Mostrar Bottom10" << endl;
	cout << TAB << "3 - Voltar ao menu inicial" << endl << endl;
	cout << TAB << "Qual a sua opcao: ";
	opcao = leUnsignedShortInt(1, 3);

	if (opcao == 3)
		return 0;

	return opcao;
}

void opcoesRecomendacao(VendeMaisMais & supermercado){
  unsigned int opcao;

  while((opcao = menuRecomendacao()))
    switch (opcao){
	case 1:supermercado.publicidade();
      break;
	case 2:supermercado.mostra_bottom10();
      break;
    }

}

/******************************************
 * Menu Inicial
 ******************************************/

 /*
 Mostra no ecrã o menu inicial.
 */

unsigned short int menuInicial(){
  unsigned short int opcao;

  clearScreen();

  titulo("Menu Inicial");
  cout << endl;
  cout << TAB << "1 - Gestao de clientes" << endl;
  cout << TAB << "2 - Lista produtos disponiveis" << endl;
  cout << TAB << "3 - Gestao de transacoes" << endl;
  cout << TAB << "4 - Recomendacoes" << endl;
  cout << TAB << "5 - Sair do programa" << endl << endl;
  cout << TAB << "Qual a sua opcao: ";
  opcao = leUnsignedShortInt(1, 5);

  if(opcao == 5)
    return 0;

  return opcao;
}

void opcoesIniciais(VendeMaisMais & supermercado){
  unsigned int opcao;


  while((opcao = menuInicial()))
    switch (opcao){
    case 1: opcoesGestaoClientes(supermercado);
      break;
    case 2: supermercado.listarProdutos();
      break;
    case 3: opcoesGestaoTransacoes(supermercado);
      break;
    case 4: opcoesRecomendacao(supermercado);
     break;
    }
}
