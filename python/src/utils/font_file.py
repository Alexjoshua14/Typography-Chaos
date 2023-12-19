# Alex Joshua (c) 2023

import os
from typing import List

# Get available fonts
def available_fonts() -> List[str]:
  current_dir = os.path.dirname(os.path.realpath(__file__))
  font_dir = os.path.join(current_dir, "../../../fonts")
  font_names = os.listdir(font_dir)
  return font_names

## Takes in font name and weight
## Returns path to font file
## TODO: Better handle getting file names
def get_font_file(current_dir: str, font_name: str, weight: str = 'Regular') -> str:
  # Font name in file is pascal case
  file_name = font_name.replace("_", "") + "-" + weight + ".ttf"
  
  font_dir = os.path.join(current_dir, "../../../fonts")
  font_file = os.path.join(font_dir, font_name, file_name)
  
  # Check if font file exists
  if (not os.path.isfile(font_file)):
    raise Exception("Font file does not exist")
  
  return font_file