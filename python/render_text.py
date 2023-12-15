from PIL import Image, ImageDraw, ImageFont
import matplotlib.pyplot as plt
from typing import List, Tuple

def text_to_point_coordinates(text):
  image = render_text_to_image(text, "../fonts/Montserrat/static/Montserrat-Medium.ttf", "./renders/rendered_image.png")
  pixel_matrix = image_to_pixel_matrix(image)
    
  points = pixel_matrix_point_coordinates(pixel_matrix)
  
  return points

def render_text_to_image(text, font_path, output_path):
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
  
def image_to_pixel_matrix(image: Image.Image):
  pixel_data = list(image.getdata())
  width, height = image.size
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
def pixel_matrix_point_coordinates(pixel_matrix: list[list]):
  points = list()
  x = 0
  y = 0
  
  for row in pixel_matrix:
    x = 0
    for point in row:
      if (point[0] + point[1] + point[2] == 0):
        points.append((x, y))
      x += 1  
    y += 1
        
  return points

def plot_points(point_coordinates: List[Tuple[float, float]]):
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
  