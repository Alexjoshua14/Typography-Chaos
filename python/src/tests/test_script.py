
# Import the text_to_point_coordinates function
from chaos.render_text import text_to_point_coordinates
from chaos.render_text import get_font_file
from main import process_input_string
from utils.fontFile import available_fonts

import json

try:
  result = text_to_point_coordinates("A")
  if (result is not None):
    print("Test A passed")
except:
  print("Test A failed")

try:
  processed_str = process_input_string("B")
  if (processed_str['result'] is not None):
    print("Test B passed")
except:
  print("Test B failed")

try:
  processed_str_c = process_input_string("C", "Fake_Font")
  if (processed_str_c['result'] is not None):
    print("Test C might have failed..")
except:
  print("Test C passed")
  
try:
  processed_str_d = process_input_string("D", "Montserrat")
  # For no just ensure that the result is not None
  if (processed_str_d['result'] is not None):
    print("Test D passed")
except:
  print("Test D failed")
  
  
try:
  font_options = available_fonts()
  processed_str_e = process_input_string("E", font_options[0])
  processed_str_e = process_input_string("E", font_options[1])
  processed_str_e = process_input_string("E", font_options[2])
  if (processed_str_e['result'] is not None):
    print("Test E passed")
except Exception as e:
  print(e)
  print("Test E failed")

# JSONify the result and print it in pretty format
# Convert result.to_dict() to a JSON string

#json_string = json.dumps(result.to_dict(), indent=2)
#print(json_string)