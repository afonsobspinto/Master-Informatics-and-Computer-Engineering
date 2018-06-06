.class public array1
.super java/lang/Object
.field static t I = 1
.method static public <clinit>()V
return
.end method
.method public static print_array(I)V
.limit stack 20
.limit locals 5
iload_0
newarray int
astore_2
ldc 0
istore_3
loop15:
iload_3
iload_0
if_icmpge loop15_end
aload_2
iload_3
iload_3
iastore 
iload_3
ldc 1
iadd
istore_3
goto loop15
loop15_end:
ldc 0
istore_3
loop29:
iload_3
iload_0
if_icmpge loop29_end
aload_2
iload_3
iaload
istore_4
ldc "a: "
iload_4
invokestatic io/print(Ljava/lang/String;I)V
iload_3
ldc 1
iadd
istore_3
goto loop29
loop29_end:
return
.end method
.method public static main([Ljava/lang/String;)V
.limit stack 20
.limit locals 1
ldc 10
invokestatic array1/print_array(I)V
return
.end method
