#include "Excecoes.h"
#include "utils.h"
#include <sstream>
#include <iostream>


using namespace std;

string leNome(){
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

	return nome;
}

bool is_number(const string& s)
{
	double num;
	istringstream iss(s);
	return !(iss >> num).fail();
}
