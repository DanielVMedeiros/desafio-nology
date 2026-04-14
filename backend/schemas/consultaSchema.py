
from pydantic import BaseModel
from typing import Optional

class ConsultaSchema(BaseModel):
    tipo_cliente: str
    valor: float