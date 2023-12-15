from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Tuple

from render_text import text_to_point_coordinates

app = FastAPI()

class InputData(BaseModel):
  input_string: str

class OutputData(BaseModel):
  result: List[Tuple[int, int]]

@app.put('/chaos-letter', response_model=OutputData)
async def chaos_letter(data: InputData):
  try:
   input_string = data.input_string
    
   response_data = process_input_string(input_string)
    
   return response_data
  except Exception as e:
    raise HTTPException(status_code=500, detail=str(e))
  
  
def process_input_string(input_string: str):
  # TODO: Sanitize string ?
  
  points = text_to_point_coordinates(input_string)
  
  return {'result': points}