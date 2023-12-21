

from typing import List, Dict, Tuple, Optional
from pydantic import BaseModel
from .chaos_character import ChaosCharacter

class ChaosDictionary(BaseModel):
  # Stores a dictionary of letters to ChaosCharacter objects
  chaosDictionary: Dict[str, ChaosCharacter]
    
  def put(self, letter: str, chaosCharacter: ChaosCharacter):
    self.chaosDictionary.update({letter: chaosCharacter})
  