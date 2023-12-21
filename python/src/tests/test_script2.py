from main import process_input_string

import json


def test_process_input_string():
  input_string = "Hey"

  result = process_input_string(input_string)
  
  if (result is None):
    raise Exception("result is None")
  
  for letter in input_string:
    if (result.get(letter) is None):
      raise Exception("letter not found in result. Letter: %s", letter)
  
  print("Test passed?")
  
test_process_input_string()