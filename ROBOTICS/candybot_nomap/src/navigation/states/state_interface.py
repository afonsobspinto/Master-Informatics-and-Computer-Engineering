from interface import Interface


class StateInterface(Interface):

    def move(self):
        """
        Abstract move function
        Handles the movement actions of a given state
        """
        pass
