#include "Excecoes.h"
#include "utils.h"
#include <sstream>
#include <iostream>

#include <termios.h>
#include <unistd.h>


using namespace std;

void SetStdinEcho(bool enable = true)
{
#ifdef WIN32
    HANDLE hStdin = GetStdHandle(STD_INPUT_HANDLE);
    DWORD mode;
    GetConsoleMode(hStdin, &mode);

    if( !enable )
        mode &= ~ENABLE_ECHO_INPUT;
    else
        mode |= ENABLE_ECHO_INPUT;

    SetConsoleMode(hStdin, mode );

#else
    struct termios tty;
    tcgetattr(STDIN_FILENO, &tty);
    if( !enable )
        tty.c_lflag &= ~ECHO;
    else
        tty.c_lflag |= ECHO;

    (void) tcsetattr(STDIN_FILENO, TCSANOW, &tty);
#endif
}

string lePassword(){

	string password;
	string password_repeated;
	SetStdinEcho(false);
	bool erro = false;

	do{
		cout << "Password: ";
		getline(cin, password);
		cout << "Repeat Password: ";
		getline(cin, password_repeated);

		try{
			if(password != password_repeated){
				throw PasswordNaoCoincide();
			}
		}
		catch (PasswordNaoCoincide &e) {
			cout << "Apanhou excecao. Passwords Não Coincidem. ";
			erro = true;
		}
	}while(erro);


	SetStdinEcho();
    return password;
}

string leNome(){
	string nome;
	bool erro = false;

	do{
		cout << "Nome: ";
		getline(cin, nome);
		erro = false;

		try{
			if(is_number(nome))
				throw NomeIncorreto(nome);
		}
		catch (NomeIncorreto &e) {
			cout << "Apanhou excecao. Nome Invalido: " << e.getNome() << endl;
			erro = true;
		}
	}while(erro);

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
