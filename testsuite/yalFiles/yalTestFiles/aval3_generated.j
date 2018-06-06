.class public aval3
.super java/lang/Object
.method public static f(II)I
.limit stack 20
.limit locals 4
iload_0
iload_1
if_icmplt else_6
ldc 2
istore_3
goto if_6_end
else_6:
ldc 4
istore_3
if_6_end:
iload_2
ireturn
.end method
.method public static main([Ljava/lang/String;)V
.limit stack 20
.limit locals 3
ldc 2
istore_1
ldc 3
istore_2
iload_1
iload_2
invokestatic aval3/f(II)I
istore_1
iload_1
invokestatic io/println(I)V
ldc 6
istore_1
iload_1
iload_2
invokestatic aval3/f(II)I
istore_1
iload_1
invokestatic io/println(I)V
return
.end method
