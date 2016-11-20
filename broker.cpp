#include <fstream>
#include <map>

#include "broker.h"
#include "interacao.h"
#include "utils.h"
#include "reserva.h"


using namespace std;

Broker::Broker(std::string nome) {
	this->nome = nome;
	ficheiroClientes = nome + "_clientes.txt";
	ficheiroFornecedores = nome + "_fornecedores.txt";
	receita = 0;

	ofstream ficheiro(nome+".txt");

	ficheiro << nome << endl;
	ficheiro << ficheiroClientes << endl;
	ficheiro << ficheiroFornecedores << endl;
	ficheiro << receita << endl;

	ficheiro.close();
	guardaClientes();
	guardaFornecedores();

}

Broker::Broker(std::string nome, std::string ficheiroClientes,
		std::string ficheiroFornecedores, float receita) {
	this->nome = nome;
	this->receita = receita;
	this->ficheiroClientes = ficheiroClientes;
	this->ficheiroFornecedores = ficheiroFornecedores;
	clientes = leFicheiroClientes();
	fornecedores = leFicheiroFornecedores();
	atualizaMontra();
	//UserC = Cliente("MudarIsto");
	//UserF = Fornecedor("MudarIsto", 123456789, "Madeira");
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

	cout << "Adicionando Cliente" << endl;

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
	guardaClientes();
	return true;
}

bool Broker::adicionaFornecedor() {

	cout << "Adicionando Fornecedor" << endl;

	Fornecedor F = criaFornecedor();

	if (F.getNome() == "" || F.getNif()==0 || F.getMorada() == "" || F.getPassword() == "")
		return false;

	unsigned int size = getFornecedores().size();

	for (unsigned int i = 0; i < size; i++){
		try{
					if(F.getNif() == getFornecedores().at(i).getNif()){
							throw FornecedorJaExistente(F.getNif());
						}
					}
					catch (FornecedorJaExistente &e) {
						cout << "Apanhou excecao." << e.getNif() << " já foi utilizado. \n";
						return false;
					}
	}

	fornecedores.push_back(F);
	adicionaImovel(&fornecedores.back());
	atualizaMontra();
	guardaFornecedores();

	return true;
}

bool Broker::adicionaImovel(Fornecedor *F) {

	cout << "Adicionando Imovel" << endl;
	Imovel *I = criaImovel(F->getNif());
	if(I->getOwner()==0)
		return false;
	F->adicionaOferta(I);

	cout << "Fornecedores Size: " << getFornecedores().size() << endl;
	cout << "Montra Size: " << getMontra().size() << endl;
	guardaFornecedores();
}

bool Broker::atualizaMontra() {
	unsigned int size = fornecedores.size();
	vector<Imovel *> m;

	cout << "Vou atualizar a Montra! " << endl;
	cout << montra.size() << endl;

	for (unsigned int i=0; i<size; i++){
		unsigned int fsize = fornecedores.at(i).getOfertas().size();
		cout << "Estou no elemento " << i << " e o tamano das ofertas é " << fsize << endl;
		for (unsigned int j=0; j<fsize; j++){
			m.push_back(fornecedores.at(i).getOfertas().at(j));
		}
	}
		montra = m;

		cout << "Atualizei Montra! " << endl;
		cout << montra.size() << endl;
	return true;

	// Adicionar return false em caso de erro
}

bool Broker::efectuaReserva(Cliente *C, Imovel *I) {

	cout << "Por Favor indique as datas de inicio e fim da reserva" << endl;
	Data D1 = leData("inicial");
	Data D2 = leData("final");
	swapDatas(&D1,&D2);

	unsigned int size = I->getReservas().size();
	float preco = I->getPreco() * (D2 - D1);

	cout << "A sua reserva est� a ser efetuada" << endl;

	for (unsigned int i=0; i< size; i++){
		Data di = I->getReservas().at(i).getInicio();
		Data df = I->getReservas().at(i).getFinal();
		if (dias_sobrepostos(di,df,D1,D2)==0){
			cout << "O im�vel j� est� reservado nessas datas. Lamentamos" << endl;
			return false;
		}
	}

	C->setPontos(10);
	C->addValor(preco);
	Reserva R = Reserva(D1,D2, I->getPreco());
	C->addReserva(R);
	I->addReservas(R);

	cout << "Reserva efetuada com sucesso" << endl;

	return true;
}

