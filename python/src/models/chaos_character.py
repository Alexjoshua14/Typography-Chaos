
from typing import List, Dict, Tuple, Optional
from pydantic import BaseModel
from .bounding_box import BoundingBox
from .point import Point

class ChaosCharacter(BaseModel):
  bounding_box: BoundingBox
  points: List[Point]
    
  def to_dict(self) -> Dict[Dict[str, int], List[Tuple[int, int, Optional[int]]]]:
    return {
      'bounding_box': self.bounding_box.to_dict(),
      'points': [point.to_tuple() for point in self.points]
    }