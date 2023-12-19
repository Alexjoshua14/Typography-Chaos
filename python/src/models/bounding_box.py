from typing import Dict
from pydantic import BaseModel

class BoundingBox(BaseModel):
  width: int
  height: int
    
  def to_dict(self) -> Dict[str, int]:
    return {
      'width': self.width,
      'height': self.height
    }