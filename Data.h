#ifndef DATA_H_
#define DATA_H_

class Data{
 unsigned int dia;
 unsigned int mes;
 unsigned int ano;

public:
  Data(unsigned int dia, unsigned int mes, unsigned int ano);
  bool operator == (Data & rhs);
  bool operator < (Data & rhs);
};

#endif /* DATA_H_ */
