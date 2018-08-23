.class public max
.super java/lang/Object

.method public static max(IIIII)I
.limit locals 6
.limit stack 5
iload_0
istore 5

iload 5
iload_1
if_icmpge loop0_end

iload_1
istore 5

loop0_end:

iload 5
iload_2
if_icmpge loop1_end

iload_2
istore 5

loop1_end:

iload 5
iload_3
if_icmpge loop2_end

iload_3
istore 5

loop2_end:

iload 5
iload 4
if_icmpge loop3_end

iload 4
istore 5

loop3_end:

iload 5
ireturn
.end method

.method public static main([Ljava/lang/String;)V
.limit locals 2
.limit stack 5
iconst_1
iconst_2
iconst_3
iconst_4
iconst_3
invokestatic max/max(IIIII)I

istore_1

iload_1
invokestatic io/println(I)V

iconst_1
bipush 6
iconst_3
iconst_4
iconst_5
invokestatic max/max(IIIII)I

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
