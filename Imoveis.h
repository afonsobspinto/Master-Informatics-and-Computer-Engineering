#ifndef IMOVEIS_H_
#define IMOVEIS_H_

#include <string>
#include <vector>
#include "Data.h"

class Imovel{
	std::string localidade;
	std::vector <Data> reservas;
	std::string tipo;
public:
	Imovel(std::string localidade, std::vector <Data> indisponiveis = {});
	void setTipo(std::string tipo);
	std::string getTipo() const;
};

class Hotel: public Imovel{
	int cama;
	bool cama_extra;
public:
	Hotel(std::string localidade, std::vector <Data> indisponiveis = {},int cama=1, bool cama_extra=false);

};

class Apartamento: public Imovel{
	bool suite;
	bool cozinha;
	bool sala_de_estar;
	int cama;
public:
	Apartamento(std::string localidade, std::vector <Data> indisponiveis = {}, int cama = 1,
			bool suite=false, bool cozinha=false, bool sala_de_estar = false);
};

class Flat: public Imovel{
public:
	Flat(std::string localidade, std::vector <Data> indisponiveis = {});
};

class SharedHouse: public Imovel{
public:
	SharedHouse(std::string localidade, std::vector <Data> indisponiveis = {});
};

class BB: public Imovel{
public:
	BB(std::string localidade, std::vector <Data> indisponiveis = {});
};

#endif /* IMOVEIS_H_ */
