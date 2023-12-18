from typing import Tuple, Optional
from pydantic import BaseModel

class Point(BaseModel):
  x: int
  y: int
  z: Optional[int] = None
    
  def to_tuple(self) -> Tuple[int, int, Optional[int]]:
    return (self.x, self.y, self.z)