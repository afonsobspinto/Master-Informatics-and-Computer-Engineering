.class public programa3
.super java/lang/Object

.method public static f1([I)[I
.limit locals 3
.limit stack 4
iconst_0
istore_1

aload_0
newarray int
astore_2

loop0:

iload_1
aload_0
arraylength
if_icmpge loop0_end

aload_2
iload_1
aload_0
iload_1
iaload
iastore

iinc 1 1
goto loop0

loop0_end:

aload_2
areturn
.end method

.method public static f2(I)[I
.limit locals 2
.limit stack 1
iload_0
newarray int
astore_1

aload_1
areturn
.end method

.method public static main([Ljava/lang/String;)V
.limit locals 5
.limit stack 3
bipush 100
newarray int
astore_0

aload_0
iconst_0
iconst_1
iastore
aload_0
bipush 99
iconst_2
iastore
aload_0
invokestatic programa3/f1([I)[I

astore 4

aload 4
iconst_0
iaload
istore_2

aload 4
bipush 99
iaload
istore_3

ldc "first: "
iload_2
invokestatic io/println(Ljava/lang/String;I)V

ldc "last: "
iload_3
invokestatic io/println(Ljava/lang/String;I)V

bipush 100
invokestatic programa3/f2(I)[I

astore 4

aload 4
iconst_0
iaload
istore_2

aload 4
bipush 99
iaload
istore_3

ldc "first: "
iload_2
invokestatic io/println(Ljava/lang/String;I)V

ldc "last: "
iload_3
invokestatic io/println(Ljava/lang/String;I)V

return
.end method


.method static public <clinit>()V 
.limit stack 0
.limit locals 0
return 
.end method 
