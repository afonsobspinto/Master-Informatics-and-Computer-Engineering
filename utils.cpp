#include "utils.h"
#include <sstream>

using namespace std;

bool is_number(const string& s)
{
	double num;
	istringstream iss(s);
	return !(iss >> num).fail();
}
