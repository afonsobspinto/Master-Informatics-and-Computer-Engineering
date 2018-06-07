.class public array1
.super java/lang/Object

.method public static print_array(I)V
.limit locals 5
.limit stack 20
iload 0
newarray int
astore 2

ldc 0
istore 3

loop11:

iload 3
iload 0
if_icmpge loop11_end

aload 2
iload 3
iload 3
iastore
iload 3
ldc 1
iadd
istore 3
goto loop11

loop11_end:

ldc 0
istore 3

loop25:

iload 3
iload 0
if_icmpge loop25_end

aload 2
iload 3
iaload
istore 4

ldc "a: "
iload 4
invokestatic io/print(Ljava/lang/String;I)V

iload 3
ldc 1
iadd
istore 3
goto loop25

loop25_end:

return
.end method

.method public static main([Ljava/lang/String;)V
.limit locals 1
.limit stack 20
ldc 10
invokestatic array1/print_array(I)V

return
.end method
