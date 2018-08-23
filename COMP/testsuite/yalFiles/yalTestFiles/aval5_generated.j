.class public aval5
.super java/lang/Object
.method public static f(II)I
.limit stack 20
.limit locals 4
iconst_0
istore_2
ldc 10
istore_3
iload_0
iload_1
if_icmpne else_10
loop13:
iload_0
iload_3
if_icmpge loop13_end
iload_0
ldc 1
iadd
istore_0
goto loop13
loop13_end:
iload_0
ldc 2
ishl
istore_1
goto if_10_end
else_10:
iload_1
iload_0
iadd
istore_1
if_10_end:
iload_2
ireturn
.end method
.method public static main([Ljava/lang/String;)V
.limit stack 20
.limit locals 2
ldc 4
ldc 5
invokestatic aval5/f(II)I
istore_1
iload_1
invokestatic io/println(I)V
ldc 2
ldc 2
invokestatic aval5/f(II)I
istore_1
iload_1
invokestatic io/println(I)V
return
.end method
