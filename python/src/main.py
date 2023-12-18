from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Tuple, Optional, Dict, Union

from chaos.render_text import text_to_point_coordinates
from models.chaosCharacter import ChaosCharacter

app = FastAPI()

class InputData(BaseModel):
  input_string: str

class OutputData(BaseModel):
  result: Dict[str, Union[Dict[str, int], List[Tuple[int, int, Optional[int]]]]]

@app.put('/chaos-letter', response_model=OutputData)
async def chaos_letter(data: InputData):
  try:
    input_string = data.input_string
      
    return process_input_string(input_string)
    
  except Exception as e:
    raise HTTPException(status_code=500, detail=str(e))
  
  
def process_input_string(input_string: str):
  # TODO: Sanitize string ?
  
  chaos_character = text_to_point_coordinates(input_string)
  
  return {'result': chaos_character.to_dict()}