
#include <iostream>
#include <fstream>
#include <string>

#include "Broker.h"
#include "Interacao.h"
#include "Data.h"
#include "utils.h"


using namespace std;

int main() {

	string nome;
	string filename;
	fstream f;

	cout << "Bem-Vindo" << endl << endl;

	cout << "Broker: ";
	cin >> nome;

	filename = nome + ".txt";

	f.open(filename);

	if(f.is_open()){
		cout << "Carregando base de dados..." << endl;

		string ficheiroClientes;
		string ficheiroFornecedores;
		string receita_str;
		float receita;

		getline(f, nome);
		getline(f, ficheiroClientes);
		getline(f, ficheiroFornecedores);
		getline(f, receita_str);

		cout << nome << endl;
		cout << ficheiroClientes << endl;
		cout << ficheiroFornecedores << endl;
		cout << receita_str << endl;

		Broker Existente(nome, ficheiroClientes, ficheiroFornecedores, stof(receita_str));

	}
	else{
		cout << "Gerando base de dados..." << endl;
		Broker Novo(nome);
	}

	return 0;

}
