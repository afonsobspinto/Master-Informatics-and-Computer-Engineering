#pragma once


#include <iostream>
#include <fstream>
#include <sstream>
#include <string>
#include <map>
#include <vector>

#include "defs.h"


using namespace std;



class Produto {
private:
	string nome;
	float custo;


public:
	Produto(string novo_nome, float novo_custo);
	string getNome() const;
	float getCusto() const;
	friend ostream& operator<<(ostream& out, const Produto & prod); 
	friend bool operator<(const Produto &prod1, const Produto &prod2);
	friend bool operator>(const Produto &prod1, const Produto &prod2);
};