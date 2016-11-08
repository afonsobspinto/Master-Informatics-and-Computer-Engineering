#include "Interacao.h"
#include <iostream>

using namespace std;

void criaCliente(){
	string nome;
	cout << "Nome: ";
	try{
	cin >> nome;
	// Ver como atirar throw se nome incorreto
	}
	catch (NomeIncorreto &e) {
			cout << "Apanhou excecao. Nome Invalido: " << e.getNome() << endl;
		}

	cout << "Boa " << nome << endl;
}
