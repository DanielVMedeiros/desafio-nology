from fastapi import FastAPI, Depends, Request
from sqlalchemy.orm import Session
from http import HTTPStatus
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine, get_db
from dotenv import load_dotenv
import os
from model.consulta import Consulta
from schemas.consultaSchema import ConsultaSchema

Base.metadata.create_all(bind=engine)

app = FastAPI()


load_dotenv()

FRONTEND_URL = os.getenv("FRONTEND_URL")

origins = [
    FRONTEND_URL
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# 🔹 Função para pegar IP
def get_client_ip(request: Request) -> str:
    forwarded = request.headers.get("X-Forwarded-For")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host

#Não é bom deixar na main regras de negócio, deixarei por se tratar de um projeto simples
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
  
  return cashback;



#Função principal para calcular o cashback de um cliente vip
def calcular_cashback_vip(valor):
  if valor > 500:
    base = calcula_base(valor);
    bonus = calcula_bonus(base);
    cashbackVip = calcula_vip(bonus);
  else:
    base = calcula_base(valor);
    cashbackVip = calcula_vip(base);

  return cashbackVip;



@app.post("/consulta", status_code=HTTPStatus.CREATED)
def criar_consulta(
    consulta: ConsultaSchema,
    request: Request,
    db: Session = Depends(get_db)
):
    cashback = 0
    if consulta.tipo_cliente == "VIP":  # Vou setar no frontend para enviar ou normal ou VIP como tipo do cliente
       cashback = calcular_cashback_vip(consulta.valor);
    else:
       cashback = calcular_cashback(consulta.valor);



    nova_consulta = Consulta(
        ip_consulta=get_client_ip(request),
        tipo_cliente=consulta.tipo_cliente,
        valor=consulta.valor,
        cashback=cashback
    )

    db.add(nova_consulta)
    db.commit()
    db.refresh(nova_consulta)

    return cashback


@app.get("/consulta")
def listar_consultas(
    request: Request,
    db: Session = Depends(get_db)
):
    ip = get_client_ip(request)

    consultas = db.query(Consulta).filter(
        Consulta.ip_consulta == ip
    ).all()

    return consultas