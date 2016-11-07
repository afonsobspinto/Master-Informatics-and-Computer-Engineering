#ifndef IMOVEIS_H_
#define IMOVEIS_H_

#include <string>
#include <vector>
#include "Data.h"

class Imovel{
	std::string localidade;
	std::vector <Data> reservas;
public:
	Imovel(std::string localidade);
};

class Hotel: public Imovel{
	int quartos;
public:
	Hotel(int quartos);

};

class Apartamento: public Imovel{
	bool suite;
	bool cozinha;
	bool sala_de_estar;
	int quartos;
public:
	Apartamento(int quartos = 1);

};

class Flat: public Imovel{
public:
	Flat();
};

class SharedHouse: public Imovel{
public:
	SharedHouse();
};

class BB: public Imovel{
public:
	BB();
};

#endif /* IMOVEIS_H_ */
