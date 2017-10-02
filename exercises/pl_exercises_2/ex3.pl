exec(x,y):- f(x,y).
exec(x,x):- s(x).
f(x,y):- q(x), r(y).
p(x,y):- s(x), r(y).
q(a).
q(b).
r(c).
r(d).
s(e).