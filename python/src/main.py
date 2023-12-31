from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Tuple, Optional, Dict, Union

from chaos.render_text import text_to_point_coordinates
from models.chaos_character import ChaosCharacter
from models.chaos_dictionary import ChaosDictionary
from utils.font_file import available_fonts

app = FastAPI()

class InputData(BaseModel):
  input_string: str
  font: Optional[str] = None
  size: Optional[int] = 96

class OutputData(BaseModel):
  result: Dict[str, Union[Dict[str, int], List[Tuple[int, int, Optional[int]]]]]

@app.put('/chaosLetter', response_model=OutputData)
async def chaos_letter(data: InputData):
  try:
    input_string = data.input_string
    font = data.font
    size = data.size
    
    return process_input_string(input_string, font, size)
    
  except Exception as e:
    if (str(e) == "Font file does not exist"):
      raise HTTPException(status_code=400, detail=str(e))
    
    raise HTTPException(status_code=500, detail=str(e))

@app.put('/chaosString', response_model=OutputData)
async def chaos_string(data: InputData):
  try:
    input_string = data.input_string
    font = data.font
    size = data.size
    
    chaos_dictionary = ChaosDictionary()
    
    for letter in input_string:
      chaos_character = text_to_point_coordinates(letter, font, size)
      chaos_dictionary.put(letter, chaos_character)
    
    print(chaos_dictionary.to_dict())
    return {'result': chaos_dictionary}
    
  except Exception as e:
    if (str(e) == "Font file does not exist"):
      raise HTTPException(status_code=400, detail=str(e))
    
    raise HTTPException(status_code=500, detail=str(e))
  
  
def process_input_string(input_string: str, font: Optional[str] = None, font_size: Optional[int] = 96):
  # TODO: Sanitize string ?

  chaos_character = text_to_point_coordinates(input_string, font, font_size)
  
  return {'result': chaos_character.to_dict()}

@app.get('/availableFonts')
async def availableFonts():
  font_options = available_fonts()
  return {'result': font_options}