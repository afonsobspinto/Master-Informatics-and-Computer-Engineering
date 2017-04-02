#pragma once

#include <iostream>
#include <fstream>
#include <string>
#include <vector>

#include "Data.h"
#include "defs.h"

using namespace std;


class Cliente {
private:
	unsigned int id;
	string nome;
	Data cartaoCliente;
	float volCompras;

public:
	Cliente() {};
	Cliente(unsigned int novo_id, string novo_nome, Data & novo_cartaoCliente, float novo_volCompras); 
	string getNome() const;
	unsigned int getId() const;
	float getVolCompras() const;
	Data getData() const;
	void set_volCompras(float montante);
	friend void save(vector<Cliente> & clientes, string fichClients);
	friend ostream& operator<<(ostream& out, const Cliente & cli);  
	friend bool operator<(const Cliente &cli1, const Cliente &cli2); 
	friend bool operator>(const Cliente &cli1, const Cliente &cli2); 
};

