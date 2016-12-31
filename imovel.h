#ifndef IMOVEL_H_
#define IMOVEL_H_

#include <string>
#include <vector>

#include "data.h"
#include "reserva.h"

class Imovel{
	std::string localidade;
	std::string tipo;
	unsigned int owner;
	float preco;
	float taxa;
	float desconto;
	Data ultima; // Data da ultima vez que foi reservado
	std::vector <Reserva> reservas;
	static unsigned int counter;


public:
	Imovel(std::string localidade, int owner, float preco, float taxa, std::vector <Reserva> indisponiveis = {});
	void setTipo(std::string tipo);
	std::string getLocalidade() const;
	std::string getTipo() const;
	unsigned int  getOwner() const;
	float getPreco() const;
	float getTaxa() const;
	float getDesconto() const;
	Data getUltima() const;
	void setUltima ();
	void setPreco(float preco);
	void setDesconto(float desconto);

	virtual bool getSuite() const;
	virtual bool getCozinha() const;
	virtual bool getSala_de_estar() const;
	virtual int getCama() const;
	virtual int getQuartos() const;
	virtual bool getCama_extra() const;


	std::vector<Reserva>*getReservas();
	void addReservas(Reserva & R);
	void tirarReserva(Reserva & R);
	bool operator< (Imovel const &rhs) const;

};

class Hotel: public Imovel{
	int cama;
	bool cama_extra;
public:
	Hotel(std::string localidade, int owner, float preco, std::vector <Reserva> indisponiveis = {},int cama=1, bool cama_extra=false);
	int getCama() const;
	bool getCama_extra() const;
};

class Apartamento: public Imovel{
	bool suite;
	bool cozinha;
	bool sala_de_estar;
	int quartos;
public:
	Apartamento(std::string localidade, int owner, float preco, std::vector <Reserva> indisponiveis = {}, int quartos = 1,
			bool suite=false, bool cozinha=false, bool sala_de_estar = false);
	bool getSuite() const;
	bool getCozinha() const;
	bool getSala_de_estar() const;
	int getQuartos() const;
};

class Flat: public Imovel{
public:
	Flat(std::string localidade, int owner, float preco, std::vector <Reserva> indisponiveis = {});

};

class BB: public Imovel{
public:
	BB(std::string localidade, int owner, float preco, std::vector <Reserva> indisponiveis = {});
};

class Shared: public Imovel{
public:
	Shared(std::string localidade, int owner, float preco, std::vector <Reserva> indisponiveis = {});
};

#endif /* IMOVEL_H_ */