void Broker::taxa() {
	unsigned int size = montra.size();

	for (unsigned int i=0; i < size; i++){
		receita += montra.at(i)->getTaxa();
	}
}

void Broker::classificacao() {
	unsigned int size = clientes.size();

	vector <Registado> vec = clientes;

	vec = ordenaClientes(vec, false);

	for (unsigned int i=0; i < size; i++){
		cout << i+1 << "� Posicao: " << vec.at(i).getNome() << endl;
		cout << endl;
	}
}

bool Broker::cancelaReserva(Cliente *C, Imovel *I, Reserva R, Data& atual) {
//    // Corrigir preco por noite
//	Data L100 = R.getLimite100();
//	Data L50 = R.getLimite50();
//	if (atual < L100){
//		C.subValor(I.getPreco());
//		cout << "Receber� 100% do valor inicial" << endl;
//	}
//	else if (atual < L50){
//		C.subValor(I.getPreco()*0.5);
//		cout << "Receber� 50% do valor inicial" << endl;
//	}
//	else
//		cout << "Reserva cancelada em menos de 15 dias, portanto n�o ir� receber reembolso" << endl;
//
//	I.tirarReserva(R);
//	cout << "Reserva cancelada com sucesso" << endl;
}


bool Broker::validaLoginCliente() {
	unsigned int size = clientes.size();

	ClearScreen();

	string nome = leString("Nome: ");
	string password = lePassword();


	for (unsigned int i = 0; i < size; i++){
		if(clientes.at(i).getNome()==nome)
			if(clientes.at(i).getPassword()==password){
				UserC = (&clientes.at(i));
				return true;
			}
	}
	return false;
}

bool Broker::validaLoginFornecedor() {

	ClearScreen();
	int nif = leNif();
	std::string password = lePassword();

	unsigned int size = fornecedores.size();
	for (unsigned int i = 0 ; i < size; i++){
		if(fornecedores.at(i).getNif() == nif)
			if(fornecedores.at(i).getPassword()==password){

				UserF = (&fornecedores.at(i));
				return true;
			}
	}
	return false;
}

