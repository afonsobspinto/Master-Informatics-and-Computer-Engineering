#include "Excecoes.h"
#include "utils.h"
#include "linux.h"
#include "Reservas.h"
#include <sstream>
#include <iostream>
#include <fstream>
#include <istream>

using namespace std;



string getpass(const char *prompt, bool show_asterisk=true)
{
  const char BACKSPACE=127;
  const char RETURN=10;

  string password;
  unsigned char ch=0;

  cout <<prompt;

  while((ch=getch())!=RETURN)
    {
       if(ch==BACKSPACE)
         {
            if(password.length()!=0)
              {
                 if(show_asterisk)
                 cout <<"\b \b";
                 password.resize(password.length()-1);
              }
         }
       else
         {
             password+=ch;
             if(show_asterisk)
                 cout <<'*';
         }
    }
  cout <<endl;
  return password;
}

string lePassword(){

	string password;
	string password_repeated;

	password = getpass("Password: ", true);
	password_repeated = getpass("Confirme Password: ", true);
	try{
		if(password != password_repeated){
			throw PasswordNaoCoincide();
		}
	}
	catch (PasswordNaoCoincide &e) {
		cout << "Apanhou excecao. Passwords Não Coincidem. \n";
		return "";
	}

    return password;
}

string leNome(){
	string nome;

	cout << "Nome: ";
	getline(cin, nome);

	try{
		if(is_number(nome))
			throw NomeIncorreto(nome);
	}
	catch (NomeIncorreto &e) {
		cout << "Apanhou excecao. Nome Invalido: " << e.getNome() << endl;
		return "";
	}

	return nome;
}

bool is_number(const string& s)
{
	double num;
	istringstream iss(s);
	return !(iss >> num).fail();
}

bool is_leap(unsigned int ano)
{
	if (((ano % 4 == 0) && (ano % 100 != 0)) || (ano % 400 == 0))
		return true;

	return false;
}

bool is_valid_day(unsigned int dia, unsigned int mes, unsigned int ano)
{
	if (mes == 1 || mes == 3 || mes == 5 || mes == 7 || mes == 8 || mes == 10 || mes == 12)
		if (dia > 0 && dia <= 31)
			return true;
		else
			return false;
	else if (mes != 2)
		if (dia > 0 && dia <= 30)
			return true;
		else
			return false;
	else // mes == 2
		if (is_leap(ano))
			if (dia > 0 && dia <= 29)
				return true;
			else
				return false;
		else
			if (dia > 0 && dia <= 28)
				return true;
			else
				return false;
}

Data string2data(string data){
	unsigned int dia;
	unsigned int mes;
	unsigned int ano;

	dia = stoi(data.substr(0,2));
	mes = stoi(data.substr(3,2));
	ano = stoi(data.substr(6,4));

	cout << dia << "/" << mes << "/" << ano << endl;

	Data D(dia, mes, ano);

	return D;
}

