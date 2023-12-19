# Alex Joshua (c) 2023
from PIL import Image, ImageDraw, ImageFont

## Takes in text string, font path, and output path
## Renders text to image and saves it to output path
def render_text_to_image(text, font_path, font_size, output_path) -> Image.Image:
  # Begin instantiating font by loading ttf file and determining
  # the size of the bounding box around our desired text string
  font = ImageFont.truetype(font_path, font_size)
  _, _, text_width, text_height = font.getbbox(text)
  
  # Create a blank image with a white background to render text onto
  image = Image.new("RGB", (text_width, text_height), "white")
  draw = ImageDraw.Draw(image)
  
  # Draw the text onto the image
  draw.text((0,0), text, font=font, fill="black")
  
  # Save the rendered image
  #image.save(output_path)
  
  # Show image
  #image.show()
  
  return image