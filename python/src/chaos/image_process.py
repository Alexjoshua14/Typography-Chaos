# Alex Joshua (c) 2023
from PIL import Image
from typing import List, Tuple
from models.point import Point

## Takes in an image and returns a matrix of pixels
## Each pixel is a tuple of (R, G, B) values
def image_to_pixel_matrix(image: Image.Image) -> List[List[Tuple[int, int, int]]]:
  # Get pixel data from the image
  pixel_data = list(image.getdata())
  
  # Extract the width and height of the image
  width, height = image.size
  
  # Convert the flat pixel data to 2D pixel matrix
  pixel_matrix = [pixel_data[i:i+width] for i in range(0, width*height, width)]
  
  return pixel_matrix

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
        points.append(Point(x=x, y=y))
      x += 1  
    y += 1
        
  return points