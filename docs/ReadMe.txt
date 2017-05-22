g++ -std=c++1y -O0 -g3 -Wall -c -fmessage-length=0 -Wno-attributes -MMD -MP -MF"src/SuperMarketChain.d" -MT"src/SuperMarketChain.o" -o "src/SuperMarketChain.o" "../src/SuperMarketChain.cpp" 
"src/Clients.d" -MT"src/Clients.o" -o "src/Clients.o" "../src/Clients.cpp"
"src/Coord.d" -MT"src/Coord.o" -o "src/Coord.o" "../src/Coord.cpp"
"src/Date.d" -MT"src/Date.o" -o "src/Date.o" "../src/Date.cpp"
"src/LoadingResources.d" -MT"src/LoadingResources.o" -o "src/LoadingResources.o" "../src/LoadingResources.cpp"
"src/Place.d" -MT"src/Place.o" -o "src/Place.o" "../src/Place.cpp"
"src/Product.d" -MT"src/Product.o" -o "src/Product.o" "../src/Product.cpp"
"src/Purchase.d" -MT"src/Purchase.o" -o "src/Purchase.o" "../src/Purchase.cpp"
"src/Street.d" -MT"src/Street.o" -o "src/Street.o" "../src/Street.cpp
"src/SuperMarketChain.d" -MT"src/SuperMarketChain.o" -o "src/SuperMarketChain.o" "../src/SuperMarketChain.cpp"
"src/Supermarket.d" -MT"src/Supermarket.o" -o "src/Supermarket.o" "../src/Supermarket.cpp"
"src/Transition.d" -MT"src/Transition.o" -o "src/Transition.o" "../src/Transition.cpp"
"src/Travel.d" -MT"src/Travel.o" -o "src/Travel.o" "../src/Travel.cpp"
"src/Truck.d" -MT"src/Truck.o" -o "src/Truck.o" "../src/Truck.cpp"
"src/connection.d" -MT"src/connection.o" -o "src/connection.o" "../src/connection.cpp"
"src/graphviewer.d" -MT"src/graphviewer.o" -o "src/graphviewer.o" "../src/graphviewer.cpp"

g++  -o "supermarket"  ./src/Clients.o ./src/Coord.o ./src/Date.o ./src/LoadingResources.o ./src/Place.o ./src/Product.o ./src/Purchase.o ./src/Street.o ./src/SuperMarketChain.o ./src/Supermarket.o ./src/Transition.o ./src/Travel.o ./src/Truck.o ./src/connection.o ./src/graphviewer.o ./src/main.o   