
#ifndef UTILS_H_
#define UTILS_H_

//Aqui serão colocadas macros fixes. Caso sejam precisas.
// Ou Funçoes Auxiliares.

#include <string>

std::string leNome();

bool is_number(const std::string& s);
bool is_leap(unsigned int ano);
bool is_valid_day(unsigned int dia, unsigned int mes, unsigned int ano);


#endif /* UTILS_H_ */
