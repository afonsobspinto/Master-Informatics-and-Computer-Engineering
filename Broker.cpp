#include <fstream>
#include "Broker.h"
#include "Menus.h"
#include "Interacao.h"
#include "utils.h"

using namespace std;

Broker::Broker(std::string nome) {
	this->nome = nome;
	ficheiroClientes = nome + "_clientes.txt";
	ficheiroFornecedores = nome + "_fornecedores.txt";
	receita = 0;
}

Broker::Broker(std::string nome, std::string ficheiroClientes,
		std::string ficheiroFornecedores, float receita) {
	this->nome = nome;
	this->receita = receita;
	clientes = leFicheiroClientes();
	fornecedores = leFicheiroFornecedores();
	atualizaMontra();
}

vector<Registado> Broker::getClientes() const {
	return clientes;
}

vector<Imovel*> Broker::getMontra() const {
	return montra;
}

vector<Fornecedor> Broker::getFornecedores() const {
	return fornecedores;
}

float Broker::getReceita() const {
	return receita;
}

bool Broker::adicionaCliente() {
	unsigned int size = getClientes().size();
	Registado C = criaCliente();

	if(C.getNome()=="" || C.getPassword()=="")
		return false;

	for (unsigned int i = 0; i < size; i++){
		try{
			if(C.getNome() == getClientes().at(i).getNome()){
					throw UtilizadorJaExistente(C.getNome());
				}
			}
			catch (UtilizadorJaExistente &e) {
				cout << "Apanhou excecao." << e.getNome() << " já foi utilizado. \n";
				return false;
			}
	}

	clientes.push_back(C);
	return true;
}

bool Broker::adicionaFornecedor() {
/*	Fornecedor F = criaFornecedor();

	fornecedores.push_back(F);
	atualizaMontra();*/
}

bool Broker::adicionaImovel() {
/*	Imovel *I = criaImovel();

	montra.push_back(I);
	atualizaMontra();
	*/
}

bool Broker::atualizaMontra() {
	int size = fornecedores.size();
	vector<Imovel *> m;

	for (unsigned int i=0; i<size; i++){
		int fsize = fornecedores.at(i).getOfertas().size();
		for (unsigned int j=0; j<fsize; j++){
			m.push_back(fornecedores.at(i).getOfertas().at(j));
		}
	}
		montra = m;
	return true;

	// Adicionar return false em caso de erro
}

bool Broker::efectuaReserva() {
}

void Broker::taxa() {
	int size = montra.size();

	for (unsigned int i=0; i < size; i++){
		receita += montra.at(i)->getTaxa();
	}
}

bool Broker::cancelaReserva(Data& atual) {

}

vector<Imovel*> Broker::Pesquisa() {
}



bool Broker::validaLogin(std::string nome, std::string password) {
}

ostream& operator<<(ostream& out, const Imovel  *imovel){

	cout << "Tipo: " << imovel->getTipo() << endl;
	cout << "Localidade: " << imovel->getLocalidade() << endl;
	cout << "Preço: " << imovel->getPreco() << endl;

	return out;
}

