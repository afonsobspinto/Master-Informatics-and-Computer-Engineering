

#ifndef RESERVAS_H_
#define RESERVAS_H_

#include "data.h"
#include "cliente.h"



class Reserva{
	Data inicio;
	Data limite100; //1 mes antes
	Data limite50; //15 dias antes
	Data final;
	float preco;
	Cliente c;

public:
	Reserva(Data inicio, Data final, float preco_por_noite); // para além da atribuição normal calculará o Preço somehow e os atributos limite
	Data getInicio() const;
	Data getFinal() const;
	Data getLimite100() const;
	Data getLimite50() const;
	float getPreco() const;
};




#endif /* RESERVAS_H_ */
