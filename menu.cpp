#include <iostream>

#include "broker.h"
#include "utils.h"

using namespace std;


bool Broker::opcoesIniciais() {
	int opcao;

	while(1){
		ClearScreen();
		cout << "Menu Inicial: " << endl;
		cout << endl;
		cout << "   " << "1 - Cliente" << endl;
		cout << "   " << "2 - Fornecedor" << endl;
		cout << "   " << "3 - Outros" << endl;
		cout << "   " << "4 - Sair" << endl << endl;
		cout << "   " << "Qual a sua opcao: ";
		opcao = leUnsignedShortInt(1, 4);

		switch (opcao){
		case 1:
			menuClienteInicial();
			break;
		case 2:
			menuFornecedorInicial();
			break;
		case 3:
			menuOutros();
			break;
		case 4:
			return true;
		default:
			continue;
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
			break;
		case 2:
			menuOpcoesCliente();
			break;
		case 3:
			adicionaCliente();
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
		cout << "   " << "3 - Ver Classificacao" << endl;
		cout << "   " << "4 - Voltar" << endl << endl;
		cout << "   " << "Qual a sua opcao: ";
		opcao = leUnsignedShortInt(1, 4);

		switch (opcao){
		case 1:
			if(menuEfectuaReserva())
				break;
			break;
		case 2:
			if(cancelaReserva())
				break;
			break;
		case 3:
			classificacao();
			break;
		case 4:
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
					return true;
				break;
			case 2:
				if(mostraMontra(false, true, false))
					return true;
				break;
			case 3:
				if(mostraMontra(true, false, false))
					return true;
				break;
			case 4:
				if(mostraMontra(false, false, true))
					return true;
				break;
			case 5:
				if(mostraMontra(true, true, true))
					return true;
				break;
			case 6:
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
			cout << "   " << "2 - Ver Minhas Ofertas" << endl;
			cout << "   " << "3 - Voltar" << endl << endl;
			cout << "   " << "Qual a sua opcao: ";
			opcao = leUnsignedShortInt(1, 3);

			switch (opcao){
			case 1:
				if(this->adicionaImovel(UserF))
					break;
				break;
			case 2:
				if(verOfertas())
					break;
				break;
			case 3:
				return true;
			default:
				return false;
			}
		}
}

bool Broker::menuOutros() {
	int opcao;

	while(1){
		ClearScreen();
		cout << "Menu Outros: " << endl;
		cout << endl;
		cout << "   " << "1 - Histórico das Reservas" << endl;
		cout << "   " << "2 - Descontos" << endl;
		cout << "   " << "3 - Clientes Inativos" << endl;
		cout << "   " << "4 - Sair" << endl << endl;
		cout << "   " << "Qual a sua opcao: ";
		opcao = leUnsignedShortInt(1, 4);

		switch (opcao){
		case 1:
			if (verHistorico())
				break;
			cout << "LAST" << endl;
			break;
		case 2:
			// Fila de prioridade
			break;
		case 3:
			atualizaInativos();
		    verInativos(); 
			break;
		case 4:
			return true;
		default:
			continue;
		}
	}
}
