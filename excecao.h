
#ifndef EXCECOES_H_
#define EXCECOES_H_

#include <string>

class NifInvalido {
private:
	int nif;
public:
	NifInvalido(){};
	NifInvalido(int nif){
		this->nif = nif;
	}
	int getNif() { return nif; }
};

class NomeIncorreto {
private:
	std::string nome;
public:
	NomeIncorreto(std::string nome){
		this->nome = nome;
	}
	std::string getNome() { return nome; }
};

class PasswordNaoCoincide{
public:
	PasswordNaoCoincide(){
	}
};

class UtilizadorJaExistente{
private:
	std::string nome;
public:
	UtilizadorJaExistente(std::string nome){
		this->nome = nome;
	}
	std::string getNome() { return nome; }
};


#endif /* EXCECOES_H_ */
