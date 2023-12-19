# Alex Joshua (c) 2023

from matplotlib import pyplot as plt
from typing import List
from models.point import Point

## Takes in a matrix of pixels and prints it to the console
## NOTE: Optimized for black and white
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
      
## Takes in a list of points and plots them on a graph
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