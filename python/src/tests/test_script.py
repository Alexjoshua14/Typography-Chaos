
# Import the text_to_point_coordinates function
from chaos.render_text import text_to_point_coordinates
from chaos.render_text import get_font_file

import json

result = text_to_point_coordinates("A")
print(result.to_dict())

# JSONify the result and print it in pretty format
# Convert result.to_dict() to a JSON string

#json_string = json.dumps(result.to_dict(), indent=2)
#print(json_string)