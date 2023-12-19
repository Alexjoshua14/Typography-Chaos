# Test available_fonts() function
from utils.font_file import available_fonts, get_font_file
import os

font_options = available_fonts()
print(font_options)

for font in font_options:
  # Get font file and check if it exists
  font_file = get_font_file(os.path.dirname(os.path.realpath(__file__)), font, "Regular")
  if (not os.path.isfile(font_file)):
    raise Exception("Font file does not exist")
  
print("All font files exist")