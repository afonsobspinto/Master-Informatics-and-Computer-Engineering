#include "Transacao.h"

/*
Classe transação.
@novo_id
@nova_data
@nova_lista_produtos
*/

Transacao::Transacao(unsigned int novo_id, Data & nova_data, vector<string> nova_lista_produtos)
{
	idCliente = novo_id;
	data = nova_data;
	lista_produtos = nova_lista_produtos;
}

unsigned int Transacao::getIdCliente() const {
	return idCliente;
}

Data Transacao::getData() const
{
	return data;
}

vector<string> Transacao::getLista_Produtos() const
{
	return lista_produtos;
}

/*
Guarda o ficheiro de transações.
*/
void save(vector<Transacao> &transacoes, string fichTransacoes) {
	
	ofstream ficheiro_transacoes(fichTransacoes, ios::trunc);

	ficheiro_transacoes << transacoes.size() << endl;

	for (size_t i = 0; i < transacoes.size(); i++)
	{
		ficheiro_transacoes << transacoes.at(i).idCliente << " ; " << transacoes.at(i).data << " ; " << vector2string(transacoes.at(i).lista_produtos) << endl;
	}

	ficheiro_transacoes.flush();
}

/*
Overload de << para facilitar a visualizaçao da transaçao na consola.
*/

ostream& operator<<(ostream& out, Transacao & trans)
{
	out << "ID: " << trans.idCliente << endl;
	out << "Data: " << trans.data << endl;
	out << "Produtos: " << vector2string(trans.lista_produtos) << endl;
	out << endl << SEPARADOR << endl;

	return out;
}

/*
Compara 2 transações (Uma transação é menor que outra se a sua data for mais recente)
*/

bool operator<(const Transacao & trans1, const Transacao & trans2)
{
	return trans1.data < trans2.data;
}

/*
Compara 2 transações (Uma transação é maior que outra se a sua data for igual ou menos recente)
*/

bool operator>(const Transacao & trans1, const Transacao & trans2)
{
	return  !(trans1.data < trans2.data);
}
