;Autor: Afonso Pinto - up201503316
;Data: 22/12/2015 - 26/12/2015
;Projeto: Poker - Five-card draw

;;;;;;;;;
;Jogador;
;;;;;;;;;

;Questiona o nome ao utilizador
(define name
  (lambda ()
    (display "Nome: ")
    (read)))

(define cria-jogador
  (lambda ()
    (list (cons (name) 1000) ())))

;Seletores

(define nome
  (lambda (jogador)
    (car (car jogador))))

(define dinheiro
  (lambda (jogador)
    (cdr (car jogador))))

(define mao
  (lambda (jogador)
    (car (cdr jogador))))


;Gera 5 cartas aletorias sem repetição

(define cria-mao-jogador
  (lambda ()
    (letrec (
             (aux
              (lambda (lista)
                (let (
                      (carta (list-ref baralho (random 52)))
                      )
                  (if (= (length lista) 5)
                      (set-car! (cdr Player1) lista)
                      (if (member carta lista)
                          (aux lista)
                          (aux (append lista (list carta))))))))
             )
      (aux (car (cdr Player1))))))


;;;;;
;CPU;
;;;;;

;Gera 5 Cartas Aleatórias sem repetição e sem repetir com as da mao do jogador

(define cria-mao-cpu
  (lambda ()
    (letrec (
             (aux
              (lambda (lista)
                (let (
                      (carta (list-ref baralho (random 52)))
                      (mao-jogador (car (cdr Player1)))
                      )
                  (if (= (length lista) 5)
                      (set-car! (cdr CPU) lista)
                      (if (or (member carta lista) (member carta mao-jogador))
                          (aux lista)
                          (aux (append lista (list carta))))))))
             )
      (aux (car (cdr CPU))))))

;;;;;;;;
;Cartas;
;;;;;;;;

;Gera uma carta nova
(define nova-carta
  (lambda ()
    (let (
          (carta (list-ref baralho (random 52)))
          )
      (if (not (or (member carta (mao CPU)) (member carta (mao Player1))))
          carta
          (nova-carta)))))

;Cria um Baralho

