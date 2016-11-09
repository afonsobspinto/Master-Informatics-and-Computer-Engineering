#include "Interacao.h"
#include "utils.h"
#include <iostream>


using namespace std;

Cliente criaCliente(){
	string nome;
	bool erro = false;

	do{
		cout << "Nome: ";
		getline(cin, nome);
		erro = false;

		try{
			if(is_number(nome))
				throw NomeIncorreto(nome);
		}
		catch (NomeIncorreto &e) {
			cout << "Apanhou excecao. Nome Invalido: " << e.getNome() << endl;
			erro = true;
		}
	}while(erro);

	Cliente C (nome);
	return C;
}
