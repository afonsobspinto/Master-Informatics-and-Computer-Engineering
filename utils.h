
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
unsigned int leNif();

Data string2data(std::string data);
std::string data2string(Data data);
std::string to_string_special(unsigned int num);

bool is_number(const std::string& s);
bool ano_bissexto(unsigned int ano);
bool dia_valido(unsigned int dia, unsigned int mes, unsigned int ano);
bool dias_sobrepostos(Data d1, Data d2, Data d3, Data d4);

std::vector<Imovel*> ordenaMontra(std::vector<Imovel*> &montra, bool HighestFirst = false);


#endif /* UTILS_H_ */