std::vector<Fornecedor> Broker::leFicheiroFornecedores() {

	vector<Fornecedor>fornecedores;
	string linha;
	ifstream ficheiro(ficheiroFornecedores);
	unsigned int size;

	getline(ficheiro, linha);
	size = stoi(linha);


	cout << "Lendo Ficheiro Fornecedores" << endl;

	cout << size << "<-size" << endl;

	string nome;
	int nif;
	string password;
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
		getline(ficheiro, password, ';');
		getline(ficheiro, morada, ';');

		nome = nome.substr(0, nome.length()-1);
		nif = stoi(nif_str);
		password = password.substr(1,password.length()-2);
		owner = nif;
		morada = morada.substr(1, morada.length()-2);

		cout << nome <<"<-nome" << endl;
		cout << password << "<-passowrd"<<endl;
		cout << nif <<"<-nif" << endl;
		cout << morada <<"<-morada" << endl;

		unsigned int ofertas;

		getline(ficheiro, linha, ';');
		ofertas = stoi(linha);


		cout << ofertas <<"<-size_ofertas" << endl;

		vector <Imovel*> imoveis;
		for (unsigned int j=0; j < ofertas; j++){


			getline(ficheiro, localidade, ';');
			getline(ficheiro, tipo, ';');
			getline(ficheiro, preco_str, ';');
			getline(ficheiro, taxa_str, ';');

			localidade = localidade.substr(1,localidade.length()-2);
			tipo = tipo.substr(1,tipo.length()-2);
			preco = stof(preco_str);
			taxa = stof(taxa_str);



			cout << localidade <<"<-localidade" << endl;
			cout << tipo <<"<-tipo" << endl;
			cout << preco <<"<-preco" << endl;
			cout << taxa <<"<-taxa" << endl;

			unsigned int reservas_size;

			getline(ficheiro, linha, ';');
			reservas_size = stoi(linha);

			cout << reservas_size <<"<-reservas_size" << endl;

			vector <Reserva> reservas;

			bool suite;
			bool cozinha;
			bool sala_de_estar;
			int cama;

			string suite_str;
			string cozinha_str;
			string sala_de_estar_str;
			string cama_str;

			bool cama_extra;

			string cama_extra_str;

			for (unsigned int k=0; k < reservas_size; k++){

				getline(ficheiro, dataInicio_str, ';');
				getline(ficheiro, dataFim_str, ';');

				dataInicio = string2data(dataInicio_str.substr(1, dataInicio_str.length()));
				dataFim = string2data(dataFim_str.substr(1, dataFim_str.length()));

				Reserva R(dataInicio, dataFim, preco);
				reservas.push_back(R);

				if(tipo == "Apartamento"){

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

				}

				else if (tipo == "Hotel"){


					getline(ficheiro, cama_str, ';');
					getline(ficheiro, cama_extra_str, ';');


					cama = stoi(cama_str.substr(1,cama_str.length()));
					cama_extra = stoi(cama_extra_str.substr(1,cama_extra_str.length()));

					cout << cama << endl;
					cout << cama_extra << endl;

				}
			}
			if(tipo == "Apartamento"){
				Imovel *I = new Apartamento(localidade, owner, preco, reservas, cama, suite, cozinha, sala_de_estar);
				imoveis.push_back(I);
			}

			else if (tipo == "Hotel"){
				Imovel *I = new Hotel(localidade, owner, preco, reservas, cama, cama_extra);
				imoveis.push_back(I);
			}

			else if(tipo=="Flat"){
				Imovel *I = new Flat(localidade, owner, preco, reservas);
				imoveis.push_back(I);
			}

			else if(tipo=="BB"){
				Imovel *I = new BB(localidade, owner, preco, reservas);
				imoveis.push_back(I);
			}

			else if(tipo=="Shared"){
				Imovel *I = new Shared(localidade, owner, preco, reservas);
				imoveis.push_back(I);
			}

			else{
				cout << "erro na leitura" << endl; //Criar uma exceçao
			}
		}


		Fornecedor F(nome, nif, password, morada, imoveis);

		fornecedores.push_back(F);
	}

	ficheiro.close();

	cout << "Ficheiro Fornecedores Lido Com Sucesso" << endl;
	return fornecedores;
}


std::vector<Registado> Broker::leFicheiroClientes() {

	vector<Registado>clientes;
	string linha;
	ifstream ficheiro(ficheiroClientes);
	unsigned int size;

	cout << endl << "Lendo Ficheiro Clientes" << endl << endl;

	getline(ficheiro, linha);

	cout << linha << "<-size" << endl;

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

		cout << nome<< "<-nome" << endl;
		cout << pontos<< "<-pontos" << endl;
		cout << valor<< "<-valor" << endl;
		cout << password<< "<-Password" << endl;

		Registado C(nome, pontos, valor, password);

		clientes.push_back(C);
	}

	ficheiro.close();

	cout << "Ficheiro Clientes Lido Com Sucesso" << endl;
	return clientes;
}

