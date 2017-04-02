#include "Produto.h"

/*
Classe Produto.
@novo_nome
@novo_custo
*/

Produto::Produto(string novo_nome, float novo_custo) // nome ; custo
{
	nome = novo_nome;
	custo = novo_custo;
}

string Produto::getNome() const {
	return nome;
}

float Produto::getCusto() const {
	return custo;
}

/*
Overload de << para facilitar a visualizaçao de informacao do produto na consola.
*/
ostream& operator<<(ostream& out, const Produto & prod) {

	out << "Nome: " << prod.nome << endl;
	out << "Custo: " << prod.custo << endl;
	out << endl << SEPARADOR << endl;

	return out;
}

/*
Compara 2 produtos (Um produto é menor que outro se o seu nome for "alfabeticamente" inferior)
*/

bool operator<(const Produto &prod1, const Produto &prod2){
	return prod1.getNome() < prod2.getNome();
}

/*
Compara 2 produtos (Um produto é máior que outro se o seu nome for "alfabeticamente" superior)
*/

bool operator>(const Produto & prod1, const Produto & prod2)
{
	return prod1.getNome() > prod2.getNome();
}
