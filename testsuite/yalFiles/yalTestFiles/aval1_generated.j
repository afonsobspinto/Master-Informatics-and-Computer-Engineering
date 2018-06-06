.class public aval1
.super java/lang/Object
.method public static main([Ljava/lang/String;)V
.limit stack 20
.limit locals 2
ldc 2
ldc 3
invokestatic aval1/f(II)I
istore 1
iload 1
invokestatic io/println(I)V
return
.end method
.method public static f(II)I
.limit stack 20
.limit locals 4
iload 0
iload 1
imul
istore 3
iload 2
ireturn
.end method
