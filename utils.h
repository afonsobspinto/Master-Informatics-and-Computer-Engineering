
#ifndef UTILS_H_
#define UTILS_H_

//Aqui serão colocadas macros fixes. Caso sejam precisas.
// Ou Funçoes Auxiliares.

#include <string>
#include <vector>

#include "cliente.h"
#include "data.h"
#include "fornecedor.h"
#include "imovel.h"


std::string lePassword();
std::string leNome();

Data string2data(std::string data);

bool is_number(const std::string& s);
bool ano_bissexto(unsigned int ano);
bool dia_valido(unsigned int dia, unsigned int mes, unsigned int ano);
bool dias_sobrepostos(Data d1, Data d2, Data d3, Data d4);


#endif /* UTILS_H_ */
