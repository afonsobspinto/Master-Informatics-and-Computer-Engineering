
#ifndef EXCECOES_H_
#define EXCECOES_H_

#include <string>

class NomeIncorreto {
private:
	std::string nome;
public:
	NomeIncorreto(std::string nome){
		this->nome = nome;
	}
	std::string getNome() { return nome; }
};




#endif /* EXCECOES_H_ */
