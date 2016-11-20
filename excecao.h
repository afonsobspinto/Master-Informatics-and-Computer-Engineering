
#ifndef EXCECAO_H_
#define EXCECAO_H_

#include <string>


class dataInvalida {
private:
	std::string data;
public:
	dataInvalida(std::string data){
		this->data = data;
	}
	std::string getData() { return data; }
};

class PrecoInvalido {
private:
	int preco;
public:
	PrecoInvalido(){};
	PrecoInvalido(int preco){
		this->preco = preco;
	}
	int getPreco() { return preco; }
};

class OpcaoInvalida {
private:
	int opcao;
public:
	OpcaoInvalida(){};
	OpcaoInvalida(int opcao){
		this->opcao = opcao;
	}
	int getOpcao() { return opcao; }
};

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

class FornecedorJaExistente{
private:
	int nif;
public:
	FornecedorJaExistente(int nif){
		this->nif = nif;
	}
	int getNif() { return nif; }
};


#endif /* EXCECAO_H_ */
