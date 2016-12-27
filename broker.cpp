#include <fstream>
#include <map>
#include <algorithm>
#include <math.h>>


#include "broker.h"
#include "interacao.h"
#include "utils.h"
#include "reserva.h"

using namespace std;

/*
 * Construtor Broker
 */

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

/*
 * Construtor Broker
 */


Broker::Broker(std::string nome, std::string ficheiroClientes,
		std::string ficheiroFornecedores, float receita) {
	this->nome = nome;
	this->receita = receita;
	this->ficheiroClientes = ficheiroClientes;
	this->ficheiroFornecedores = ficheiroFornecedores;
	clientes = leFicheiroClientes();
	fornecedores = leFicheiroFornecedores();
	atualizaMontra();
}

/*
 * Getter Clientes
 */

vector<Registado> Broker::getClientes() const {
	return clientes;
}

/*
 * Getter Montra
 */


vector<Imovel*> Broker::getMontra() const {
	return montra;
}

/*
 * Getter Fornecedores
 */


vector<Fornecedor> Broker::getFornecedores() const {
	return fornecedores;
}

/*
 * Getter Receita
 */


float Broker::getReceita() const {
	return receita;
}

/*
 * Regista um novo Cliente
 */


bool Broker::adicionaCliente() {

	ClearScreen();
	unsigned int size = getClientes().size();
	Registado C = criaCliente();

	if(C.getNome()=="" || C.getPassword()==""){
		cout << "Registo Falhou. Pressione enter para continuar." << endl;
		getch();
		return false;
	}


	for (unsigned int i = 0; i < size; i++){
		try{
			if(C.getNome() == getClientes().at(i).getNome()){
					throw UtilizadorJaExistente(C.getNome());
				}
			}
			catch (UtilizadorJaExistente &e) {
				cout << "Excecao:" << e.getNome() << " já foi utilizado. \n";
				cout << "Pressione enter para continuar." << endl;
				getch();
				return false;
			}
	}

	clientes.push_back(C);
	UserC = &clientes.back();
	guardaClientes();

	cout << "Pressione enter para continuar." << endl;
	getch();

	return true;
}

/*
 * Regista um novo Fornecedor
 */


bool Broker::adicionaFornecedor() {

	ClearScreen();

	Fornecedor F = criaFornecedor();

	if (F.getNome() == "" || F.getNif()==0 || F.getMorada() == "" || F.getPassword() == ""){
		cout << "Registo Falhou. Pressione enter para continuar." << endl;
		getch();
		return false;
	}

	unsigned int size = getFornecedores().size();

	for (unsigned int i = 0; i < size; i++){
		try{
					if(F.getNif() == getFornecedores().at(i).getNif()){
							throw FornecedorJaExistente(F.getNif());
						}
					}
					catch (FornecedorJaExistente &e) {
						cout << "Excecao:" << e.getNif() << " já foi utilizado. \n";
						getch();
						return false;
					}
	}



	fornecedores.push_back(F);
	UserF = &fornecedores.back();
	atualizaMontra();
	guardaFornecedores();

	cout << "Pressione enter para continuar." << endl;
	getch();

	return true;
}

/*
 * Regista um novo Imovel
 * @Param Fornecedor
 */


bool Broker::adicionaImovel(Fornecedor *F) {

	ClearScreen();
	Imovel *I = criaImovel(F->getNif());
	if(I->getOwner()==0)
		return false;
	F->adicionaOferta(I);

	atualizaMontra();
	guardaFornecedores();

	return true;
}

/*
 * Percorre Fornecedores Para atualizar Montra
 *
 */

bool Broker::atualizaMontra() {
	unsigned int size = fornecedores.size();
	vector<Imovel *> m;

	try{
		for (unsigned int i=0; i<size; i++){
			unsigned int fsize = fornecedores.at(i).getOfertas().size();
			for (unsigned int j=0; j<fsize; j++){
				m.push_back(fornecedores.at(i).getOfertas().at(j));
			}
		}
		montra = m;
	}
	catch(...){
		return false;
	}
	return true;
}

/*
 * Concretiza Reserva
 * @Param Cliente, Imovel
 */

