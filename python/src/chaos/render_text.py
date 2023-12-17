from PIL import Image, ImageDraw, ImageFont
from typing import List, Tuple
import matplotlib.pyplot as plt
import os

from models.chaosCharacter import ChaosCharacter
from models.point import Point
from models.boundingBox import BoundingBox

def get_font_file(font_name: str, weight: str) -> str:
  current_dir = os.path.dirname(os.path.realpath(__file__))
  font_dir = os.path.join(current_dir, "../../../fonts")
  font_file = os.path.join(font_dir, font_name, "static", font_name + "-" + weight + ".ttf")
  return font_file

## TODO: Clean up this comment
# Takes in text string, desired font, and pixel density
# Returns coordinates for points that form the given text with the given pixel density
# Also returns bounding box for text
def text_to_point_coordinates(text):
  font_path = get_font_file("Montserrat", "Regular")
  image = render_text_to_image(text, font_path, "../../../renders/rendered_image.png")
  pixel_matrix = image_to_pixel_matrix(image)
  
  # Print the pixel matrix
  print_pixel_matrix(pixel_matrix)
    
  points = pixel_matrix_point_coordinates(pixel_matrix)
  
  boundingBox: BoundingBox = BoundingBox(*image.size)
  
  chaosCharacter = ChaosCharacter(boundingBox, points)
  
  #return points
  return chaosCharacter


def render_text_to_image(text, font_path, output_path) -> Image.Image:
  # Begin instantiating font by loading ttf file and determining
  # the size of the bounding box around our desired text string
  font_size = 30
  font = ImageFont.truetype(font_path, font_size)
  _, _, text_width, text_height = font.getbbox(text)
  
  # Create a blank image with a white background to render text onto
  image = Image.new("RGB", (text_width, text_height), "white")
  draw = ImageDraw.Draw(image)
  
  # Draw the text onto the image
  draw.text((0,0), text, font=font, fill="black")
  
  # Save the rendered image
  #image.save(output_path)
  
  # Show image
  #image.show()
  
  return image
  
def image_to_pixel_matrix(image: Image.Image) -> List[List[Tuple[int, int, int]]]:
  # Get pixel data from the image
  pixel_data = list(image.getdata())
  
  # Extract the width and height of the image
  width, height = image.size
  
  # Convert the flat pixel data to 2D pixel matrix
  pixel_matrix = [pixel_data[i:i+width] for i in range(0, width*height, width)]
  
  return pixel_matrix

def print_pixel_matrix(pixel_matrix: list[list]):
  for row in pixel_matrix:
      rowString = ""
      for point in row:
        sum = point[0] + point[1] + point[2]
        if (sum == 255*3):
          rowString += " "
        else:
          rowString += "."
      print(rowString)  

## Convert matrix of pixels to a list of points
## each point should have its coordinates as x and y
## NOTE: Coordinates are based on top-left
## NOTE: Optimized for black and white
def pixel_matrix_point_coordinates(pixel_matrix: list[list]) -> List[Point]:
  points: List[Point] = list()
  x = 0
  y = 0
  
  # Iterate through each pixel in the matrix and check if it is black
  # If it is black, add it to the list of points
  for row in pixel_matrix:
    x = 0
    for point in row:
      if (point[0] + point[1] + point[2] == 0):
        # Add point to list of points
        points.append(Point(x, y))
      x += 1  
    y += 1
        
  return points

def plot_points(point_coordinates: List[Point]):
  x_coordinates, y_coordinates = zip(*point_coordinates)
  
  plt.scatter(x_coordinates, y_coordinates, color='red', marker="o", label="Points")
  
  plt.xlabel('X-axis')
  plt.ylabel('Y-axis')
  plt.title('A')
  plt.legend()
  
  plt.xlim(0, 800)
  plt.ylim(0, 800)
  plt.axis('equal')
  plt.gca().invert_yaxis()
  
  plt.show()
  
if __name__ == "__main__":
    text_to_point_coordinates("A")
  