.class public aval2
.super java/lang/Object

.method public static f(II)I
.limit locals 3
.limit stack 2
iload_0
iload_1
if_icmpne loop0_end

iconst_2
istore_2

loop0_end:

iload_2
ireturn
.end method

.method public static main([Ljava/lang/String;)V
.limit locals 3
.limit stack 2
iconst_2
bipush 12
invokestatic aval2/f(II)I

istore_2

iload_2
invokestatic io/println(I)V

iconst_4
iconst_2
invokestatic aval2/f(II)I

istore_2

iload_2
invokestatic io/println(I)V

iconst_3
istore_2

iconst_4
iconst_2
invokestatic aval2/f(II)I

istore_2

iload_2
invokestatic io/println(I)V

return
.end method


.method static public <clinit>()V 
.limit stack 0
.limit locals 0
return 
.end method 
