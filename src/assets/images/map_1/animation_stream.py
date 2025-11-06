from PIL import Image, ImageDraw, ImageSequence

# Load base stream image
stream = Image.open("sparkling_stream.png").convert("RGBA")
width, height = stream.size

# Create a semi-transparent blue wave pattern
def create_wave_overlay(offset):
    overlay = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    
    wave_color = (255, 255, 255, 30)  # soft white ripple

    # Draw multiple arcs across the width
    for y in range(0, height, 40):
        for x in range(-100, width, 120):  # spacing out wave arcs
            draw.arc(
                [(x + offset, y), (x + offset + 100, y + 50)],
                start=0,
                end=180,
                fill=wave_color
            )
    return overlay

# Generate animation frames
frames = []
for i in range(10):  # total frames
    offset = (i * 15) % 120  # keep wave loops smooth
    wave = create_wave_overlay(offset)
    frame = Image.alpha_composite(stream, wave)
    frames.append(frame)

# Save animation as a GIF
frames[0].save(
    "flowing_stream.gif",
    save_all=True,
    append_images=frames[1:],
    duration=100,  # ms between frames
    loop=0
)
