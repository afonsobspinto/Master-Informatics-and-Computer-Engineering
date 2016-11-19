#include <iostream>
#include <fstream>
#include <string>

#include "broker.h"
#include "data.h"
#include "interacao.h"
#include "utils.h"
#include "imovel.h"


using namespace std;


int main() {

	string nome;
	string filename;
	fstream f;

	cout << "Bem-Vindo" << endl << endl;

	cout << "Broker: ";
	getline(cin, nome);

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
		cout << stof(receita_str) << endl;

		cout << endl << endl;

		f.close();

		Broker Existente(nome, ficheiroClientes, ficheiroFornecedores, stof(receita_str));

		cout << endl << endl << endl << endl;

		Data d1 = Data (1,4,2013);
		Data d2 = Data (3,4,2013);

		cout << "Montra 1" << endl;
		Existente.mostraMontra("localidade3");

//		cout << endl << endl << endl << endl;
//		cout << "Montra 2" << endl;
//
//		Existente.mostraMontra("localidade", d1, d2);
//
//		cout << endl << endl << endl << endl;
//		cout << "Montra 3" << endl;
//
//		Existente.mostraMontra(100);
//
//		cout << endl << endl << endl << endl;
//		cout << "Montra 4" << endl;
//
//		Existente.mostraMontra(100, d1, d2);
//
//		cout << endl << endl << endl << endl;
//		cout << "Montra 5" << endl;
//
//		Existente.mostraMontra("localidade", 100, d1, d2);


	}
	else{
		cout << "Gerando base de dados..." << endl;
		Broker Novo(nome);

		if(Novo.adicionaFornecedor())
			cout << "OK" << endl;
		if(Novo.adicionaFornecedor())
			cout << "OK" << endl;
		//Novo.adicionaCliente();
	}

	return 0;

}
