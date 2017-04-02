#include <iostream>
#include <fstream>
#include <sstream>
#include <vector>
#include <string>

#include "Data.h"
#include "utils.h"



using namespace std;


class Transacao {
private:
	unsigned int idCliente;
	Data data; 
	vector<string> lista_produtos;

public:
	Transacao(unsigned int novo_id, Data & nova_data, vector<string> nova_lista_produtos);
	unsigned int getIdCliente() const;
	Data getData() const;
	vector<string> getLista_Produtos() const;
	friend void save(vector<Transacao>& transacoes, string fichTransacoes);
	friend ostream& operator<<(ostream& out, Transacao & trans);
	friend bool operator<(const Transacao &trans1, const Transacao &trans2); 
	friend bool operator>(const Transacao &trans1, const Transacao &trans2);
};