bool Broker::efectuaReserva(Cliente *C, Imovel *I) {

	cout << "Por Favor indique as datas de inicio e fim da reserva." << endl << endl;
	Data D1 = leData("inicial");
	if(D1.getDia()==0)
		return false;

	Data D2 = leData("final");
	if(D2.getDia()==0)
			return false;
	swapDatas(&D1,&D2);

	unsigned int size = I->getReservas()->size();
	float preco = I->getPreco() * (D2 - D1);

	for (unsigned int i=0; i< size; i++){
		Data di = I->getReservas()->at(i).getInicio();
		Data df = I->getReservas()->at(i).getFinal();
		if (!dias_nao_sobrepostos(di,df,D1,D2)){
			cout << "O imóvel já está ocupado nessas datas. Lamentamos." << endl;
			getch();
			return false;
		}
	}

	C->setPontos(ceil(0.1*preco));
	C->addValor(preco);

	Reserva R = Reserva(*UserC, D1,D2, I->getPreco());
	I->addReservas(R);

	receita += I->getTaxa()*R.getPreco();
	guardaClientes();
	guardaFornecedores();
	guardaBase();
	atualizaMontra();
	UserC->ultima == D2; // A ultima data em que o Cliente C reservou fica registada
	Fat->adicionaReserva(R); // Adiciona a Reserva ao hist�rico

	cout << endl;
	cout << "Reserva efetuada com sucesso" << endl;
	cout << "Codigo de Cancelamento: " << R.getID();
	getch();
	return true;
}

/*
 * Cancela Reserva
 *
 */

bool Broker::cancelaReserva() {

	ClearScreen();

	string codigo;
	Data atual = string2data(currentDateTime());

	float reembolso=0;

	cout << "Codigo de Cancelamento: " << endl;
	getline(cin, codigo);

	unsigned int size = fornecedores.size();

	for (unsigned int i = 0; i < size; i++){
		for (unsigned int j=0; j < fornecedores.at(i).getOfertas().size(); j++){
			vector <Reserva> *reservas = fornecedores.at(i).getOfertas().at(j)->getReservas();
			for (unsigned int k=0; k < reservas->size(); k++){
				if(reservas->at(k).getID()==codigo){
					if(!(reservas->at(k).getLimite100() < atual)){
						receita -= reservas->at(k).getPreco();
						UserC->addValor(-reservas->at(k).getPreco());
						reembolso =reservas->at(k).getPreco();
					}
					else if(!(reservas->at(k).getLimite50() < atual)){
						receita -= reservas->at(k).getPreco()/2;
						UserC->addValor(-reservas->at(k).getPreco()/2);
						reembolso =reservas->at(k).getPreco()/2;
					}
					UserC->setPontos(-ceil(0.1*reservas->at(k).getPreco()));
					reservas->erase(reservas->begin()+k);

					cout << " Reserva Cancelada!" << endl
							<< "Reembolso de "<< reembolso << endl;
					getch();
					guardaFornecedores();
					guardaClientes();
					guardaBase();
					return true;
				}
			}
		}
	}

	cout << " Reserva Não Cancelada!" << endl;
	getch();
	return false;
}

/*
 * Valida Login Cliente
 *
 */

bool Broker::validaLoginCliente() {
	unsigned int size = clientes.size();


	ClearScreen();


	string nome = leString("Nome: ");

	if(nome==""){
		cout << "Login Falhou. Pressione enter para continuar." << endl;
		getch();
		return false;
	}
	string password = lePassword(false);

	for (unsigned int i = 0; i < size; i++){
		if(clientes.at(i).getNome()==nome){
			if(clientes.at(i).getPassword()==password){
				UserC = (&clientes.at(i));
				cout << "Pressione enter para continuar." << endl;
				getch();
				return true;
			}
		}
	}

	cout << "Login Falhou. Pressione enter para continuar." << endl;
	getch();
	return false;
}

/*
 * Valida Login Fornecedor
 *
 */

