# Alex Joshua (c) 2023
from PIL import Image
from typing import List, Tuple, Optional
import matplotlib.pyplot as plt
import os

from models.chaos_character import ChaosCharacter
from models.point import Point
from models.bounding_box import BoundingBox

from utils.font_file import get_font_file
from chaos.image_render import render_text_to_image
from chaos.image_process import image_to_pixel_matrix, pixel_matrix_point_coordinates

## Takes in text string
## Renders text to image and returns a list of points representing the text
## NOTE: Coordinates are based on top-left
def text_to_point_coordinates(text: str, font: Optional[str] = "Montserrat", font_size: Optional[int] = 96) -> ChaosCharacter:
  if font is None:
    font = "Montserrat"
  
  if font_size is None:
    font_size = 96  
  
  output_path = "../../../renders/rendered_image.png"
  
  # Get font file
  current_dir = os.path.dirname(os.path.realpath(__file__))
  font_path = get_font_file(current_dir, font, "Regular")
  
  # Render text to image
  image = render_text_to_image(text, font_path, font_size, output_path)
  
  # Convert image to pixel matrix
  pixel_matrix = image_to_pixel_matrix(image)
  
  # Print the pixel matrix
  # print_pixel_matrix(pixel_matrix)
  
  # Convert the pixel matrix to a list of points  
  points = pixel_matrix_point_coordinates(pixel_matrix)
  
  # Get the bounding box of the text
  bounding_box: BoundingBox = BoundingBox(width=image.size[0], height=image.size[1])
  
  # Compile the Chaos Character object
  chaos_character = ChaosCharacter(bounding_box=bounding_box, points=points)
  
  # return { bounding_box, points }
  return chaos_character
  
if __name__ == "__main__":
    text_to_point_coordinates("A")
  