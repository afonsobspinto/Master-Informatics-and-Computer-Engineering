.class public aval5
.super java/lang/Object

.method public static f(II)I
.limit locals 3
.limit stack 2
bipush 10
istore_2

iload_0
iload_1
if_icmpne loop0_end

loop1:

iload_0
iload_2
if_icmpge loop1_end

iinc 0 1
goto loop1

loop1_end:

iload_0
iconst_2
ishl
istore_1

goto loop0_next
loop0_end:
iload_1
iload_0
iadd
istore_1

loop0_next:
iload_1
ireturn
.end method

.method public static main([Ljava/lang/String;)V
.limit locals 2
.limit stack 2
iconst_4
iconst_5
invokestatic aval5/f(II)I

istore_1

iload_1
invokestatic io/println(I)V

iconst_2
iconst_2
invokestatic aval5/f(II)I

istore_1

iload_1
invokestatic io/println(I)V

return
.end method


.method static public <clinit>()V 
.limit stack 0
.limit locals 0
return 
.end method 