void Broker::guardaClientes() {

	cout << endl << "Guardando Ficheiro Clientes" << endl << endl;

	ofstream ficheiro(ficheiroClientes, ios::trunc);

	ficheiro << clientes.size() << endl;

	for (size_t i = 0; i < clientes.size(); i++)
	{
		ficheiro << clientes.at(i).getNome()<< " ; " << clientes.at(i).getPontos() << " ; " << clientes.at(i).getValor() << " ; " << clientes.at(i).getPassword() << endl;
	}

	ficheiro.flush();

	cout << "Clientes Guardados com Sucesso! " << endl ;
}

void Broker::guardaFornecedores() {
	cout << endl << "Guardando Ficheiro Fornecedores" << endl << endl;

	ofstream ficheiro(ficheiroFornecedores, ios::trunc);

	ficheiro << fornecedores.size() << endl;

	for (unsigned int  i = 0; i < fornecedores.size(); i++)
	{
		ficheiro << fornecedores.at(i).getNome()<< " ; " << fornecedores.at(i).getNif() << " ; " << fornecedores.at(i).getPassword() << " ; "<< fornecedores.at(i).getMorada()<< " ; " <<
				fornecedores.at(i).getOfertas().size() << " ; ";
		for (unsigned int j = 0; j < fornecedores.at(i).getOfertas().size(); j++){
			vector<Imovel *> ofertas = fornecedores.at(i).getOfertas();

			ficheiro << ofertas.at(j)->getLocalidade() << " ; " << ofertas.at(j)->getTipo() << " ; " << ofertas.at(j)->getPreco() << " ; " << ofertas.at(j)->getTaxa() << " ; " <<
					ofertas.at(j)->getReservas().size() << " ; ";
			for (unsigned int k = 0; k < ofertas.at(j)->getReservas().size(); k++){
				vector<Reserva> reservas = fornecedores.at(i).getOfertas().at(j)->getReservas();
				ficheiro << data2string(reservas.at(k).getInicio()) << " ; " <<
						data2string(reservas.at(k).getFinal()) << " ; ";

				if(ofertas.at(j)->getTipo() == "Apartamento"){
					ficheiro << ofertas.at(j)->getSuite() << " ; " <<
							ofertas.at(j)->getCozinha() << " ; " <<
							ofertas.at(j)->getSala_de_estar() << " ; " <<
							ofertas.at(j)->getQuartos() << " ; " ;
				}
				else if(ofertas.at(j)->getTipo() == "Hotel"){
					ficheiro << ofertas.at(j)->getCama() << " ; " <<
							ofertas.at(j)->getCama_extra() << " ; ";
				}
			}
		}
		ficheiro << endl;
	}

	ficheiro.flush();

	cout << "Fornecedores Guardados com Sucesso! " << endl ;
}


bool Broker::mostraMontra(bool localidade, bool preco, bool datas) {

	string local;
	float precoMax;
	Data D1;
	Data D2;
	Imovel* imovel;

	if(!localidade && !preco && !datas)
		imovel = mostraMontraAux();
	else if(localidade && !preco && !datas){
		 local = leString("Localidade: ");
		 imovel = mostraMontraAux(local);
	}
	else if(!localidade && preco && !datas){
		precoMax = lePreco();
		return mostraMontraAux(preco);
	}
	else if(!localidade && !preco && datas){
		D1 = leData("inicial");
		D2 = leData("final");
		imovel = mostraMontraAux(D1, D2);
	}
	else if(localidade && preco && datas){
		 local = leString("Localidade: ");
		 precoMax = lePreco();
		 Data D1 = leData("inicial");
		 Data D2 = leData("final");
		 imovel = mostraMontraAux(local, preco, D1, D2);
		}

	return efectuaReserva(UserC, imovel);

}


