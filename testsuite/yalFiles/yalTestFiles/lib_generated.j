.class public lib
.super java/lang/Object
.method public static max(II)I
.limit stack 20
.limit locals 4
iload 0
iload 1
if_icmple else_6
iload 0
istore 3
goto if_6_end
else_6:
iload 1
istore 3
if_6_end:
iload 2
ireturn
.end method
.method public static min(II)I
.limit stack 20
.limit locals 4
iload 0
iload 1
if_icmple else_19
iload 1
istore 3
goto if_19_end
else_19:
iload 0
istore 3
if_19_end:
iload 2
ireturn
.end method
