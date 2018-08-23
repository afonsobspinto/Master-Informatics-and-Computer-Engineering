@ECHO OFF

cd ../src

ECHO Testing "array2_err.yal"
java Parser ../yalFiles/yalErrorFiles/array2_err.yal
PAUSE

ECHO Testing "array4_err.yal"
java Parser ../yalFiles/yalErrorFiles/array4_err.yal
PAUSE

ECHO Testing "aval1_err.yal"
java Parser ../yalFiles/yalErrorFiles/aval1_err.yal
PAUSE

ECHO Testing "aval2_err.yal"
java Parser ../yalFiles/yalErrorFiles/aval2_err.yal
PAUSE

ECHO Testing "aval3_err.yal"
java Parser ../yalFiles/yalErrorFiles/aval3_err.yal
PAUSE

ECHO Testing "aval4_err.yal"
java Parser ../yalFiles/yalErrorFiles/aval4_err.yal
PAUSE

ECHO Testing "aval5_err.yal"
java Parser ../yalFiles/yalErrorFiles/aval5_err.yal
PAUSE

ECHO Testing "aval6_err.yal"
java Parser ../yalFiles/yalErrorFiles/aval6_err.yal
PAUSE

ECHO Testing "aval7_err.yal"
java Parser ../yalFiles/yalErrorFiles/aval7_err.yal
PAUSE

ECHO Testing "err1.yal"
java Parser ../yalFiles/yalErrorFiles/err1.yal
ECHO Finished testing
PAUSE