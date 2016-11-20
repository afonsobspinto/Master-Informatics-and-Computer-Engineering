#include <iostream>

#include "utils.h"
#include "broker.h"

using namespace std;


bool Broker::opcoesIniciais() {
	int opcao;

	while(1){
		ClearScreen();
		cout << "Menu Inicial: " << endl;
		cout << endl;
		cout << "   " << "1 - Cliente" << endl;
		cout << "   " << "2 - Fornecedor" << endl;
		cout << "   " << "3 - Sair" << endl << endl;
		cout << "   " << "Qual a sua opcao: ";
		opcao = leUnsignedShortInt(1, 3);

		switch (opcao){
		case 1:
			menuClienteInicial();
			break;
		case 2:
			menuFornecedorInicial();
			break;
		case 3:
			return true;
		default:
			return false;
		}
	}
}

bool Broker::menuClienteInicial() {
	int opcao;

	while(1){
		ClearScreen();
		cout << "Menu Cliente: " << endl;
		cout << endl;
		cout << "   " << "1 - Registado" << endl;
		cout << "   " << "2 - Convidado" << endl;
		cout << "   " << "3 - Voltar" << endl << endl;
		cout << "   " << "Qual a sua opcao: ";
		opcao = leUnsignedShortInt(1, 3);

		switch (opcao){
		case 1:

			break;
		case 2:

			break;
		case 3:
			return true;
		default:
			return false;
		}
	}
}

bool Broker::menuFornecedorInicial() {
	int opcao;

	while(1){
		ClearScreen();
		cout << "Menu Fornecedor: " << endl;
		cout << endl;
		cout << "   " << "1 - Login" << endl;
		cout << "   " << "2 - Registar" << endl;
		cout << "   " << "3 - Voltar" << endl << endl;
		cout << "   " << "Qual a sua opcao: ";
		opcao = leUnsignedShortInt(1, 3);

		switch (opcao){
		case 1:
			if(this->validaLoginFornecedor())
				menuOpcoesFornecedor();
			break;
		case 2:
			if(this->adicionaFornecedor())
				menuOpcoesFornecedor();
			break;
		case 3:
			return true;
		default:
			return false;
		}
	}
}

bool Broker::menuOpcoesFornecedor() {

	int opcao;

		while(1){
			ClearScreen();
			cout << "Menu Fornecedor: " << endl;
			cout << endl;
			cout << "   " << "1 - Adicionar Imovel" << endl;
			cout << "   " << "2 - Voltar" << endl << endl;
			cout << "   " << "Qual a sua opcao: ";
			opcao = leUnsignedShortInt(1, 2);

			switch (opcao){
			case 1:
				if(this->adicionaImovel(UserF))
					break;
				break;
			case 3:
				return true;
			default:
				return false;
			}
		}
}
