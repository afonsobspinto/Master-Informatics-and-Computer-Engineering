.class public library1
.super java/lang/Object

.method public static max(II)I
.limit locals 3
.limit stack 2
iload_0
iload_1
if_icmple loop0_end

iload_0
istore_2

goto loop0_next
loop0_end:
iload_1
istore_2

loop0_next:
iload_2
ireturn
.end method

.method public static min(II)I
.limit locals 3
.limit stack 2
iload_0
iload_1
if_icmple loop1_end

iload_1
istore_2

goto loop1_next
loop1_end:
iload_0
istore_2

loop1_next:
iload_2
ireturn
.end method


.method static public <clinit>()V 
.limit stack 0
.limit locals 0
return 
.end method 
