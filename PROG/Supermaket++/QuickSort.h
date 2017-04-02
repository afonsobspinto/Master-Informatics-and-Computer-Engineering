#pragma once

#include <vector>

using namespace std;

template<class T>

class QuickSort
{
public:
	vector<T> *sortingArray;
	int left;
	int right;

	QuickSort(vector<T> *sortArray, int indexInicial, int indexFinal, bool flag);

	int Particao(vector<T> *sortArray, int indexInicial, int indexFinal, bool flag);
	void Swap(int l, int k);
};

template<class T>
QuickSort<T>::QuickSort(vector<T> *sortArray, int indexInicial, int indexFinal, bool flag)
{
	if (indexInicial >= indexFinal)
	{
		return;
	}

	sortingArray = sortArray;

	left = indexInicial;
	right = indexFinal;

	if (left < right)
	{
		// get pivot
		int pivot = Particao(sortingArray, left, right, flag);

		// ordena lado esquerdo
		QuickSort(sortingArray, left, (pivot - 1), flag);

		// ordena lado direito
		QuickSort(sortingArray, (pivot + 1), right, flag);
	}
}

template<class T>
int QuickSort<T>::Particao(vector<T> *sortArray, int indexInicial, int indexFinal, bool flag)
{
	int l = indexInicial - 1;
	int k = indexFinal;

	if (flag)
	{
		for (int i = indexInicial; i <= k - 1; i++)
		{
			// Procura um valor menor que o atual
			if ((*sortArray).at(i) < (*sortArray).at(k))
			{
				l++;
				Swap(l, i);
			}
		}
	}
	else
	{
		for (int i = indexInicial; i <= k - 1; i++)
		{
			// Procura um valor menor que o atual
			if (!((*sortArray).at(i) > (*sortArray).at(k)))
			{
				l++;
				Swap(l, i);
			}
		}
	}
	
	Swap(l + 1, k);

	return l + 1;
}

template<class T>
void QuickSort<T>::Swap(int l, int k)
{
	swap((*sortingArray).at(l), (*sortingArray).at(k));
}