from typing import Tuple, Optional

class Point:
  def __init__(self, x: int, y: int, z: Optional[int] = None):
    self.x = x
    self.y = y
    self.z = z
    
  def to_tuple(self) -> Tuple[int, int, Optional[int]]:
    return (self.x, self.y, self.z)