Imovel* Broker::mostraMontraAux() {
	unsigned int size = montra.size();
	unsigned int id = 1;
	unsigned int imovel;

	for (unsigned int i=0; i < size; i++){
		cout << "Imovel: " << id << endl << endl;
		cout << "Tipo: " << montra.at(i)->getTipo() << endl;
		cout << "Localidade: " << montra.at(i)->getLocalidade() << endl;
		cout << "Preço: " << montra.at(i)->getPreco() << endl;
		cout << endl;
		id++;
	}

	cout << "Digite o número do Imovel que pretende reservar." << endl <<
			"(Se quiser sair digite " << id+1 << "): ";

	imovel = leUnsignedShortInt(1, id+1);
	if(imovel == 0){
		Imovel* I = new Imovel("", 0, 0, 0);
		return I;
	}

	return montra.at(imovel-1);

}

Imovel* Broker::mostraMontraAux(std::string localidade) {
	unsigned int size = montra.size();
	map <unsigned int, unsigned int> mapa;
	unsigned int id = 1;
	unsigned int imovel;

	vector <Imovel*> vec = montra;

	vec = ordenaMontra(vec, false);

	for (unsigned int i=0; i < size; i++){
		if(vec.at(i)->getLocalidade()==localidade){
			cout << "Imovel: " << id << endl << endl;
			cout << "Tipo: " << vec.at(i)->getTipo() << endl;
			cout << "Localidade: " << vec.at(i)->getLocalidade() << endl;
			cout << "Preço: " << vec.at(i)->getPreco() << endl;
			cout << endl;
			mapa.insert(pair<unsigned int, unsigned int>(id,i));
			id++;
		}
	}

	cout << "Digite o número do Imovel que pretende reservar." << endl <<
			"(Se quiser sair digite " << id+1 << "): ";
	imovel = leUnsignedShortInt(1, id+1);

	if(imovel == 0){
			Imovel* I = new Imovel("", 0, 0, 0);
			return I;
		}

	return vec.at(mapa.at(imovel));
}

//Imovel* Broker::mostraMontraAux(std::string localidade, Data inicio, Data fim) {
//	unsigned int size = montra.size();
//
//	map <unsigned int, unsigned int> mapa;
//	unsigned int id = 1;
//	unsigned int imovel;
//
//	vector <Imovel*> vec = montra;
//
//	vec = ordenaMontra(vec, false);
//
//	for (unsigned int i=0; i< size; i++){
//		if (vec.at(i)->getLocalidade()==localidade){
//			unsigned int rsize = vec.at(i)->getReservas().size();
//			for (unsigned int j=0; j<rsize; j++){
//				Data di = vec.at(i)->getReservas().at(j).getInicio();
//				Data df = vec.at(i)->getReservas().at(j).getFinal();
//				if (dias_sobrepostos(di,df,inicio,fim)){
//					cout << "Imovel: " << id << endl << endl;
//					cout << "Tipo: " << vec.at(i)->getTipo() << endl;
//					cout << "Localidade: " << vec.at(i)->getLocalidade() << endl;
//					cout << "Preço: " << vec.at(i)->getPreco() << endl;
//					cout << endl;
//					mapa.insert(pair<unsigned int, unsigned int>(id,i));
//					id++;
//				}
//			}
//		}
//	}
//	cout << "Digite o número do Imovel que pretende reservar." << endl <<
//			"(Se quiser sair digite " << id+1 << "): ";
//	imovel = leUnsignedShortInt(1, id+1);
//	if(imovel == 0){
//			Imovel* I = new Imovel("", 0, 0, 0);
//			return I;
//		}
//
//	return montra.at(mapa.at(id));
//}

