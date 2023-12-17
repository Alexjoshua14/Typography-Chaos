from typing import Dict

class BoundingBox:
  def __init__(self, width: int, height: int):
    self.width = width
    self.height = height
    
  def to_dict(self) -> Dict[str, int]:
    return {
      'width': self.width,
      'height': self.height
    }