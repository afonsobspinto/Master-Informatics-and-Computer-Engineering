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
