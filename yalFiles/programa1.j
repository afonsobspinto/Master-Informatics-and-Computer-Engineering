.class public programa1
.super java/lang/Object

.field static data [I 
.field static mx I 
.field static mn I 
.method public static det([I)V
.limit locals 7
.limit stack 2
iconst_0
istore_1

aload_0
arraylength
iconst_1
isub
istore_2

loop0:

iload_1
iload_2
if_icmpge loop0_end

aload_0
iload_1
iaload
istore_3

iinc 1 1
aload_0
iload_1
iaload
istore 4

iload_3
iload 4
invokestatic library1/max(II)V

putstatic programa1/mx I
iload_3
iload 4
invokestatic library1/min(II)V

putstatic programa1/mn I
goto loop0

loop0_end:

return
.end method

.method public static main([Ljava/lang/String;)V
.limit locals 1
.limit stack 2
getstatic programa1/data [I
invokestatic programa1/det([I)V

ldc "max: "
getstatic programa1/mx I
invokestatic io/println(Ljava/lang/String;I)V

ldc "min: "
getstatic programa1/mn I
invokestatic io/println(Ljava/lang/String;I)V

return
.end method


.method static public <clinit>()V 
.limit stack 1
.limit locals 1
bipush 100
newarray int 
putstatic programa1/data [I 
return 
.end method 