bool Broker::validaLoginFornecedor() {

	ClearScreen();
	int nif = leNif();
	if(nif==0){
		cout << "Login Falhou. Pressione enter para continuar." << endl;
		getch();
		return false;
	}

	std::string password = lePassword(false);

	unsigned int size = fornecedores.size();
	for (unsigned int i = 0 ; i < size; i++){
		if(fornecedores.at(i).getNif() == nif){

			if(fornecedores.at(i).getPassword()==password){
				cout << "Pressione enter para continuar." << endl;
				getch();
				UserF = (&fornecedores.at(i));
				return true;
			}
	}}

	cout << "Login Falhou. Pressione enter para continuar." << endl;
	getch();
	return false;
}

/*
 * Le Ficheiro Fornecedores
 *
 */

std::vector<Fornecedor> Broker::leFicheiroFornecedores() {

	vector<Fornecedor>fornecedores;
	string linha;
	ifstream ficheiro(ficheiroFornecedores);
	unsigned int size;

	getline(ficheiro, linha);
	size = stoi(linha);

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

		cout << nome +"1" << endl;
		cout << password +"1" << endl;
		cout << morada +"1" << endl;

		unsigned int ofertas;

		getline(ficheiro, linha, ';');
		ofertas = stoi(linha);

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

			cout << localidade +"1" << endl;
			cout << tipo +"1" << endl;


			unsigned int reservas_size;

			getline(ficheiro, linha, ';');
			reservas_size = stoi(linha);

			vector <Reserva> reservas;

			string id;

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

				getline(ficheiro, id, ';');
				getline(ficheiro, dataInicio_str, ';');
				getline(ficheiro, dataFim_str, ';');

				id = id.substr(1, id.length()-2);
				dataInicio = string2data(dataInicio_str.substr(1, dataInicio_str.length()-1));
				dataFim = string2data(dataFim_str.substr(1, dataFim_str.length()-1));

//				cout << id +"<-ID" << endl;
//				cout << dataInicio_str +"1" << endl;
//				cout << dataFim_str +"1" << endl;

				Reserva R(*UserC, dataInicio, dataFim, preco, id);
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

//					cout << suite << endl;
//					cout << cozinha << endl;
//					cout << sala_de_estar << endl;
//					cout << cama << endl;

				}

				else if (tipo == "Hotel"){


					getline(ficheiro, cama_str, ';');
					getline(ficheiro, cama_extra_str, ';');


					cama = stoi(cama_str.substr(1,cama_str.length()));
					cama_extra = stoi(cama_extra_str.substr(1,cama_extra_str.length()));

//					cout << cama << endl;
//					cout << cama_extra << endl;

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

		}


		Fornecedor F(nome, nif, password, morada, imoveis);

		fornecedores.push_back(F);
	}

	ficheiro.close();

	return fornecedores;
}

/*
 * Le Ficheiro Clientes
 *
 */

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

		nome = nome.substr(0,nome.length()-1);
		pontos = stoi(pontos_str);
		valor = stof(valor_str);
		password = password.substr(1,password.length());

		Registado C(nome, pontos, valor, password);

		clientes.push_back(C);
	}

	ficheiro.close();

	return clientes;
}

/*
 * Guarda Clientes em ficheiro
 */

void Broker::guardaClientes() {


	ofstream ficheiro(ficheiroClientes, ios::trunc);

	ficheiro << clientes.size() << endl;

	for (size_t i = 0; i < clientes.size(); i++)
	{
		ficheiro << clientes.at(i).getNome()<< " ; " << clientes.at(i).getPontos() << " ; " << clientes.at(i).getValor() << " ; " << clientes.at(i).getPassword() << endl;
	}

	ficheiro.flush();

}

/*
 * Guarda Fornecedores em Ficheiro
 */

