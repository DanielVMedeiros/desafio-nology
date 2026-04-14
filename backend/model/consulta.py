from sqlalchemy import Column, String, Float, Integer
from database import Base

class Consulta(Base):
    __tablename__ = 'consulta'

    id_consulta = Column(Integer, primary_key=True, index=True, autoincrement=True)
    ip_consulta = Column(String(100), nullable=False)  
    tipo_cliente = Column(String(100), nullable=False)           
    valor = Column(Float)
    cashback = Column(Float)
