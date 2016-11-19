
#ifndef UTILS_H_
#define UTILS_H_

//Aqui serão colocadas macros fixes. Caso sejam precisas.
// Ou Funçoes Auxiliares.

#include <string>
#include <vector>
#include "quicksort.h"

#include "cliente.h"
#include "data.h"
#include "fornecedor.h"
#include "imovel.h"


std::string lePassword();
std::string leNome();

Data string2data(std::string data);

bool is_number(const std::string& s);
bool is_leap(unsigned int ano);
bool is_valid_day(unsigned int dia, unsigned int mes, unsigned int ano);

std::vector<Imovel*> ordenaMontra(std::vector<Imovel*> &montra, bool HighestFirst = false);


#endif /* UTILS_H_ */
