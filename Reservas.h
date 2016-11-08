

#ifndef RESERVAS_H_
#define RESERVAS_H_

#include "Data.h"

class Reserva{
	Data inicio;
	Data limite100; //1 mes antes
	Data limite50; //15 dias antes
	Data final;
	float preco;
public:
	Reserva(Data inicio, Data final); // para além da atribuição normal calculará o Preço somehow e os atributos limite
};




#endif /* RESERVAS_H_ */
