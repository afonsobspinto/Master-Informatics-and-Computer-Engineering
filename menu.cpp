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
		cout << "   " << "3 - Registar" << endl;
		cout << "   " << "4 - Voltar" << endl << endl;
		cout << "   " << "Qual a sua opcao: ";
		opcao = leUnsignedShortInt(1, 3);

		switch (opcao){
		case 1:
			if(this->validaLoginCliente())
				menuOpcoesCliente();
			else
				cout << "Login Incorreto" << endl; //Vai precisar de um wait
			break;
		case 2:
			menuOpcoesCliente();
			break;
		case 3:
			if(this->adicionaCliente())
				menuOpcoesCliente();
			break;
		case 4:
			return true;
		default:
			return false;
		}
	}
}


bool Broker::menuOpcoesCliente() {
	int opcao;

	while(1){
		ClearScreen();
		cout << "Menu Cliente: " << endl;
		cout << endl;
		cout << "   " << "1 - Efetuar Reserva" << endl;
		cout << "   " << "2 - Cancelar Reserva" << endl;
		cout << "   " << "3 - Voltar" << endl << endl;
		cout << "   " << "Qual a sua opcao: ";
		opcao = leUnsignedShortInt(1, 3);

		switch (opcao){
		case 1:
			if(menuEfectuaReserva())
				break;
			break;
		case 2:
			if(menuCancelaReserva())
				break;
			break;
		case 3:
			return true;
		default:
			return false;
		}
	}
}


bool Broker::menuEfectuaReserva() {
	int opcao;

	while(1){
		ClearScreen();
		cout << "Menu Efetua Reserva: " << endl;
		cout << endl;
		cout << "   " << "1 - Ver Montra " << endl;
		cout << "   " << "2 - Ver Montra Preco Max" << endl;
		cout << "   " << "3 - Ver Montra Localidade " << endl;
		cout << "   " << "4 - Ver Montra Entre Datas" << endl;
		cout << "   " << "5 - Ver Montra Todos Filtros" << endl;
		cout << "   " << "6 - Voltar" << endl << endl;
		cout << "   " << "Qual a sua opcao: ";
		opcao = leUnsignedShortInt(1, 6);

		switch (opcao){
		case 1:
			mostraMontra(false, false, false);
			break;
			break;
		case 2:
			if(mostraMontra(false, true, false)->getTipo()!="")
				break;
			break;
		case 3:
			if(mostraMontra(true, false, false)->getTipo()!="")
				break;
			break;
		case 4:
			if(mostraMontra(false, false, true)->getTipo()!="")
				break;
			break;
		case 5:
			if(mostraMontra(true, true, true)->getTipo()!="")
				break;
			break;
		case 6:
			return true;
		default:
			return false;
		}
	}
}

bool Broker::menuCancelaReserva() {
	int opcao;

	while(1){
		ClearScreen();
		cout << "Menu Cancela Reserva: " << endl;
		cout << endl;
		cout << "   " << "1 - Ver todas as Reservas efectuadas" << endl;
		cout << "   " << "2 - Voltar" << endl;
		cout << "   " << "Qual a sua opcao: ";
		opcao = leUnsignedShortInt(1, 2);

		switch (opcao){
		case 1:
			//verReservas();
			//cancelaReserva();
			break;
		case 2:
			return true;
			break;
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
			else
				cout << "Login Incorreto" << endl; //Vai precisar de um wait

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
					cout << "Imovel Adicionado" << endl; //Vai precisar de um wait
				break;
			case 2:
				return true;
			default:
				return false;
			}
		}
}
