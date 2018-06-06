.class public array2
.super java/lang/Object

.method public static sum_array([I)I
.limit locals 3
.limit stack 3
iconst_0
istore_1

iconst_0
istore_2

loop0:

iload_1
aload_0
arraylength
if_icmpge loop0_end

iload_2
aload_0
iload_1
iaload
iadd
istore_2

iinc 1 1
goto loop0

loop0_end:

iload_2
ireturn
.end method

.method public static main([Ljava/lang/String;)V
.limit locals 4
.limit stack 3
bipush 16
istore_0

iload_0
newarray int
astore_1

iconst_0
istore_2

loop2:

iload_2
iload_0
if_icmpge loop2_end

aload_1
iload_2
iconst_1
iastore
iinc 2 1
goto loop2

loop2_end:

aload_1
invokestatic array2/sum_array([I)I

istore_3

ldc "sum of array elements = "
iload_3
invokestatic io/println(Ljava/lang/String;I)V

return
.end method


.method static public <clinit>()V 
.limit stack 0
.limit locals 0
return 
.end method 
