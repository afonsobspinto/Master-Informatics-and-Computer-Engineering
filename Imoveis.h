#ifndef IMOVEIS_H_
#define IMOVEIS_H_

#include <string>
#include <vector>
#include "Data.h"
#include "Reservas.h"

class Imovel{ // Ponderar classe abstrata
	std::string localidade;
	std::vector <Reserva> reservas;
	std::string tipo;
	int owner;
	unsigned int id;
	static unsigned int counter;
	float preco;
	float taxa;

public:
	Imovel(std::string localidade, int owner, unsigned int id, float preco, float taxa, std::vector <Reserva> indisponiveis = {});
	void setTipo(std::string tipo);
	std::string getTipo() const;
	unsigned int getID() const;
	float getTaxa() const;
};

class Hotel: public Imovel{
	int cama;
	bool cama_extra;
public:
	Hotel(std::string localidade, int owner, unsigned int id, float preco, std::vector <Reserva> indisponiveis = {},int cama=1, bool cama_extra=false);

};

class Apartamento: public Imovel{
	bool suite;
	bool cozinha;
	bool sala_de_estar;
	int cama;
public:
	Apartamento(std::string localidade, int owner, unsigned int id, float preco, std::vector <Reserva> indisponiveis = {}, int cama = 1,
			bool suite=false, bool cozinha=false, bool sala_de_estar = false);
};

class Flat: public Imovel{
public:
	Flat(std::string localidade, int owner, unsigned int id, float preco, std::vector <Reserva> indisponiveis = {});
};

class BB: public Imovel{
public:
	BB(std::string localidade, int owner, unsigned int id, float preco, std::vector <Reserva> indisponiveis = {});
};

class Shared: public Imovel{
public:
	Shared(std::string localidade, int owner, unsigned int id, float preco, std::vector <Reserva> indisponiveis = {});
};


#endif /* IMOVEIS_H_ */
