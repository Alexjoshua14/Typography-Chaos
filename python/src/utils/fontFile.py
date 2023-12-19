import os
from typing import List, Optional

# Get available fonts
def available_fonts() -> List[str]:
  current_dir = os.path.dirname(os.path.realpath(__file__))
  font_dir = os.path.join(current_dir, "../../../fonts")
  font_names = os.listdir(font_dir)
  return font_names