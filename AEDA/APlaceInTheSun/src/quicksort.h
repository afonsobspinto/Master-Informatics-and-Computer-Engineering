
#ifndef QUICKSORT_H_
#define QUICKSORT_H_

#include <vector>

template<class T>

class QuickSort
{
public:
	std::vector<T> *sortingArray;
	int left;
	int right;

	QuickSort(std::vector<T> *sortArray, int indexInicial, int indexFinal, bool flag);

	int Particao(std::vector<T> *sortArray, int indexInicial, int indexFinal, bool flag);
	void Swap(int l, int k);
};

template<class T>
QuickSort<T>::QuickSort(std::vector<T> *sortArray, int indexInicial, int indexFinal, bool flag)
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
int QuickSort<T>::Particao(std::vector<T> *sortArray, int indexInicial, int indexFinal, bool flag)
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
			// Procura um valor maior que o atual
			if (!((*sortArray).at(i) < (*sortArray).at(k)))
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

	std::swap((*sortingArray).at(l), (*sortingArray).at(k));
}



#endif /* QUICKSORT_H_ */
