
from typing import List, Dict
from .boundingBox import BoundingBox
from .point import Point

class ChaosCharacter:
  def __init__(self, bounding_box: BoundingBox, points: List[Point]):
    self.bounding_box = bounding_box
    self.points = points
    
  def to_dict(self) -> Dict[str, List[Dict[str, int]]]:
    return {
      'bounding_box': self.bounding_box.to_dict(),
      'points': [point.to_tuple() for point in self.points]
    }