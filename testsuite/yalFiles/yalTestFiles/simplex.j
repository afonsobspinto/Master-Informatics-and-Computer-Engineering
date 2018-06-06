.class public sqrt
.super java/lang/Object

.method public static sqrt()V
	.limit stack 6
	.limit locals 35

istore_0
	ldc "vsqn: "
	iload_0
	invokestatic io/println(Ljava/lang/String;I)V
iload_0
istore_1
bipush 0
istore_2
bipush 0
istore_3
bipush 0
istore_4
bipush 0
istore_5
whilelabel_start0:
iload_-1
bipush 6
if_icmpge whilelabel_end0
iload_2
iload_3
iadd
istore_6
iload_6
bipush 2
istore_7
iload_7
bipush 1
istore_8
iload_3
bipush 1
istore_9
iload_4
bipush 2
istore_10
iload_1
bipush 10
istore_11
iload_11
bipush 3
istore_12
iload_10
iload_12
istore_4
iload_1
bipush 2
istore_1
iload_8
iload_4
if_icmple iflabel0
iload_9
istore_3
iload_2
bipush 2
istore_2
goto ifescape0
iflabel0:
iload_9
bipush 1
istore_3
iload_8
istore_2
ifescape0:
iload_5
bipush 1
iadd
istore_5
goto whilelabel_start0
whilelabel_end0:
	ldc "sqrt: "
	iload_3
	invokestatic io/println(Ljava/lang/String;I)V
return
.end method

.method public static main([Ljava/lang/String;)V
.limit stack 7
.limit locals 2

istore_0
return
.end method

