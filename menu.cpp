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

	Cliente C("Guest");
	UserC = &C;

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
				menuOpcoesCliente(0);
			break;
		case 2:
			menuOpcoesCliente(1);
			break;
		case 3:
			if(adicionaCliente())
				menuOpcoesCliente(0);
			break;
		case 4:
			return true;
		default:
			return false;
		}
	}
}


bool Broker::menuOpcoesCliente(int convidado) {
	int opcao;

	if(convidado){
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
	else {
		while(1){
			if(!atualizaInformacao())
				return false;
			ClearScreen();
			cout << "Menu Cliente: " << endl;
			cout << endl;
			cout << "   " << "1 - Efetuar Reserva" << endl;
			cout << "   " << "2 - Cancelar Reserva" << endl;
			cout << "   " << "3 - Ver Classificacao" << endl;
			cout << "   " << "4 - Eliminar Conta" << endl;
			cout << "   " << "5 - Voltar" << endl << endl;
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
				removeCliente();
				return true;
			case 5:
				return true;
			default:
				return false;
			}
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
			cout << "   " << "2 - Removel Imovel" << endl;
			cout << "   " << "3 - Ver Minhas Ofertas" << endl;
			cout << "   " << "4 - Voltar" << endl << endl;
			cout << "   " << "Qual a sua opcao: ";
			opcao = leUnsignedShortInt(1, 4);

			switch (opcao){
			case 1:
				if(this->adicionaImovel(UserF))
					break;
				break;
			case 2:
				if(this->removeImovel())
					break;
				break;
			case 3:
				if(verOfertas())
					break;
				break;
			case 4:
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
		cout << "   " << "1 - Historico de Reservas" << endl;
		cout << "   " << "2 - Descontos" << endl;
		cout << "   " << "3 - Clientes Inativos" << endl;
		cout << "   " << "4 - Voltar" << endl << endl;
		cout << "   " << "Qual a sua opcao: ";
		opcao = leUnsignedShortInt(1, 4);

		switch (opcao){
		case 1:
			verHistorico();
			break;
		case 2:
			verImoveisInativos();
			break;
		case 3:
		    verInativos(); 
			break;
		case 4:
			return true;
		default:
			continue;
		}
	}
}