(define baralho (list
                 '(as paus)
                 '(rei paus)
                 '(dama paus)
                 '(valete paus)
                 '(10 paus)
                 '(9 paus)
                 '(8 paus)
                 '(7 paus)
                 '(6 paus)
                 '(5 paus)
                 '(4 paus)
                 '(3 paus)
                 '(2 paus)
                 '(as espadas)
                 '(rei espadas)
                 '(dama espadas)
                 '(valete espadas)
                 '(10 espadas)
                 '(9 espadas)
                 '(8 espadas)
                 '(7 espadas)
                 '(6 espadas)
                 '(5 espadas)
                 '(4 espadas)
                 '(3 espadas)
                 '(2 espadas)
                 '(as ouros)
                 '(rei ouros)
                 '(dama ouros)
                 '(valete ouros)
                 '(10 ouros)
                 '(9 ouros)
                 '(8 ouros)
                 '(7 ouros)
                 '(6 ouros)
                 '(5 ouros)
                 '(4 ouros)
                 '(3 ouros)
                 '(2 ouros)
                 '(as copas)
                 '(rei copas)
                 '(dama copas)
                 '(valete copas)
                 '(10 copas)
                 '(9 copas)
                 '(8 copas)
                 '(7 copas)
                 '(6 copas)
                 '(5 copas)
                 '(4 copas)
                 '(3 copas)
                 '(2 copas)))

;;;;;;;;
;Outros;
;;;;;;;;

;Utilizado como auxiliar no digitos-repetidos
(define num->list
  (lambda (num)
    (letrec (
             (aux
              (lambda (lista nume)
                (if (zero? nume)
                    (reverse lista)
                    (if (< nume 10)
                        (append lista (list nume))
                        (aux (append lista (list (remainder nume 10))) (quotient nume 10))))))
             )
      (aux () num))))

;Utilizado na Trocar-Cartas
(define digitos-repetidos?
  (lambda (numero)
    (letrec (
             (lista_num (num->list numero))
             (aux
              (lambda (termo lista)
                (if (null? lista)
                    #f
                    (if (member termo lista)
                        #t
                        (aux (car lista) (cdr lista))))))
             )
      (aux (car lista_num) (cdr lista_num)))))

;Utilizado no Calc-Max-Especial
(define elimina-todas-ocorrencias 
  (lambda (lista elem)
  (if (null? lista)
      lista
      (if (equal? (car lista) elem)
          (elimina-todas-ocorrencias (cdr lista) elem)
          (cons (car lista) (elimina-todas-ocorrencias (cdr lista) elem))))))

;Auxiliar em diversos procedimentos
(define list-set!
  (lambda (list pos new_val)
    (if (zero? pos)
        (set-car! list new_val)
        (list-set! (cdr list) (sub1 pos) new_val))))

;Utilizado no Trocar-Cartas
(define inverse_find_digit_bigger_than
  (lambda (number higher_digit)
    (letrec (
             (aux
              (lambda (n)
                (if (zero? n)
                    #t
                    (if (> (remainder n 10) higher_digit)
                        #f
                        (aux (quotient n 10))))))
             )
      (aux number))))

;Utilizado para verificar se é sequência
(define ordena-crescente
  (lambda (sequencia)
    (if (null? sequencia)
        sequencia
        (if (= (car sequencia) (apply min sequencia))
            (cons (car sequencia) (ordena-crescente (cdr sequencia)))
            (ordena-crescente (append (cdr sequencia) (list (car sequencia))))))))

;Auxiliar nos procedimentos que fazem display
(define apresenta-mao
  (lambda (mao)
    (display (list-ref mao 0))
    (display " ")
    (display (list-ref mao 1))
    (display " ")
    (display (list-ref mao 2))
    (display " ")
    (display (list-ref mao 3))
    (display " ")
    (display (list-ref mao 4))))


(define menu
  (lambda (x)
    (begin
      (newline)
      (newline)
      (display "Dinheiro ")
      (display (nome Player1))
      (display ": ")
      (display (dinheiro Player1))
      (display "€")
      (newline)
      (newline)
      (display "Dinheiro CPU: ")
      (display (dinheiro CPU))
      (display "€")
      (newline)
      (newline)
      (display "Mão: ")
      (apresenta-mao (mao Player1))
      (newline)
      (newline)
      (if (= x 2)
          (begin
            (display "Valor da Mesa: ")
            (display ValorDaMesa)
            (newline)
            (newline)))
          )))
      
      


;;;;;;;;;;;;
;Constantes;
 ;Iniciais;
;;;;;;;;;;;;

(newline)
(define Player1 (cria-jogador))
(newline)
(display "Ola ")
(display (nome Player1))
(display ", escreve (Jogo) na consola para começar a partida.")
(newline)
(newline)
(display "O Buy In são 10€.")
(newline)
(newline)
(display "-----------------------------------------------------")
(define CPU (list (cons 'CPU 1000) ()))
(define ValorDaMesa 0)
(define CallHelper 0)
(define CallFlag 0)
(define fase 0)

;;;;;;
;Jogo;
;;;;;;

;Procedimento que gere as diversas fases do jogo

(define Jogo-Helper
  (lambda (aposta aposta_cpu flag)
    (letrec (
             (Inicio
              (lambda ()
                (list-set! Player1 1 ());Faz reset à mao do jogador
                (list-set! CPU 1 ());Faz reset à mao do cpu
                (set-cdr! (car Player1) (-  (dinheiro Player1) 10)) ;Pagamento do BuyIn
                (set-cdr! (car CPU) (- (dinheiro CPU) 10)) ;Pagamento do BuyIn CPU
                (cria-mao-jogador)
                (cria-mao-cpu)
                (set! fase 0) ;Faz reset à fase
                (set! CallHelper 0) ;Faz reset ao CallHelpe
                (set! CallFlag 0) ;Faz reset ao CallFlag
                (set! ValorDaMesa 20) ;Alteração do Valor da Mesa para 20 (BuyIn do Jogador e do CPU)
                (display "-----------------------------------------------------")
                (menu 1)
                (display "Opções: ")
                (newline)
                (display "a) (Passar) ")
                (newline)
                (display "b) (Apostar) ")
                (newline)
                (newline)
                (display "-----------------------------------------------------")
                (newline)))
             (Call_CPU_Especial
              (lambda ()
                (set! ValorDaMesa (+ ValorDaMesa aposta aposta_cpu)) ;Atualiza o ValorDaMesa com Base nas apostas do CPU e do jogador
                (set-cdr! (car CPU) 0) ;Coloca o CPU sem dinheiro
                (newline)
                (newline)
                (display "CPU fez All-In.")
                (newline)
                (newline)
                (display "-----------------------------------------------------")
                (menu2)
                (display "Opções: ")
                (newline)
                (display "a) (Trocar-Cartas)")
                (newline)
                (display "b) (Manter-Cartas)")
                (newline)
                (newline)
                (display "-----------------------------------------------------")
                (newline)))
             (Call_CPU
              (lambda ()
                (set! ValorDaMesa (+ aposta aposta_cpu ValorDaMesa)) ;Atualiza o ValorDaMesa com Base nas apostas do CPU e do jogador
                (newline)
                (newline)
                (display "CPU fez Call.")
                (newline)
                (newline)
                (display "-----------------------------------------------------")
                (menu 2)
                (display "Opções: ")
                (newline)
                (display "a) (Trocar-Cartas)")
                (newline)
                (display "b) (Manter-Cartas)")
                (newline)
                (newline)
                (display "-----------------------------------------------------")
                (newline)))
             (Bet
              (lambda ()
                (newline)
                (newline)
                (display "CPU apostou mais ")
                (set! CallHelper aposta_cpu) ;Atualiza o CallHelper para o valor da possivel jogada call
                (set-cdr! (car CPU) (- (dinheiro CPU) aposta_cpu)) ;Tira o Dinheiro ao CPU
                (display CallHelper) ;Mostra quanto é que o CPU apostou
                (display "€.")
                (set! ValorDaMesa (+ ValorDaMesa (* 2 aposta) aposta_cpu)) ;Atualiza o ValorDaMesa com Base nas apostas do CPU e do jogador
                (newline)
                (newline)
                (display "-----------------------------------------------------")
                (menu 2)
                (display "Opções: ")
                (newline)
                (display "a) (Call)")
                (newline)
                (display "b) (Desistir)")
                (newline)
                (newline)
                (display "-----------------------------------------------------")
                (newline)))
             (Check
              (lambda ()
                (newline)
                (newline)
                (display "CPU fez Check. ")
                (newline)
                (newline)
                (display "-----------------------------------------------------")
                (menu 2)
                (display "Opções: ")
                (newline)
                (display "a) (Trocar-Cartas)")
                (newline)
                (display "b) (Manter-Cartas)")
                (newline)
                (newline)
                (display "-----------------------------------------------------")
                (newline)))
             (Quit
              (lambda ()
                (begin
                  (set! ValorDaMesa (+ ValorDaMesa aposta aposta_cpu))
                  (newline)
                  (newline)
                  (display "-----------------------------------------------------")
                  (newline)
                  (newline)
                  (display "O CPU desistiu. Ganhaste ")
                  (display ValorDaMesa)
                  (display "€. Parabéns!")
                  (newline)
                  (newline)
                  (set-cdr! (car Player1) (+  (dinheiro Player1) ValorDaMesa))
                  (display "Dinheiro ")
                  (display (nome Player1))
                  (display ": ")
                  (display (dinheiro Player1))
                  (display "€")
                  (newline)
                  (newline)
                  (display "Dinheiro CPU: ")
                  (display (dinheiro CPU))
                  (display "€")
                  (newline)
                  (newline)
                  (display "-----------------------------------------------------")
                  (newline)
                  (newline)
                  (display "(Jogo) para continuar")
                  (newline)
                  (newline)
                  (display "(Novo-Jogo) ou F5 para reiniciar")
                  (newline)
                  (newline)
                  (display "-----------------------------------------------------"))))
             (All_In
              (lambda ()
                (set-cdr! (car CPU) 0)
                (set! ValorDaMesa (+ ValorDaMesa aposta aposta_cpu)) ;Atualiza o ValorDaMesa com Base nas apostas do CPU e do jogador
                (newline)
                (newline)
                (display "CPU fez All-In.")
                (newline)
                (newline)
                (avalia-vencedor (mao Player1) (mao CPU))))
             (Call_Final
              (lambda ()
                (set! ValorDaMesa (+ ValorDaMesa aposta aposta_cpu)) ;Atualiza o ValorDaMesa com Base nas apostas do CPU e do jogador
                (newline)
                (newline)
                (display "CPU fez Call.")
                (newline)
                (newline)
                (avalia-vencedor (mao Player1) (mao CPU))))
             (Bet_Final
              (lambda ()
                (newline)
                (newline)
                (display "CPU apostou mais ")
                (set! CallHelper aposta_cpu) ;Atualiza o CallHelper para o valor da possivel jogada call
                (set-cdr! (car CPU) (- (dinheiro CPU) aposta_cpu)) ;Tira o Dinheiro da apostacpu ao cpu
                (display CallHelper) ;Mostra quanto é que o CPU apostou
                (display "€.")
                (set! ValorDaMesa (+ ValorDaMesa (* 2 aposta) aposta_cpu)) ;Atualiza o ValorDaMesa com Base nas apostas do CPU e do jogador
                (newline)
                (newline)
                (display "-----------------------------------------------------")
                (menu 2)
                (display "Opções: ")
                (newline)
                (display "a) (Call)")
                (newline)
                (display "b) (Desistir)")
                (newline)
                (newline)
                (display "-----------------------------------------------------")
                (newline)))
             (Check_Final
              (lambda ()
                (newline)
                (newline)
                (display "CPU fez Check. ")
                (newline)
                (newline)
                (avalia-vencedor (mao Player1) (mao CPU))))
                )
      (cond ((= flag 0) (Inicio))
            ((= flag 1) (Call_CPU))
            ((= flag 2) (Bet))
            ((= flag 3) (Quit))
            ((= flag 4) (Check))
            ((= flag 5) (Call_Final))
            ((= flag 6) (Bet_Final))
            ((= flag 7) (Check_Final))
            ((= flag 8) (All_In))
            ((= flag 9) (Call_CPU_Especial))))))


;Procedimento que inicia o jogo
(define Jogo
  (lambda ()
    (if (and (>= (dinheiro CPU) 10) (>= (dinheiro Player1) 10))
        (Jogo-Helper 0 0 0)
        (if (positive? (dinheiro Player1))
            (begin
              (display "-----------------------------------------------------")
              (newline)
              (newline)
              (display "Muitos Parabéns. Fez o CPU ficar sem dinheiro para o buy in! (Novo-Jogo)")
              (newline)
              (newline)
              (display "-----------------------------------------------------"))
            (begin
              (display "-----------------------------------------------------")
              (newline)
              (newline)
              (display "Não podes jogar sem os 10€ mínimos. Podes tentar um (Novo-Jogo).")
              (newline)
              (newline)
              (display "-----------------------------------------------------"))))))

;Procedimento que reseta o jogo à fase de origem. Guarda o nome do utilizador.
(define Novo-Jogo
  (lambda ()
    (begin
      (set! Player1 (list (cons (nome Player1) 1000) ()))
      (set! CPU (list (cons 'CPU 1000) ()))
      (set! ValorDaMesa 0)
      (set! CallHelper 0)
      (set! CallFlag 0)
      (set! fase 0)
      (Jogo))))
    
;Opção durante o jogo
(define Passar
  (lambda ()
    (if (null? (mao Player1)) ;Evitar que Passem sem o jogo ter começado 
          (begin
            (newline)
            (display "Eu disse (Jogo) espertalhão.")
            (newline)
            (newline))
          (begin
                (display "-----------------------------------------------------")
                (newline)
                (newline)
                (display "Passou. ")
                (if (zero? fase)  ;identifica em que ponto do jogo estamos
                    (AI-Helper ValorDaMesa (random 10) 1 0) ;Fase Inicial
                    (AI-Helper ValorDaMesa (random 10) 2 0)))))) ;Fase Final

;Opção durante o jogo
(define Apostar
  (lambda ()
    (let (
          (aposta (read))
          )
      (if (null? (mao Player1)) ;Evitar que façam Apostas fora do jogo. 
          (begin
            (newline)
            (display "Eu disse (Jogo) espertalhão.")
            (newline)
            (newline))
          (if (and (number? aposta) (or (positive? aposta) (zero? aposta))) ;Confirmar Validade da Aposta
              (if (> aposta (dinheiro Player1))
                  (begin
                    (newline)
                    (display "O valor inserido excede o dinheiro que tem.")
                    (newline)
                    (display "Por Favor insira um valor entre 0 e ")
                    (display (dinheiro Player1))
                    (display " (inclusive)")
                    (newline)
                    (Apostar))
                  (if (zero? (dinheiro CPU))
                      (begin
                        (display "O CPU já está sem dinheiro. A sua aposta será transformada em Check.")
                        (newline)
                        (Passar)
                        (newline))
                      (begin
                        (display "-----------------------------------------------------")
                        (newline)
                        (newline)
                        (display "Apostou ")
                        (display aposta)
                        (display "€.")
                        (set-cdr! (car Player1) (-  (dinheiro Player1) aposta)) ;Retirar o Dinheiro ao Jogador à aposta
                        (if (zero? fase) ;Seleciona em que momento do jogo estamos (BetInicial ou BetFinal)
                            (AI-Helper aposta (random 10) 1 1)
                            (AI-Helper aposta (random 10) 2 1)))))
              (begin
                (display "Valor Incorreto. Por Favor insira o numero positivo que corresponde ao valor da sua aposta.")
                (newline)
                (Apostar)))))))
  

;;;;;;;;;;;;;;;;;;;;;;;;;;
;"Inteligencia" Artificial
;;;;;;;;;;;;;;;;;;;;;;;;;;

;Gera as ações do CPU com base na sua mão mas ainda com alguma aleatoriadade para nao existir um padrão fixo no jogo.

(define AI-Helper
  (lambda (aposta cpu_flag bet_flag options_flag)
    (if (= options_flag 1) ;Chegou aqui vindo de uma Aposta
        (if (= bet_flag 1) ; Estamos na 1ª Bet
            (begin
              (set! fase 1)
              (if (< aposta (dinheiro CPU)) ; Verifica se o CPU tem dinheiro para a aposta
                  (cond (
                         (and (= (hand-power (mao CPU)) 0)(< cpu_flag 6)) (begin
                                                                            (set! CallFlag 1) ;O Proximo Call do Player1 é final
                                                                            (set-cdr! (car CPU) (- (dinheiro CPU) aposta)) ;Retira o Dinheiro do Call ao CPU
                                                                            (Jogo-Helper aposta aposta 1))) ;CPU Faz Call
                        ((zero? (dinheiro Player1)) (Jogo-Helper aposta aposta 1)) ;Se o Player1 nao tiver dinheiro nao faz sentido fazer bet
                        ((or (> (hand-power (mao CPU)) 2) (and (> (hand-power (mao CPU)) 0) (< cpu_flag 4))) (begin
                                                                            (set-cdr! (car CPU) (- (dinheiro CPU) aposta)) ;Retira o Dinheiro do Call ao CPU
                                                                            (Jogo-Helper aposta (add1 (random (inexact->exact(dinheiro CPU)))) 2))) ;CPU Faz Bet
                        ((< cpu_flag 8) (begin
                                          (set! CallFlag 1) ;O Proximo Call do Player1 é final
                                          (set-cdr! (car CPU) (- (dinheiro CPU) aposta)) ;Retira o Dinheiro do Call ao CPU
                                          (Jogo-Helper aposta aposta 1))) ;CPU Faz Call
                        ((< cpu_flag 9) (begin
                                          (set-cdr! (car CPU) (- (dinheiro CPU) aposta)) ;Retira o Dinheiro do Call ao CPU
                                          (Jogo-Helper aposta (add1 (random (inexact->exact(dinheiro CPU)))) 2))) ;CPU Faz Bet
                        (else (Jogo-Helper aposta 0 3)));CPU Desiste
                  ;O CPU nao tem dinheiro para a aposta
                  (cond ((zero? (dinheiro CPU)) (Jogo-Helper 0 0 7));Se o CPU nao tiver dinheiro entao é forçado a fazer check
                        ((< cpu_flag 8) (begin
                                          (set! CallFlag 1) ; O proximo Call do Player1 é final.
                                          (Jogo-Helper aposta (dinheiro CPU) 9))) ;CPU aposta tudo o que tem
                        (else (Jogo-Helper aposta 0 3)))));CPU Desiste
            ;2º Bet
            (if (< aposta (dinheiro CPU)) ; Verifica se o CPU tem dinheiro para a aposta
                (cond ((and (< (hand-power (mao CPU)) 1)(< cpu_flag 4)) (begin 
                                        (set-cdr! (car CPU) (- (dinheiro CPU) aposta)) ;Retira o Dinheiro do Call ao CPU
                                        (Jogo-Helper aposta aposta 5))) ;CPU Faz Call
                      ((zero? (dinheiro Player1)) (Jogo-Helper aposta aposta 5)) ;Se o Player1 nao tiver dinheiro nao faz sentido fazer bet
                      ((or (> (hand-power (mao CPU)) 2) (and (> (hand-power (mao CPU)) 0) (< cpu_flag 7))) (begin
                                        (set-cdr! (car CPU) (- (dinheiro CPU) aposta)) ;Retira o Dinheiro do Call ao CPU
                                        (Jogo-Helper aposta (add1 (random (inexact->exact (dinheiro CPU)))) 6))) ;CPU Faz Bet
                      ((< cpu_flag 8) (begin 
                                        (set-cdr! (car CPU) (- (dinheiro CPU) aposta)) ;Retira o Dinheiro do Call ao CPU
                                        (Jogo-Helper aposta aposta 5))) ;CPU Faz Call
                      ((< cpu_flag 9) (begin
                                        (set-cdr! (car CPU) (- (dinheiro CPU) aposta)) ;Retira o Dinheiro do Call ao CPU
                                        (Jogo-Helper aposta (add1 (random (inexact->exact (dinheiro CPU)))) 6))) ;CPU Faz Bet
                      (else (Jogo-Helper aposta 0 3))) ;CPU Desiste
                ;CPU nao tem dinheiro para cobrir a aposta
                (cond ((zero? (dinheiro CPU)) (Jogo-Helper 0 0 7));Se o CPU nao tiver dinheiro entao é forçado a fazer check
                      ((< cpu_flag 8) (begin
                                        (set! CallFlag 1) ;O Proximo Call do jogador é final
                                        (Jogo-Helper aposta (dinheiro CPU) 8))) ;CPU aposta tudo o que tem
                      (else (Jogo-Helper aposta 0 3)))));CPU Desiste
            
        (if (= bet_flag 1) ;Chegou aqui com Passar na 1º jogada
            (begin
              (set! fase 1)
              (cond ((and (< (hand-power (mao CPU)) 2) (< cpu_flag 8)) (begin
                                      (set! CallFlag 1) ;O Proximo Call do jogador é final
                                      (Jogo-Helper 0 0 4)));CPU Faz Check
                    ((zero? (dinheiro CPU)) (begin
                                              (set! CallFlag 1) ;O Proximo Call do jogador é final
                                              (Jogo-Helper 0 0 4))) ;Se o CPU nao tiver dinheiro entao é forçado a fazer check
                    ((zero? (dinheiro Player1)) (Jogo-Helper 0 0 4)) ;Se o Player1 nao tiver dinheiro nao faz sentido fazer bet
                    (else (Jogo-Helper 0 (add1 (random (inexact->exact (dinheiro CPU)))) 2))));CPU Faz Bet
              ;Passar na 2ª fase
            (cond ((and (= (hand-power (mao CPU)) 0) (< cpu_flag 8)) (Jogo-Helper 0 0 7));CPU Faz Check
                  ((zero? (dinheiro CPU)) (Jogo-Helper 0 0 7)) ;Se o CPU nao tiver dinheiro entao é forçado a fazer check
                  ((zero? (dinheiro Player1)) (Jogo-Helper 0 0 7)) ;Se o Player1 nao tiver dinheiro nao faz sentido fazer bet
                  ((< cpu_flag 3) (Jogo-Helper 0 0 7))
                  (else (Jogo-Helper 0 (add1 (random (inexact->exact (dinheiro CPU)))) 6))))))) ;Faz Bet

;Opção durante o jogo
(define Manter-Cartas
  (lambda ()
    (begin
      (display "-----------------------------------------------------")
      (newline)
      (newline)
      (display "Manteve as cartas.")
      (newline)
      (newline)
      (display "CPU trocou ")
      (display (random 6)) ;O CPU, na verdade, não troca cartas. Como não é controlado no display, nao achei necessario.
      (display " cartas")
      (newline)
      (newline)
      (display "-----------------------------------------------------")
      (menu 2)
      (display "Opções: ")
      (newline)
      (display "a) (Passar)")
      (newline)
      (display "b) (Apostar)")
      (newline)
      (newline)
      (display "-----------------------------------------------------")
      (newline))))

;Opção durante o jogo
(define Call
  (lambda ()
    (if (zero? CallFlag)
        (begin
          (set! CallFlag 1)
          (display "-----------------------------------------------------")
          (newline)
          (newline)
          (if (> CallHelper (dinheiro Player1)) ;Nao tem dinheiro
              (begin
                (set! ValorDaMesa (+ ValorDaMesa (dinheiro Player1))) ;Player Faz All-In
                (set-cdr! (car Player1) 0)
                (set! CallHelper 0)
                (display "Fez All-In"))
              (begin
                (set-cdr! (car Player1) (-  (dinheiro Player1) CallHelper)) ;Retira o Dinheiro ao Jogador.
                (set! ValorDaMesa (+ ValorDaMesa CallHelper)) ;Atualiza o ValorDaMesa com Base na nova aposta do jogador
                (set! CallHelper 0) ;Reseta CallHelper
                (display "Fez Call")))
          (newline)
          (newline)
          (display "-----------------------------------------------------")
          (menu 2)
          (display "Opções: ")
          (newline)
          (display "a) (Trocar-Cartas)")
          (newline)
          (display "b) (Manter-Cartas)")
          (newline)
          (newline)
          (display "-----------------------------------------------------")
          (newline))
        (begin
          (display "-----------------------------------------------------")
          (newline)
          (newline)
          (if (> CallHelper (dinheiro Player1)) ;Nao tem dinheiro
              (begin
                (set! ValorDaMesa (+ ValorDaMesa (dinheiro Player1))) ;Player Faz All-In
                (set-cdr! (car Player1) 0)
                (set! CallHelper 0)
                (display "Fez All-In"))
              (begin
                (set-cdr! (car Player1) (-  (dinheiro Player1) CallHelper)) ;Retira o Dinheiro ao Jogador.
                (set! ValorDaMesa (+ ValorDaMesa CallHelper)) ;Atualiza o ValorDaMesa com Base na nova aposta do jogador
                (set! CallHelper 0)
                (display "Fez Call")));Reseta CallHelper
          (newline)
          (newline)
          (avalia-vencedor (mao Player1) (mao CPU))))))
  

;Opção durante o jogo
(define Desistir
  (lambda ()
    (begin
      (display "-----------------------------------------------------")
      (newline)
      (newline)
      (display "Você desistiu. O CPU ganhou ")
      (display ValorDaMesa)
      (display "€. Pouca Sorte!")
      (newline)
      (newline)
      (set-cdr! (car CPU) (+  (dinheiro CPU) ValorDaMesa))
      (display "Dinheiro ")
      (display (nome Player1))
      (display ": ")
      (display (dinheiro Player1))
      (newline)
      (newline)
      (display "Dinheiro CPU: ")
      (display (dinheiro CPU))
      (newline)
      (newline)
      (display "-----------------------------------------------------")
      (newline)
      (newline)
      (display "(Jogo) para continuar")
      (newline)
      (newline)
      (display "(Novo-Jogo) ou F5 para reiniciar")
      (newline)
      (newline)
      (display "-----------------------------------------------------"))))

;;;;;;;;;;;;;;;
;Trocar-Cartas;
;;;;;;;;;;;;;;;

;Apresenta as Cartas Iniciais
(define Trocar-Cartas
  (lambda ()
    (begin
      (newline)
      (display "Carta 1: ")
      (display (car (mao Player1)))
      (newline)
      (display "Carta 2: ")
      (display (cadr (mao Player1)))
      (newline)
      (display "Carta 3: ")
      (display (caddr (mao Player1)))
      (newline)
      (display "Carta 4: ")
      (display (cadddr (mao Player1)))
      (newline)
      (display "Carta 5: ")
      (display (list-ref (mao Player1) 4))
      (newline)
      (newline)
      (display "Digite o numero das cartas que quer trocar (SEM ESPAÇOS). ")
      (newline)
      (Trocar-Cartas-Helper1))))

(define Trocar-Cartas-Helper1
  (lambda ()
    (letrec (
             (cartas (abs (read)))
             (aux1 ;Determina a Posicao Das Cartas que é para trocar
              (lambda (lista numero)
                (if (zero? numero)
                    (aux2 (map sub1 lista) ())
                    (aux1 (append lista (list (remainder numero 10))) (quotient numero 10)))))
             (aux2 ;Atribui as novas cartas
              (lambda (lista cartas-novas)
                (let (
                      (carta_nova (nova-carta))
                      )
                (if (null? lista)
                    (Trocar-Cartas-Helper2 (length cartas-novas))
                    (if (or (member carta_nova cartas-novas) (member carta_nova (mao Player1)))
                        (aux2 lista cartas-novas)
                        (begin
                          (list-set! (mao Player1) (car lista) carta_nova)
                          (aux2 (cdr lista) (append cartas-novas (list carta_nova)))))))))
             )
      (if (and (integer? cartas) (positive? cartas)(inverse_find_digit_bigger_than cartas 5))
          (if (digitos-repetidos? cartas)
              (begin
                (display "Repetiu uma das cartas.")
                (newline)
                (Trocar-Cartas-Helper1))
              (aux1 () cartas))
          (begin
            (display "Valor Errado.")
            (newline)
            (Trocar-Cartas-Helper1))))))

(define Trocar-Cartas-Helper2
  (lambda (x)
    (begin
      (newline)
      (display "-----------------------------------------------------")
      (newline)
      (newline)
      (display "Trocou ")
      (display x)
      (display " cartas.")
      (newline)
      (newline)
      (display "CPU trocou ")
      (display (random 6)) ;O CPU, na verdade, não troca cartas. Como não é controlado no display, nao achei necessario.
      (display " cartas")
      (newline)
      (newline)
      (display "-----------------------------------------------------")
      (menu 2)
      (display "Opções: ")
      (newline)
      (display "a) (Passar)")
      (newline)
      (display "b) (Apostar)")
      (newline)
      (newline)
      (display "-----------------------------------------------------")
      (newline))))

;;;;;;;;;;
;Vencedor;
;;;;;;;;;;

(define Ganhou
  (lambda (maojogador maocpu x)
    (begin
      (display "-----------------------------------------------------")
      (newline)
      (newline)
      (display "Ganhou ")
      (display ValorDaMesa)
      (display "€ com ")
      (if (or (zero? x) (zero? (hand-power maojogador)))
          (inverse-hand-power (hand-power maojogador))
          (begin
            (inverse-hand-power (hand-power maojogador))
            (display " e Carta mais alta")))
      (display ". Parabéns.")
      (newline)
      (newline)
      (display "Mao ")
      (display (nome Player1))
      (display ": ")
      (apresenta-mao (mao Player1))
      (newline)
      (newline)
      (display "Mao CPU: ")
      (apresenta-mao (mao CPU))
      (newline)
      (newline)
      (set-cdr! (car Player1) (+  (dinheiro Player1) ValorDaMesa))
      (display "Dinheiro ")
      (display (nome Player1))
      (display ": ")
      (display (dinheiro Player1))
      (display "€")
      (newline)
      (newline)
      (display "Dinheiro CPU: ")
      (display (dinheiro CPU))
      (display "€")
      (newline)
      (newline)
      (display "-----------------------------------------------------")
      (newline)
      (newline)
      (display "(Jogo) para continuar")
      (newline)
      (newline)
      (display "(Novo-Jogo) ou F5 para reiniciar")
      (newline)
      (newline)
      (display "-----------------------------------------------------"))))

(define Perdeu
  (lambda (maojogador maocpu x)
    (begin
      (display "-----------------------------------------------------")
      (newline)
      (newline)
      (display "O CPU ganhou ")
      (display ValorDaMesa)
      (display "€ com ")
      (if (or (zero? x) (zero? (hand-power maocpu)))
          (inverse-hand-power (hand-power maocpu))
          (begin
            (inverse-hand-power (hand-power maocpu))
            (display " e Carta mais alta")))
      (display ". Pouca sorte.")
      (newline)
      (newline)
      (display "Mao ")
      (display (nome Player1))
      (display ": ")
      (apresenta-mao (mao Player1))
      (newline)
      (newline)
      (display "Mao CPU: ")
      (apresenta-mao (mao CPU))
      (newline)
      (newline)
      (set-cdr! (car CPU) (+  (dinheiro CPU) ValorDaMesa))
      (display "Dinheiro ")
      (display (nome Player1))
      (display ": ")
      (display (dinheiro Player1))
      (display "€")
      (newline)
      (newline)
      (display "Dinheiro CPU: ")
      (display (dinheiro CPU))
      (display "€")
      (newline)
      (newline)
      (display "-----------------------------------------------------")
      (newline)
      (newline)
      (display "(Jogo) para continuar")
      (newline)
      (newline)
      (display "(Novo-Jogo) ou F5 para reiniciar")
      (newline)
      (newline)
      (display "-----------------------------------------------------"))))

(define Empatou
  (lambda (maojogador maocpu)
    (begin
          (newline)
          (display "-----------------------------------------------------")
          (newline)
          (newline)
          (display "Empatou. O valor da mesa, ")
          (display ValorDaMesa)
          (display "€, foi dividido. ")
          (display "Recebeu ")
          (display (/ ValorDaMesa 2))
          (display "€.")
          (newline)
          (newline)
          (display "Mao ")
          (display (nome Player1))
          (display ": ")
          (apresenta-mao (mao Player1))
          (newline)
          (newline)
          (display "Mao CPU: ")
          (apresenta-mao (mao CPU))
          (newline)
          (newline)
          (set-cdr! (car Player1) (+  (dinheiro Player1) (/ ValorDaMesa 2)))
          (set-cdr! (car CPU) (+  (dinheiro CPU) (/ ValorDaMesa 2)))
          (display "Dinheiro ")
          (display (nome Player1))
          (display ": ")
          (display (dinheiro Player1))
          (newline)
          (newline)
          (display "Dinheiro CPU: ")
          (display (dinheiro CPU))
          (newline))))

(define avalia-vencedor
  (lambda (maojogador maocpu)
    (if (> (hand-power maojogador) (hand-power maocpu))
        (Ganhou maojogador maocpu 0)
        (if (< (hand-power maojogador) (hand-power maocpu))
            (Perdeu maojogador maocpu 0)
            (Avaliador-Mesmo-Tipo-Mao maojogador maocpu)))))

(define Avaliador-Mesmo-Tipo-Mao
  (lambda (maojogador maocpu)
    (cond ((straight-flush? maojogador) (calc-max maojogador maocpu))
          ((four-of-a-kind? maojogador 0) (four-of-a-kind+alto maojogador maocpu))
          ((full-house? maojogador) (full-house+alto maojogador maocpu))
          ((cor? maojogador) (calc-max maojogador maocpu))
          ((sequencia? maojogador) (calc-max maojogador maocpu))
          ((three-of-a-kind? maojogador 0) (three-of-a-kind+alto maojogador maocpu))
          ((two-pair? maojogador 0) (two-pair+alto maojogador maocpu))
          ((pair? maojogador 0) (par+alto maojogador maocpu))
          (else (calc-max-especial maojogador maocpu)))))


;;;;;;;
;Poker;
;;;;;;;


;;;;;;;;;;;;;;;
;Avalia + alto;
;;;;;;;;;;;;;;;

(define four-of-a-kind+alto
  (lambda (maojogador maocpu)
    (let (
          (f_player (four-of-a-kind? maojogador 1))
          (f_cpu (four-of-a-kind? maocpu 1))
          )
      (if (> f_player f_cpu)
          (Ganhou maojogador maocpu 0)
          (if (< f_player f_cpu)
              (Perdeu maojogador maocpu 0)
              (calc-max-especial maojogador maocpu))))))

(define full-house+alto
  (lambda (maojogador maocpu)
    (let (
          (t_player (three-of-a-kind? maojogador 1))
          (t_cpu (three-of-a-kind? maocpu 1))
          (p_player (pair? maojogador 1))
          (p_cpu (pair? maocpu 1))
          )
      (if (> t_player t_cpu)
          (Ganhou maojogador maocpu 0)
          (if (< t_player t_cpu)
              (Perdeu maojogador maocpu 0)
              (if (> p_player p_cpu)
                  (Ganhou maojogador maocpu 0)
                  (if (< p_player p_cpu)
                      (Perdeu maojogador maocpu 0)
                      (Empatou maojogador maocpu))))))))

(define three-of-a-kind+alto
  (lambda (maojogador maocpu)
    (let (
          (t_player (three-of-a-kind? maojogador 1))
          (t_cpu (three-of-a-kind? maocpu 1))
          )
      (if (> t_player t_cpu)
          (Ganhou maojogador maocpu 0)
          (if (< t_player t_cpu)
              (Perdeu maojogador maocpu 0)
              (calc-max-especial maojogador maocpu))))))

(define calc-max
  (lambda (maojogador maocpu)
    (let (
          (h_player1 (apply max (map ordinal-carta (map car maojogador))))
          (h_cpu (apply max (map ordinal-carta (map car maocpu))))
          )
      (if (> h_player1 h_cpu)
          (Ganhou maojogador maocpu 0)
          (if (< h_player1 h_cpu)
              (Perdeu maojogador maocpu 0)
              (Empatou maojogador maocpu))))))


(define calc-max-especial
  (lambda (maojogador maocpu)
    (letrec (
             (aux
              (lambda (maojogador-ordinal maocpu-ordinal)
                (if (null? maojogador-ordinal)
                    (Empatou maojogador maocpu)
                    (begin
                      (let (
                            (h_player1 (apply max maojogador-ordinal))
                            (h_cpu (apply max maocpu-ordinal))
                            )
                        (if (> h_player1 h_cpu)
                            (Ganhou maojogador maocpu 1)
                            (if (< h_player1 h_cpu)
                                (Perdeu maojogador maocpu 1)
                                (aux (elimina-todas-ocorrencias maojogador-ordinal h_player1) (elimina-todas-ocorrencias maocpu-ordinal h_cpu)))))))))
             )          
      (aux (map ordinal-carta (map car maojogador)) (map ordinal-carta (map car maocpu)))))) 

(define par+alto
  (lambda (maojogador maocpu)
    (let (
          (p_player (pair? maojogador 1))
          (p_cpu (pair? maocpu 1))
          )
      (if (> p_player p_cpu)
          (Ganhou maojogador maocpu 0)
          (if (< p_player p_cpu)
              (Perdeu maojogador maocpu 0)
              (calc-max-especial maojogador maocpu))))))
 
(define two-pair+alto
  (lambda (maojogador maocpu)
    (let (
          (p_player (apply max (two-pair? maojogador 1)))
          (p_cpu (apply max (two-pair? maocpu 1)))
          )
      (if (> p_player p_cpu)
          (Ganhou maojogador maocpu 0)
          (if (< p_player p_cpu)
              (Perdeu maojogador maocpu 0)
              (calc-max-especial maojogador maocpu))))))
    

;;;;;;;;;;;;
;Auxiliares;
;;;;;;;;;;;;


(define figura-carta?
  (lambda (carta)
    (symbol? carta)))

(define ordinal-carta
  (lambda (carta)
    (if (figura-carta? carta)
          (cond ((equal? carta 'as) 13)
                ((equal? carta 'rei) 12)
                ((equal? carta 'valete) 10)
                (else 11))  ; chegando aqui, é dama.
        (sub1 carta))))

(define sequencia?
  (lambda (mao)
    (letrec (
             (mao_ordinal (ordena-crescente (map ordinal-carta (map car mao))))
             (aux
              (lambda (termo lista)
                (if (null? lista)
                    #t
                    (if (= termo (sub1 (car lista)))
                        (aux (car lista) (cdr lista))
                        #f))))
             )
      (if (sequencia-excepcao mao)
          #t
          (aux (car mao_ordinal) (cdr mao_ordinal))))))

;Caso especial em que o As faz sequencia com 2 3 4 5
(define sequencia-excepcao
  (lambda (mao)
    (if (equal? (ordena-crescente (map ordinal-carta (map car mao))) (list 1 2 3 4 13))
        #t
        #f)))

(define cor?
  (lambda (mao)
    (let (
          (naipes (map cadr mao))
          )
      (cond ((not (member #f (map (lambda (x)
                                            (equal? x 'copas)) naipes))) #t)
            ((not (member #f (map (lambda (x)
                                            (equal? x 'ouros)) naipes))) #t)
            ((not (member #f (map (lambda (x)
                                            (equal? x 'paus)) naipes))) #t)
            ((not (member #f (map (lambda (x)
                                            (equal? x 'espadas)) naipes))) #t)
            (else #f)))))
    

(define four-of-a-kind?
  (lambda (mao x)
    (letrec (
             (cartas-ordinal (map ordinal-carta (map car mao)))
             (aux1
              (lambda (lista termo contador trio)
                (if (null? lista)
                    (if (= contador 1)
                        #t
                        #f)
                    (if (member termo lista)
                        (aux2 lista lista termo 0 contador trio)
                        (aux1 (cdr lista) (car lista) contador trio)))))
             (aux2
              (lambda (lista_o lista termo contador2 contador_o trio)
                (if (null? lista)
                    (if (= contador2 3)
                        (aux1 (cdr lista_o) (car lista_o) (add1 contador_o) termo)
                        (aux1 (cdr lista_o) (car lista_o) contador_o trio))
                    (if (= termo (car lista))
                        (aux2 lista_o (cdr lista) termo (add1 contador2) contador_o trio)
                        (aux2 lista_o (cdr lista) termo contador2 contador_o trio)))))
             (aux
              (lambda (lista termo four)
                (if (null? lista)
                    (if (zero? four)
                        #f
                        #t)
                    (if (and (member termo lista) (aux1 lista termo 0 0))
                        (aux (cdr lista) (car lista) termo)
                        (aux (cdr lista) (car lista) four)))))
             (aux_four
              (lambda (lista termo four)
                (if (null? lista)
                    (if (zero? four)
                        #f
                        four)
                    (if (and (member termo lista) (aux1 lista termo 0 0))
                        (aux_four (cdr lista) (car lista) termo)
                        (aux_four (cdr lista) (car lista) four)))))

             )
      (if (zero? x)
          (aux (cdr cartas-ordinal) (car cartas-ordinal) 0)
          (aux_four (cdr cartas-ordinal) (car cartas-ordinal) 0)))))


(define three-of-a-kind?
  (lambda (mao x)
    (letrec (
             (cartas-ordinal (map ordinal-carta (map car mao)))
             (aux1
              (lambda (lista termo contador trio)
                (if (null? lista)
                    (if (= contador 1)
                        #t
                        #f)
                    (if (member termo lista)
                        (aux2 lista lista termo 0 contador trio x)
                        (aux1 (cdr lista) (car lista) contador trio)))))
             (aux_trio
              (lambda (lista termo contador trio)
                (if (null? lista)
                    (if (= contador 1)
                        trio
                        #f)
                    (if (member termo lista)
                        (aux2 lista lista termo 0 contador trio x)
                        (aux_trio (cdr lista) (car lista) contador trio)))))
             (aux2
              (lambda (lista_o lista termo contador2 contador_o trio x)
                (if (null? lista)
                    (if (zero? x)
                        (if (= contador2 2)
                            (aux1 (cdr lista_o) (car lista_o) (add1 contador_o) termo)
                            (aux1 (cdr lista_o) (car lista_o) contador_o trio))
                        (if (= contador2 2)
                            (aux_trio (cdr lista_o) (car lista_o) (add1 contador_o) termo)
                            (aux_trio (cdr lista_o) (car lista_o) contador_o trio)))
                    (if (= termo (car lista))
                        (aux2 lista_o (cdr lista) termo (add1 contador2) contador_o trio x)
                        (aux2 lista_o (cdr lista) termo contador2 contador_o trio x)))))
             )
      (if (zero? x)
          (aux1 (cdr cartas-ordinal) (car cartas-ordinal) 0 0)
          (aux_trio (cdr cartas-ordinal) (car cartas-ordinal) 0 0)))))

(define pair?
  (lambda (mao x)
    (letrec (
             (cartas-ordinal (map ordinal-carta (map car mao)))
             (aux
              (lambda (lista termo contador par1)
                (if (null? lista)
                    (if (>= contador 1)
                        #t
                        #f)
                    (if (member termo lista)
                        (aux (cdr lista) (car lista) (add1 contador) termo)
                        (aux (cdr lista) (car lista) contador par1)))))
             (aux_pair
              (lambda (lista termo contador par1)
                (if (null? lista)
                    (if (>= contador 1)
                        par1
                        #f)
                    (if (member termo lista)
                        (aux_pair (cdr lista) (car lista) (add1 contador) termo)
                        (aux_pair (cdr lista) (car lista) contador par1)))))
             (aux_full_house
              (lambda (lista termo contador par1)
                (if (null? lista)
                    (if (= contador 3)
                        #t
                        #f)
                    (if (member termo lista)
                        (aux_full_house (cdr lista) (car lista) (add1 contador) termo)
                        (aux_full_house (cdr lista) (car lista) contador par1)))))
             )
      (if (zero? x)
          (aux (cdr cartas-ordinal) (car cartas-ordinal) 0 0)
          (if (= x 1)
              (aux_pair (cdr cartas-ordinal) (car cartas-ordinal) 0 0 )
              (aux_full_house (cdr cartas-ordinal) (car cartas-ordinal) 0 0))))))


(define full-house?
  (lambda (mao)
    (letrec (
             (cartas-ordinal (map ordinal-carta (map car mao)))
             (aux_full_house
              (lambda (lista termo contador par1)
                (if (null? lista)
                    (if (= contador 3)
                        #t
                        #f)
                    (if (member termo lista)
                        (aux_full_house (cdr lista) (car lista) (add1 contador) termo)
                        (aux_full_house (cdr lista) (car lista) contador par1)))))
             )
      (aux_full_house (cdr cartas-ordinal) (car cartas-ordinal) 0 0))))

(define straight-flush?
  (lambda (mao)
    (if (and (cor? mao) (sequencia? mao))
        #t
        #f)))


(define two-pair?
  (lambda (mao x)
    (letrec (
             (cartas-ordinal (map ordinal-carta (map car mao)))
             (aux
              (lambda (lista termo contador par1 par2)
                (if (null? lista)
                    (if (= contador 2)
                        #t
                        #f)
                    (if (member termo lista)
                        (if (zero? par1)
                            (aux (cdr lista) (car lista) (add1 contador) termo par2)
                            (aux (cdr lista) (car lista) (add1 contador) par1 termo))
                        (aux (cdr lista) (car lista) contador par1 par2)))))
             (aux_pairs
              (lambda (lista termo contador par1 par2)
                (if (null? lista)
                    (if (= contador 2)
                        (list par1 par2)
                        #f)
                    (if (member termo lista)
                        (if (zero? par1)
                            (aux_pairs (cdr lista) (car lista) (add1 contador) termo par2)
                            (aux_pairs (cdr lista) (car lista) (add1 contador) par1 termo))
                        (aux_pairs (cdr lista) (car lista) contador par1 par2)))))
             )
      (if (zero? x)
          (aux (cdr cartas-ordinal) (car cartas-ordinal) 0 0 0)
          (aux_pairs (cdr cartas-ordinal) (car cartas-ordinal) 0 0 0)))))
             


(define hand-power
  (lambda (hand)
    (cond ((straight-flush? hand) 8)
          ((four-of-a-kind? hand 0) 7)
          ((full-house? hand) 6)
          ((cor? hand) 5)
          ((sequencia? hand) 4)
          ((three-of-a-kind? hand 0) 3)
          ((two-pair? hand 0) 2)
          ((pair? hand 0) 1)
          (else 0))))

(define inverse-hand-power
    (lambda (x)
    (cond ((equal? x 8) (display "Straight flush"))
          ((equal? x 7) (display "Four of a kind"))
          ((equal? x 6) (display "Full house"))
          ((equal? x 5) (display "Flush"))
          ((equal? x 4) (display "Straight"))
          ((equal? x 3) (display "Three of a kind"))
          ((equal? x 2) (display "dois Pares"))
          ((equal? x 1) (display "um Par"))
          (else (display "High card")))))