void Broker::guardaFornecedores() {

	ofstream ficheiro(ficheiroFornecedores, ios::trunc);

	ficheiro << fornecedores.size() << endl;

	for (unsigned int  i = 0; i < fornecedores.size(); i++)
	{
		ficheiro << fornecedores.at(i).getNome()<< " ; " << fornecedores.at(i).getNif() << " ; " << fornecedores.at(i).getPassword() << " ; "<< fornecedores.at(i).getMorada()<< " ; " <<
				fornecedores.at(i).getOfertas().size() << " ; ";

		for (unsigned int j = 0; j < fornecedores.at(i).getOfertas().size(); j++){

			vector<Imovel *> ofertas = fornecedores.at(i).getOfertas();

			ficheiro << ofertas.at(j)->getLocalidade() << " ; " << ofertas.at(j)->getTipo() << " ; " << ofertas.at(j)->getPreco() << " ; " << ofertas.at(j)->getTaxa() << " ; " <<
					ofertas.at(j)->getReservas()->size() << " ; ";

			for (unsigned int k = 0; k < ofertas.at(j)->getReservas()->size(); k++){

				vector<Reserva> *reservas = fornecedores.at(i).getOfertas().at(j)->getReservas();

				ficheiro << reservas->at(k).getID() << " ; " << data2string(reservas->at(k).getInicio()) << " ; " <<
						data2string(reservas->at(k).getFinal()) << " ; ";

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
}

void Broker::guardaBase() {
	ofstream ficheiro(nome+".txt");

		ficheiro << nome << endl;
		ficheiro << ficheiroClientes << endl;
		ficheiro << ficheiroFornecedores << endl;
		ficheiro << receita << endl;

		ficheiro.close();
}

void Broker::classificacao() {

	ClearScreen();
	unsigned int size = clientes.size();
	vector<Registado> vec = clientes;
	vec = ordenaClientes(vec, false);
	for (unsigned int i = 0; i < size; i++) {
		cout << i + 1 << "º: " << vec.at(i).getNome() << " "
				<< vec.at(i).getPontos() << " Pontos" << endl;
		cout << endl;
	}
	getch();
}

/*
 * Mostra Montra
 */

bool Broker::mostraMontra(bool localidade, bool preco, bool datas) {

	string local;
	float precoMax;
	Data D1;
	Data D2;
	Imovel* imovel;

	ClearScreen();

	if(!localidade && !preco && !datas)
		imovel = mostraMontraAux();
	else if(localidade && !preco && !datas){
		 local = leString("Localidade: ");
		 if(local=="")
			 return false;
		 imovel = mostraMontraAux(local);
	}
	else if(!localidade && preco && !datas){
		precoMax = lePreco("Maximo");
		if(precoMax<0)
			return false;
		imovel = mostraMontraAux(precoMax);
	}
	else if(!localidade && !preco && datas){
		D1 = leData("inicial");
		if(D1.getDia()==0)
			return false;
		D2 = leData("final");
		if(D2.getDia()==0)
			return false;
		imovel = mostraMontraAux(D1, D2);
	}
	else if(localidade && preco && datas){
		 local = leString("Localidade: ");
		 if(local == "")
			 return false;
		 precoMax = lePreco("Maximo");
		 if(precoMax < 0)
			 return false;
		 D1 = leData("inicial");
		 if(D1.getDia()==0)
			 return false;
		 D2 = leData("final");
		 if(D2.getDia()==0)
			 return false;
		 imovel = mostraMontraAux(local, precoMax, D1, D2);
		}

	ClearScreen();

	if(imovel->getOwner()==0)
		return false;
	return efectuaReserva(UserC, imovel);

}

/*
 * Mostra Montra Auxiliar
 */

Imovel* Broker::mostraMontraAux() {
	unsigned int size = montra.size();
	unsigned int id = 1;
	unsigned int imovel;

	for (unsigned int i=0; i < size; i++){
		cout << "Imovel: " << id << endl;
		cout << "Tipo: " << montra.at(i)->getTipo() << endl;
		cout << "Localidade: " << montra.at(i)->getLocalidade() << endl;
		cout << "Preço: " << montra.at(i)->getPreco() << endl;
		cout << endl;
		id++;
	}

	if(id==1){
		cout << "Nenhum Imovel Encontrado" << endl;
		getch();
		Imovel* I = new Imovel("", 0, 0, 0);
		return I;
	}

	cout << "Digite o número do Imovel que pretende reservar." << endl <<
			"(Se quiser sair digite " << id << "): ";

	imovel = leUnsignedShortInt(1, id);
	if(imovel == 0 || imovel == id){
		Imovel* I = new Imovel("", 0, 0, 0);
		return I;
	}

	return montra.at(imovel-1);

}

/*
 * Mostra Montra Auxiliar
 */

Imovel* Broker::mostraMontraAux(std::string localidade) {
	unsigned int size = montra.size();
	map <unsigned int, unsigned int> mapa;
	unsigned int id = 1;
	unsigned int imovel;

	vector <Imovel*> vec = montra;

	sort(vec.begin(), vec.end(), ordenaMontra);


	for (unsigned int i=0; i < size; i++){
		if(vec.at(i)->getLocalidade()==localidade){
			cout << "Imovel: " << id << endl;
			cout << "Tipo: " << vec.at(i)->getTipo() << endl;
			cout << "Localidade: " << vec.at(i)->getLocalidade() << endl;
			cout << "Preço: " << vec.at(i)->getPreco() << endl;
			cout << endl;
			mapa.insert(pair<unsigned int, unsigned int>(id,i));
			id++;
		}
	}

	if(id==1){
		cout << "Nenhum Imovel Encontrado" << endl;
		getch();
		Imovel* I = new Imovel("", 0, 0, 0);
		return I;
	}

	cout << "Digite o número do Imovel que pretende reservar." << endl <<
			"(Se quiser sair digite " << id << "): ";
	imovel = leUnsignedShortInt(1, id);

	if(imovel == 0 || imovel == id){
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
//
//	for (unsigned int i=0; i< size; i++){
//		if (vec.at(i)->getLocalidade()==localidade){
//			unsigned int rsize = vec.at(i)->getReservas->size();
//			for (unsigned int j=0; j<rsize; j++){
//				Data di = vec.at(i)->getReservas->at(j).getInicio();
//				Data df = vec.at(i)->getReservas->at(j).getFinal();
//				if (dias_nao_sobrepostos(di,df,inicio,fim)){
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

/*
 * Mostra Montra Auxiliar
 */

Imovel* Broker::mostraMontraAux(float preco) {
	unsigned int size = montra.size();

	map <unsigned int, unsigned int> mapa;
	unsigned int id = 1;
	unsigned int imovel;

	vector <Imovel*> vec = montra;

	sort(vec.begin(), vec.end(), ordenaMontra);

	cout << endl;
	for (unsigned int i=0; i< size; i++){

		if (vec.at(i)->getPreco() <= preco){
			cout << "Imovel: " << id << endl;
			cout << "Tipo: " << vec.at(i)->getTipo() << endl;
			cout << "Localidade: " << vec.at(i)->getLocalidade() << endl;
			cout << "Preço: " << vec.at(i)->getPreco() << endl;
			cout << endl;
			mapa.insert(pair<unsigned int, unsigned int>(id,i));
			id++;
		}
	}

	if(id==1){
		cout << "Nenhum Imovel Encontrado" << endl;
		getch();
		Imovel* I = new Imovel("", 0, 0, 0);
		return I;
	}
	cout << "Digite o número do Imovel que pretende reservar." << endl <<
			"(Se quiser sair digite " << id << "): ";

	imovel = leUnsignedShortInt(1, id);
	if(imovel == 0 || imovel == id){
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
//
//	for (unsigned int i=0; i< size; i++){
//		if (vec.at(i)->getPreco()<=preco){
//			unsigned int rsize = vec.at(i)->getReservas->size();
//			for (unsigned int j=0; j<rsize; j++){
//				Data di = vec.at(i)->getReservas->at(j).getInicio();
//				Data df = vec.at(i)->getReservas->at(j).getFinal();
//				if (dias_nao_sobrepostos(di,df,inicio,fim)){
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

/*
 * Mostra Montra Auxiliar
 */

Imovel* Broker::mostraMontraAux(std::string localidade, float preco, Data inicio, Data fim) {
	unsigned int size = montra.size();

	map <unsigned int, unsigned int> mapa;
	unsigned int id = 1;
	unsigned int imovel;
	bool disponivel;

	vector <Imovel*> vec = montra;

	sort(vec.begin(), vec.end(), ordenaMontra);

	cout << endl;

	for (unsigned int i=0; i< size; i++){
		if (vec.at(i)->getPreco()<=preco && vec.at(i)->getLocalidade()==localidade){
			unsigned int rsize = vec.at(i)->getReservas()->size();
			disponivel = true;
			for (unsigned int j=0; j<rsize; j++){
				Data di = vec.at(i)->getReservas()->at(j).getInicio();
				Data df = vec.at(i)->getReservas()->at(j).getFinal();
				if (dias_nao_sobrepostos(di,df,inicio,fim) && disponivel){
					cout << "Imovel: " << id << endl;
					cout << "Tipo: " << vec.at(i)->getTipo() << endl;
					cout << "Localidade: " << vec.at(i)->getLocalidade() << endl;
					cout << "Preço: " << vec.at(i)->getPreco() << endl;
					mapa.insert(pair<unsigned int, unsigned int>(id,i));
					cout << endl;
					id++;
					break;
				}
				else
					disponivel = false;
			}
		}
	}


	if(id==1){
		cout << "Nenhum Imovel Encontrado" << endl;
		getch();
		Imovel* I = new Imovel("", 0, 0, 0);
		return I;
	}

	cout << "Digite o número do Imovel que pretende reservar." << endl <<
			"(Se quiser sair digite " << id << "): ";
	imovel = leUnsignedShortInt(1, id);
	if(imovel == 0 || imovel == id){
			Imovel* I = new Imovel("", 0, 0, 0);
			return I;
		}

	return vec.at(mapa.at(imovel));
}


/*
 * Mostra Montra Auxiliar
 */

Imovel* Broker::mostraMontraAux(Data inicio, Data fim) {
	unsigned int size = montra.size();

	map <unsigned int, unsigned int> mapa;
	unsigned int id = 1;
	unsigned int imovel;
	bool disponivel;

	vector <Imovel*> vec = montra;

	sort(vec.begin(), vec.end(), ordenaMontra);

	cout << endl;

	for (unsigned int i=0; i< size; i++){
		unsigned int rsize = vec.at(i)->getReservas()->size();
		disponivel = true;
		for (unsigned int j=0; j<rsize; j++){
			Data di = vec.at(i)->getReservas()->at(j).getInicio();
			Data df = vec.at(i)->getReservas()->at(j).getFinal();
			if (dias_nao_sobrepostos(di,df,inicio,fim) && disponivel){
				cout << "Imovel: " << id << endl;
				cout << "Tipo: " << vec.at(i)->getTipo() << endl;
				cout << "Localidade: " << vec.at(i)->getLocalidade() << endl;
				cout << "Preço: " << vec.at(i)->getPreco() << endl;
				mapa.insert(pair<unsigned int, unsigned int>(id,i));
				cout << endl;
				id++;
				break;
			}
			else
				disponivel = false;

		}
	}

	if(id==1){
		cout << "Nenhum Imovel Encontrado" << endl;
		getch();
		Imovel* I = new Imovel("", 0, 0, 0);
		return I;
	}

	cout << "Digite o número do Imovel que pretende reservar." << endl <<
			"(Se quiser sair digite " << id << "): ";
	imovel = leUnsignedShortInt(1, id);
	if(imovel == 0 || imovel == id){
			Imovel* I = new Imovel("", 0, 0, 0);
			return I;
		}

	return vec.at(mapa.at(imovel));
}

/*
 * Getter UtilizadorCliente
 */

Cliente* Broker::getUserC() {
	return UserC;
}

/*
 * Ve Ofertas Utilizador Fornecedor
 */

bool Broker::verOfertas() const {

	ClearScreen();
	unsigned int size = UserF->getOfertas().size();


	for (unsigned int i = 0; i < size; i++){
		cout << "Imovel: " << i+1 << endl;
		cout << "Tipo: " << UserF->getOfertas().at(i)->getTipo() << endl;
		cout << "Localidade: " << UserF->getOfertas().at(i)->getLocalidade() << endl;
		cout << "Preço: " << UserF->getOfertas().at(i)->getPreco() << endl;

		vector <Reserva> *reservas = UserF->getOfertas().at(i)->getReservas();
		cout << "Reservas: ";
		for (unsigned int j = 0; j < reservas->size(); j++ ){
			cout << data2string(reservas->at(j).getInicio()) << " - " <<
					data2string(reservas->at(j).getFinal());
					if(!(j==reservas->size()-1))
						cout << " , ";
		}
		cout << endl << endl;
	}

	cout << endl;
	cout << "Pressione enter para continuar." << endl;
	getch();

	return true;
}

/*
 * Getter UtilizadorFornecedor
 */

Fornecedor* Broker::getUserF() {
	return UserF;
}
