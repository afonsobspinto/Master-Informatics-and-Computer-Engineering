#include "Cliente.h"

/*
Classe Cliente 
@novo_id
@novo_nome
@novo_cartaoCliente
@novo_volCompras
*/

Cliente::Cliente(unsigned int novo_id, string novo_nome, Data & novo_cartaoCliente, float novo_volCompras){
	id = novo_id;
	nome = novo_nome;
	cartaoCliente = novo_cartaoCliente;
	volCompras = novo_volCompras;
}

string Cliente::getNome() const{
  return nome;
}

unsigned int Cliente::getId() const{
  return id;
}

float Cliente::getVolCompras() const{
  return volCompras;
}

Data Cliente::getData() const
{
	return cartaoCliente;
}

void Cliente::set_volCompras(float montante)
{
	volCompras = montante;
}

/*
Guarda o ficheiro de clientes
*/

void save(vector<Cliente> &clientes, string fichClients) {

	ofstream ficheiro_clientes(fichClients, ios::trunc);

	ficheiro_clientes << clientes.size() << endl;

	for (size_t i = 0; i < clientes.size(); i++)
	{
		ficheiro_clientes << fixed << setprecision(2) << clientes.at(i).id << " ; " << clientes.at(i).nome << " ; " << clientes.at(i).cartaoCliente << " ; " << clientes.at(i).volCompras << endl;
	}

	ficheiro_clientes.flush();

}

/*
Overload de << para facilitar a visualizaçao de informacao do cliente na consola.
*/

ostream& operator<<(ostream& out, const Cliente & cli){
	out << "Id: " << cli.id << endl;
	out << "Nome: " << cli.nome << endl;
	out << "Data: " << cli.cartaoCliente << endl;
	out << "Volume de Compras: " << fixed << setprecision(2) << cli.volCompras << endl;
	out << endl << SEPARADOR << endl;

	return out;
}

/*
Compara 2 clientes (Um cliente é menor que outro se o seu nome for "alfabeticamente" inferior)
*/

bool operator<(const Cliente &cli1, const Cliente &cli2){
 
	return cli1.getNome() < cli2.getNome();
}

/*
Compara 2 clientes (Um cliente é maior que outro se o seu volume de compras for maior)
*/

bool operator>(const Cliente & cli1, const Cliente & cli2)
{
	return cli1.getVolCompras() > cli2.getVolCompras();
}
