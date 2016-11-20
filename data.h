#ifndef DATA_H_
#define DATA_H_

class Data{
 unsigned int dia;
 unsigned int mes;
 unsigned int ano;

public:
  Data() {};
  Data(unsigned int dia, unsigned int mes, unsigned int ano);
  unsigned int getDia ()const;
  unsigned int getMes ()const;
  unsigned int getAno ()const;
  bool operator == (Data & rhs);
  bool operator < (Data & rhs);
  Data operator - (int n);
  Data operator - (Data & rhs);
  void swap (Data *dataInicio, Data *dataFim);
  };

#endif /* DATA_H_ */
