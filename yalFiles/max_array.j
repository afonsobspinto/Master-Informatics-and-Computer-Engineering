.class public max_array
.super java/lang/Object

.method public static maxarray([I)I
.limit locals 3
.limit stack 3
aload_0
iconst_0
iaload
istore_1

iconst_1
istore_2

loop0:

iload_2
aload_0
arraylength
if_icmpge loop0_end

iload_1
aload_0
iload_2
iaload
if_icmpge loop2_end

aload_0
iload_2
iaload
istore_1

loop2_end:

iinc 2 1
goto loop0

loop0_end:

ldc "max: "
iload_1
invokestatic io/print(Ljava/lang/String;I)V

iload_1
ireturn
.end method

.method public static main([Ljava/lang/String;)V
.limit locals 3
.limit stack 3
bipush 10
newarray int
astore_0

iconst_0
istore_1

loop3:

iload_1
bipush 10
if_icmpge loop3_end

aload_0
iload_1
iload_1
iastore
iinc 1 1
goto loop3

loop3_end:

aload_0
invokestatic max_array/maxarray([I)I

istore_2

return
.end method


.method static public <clinit>()V 
.limit stack 0
.limit locals 0
return 
.end method 
