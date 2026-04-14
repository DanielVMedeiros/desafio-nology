import os

# -----------------------------------------------
#      Código apenas para calcular o cashBack
# -----------------------------------------------


#Funções para calcular o cashBack passo a passo
def calcula_base(valor):
  return valor * 0.05;

def calcula_bonus(cashback):
  return cashback * 2;
    
def calcula_vip(cashback):
  return cashback * 1.1;

def calculaDesconto(valor, desconto):
  desconto = 1 - (desconto/100)
  return valor * desconto;

#Função principal para calcular o cashback de um cliente normal
def calcular_cashback(valor):
  if valor > 500:
     base = calcula_base(valor);
     cashback = calcula_bonus(base);
  else:
     cashback = calcula_base(valor);
  
  print("CashBack final: " + str(cashback));
  voltar()



#Função principal para calcular o cashback de um cliente vip
def calcular_cashback_vip(valor):
  if valor > 500:
    base = calcula_base(valor);
    bonus = calcula_bonus(base);
    cashbackVip = calcula_vip(bonus);
  else:
    base = calcula_base(valor);
    cashbackVip = calcula_vip(base);

  print("CashBack final do Vip: " + str(cashbackVip));
  voltar()



#Algumas funções que eu já tinha programado e eu só adicione e adaptei para esse código
def escolha_errada():
  input("Opção incorreta, digite uma tecla para voltar ao menu principal")
  voltar()

def voltar():
  input("\nAperte um botão para voltar ao menu")
  main()

def exibir_opcoes():
  print("""
  1 - Calcular CashBack cliente normal
  2 - Calcular CashBack cliente VIP
  0 - Parar sistema
  """ )

def selecionar_opcoes():
  try:
      opcao_escolhida = int(input("Selecione uma opção: "));
      valor = float(input("Digite o Valor para calcular o CashBack: "));
      desconto = float(input("Digite a porcentagem de desconto: "));
      valor_final = calculaDesconto(valor, desconto);
      match opcao_escolhida:
            case 1:
                  calcular_cashback(valor_final);
            case 2:
                  calcular_cashback_vip(valor_final);
            case _:
                  escolha_errada();
  except:
      escolha_errada();






def main():
   os.system("cls")
   exibir_opcoes()
   selecionar_opcoes()

if __name__ == "__main__":
  main()