Imovel* Broker::mostraMontraAux(float preco) {
	unsigned int size = montra.size();

	map <unsigned int, unsigned int> mapa;
	unsigned int id = 1;
	unsigned int imovel;

	vector <Imovel*> vec = montra;

	vec = ordenaMontra(vec, false);

	for (unsigned int i=0; i< size; i++){
		if (vec.at(i)->getPreco() <= preco){
			cout << "Imovel: " << id << endl << endl;
			cout << "Tipo: " << vec.at(i)->getTipo() << endl;
			cout << "Localidade: " << vec.at(i)->getLocalidade() << endl;
			cout << "Preço: " << vec.at(i)->getPreco() << endl;
			cout << endl;
			mapa.insert(pair<unsigned int, unsigned int>(id,i));
			id++;
		}
	}
	cout << "Digite o número do Imovel que pretende reservar." << endl <<
			"(Se quiser sair digite " << id+1 << "): ";
	imovel = leUnsignedShortInt(1, id+1);
	if(imovel == 0){
			Imovel* I = new Imovel("", 0, 0, 0);
			return I;
		}

	return vec.at(mapa.at(imovel));
}

//Imovel* Broker::mostraMontraAux(float preco, Data inicio, Data fim) {
//	unsigned int size = montra.size();
//
//	map <unsigned int, unsigned int> mapa;
//	unsigned int id = 1;
//	unsigned int imovel;
//
//	vector <Imovel*> vec = montra;
//
//	vec = ordenaMontra(vec, false);
//
//	for (unsigned int i=0; i< size; i++){
//		if (vec.at(i)->getPreco()<=preco){
//			unsigned int rsize = vec.at(i)->getReservas().size();
//			for (unsigned int j=0; j<rsize; j++){
//				Data di = vec.at(i)->getReservas().at(j).getInicio();
//				Data df = vec.at(i)->getReservas().at(j).getFinal();
//				if (dias_sobrepostos(di,df,inicio,fim)){
//					cout << "Imovel: " << id << endl << endl;
//					cout << "Tipo: " << vec.at(i)->getTipo() << endl;
//					cout << "Localidade: " << vec.at(i)->getLocalidade() << endl;
//					cout << "Preço: " << vec.at(i)->getPreco() << endl;
//					cout << endl;
//					id++;
//				}
//			}
//		}
//	}
//	cout << "Digite o número do Imovel que pretende reservar." << endl <<
//			"(Se quiser sair digite " << id+1 << "): ";
//	imovel = leUnsignedShortInt(1, id+1);
//	if(imovel == 0){
//			Imovel* I = new Imovel("", 0, 0, 0);
//			return I;
//		}
//
//	return montra.at(mapa.at(id));
//}

//
//Imovel* Broker::mostraMontraAux(std::string localidade, float precoMax) {
//	unsigned int size = montra.size();
//
//	map <unsigned int, unsigned int> mapa;
//	unsigned int id = 1;
//	unsigned int imovel;
//
//	vector <Imovel*> vec = montra;
//
//	vec = ordenaMontra(vec, false);
//
//	for (unsigned int i=0; i< size; i++){
//		if (vec.at(i)->getPreco()<=precoMax && vec.at(i)->getLocalidade()==localidade){
//			cout << "Imovel: " << id << endl << endl;
//			cout << "Tipo: " << vec.at(i)->getTipo() << endl;
//			cout << "Localidade: " << vec.at(i)->getLocalidade() << endl;
//			cout << "Preço: " << vec.at(i)->getPreco() << endl;
//			cout << endl;
//			mapa.insert(pair<unsigned int, unsigned int>(id,i));
//			id++;
//		}
//	}
//	cout << "Digite o número do Imovel que pretende reservar." << endl <<
//			"(Se quiser sair digite " << id+1 << "): ";
//	imovel = leUnsignedShortInt(1, id+1);
//	if(imovel == 0){
//			Imovel* I = new Imovel("", 0, 0, 0);
//			return I;
//		}
//
//	return vec.at(mapa.at(id));
//}