std::vector<Fornecedor> Broker::leFicheiroFornecedores() {

	vector<Fornecedor>fornecedores;
	string linha;
	ifstream ficheiro(ficheiroFornecedores);
	unsigned int size;

	getline(ficheiro, linha);
	size = stoi(linha);


	cout << size << endl;

	string nome;
	int nif;
	string morada;

	string nif_str;

	string localidade;
	int owner;
	float preco;
	float taxa;
	string tipo;

	string preco_str;
	string taxa_str;

	string reservas;

	Data dataInicio;
	Data dataFim;

	string dataInicio_str;
	string dataFim_str;


	for (unsigned int i=0; i < size; i++){

		getline(ficheiro, nome, ';');
		getline(ficheiro, nif_str, ';');
		getline(ficheiro, morada, ';');

		nif = stoi(nif_str);
		owner = nif;
		morada = morada.substr(1, morada.length());

		cout << nome << endl;
		cout << nif << endl;
		cout << morada << endl;

		unsigned int ofertas;

		getline(ficheiro, linha, ';');
		ofertas = stoi(linha);


		cout << ofertas << endl;

		vector <Imovel*> imoveis;
		for (unsigned int j=0; j < ofertas; j++){


			getline(ficheiro, localidade, ';');
			getline(ficheiro, tipo, ';');
			getline(ficheiro, preco_str, ';');
			getline(ficheiro, taxa_str, ';');

			localidade = localidade.substr(1,localidade.length());
			tipo = tipo.substr(1,tipo.length());
			preco = stof(preco_str);
			taxa = stof(taxa_str);



			cout << localidade << endl;
			cout << tipo << endl;
			cout << preco << endl;
			cout << taxa << endl;

			unsigned int reservas_size;

			getline(ficheiro, linha, ';');
			reservas_size = stoi(linha);

			cout << reservas_size << endl;

			vector <Reserva> reservas;
			for (unsigned int k=0; k < reservas_size; k++){

				getline(ficheiro, dataInicio_str, ';');
				getline(ficheiro, dataFim_str, ';');

				dataInicio = string2data(dataInicio_str.substr(1, dataInicio_str.length()));
				dataFim = string2data(dataFim_str.substr(1, dataFim_str.length()));

				Reserva R(dataInicio, dataFim);
				reservas.push_back(R);


			if(tipo == "Apartamento "){
				bool suite;
				bool cozinha;
				bool sala_de_estar;
				int cama;

				string suite_str;
				string cozinha_str;
				string sala_de_estar_str;
				string cama_str;

				getline(ficheiro, suite_str, ';');
				getline(ficheiro, cozinha_str, ';');
				getline(ficheiro, sala_de_estar_str, ';');
				getline(ficheiro, cama_str, ';');


				suite = stoi(suite_str);
				cozinha = stoi(cozinha_str);
				sala_de_estar = stoi(sala_de_estar_str);
				cama = stoi(cama_str);

				cout << suite << endl;
				cout << cozinha << endl;
				cout << sala_de_estar << endl;
				cout << cama << endl;

				Imovel *I = new Apartamento(localidade, owner, preco, reservas, cama, suite, cozinha, sala_de_estar);
				imoveis.push_back(I);

			}

			else if (tipo == "Hotel "){
				int cama;
				bool cama_extra;

				string cama_str;
				string cama_extra_str;

				getline(ficheiro, cama_str, ';');
				getline(ficheiro, cama_extra_str, ';');


				cama = stoi(cama_str.substr(1,cama_str.length()));
				cama_extra = stoi(cama_extra_str.substr(1,cama_extra_str.length()));

				cout << cama << endl;
				cout << cama_extra << endl;

				Imovel *I = new Hotel(localidade, owner, preco, reservas, cama, cama_extra);
				imoveis.push_back(I);

			}
			else if(tipo=="Flat "){
				Imovel *I = new Flat(localidade, owner, preco, reservas);
				imoveis.push_back(I);
			}

			else if(tipo=="BB "){
				Imovel *I = new BB(localidade, owner, preco, reservas);
				imoveis.push_back(I);
			}

			else if(tipo=="Shared "){
				Imovel *I = new Shared(localidade, owner, preco, reservas);
				imoveis.push_back(I);
			}

			else{
				cout << "erro na leitura" << endl; //Criar uma exceçao
			}
			}

		}


		Fornecedor F(nome, nif, morada, imoveis);

		fornecedores.push_back(F);
	}

	return fornecedores;
}


std::vector<Registado> Broker::leFicheiroClientes() {
	vector<Registado>clientes;
	string linha;
	ifstream ficheiro(ficheiroClientes);
	unsigned int size;

	getline(ficheiro, linha);
	size = stoi(linha);

	string nome;
	int pontos;
	float valor;
	string password;
	string pontos_str;
	string valor_str;


	for (unsigned int i=0; i < size; i++){

		getline(ficheiro, nome, ';');
		getline(ficheiro, pontos_str, ';');
		getline(ficheiro, valor_str, ';');
		getline(ficheiro, password);

		pontos = stoi(pontos_str);
		valor = stof(valor_str);
		password = password.substr(1,password.length());

		cout << nome << endl;
		cout << pontos << endl;
		cout << valor << endl;
		cout << password << endl;

		Registado C(nome, pontos, valor, password);

		clientes.push_back(C);
	}

	return clientes;
}