Imovel* Broker::mostraMontraAux(std::string localidade, float preco, Data inicio, Data fim) {
	unsigned int size = montra.size();

	map <unsigned int, unsigned int> mapa;
	unsigned int id = 1;
	unsigned int imovel;

	vector <Imovel*> vec = montra;

	vec = ordenaMontra(vec, false);

	for (unsigned int i=0; i< size; i++){
		if (vec.at(i)->getPreco()<=preco && vec.at(i)->getLocalidade()==localidade){
			unsigned int rsize = vec.at(i)->getReservas().size();
			for (unsigned int j=0; j<rsize; j++){
				Data di = vec.at(i)->getReservas().at(j).getInicio();
				Data df = vec.at(i)->getReservas().at(j).getFinal();
				if (dias_sobrepostos(di,df,inicio,fim)){
					cout << "Imovel: " << id << endl << endl;
					cout << "Tipo: " << vec.at(i)->getTipo() << endl;
					cout << "Localidade: " << vec.at(i)->getLocalidade() << endl;
					cout << "Preço: " << vec.at(i)->getPreco() << endl;
					mapa.insert(pair<unsigned int, unsigned int>(id,i));
					cout << endl;
				}
			}
		}
	}
	cout << "Digite o número do Imovel que pretende reservar." << endl <<
			"(Se quiser sair digite " << id+1 << "): ";
	imovel = leUnsignedShortInt(1, id+1);
	if(imovel == 0){
			Imovel* I = new Imovel("", 0, 0, 0);
			return I;
		}

	return vec.at(mapa.at(imovel));
}


Imovel* Broker::mostraMontraAux(Data inicio, Data fim) {
	unsigned int size = montra.size();

	map <unsigned int, unsigned int> mapa;
	unsigned int id = 1;
	unsigned int imovel;

	vector <Imovel*> vec = montra;

	vec = ordenaMontra(vec, false);

	for (unsigned int i=0; i< size; i++){
		unsigned int rsize = vec.at(i)->getReservas().size();
		for (unsigned int j=0; j<rsize; j++){
			Data di = vec.at(i)->getReservas().at(j).getInicio();
			Data df = vec.at(i)->getReservas().at(j).getFinal();
			if (dias_sobrepostos(di,df,inicio,fim)){
				cout << "Imovel: " << id << endl << endl;
				cout << "Tipo: " << vec.at(i)->getTipo() << endl;
				cout << "Localidade: " << vec.at(i)->getLocalidade() << endl;
				cout << "Preço: " << vec.at(i)->getPreco() << endl;
				mapa.insert(pair<unsigned int, unsigned int>(id,i));
				cout << endl;
			}
		}
	}
	cout << "Digite o número do Imovel que pretende reservar." << endl <<
			"(Se quiser sair digite " << id+1 << "): ";
	imovel = leUnsignedShortInt(1, id+1);
	if(imovel == 0){
			Imovel* I = new Imovel("", 0, 0, 0);
			return I;
		}

	return vec.at(mapa.at(imovel));
}

bool Broker::mostraReservas() {

	vector<Reserva> *reservas = UserC->getReservas();
	unsigned int size = reservas->size();

	unsigned int opcao;

	unsigned int id = 1;

	Data dataAtual = leData("atual: ");

	for (unsigned int i = 0; i < size; i++){
		cout << "Reserva: " << id << endl << endl;
		cout << "Data Inicio: "<< data2string(reservas->at(i).getInicio()) << endl;
		cout << "Data Final: " << data2string(reservas->at(i).getFinal()) << endl;
		cout << "Preço: " << reservas->at(i).getPreco() << endl;
	}

	opcao = leUnsignedShortInt(1, id+1);

	if(opcao==0)
		return false;

	if(reservas->at(opcao).getLimite100() < dataAtual)
		UserC->addValor(-reservas->at(opcao).getPreco());
	else if(reservas->at(opcao).getLimite50() < dataAtual)
		UserC->addValor(-reservas->at(opcao).getPreco()/2);

	reservas->erase(reservas->begin()+opcao);
	return true;

}


Cliente* Broker::getUserC() {
	return UserC;
}



Fornecedor* Broker::getUserF() {
	return UserF;
}
